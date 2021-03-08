'use strict';

const asyncHandler = require('express-async-handler');
const createHttpError = require('http-errors');
const ERROR_CODES = require('../constant/error-codes.js');
const workspaceService = require('./workspace.service');

module.exports = {
  list: asyncHandler(list),
  createWorkspace: asyncHandler(createWorkspace),
};

/**
 * @api {get} /workspace list of workspaces with folders
 * @apiPermission group_admin
 * @apiName GetWorkspaces
 * @apiGroup Workspaces
 *
 * @apiUse workspace
 * @apiSuccess {workspace[]} items list of workspace
 */

async function list(req, res, next) {
  if (!req?.user) {
    next(new createHttpError.Unauthorized());
  }
  const user = req.user;
  const { group } = user;
  const workspaces = await workspaceService.listWorkspaceForGroupAdmin(
    group.id
  );
  return res.json({ items: workspaces });
}

/**
 * @api {post} /workspaces workspace creation
 * @apiPermission group_admin
 * @apiName CreateWorkspace
 * @apiGroup Workspaces
 *
 * @apiParam (Body) {String} groupId the group of the workspace
 * @apiParam (Body) {String} email should be unique in the application
 * @apiParam (Body) {String} [name]
 * @apiParam (Body) {String} [description]
 * @apiParam (Body) {Array} [userIds] Ids of the workspace's members
 *
 * @apiUse workspace
 * @apiSuccess {workspace} workspace created
 */

async function createWorkspace(req, res) {
  try {
    if (!!req.user?.group?.id && req.body.groupId === req.user?.group?.id) {
      const newWorkspace = await workspaceService.createWorkspace(req.body);
      res.json(newWorkspace);
    } else {
      res.status(403).send(ERROR_CODES.FORBIDDEN_WORKSPACE_CREATION);
    }
  } catch (error) {
    if (error.status) {
      return res.status(error.status).send(error.message);
    }
    res.status(500).send();
  }
}
