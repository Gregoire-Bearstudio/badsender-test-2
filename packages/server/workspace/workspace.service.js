'use strict';

const { Workspaces } = require('../common/models.common.js');
const mongoose = require('mongoose');

module.exports = {
  createWorkspace,
  listWorkspace,
  listWorkspaceForRegularUser,
  listWorkspaceForGroupAdmin,
};

async function createWorkspace(workspaceParams) {
  const newWorkspace = await Workspaces.create({
    name: workspaceParams.name,
    _company: workspaceParams.group,
  });

  return newWorkspace;
}

async function listWorkspace(params) {
  const workspaces = await Workspaces.find(params).populate({
    path: 'folders',
    populate: { path: 'childFolders' },
  });
  return workspaces;
}
async function listWorkspaceForGroupAdmin(params) {
  const listWorkspacesForGroupAdmin = await listWorkspace(params);

  return listWorkspacesForGroupAdmin?.map((workSpace) => {
    return { ...workSpace.toObject(), hasRights: true };
  });
}

async function listWorkspaceForRegularUser(user) {
  const promiseListWorkspaceForNotGroupUser = listWorkspace({
    _company: mongoose.Types.ObjectId(user._company?.id),
    _users: { $ne: user.id },
  });
  const promiseListWorkspaceForGroupUser = listWorkspace({
    _company: mongoose.Types.ObjectId(user._company?.id),
    _users: user.id,
  });
  const [otherWorkSpaces, workspacesForCurrentUser] = await Promise.all([
    promiseListWorkspaceForNotGroupUser,
    promiseListWorkspaceForGroupUser,
  ]);

  const formatWorkspacesForCurrentUser = workspacesForCurrentUser.map(
    (workSpace) => {
      return { ...workSpace.toObject(), hasRights: true };
    }
  );

  const formatOtherWorkSpaces = otherWorkSpaces.map((workSpace) => {
    return { ...workSpace.toObject(), hasRights: false };
  });

  return [...formatWorkspacesForCurrentUser, ...formatOtherWorkSpaces];
}
