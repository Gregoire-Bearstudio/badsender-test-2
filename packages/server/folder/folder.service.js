'use strict';

const { Folders } = require('../common/models.common.js');
const mongoose = require('mongoose');
const { NotFound, BadRequest, Conflict, NotAcceptable } = require('http-errors');
const ERROR_CODES = require('../constant/error-codes.js');

const workspaceService = require('../workspace/workspace.service.js');

module.exports = {
  listFolders,
  create
};

async function listFolders() {
  return Folders.find({}).populate('_parentFolder');
}

async function create(folder, user) {
  const { workspaceId, parentFolderId, name } = folder;

  if (!name || name === '') {
    throw new BadRequest(ERROR_CODES.NAME_NOT_PROVIDED);
  }

  if (!workspaceId && !parentFolderId) {
    throw new BadRequest(ERROR_CODES.PARENT_NOT_PROVIDED);
  }

  if (workspaceId && parentFolderId) {
    throw new BadRequest(ERROR_CODES.TWO_PARENTS_PROVIDED);
  }

  const newFolder = { name };

  if (workspaceId) {
    const workspace = await workspaceService.getWorkspace(workspaceId);

    if (!workspace) {
      throw new NotFound(ERROR_CODES.WORKSPACE_NOT_FOUND);
    }

    workspaceService.doesUserHaveWriteAccess(user, workspace);

    newFolder._workspace = workspace._id;
  }

  if (parentFolderId) {
    const parentFolder = await getFolder(parentFolderId);

    if (!parentFolder) {
      throw new NotFound(ERROR_CODES.FOLDER_NOT_FOUND);
    }

    if (parentFolder._parentFolder) {
      throw new NotAcceptable(ERROR_CODES.PARENT_FOLDER_IS_SUBFOLDER);
    }

    workspaceService.doesUserHaveWriteAccess(user, parentFolder._workspace);

    newFolder._parentFolder = parentFolder._id;
    newFolder._workspace = parentFolder._workspace.id;
  }

  await isNameUniqueAtSameLevel(newFolder);

  return Folders.create(newFolder);
}

async function getFolder(folderId) {
  return Folders.findOne({ _id : mongoose.Types.ObjectId(folderId) })
      .populate('_workspace');
}

async function isNameUniqueAtSameLevel(folder){
  const folders = await Folders.find({
    ...folder
  });

  if (folders.length) {
    throw new Conflict(`${ERROR_CODES.NAME_ALREADY_TAKEN_AT_SAME_LEVEL} : ${folder.name}`);
  }
}
