'use strict';

const { omit } = require('lodash');
const mongoose = require('mongoose');
const {
  NotFound,
  InternalServerError,
  UnprocessableEntity,
  BadRequest,
} = require('http-errors');

const {
  Mailings,
  Workspaces,
  Galleries,
  Folders,
} = require('../common/models.common.js');
const fileManager = require('../common/file-manage.service.js');
const modelsUtils = require('../utils/model.js');
const logger = require('../utils/logger.js');

const simpleI18n = require('../helpers/server-simple-i18n.js');
const ERROR_CODES = require('../constant/error-codes.js');

const templateService = require('../template/template.service.js');
const folderService = require('../folder/folder.service.js');
const workspaceService = require('../workspace/workspace.service.js');

module.exports = {
  createMailing,
  findMailings,
  findTags,
  findOne,
  renameMailing,
  deleteOne,
  copyMailing,
  moveMailing,
  moveManyMailings,
  findAllIn,
  createInsideWorkspaceOrFolder,
};

async function findMailings(query) {
  const mailingQuery = applyFilters(query);

  return Mailings.find(mailingQuery);
}

async function findTags(query) {
  const mailingQuery = applyFilters(query);

  return Mailings.findTags(mailingQuery);
}

async function findOne(mailingId) {
  return Mailings.findOne({ _id: mongoose.Types.ObjectId(mailingId) });
}

// create a mail inside a workspace or a folder ( depending on the parameters provided )
async function createInsideWorkspaceOrFolder(mailingData) {
  const {
    templateId,
    workspaceId,
    parentFolderId,
    mailingName,
    user,
  } = mailingData;

  checkCreationPayload({
    templateId,
    workspaceId,
    parentFolderId,
    mailingName,
  });

  const template = await templateService.findOne({ templateId });
  templateService.doesUserHaveAccess(user, template);

  let mailParentParam = null;

  if (workspaceId) {
    await workspaceService.hasAccess(user, workspaceId);

    mailParentParam = { workspace: workspaceId };
  }

  if (parentFolderId) {
    await folderService.hasAccess(parentFolderId, user);

    mailParentParam = { _parentFolder: parentFolderId };
  }

  const mailing = {
    // Always give a default name: needed for ordering & filtering
    name: mailingName || simpleI18n('default-mailing-name', user.lang),
    templateId: template._id,
    templateName: template.name,
    ...mailParentParam,
  };

  // admin doesn't have valid user id & company
  if (!user.isAdmin) {
    mailing.userId = user.id;
    mailing.userName = user.name;
    mailing.group = user.group.id;
  }

  const newMailing = await createMailing(mailing);

  // strangely toJSON doesn't render the data object
  // • cope with that by manually copy it in the response
  const response = newMailing.toJSON();
  response.data = newMailing.data;

  return response;
}

function checkCreationPayload(mailings) {
  const { templateId, workspaceId, parentFolderId, mailingName } = mailings;

  if (!mailingName || mailingName === '') {
    throw new BadRequest(ERROR_CODES.NAME_NOT_PROVIDED);
  }

  if (!templateId || templateId === '') {
    throw new BadRequest(ERROR_CODES.TEMPLATE_NOT_PROVIDED);
  }

  checkEitherWorkspaceOrFolderDefined(workspaceId, parentFolderId);
}

function checkEitherWorkspaceOrFolderDefined(workspaceId, parentFolderId) {
  if (!workspaceId && !parentFolderId) {
    throw new BadRequest(ERROR_CODES.PARENT_NOT_PROVIDED);
  }

  if (workspaceId && parentFolderId) {
    throw new BadRequest(ERROR_CODES.TWO_PARENTS_PROVIDED);
  }
}

async function createMailing(mailing) {
  if (!mailing?._parentFolder && !mailing?.workspace) {
    throw new NotFound(ERROR_CODES.PARENT_NOT_PROVIDED);
  }

  if (
    mailing?.workspace &&
    !Workspaces.exists({ _id: mongoose.Types.ObjectId(mailing.workspace) })
  ) {
    throw new NotFound(ERROR_CODES.WORKSPACE_NOT_FOUND);
  }

  if (
    mailing?._parentFolder &&
    !Folders.exists({ _id: mongoose.Types.ObjectId(mailing._parentFolder) })
  ) {
    throw new NotFound(ERROR_CODES.FOLDER_NOT_FOUND);
  }

  return Mailings.create(mailing);
}

