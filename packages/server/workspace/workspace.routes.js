'use strict';

const express = require('express');
const { guard, GUARD_GROUP_ADMIN } = require('../account/auth.guard');

const Roles = require('../account/roles');
const router = express.Router();
const workspaces = require('./workspace.controller.js');

router.get(
  '/',
  guard([Roles.GROUP_ADMIN, Roles.REGULAR_USER]),
  workspaces.list
);

router.post('/', GUARD_GROUP_ADMIN, workspaces.createWorkspace);

router.put('/:workspaceId', GUARD_GROUP_ADMIN, (req, res, _next) => {
  return res.end('Endpoint workspace');
});

router.delete('/:workspaceId', GUARD_GROUP_ADMIN, (req, res, _next) => {
  return res.end('Endpoint workspace');
});

module.exports = router;
