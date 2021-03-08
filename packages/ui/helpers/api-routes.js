const API_PREFIX = process.env.API_PREFIX;

// a dictionary of API routes
// • prefix is configured by axios (/api)
// • it's just a way to centralize all our routes
//   since we don't use a store for everything

/// ///
// GROUPS
/// ///

export function groups() {
  return '/groups';
}
export function groupsItem(routeParams = {}) {
  return `/groups/${routeParams.groupId}`;
}
export function groupsItemUsers(routeParams = {}) {
  return `/groups/${routeParams.groupId}/users`;
}
export function groupsItemTemplates(routeParams = {}) {
  return `/groups/${routeParams.groupId}/templates`;
}
export function groupsItemMailings(routeParams = {}) {
  return `/groups/${routeParams.groupId}/mailings`;
}

/// ///
// TEMPLATES
/// ///

export function templates() {
  return '/templates';
}
/**
 * @param {Object} routeParams
 * @param {string} routeParams.templateId
 */
export function templatesItem(routeParams = {}) {
  return `/templates/${routeParams.templateId}`;
}
export function templatesItemPreview(routeParams = {}) {
  return `/templates/${routeParams.templateId}/preview`;
}
export function templatesItemImages(routeParams = {}) {
  return `/templates/${routeParams.templateId}/images`;
}
// this is not used by axios (download/show)
export function templatesItemMarkup(routeParams = {}) {
  return `${API_PREFIX}/templates/${routeParams.templateId}/markup`;
}
// this is not used by axios (SSE with EventSource)
export function templatesItemEvents(routeParams = {}) {
  return `${API_PREFIX}/templates/${routeParams.templateId}/events`;
}

/// ///
// ACCOUNT
/// ///

export function getPublicProfile({ username }) {
  return `/account/${username}`;
}

export function login() {
  return '/account/login';
}

export function accountResetPassword(routeParams = {}) {
  return `/account/${routeParams.email}/password`;
}
export function accountSetPassword(routeParams = {}) {
  return `/account/${routeParams.email}/password/${routeParams.token}`;
}

/// ///
// USERS
/// ///

export function users() {
  return '/users';
}
export function usersItem(routeParams = {}) {
  return `/users/${routeParams.userId}`;
}
export function usersItemActivate(routeParams = {}) {
  return `/users/${routeParams.userId}/activate`;
}
export function usersItemPassword(routeParams = {}) {
  return `/users/${routeParams.userId}/password`;
}
export function usersItemMailings(routeParams = {}) {
  return `/users/${routeParams.userId}/mailings`;
}

/// ///
// MAILINGS
/// ///

export function mailings() {
  return '/mailings';
}
export function mailingsItem(routeParams = {}) {
  return `/mailings/${routeParams.mailingId}`;
}
export function mailingsItemDuplicate(routeParams = {}) {
  return `/mailings/${routeParams.mailingId}/duplicate`;
}
export function mailingsItemTransferToUser(routeParams = {}) {
  return `/mailings/${routeParams.mailingId}/transfer-to-user`;
}

/// ///
// IMAGES
/// ///

// this is not used by axios (show an image…)
export function imagesItem(routeParams = {}) {
  return `${API_PREFIX}/images/${routeParams.imageName}`;
}
export function imagesPlaceholder(routeParams = {}) {
  return `${API_PREFIX}/images/placeholder/${routeParams.width}x${routeParams.height}.png`;
}

/// ///
// WORKSPACEs
/// ///

export function workspacesForCurrentUser() {
  return '/workspaces/folders';
}

export function workspaceByNameInGroup(workspaceName) {
  return `/workspaces/name/${workspaceName}`;
}

export function workspacesWithUserCount() {
  return '/workspaces/';
}