async function copyMailing(mailing, destinationWorkspace, user) {
  if (
    !Workspaces.exists({
      _id: mongoose.Types.ObjectId(destinationWorkspace.id),
    })
  ) {
    throw new NotFound(ERROR_CODES.WORKSPACE_NOT_FOUND);
  }

  const mailingProperties = omit(mailing, [
    '_id',
    'createdAt',
    'updatedAt',
    '_user',
    'author',
  ]);

  if (user.id) {
    mailingProperties._user = user._id;
    mailingProperties.author = user.name;
  }

  const copy = {
    ...mailingProperties,
    workspace: destinationWorkspace.id,
  };

  const copiedMailing = await Mailings.create(copy);
  const gallery = await Galleries.findOne({
    creationOrWireframeId: mailing._id,
  });

  await fileManager.copyImages(
    mailing._id?.toString(),
    copiedMailing._id?.toString()
  );
  await copiedMailing.save();

  try {
    if (gallery) {
      gallery.duplicate(copiedMailing._id).save();
    }
  } catch (error) {
    logger.warn(
      `MAILING DUPLICATE – can't duplicate gallery for ${copiedMailing._id}`
    );
  }
}

async function renameMailing(mailing) {
  if (
    !mailing?.workspace ||
    !Workspaces.exists({ _id: mongoose.Types.ObjectId(mailing.workspace) })
  ) {
    throw new NotFound(ERROR_CODES.WORKSPACE_NOT_FOUND);
  }
  const { id, name } = mailing;

  return Mailings.updateOne({ _id: mongoose.Types.ObjectId(id) }, { name });
}

async function deleteOne(mailing) {
  return Mailings.deleteOne({ _id: mongoose.Types.ObjectId(mailing.id) });
}

async function moveMailing(user, mailing, workspaceId) {
  const sourceWorkspace = await workspaceService.getWorkspace(
    mailing._workspace
  );
  const destinationWorkspace = await workspaceService.getWorkspace(workspaceId);

  workspaceService.doesUserHaveWriteAccess(user, sourceWorkspace);
  workspaceService.doesUserHaveWriteAccess(user, destinationWorkspace);

  const moveResponse = await Mailings.updateOne(
    { _id: mongoose.Types.ObjectId(mailing.id) },
    { _workspace: destinationWorkspace }
  );

  // update queries return objects with format { n, nModified, ok }
  // ok != 1 indicates a failure
  if (moveResponse.ok !== 1) {
    throw new InternalServerError(ERROR_CODES.FAILED_MAILING_MOVE);
  }
}

async function findAllIn(mailingsIds) {
  const mailings = await Mailings.find({
    _id: { $in: mailingsIds.map((id) => mongoose.Types.ObjectId(id)) },
  });

  if (mailings.length !== mailingsIds.length) {
    throw new NotFound(ERROR_CODES.MAILING_NOT_FOUND);
  }

  return mailings;
}

async function moveManyMailings(user, mailingsIds, workspaceId) {
  const destinationWorkspace = await workspaceService.getWorkspace(workspaceId);
  workspaceService.doesUserHaveWriteAccess(user, destinationWorkspace);

  const mailings = await findAllIn(mailingsIds);

  for (const mailing of mailings) {
    if (!mailing._workspace) {
      throw new UnprocessableEntity(ERROR_CODES.MAILING_MISSING_SOURCE);
    }

    const sourceWorkspace = await workspaceService.getWorkspace(
      mailing._workspace
    );
    workspaceService.doesUserHaveWriteAccess(user, sourceWorkspace);
  }

  const moveResponse = await Mailings.updateMany(
    { _id: { $in: mailings.map((mailing) => mailing.id) } },
    { _workspace: destinationWorkspace }
  );

  if (moveResponse.ok !== 1) {
    throw new InternalServerError(ERROR_CODES.FAILED_MAILING_MOVE);
  }
}

function applyFilters(query) {
  const mailingQueryStrictGroup = modelsUtils.addStrictGroupFilter(
    query.user,

    {}
  );

  return {
    ...mailingQueryStrictGroup,
    _workspace: query.workspaceId,
  };
}
