export const ACTIONS = {
  RENAME: 'RENAME',
  TRANSFER: 'TRANSFER',
  DELETE: 'DELETE',
  COPY_MAIL: 'COPY_MAIL',
  ADD_TAGS: 'ADD_TAGS',
  MOVE_MAIL: 'MOVE_MAIL',
};

export const ACTIONS_DETAILS = {
  [ACTIONS.RENAME]: {
    text: 'tableHeaders.mailings.rename',
    icon: 'title',
  },
  [ACTIONS.TRANSFER]: {
    text: 'tableHeaders.mailings.transfer',
    icon: 'forward',
  },
  [ACTIONS.DELETE]: {
    text: 'global.delete',
    icon: 'delete',
  },
  [ACTIONS.COPY_MAIL]: {
    text: 'global.copyMail',
    icon: 'content_copy',
  },
  [ACTIONS.ADD_TAGS]: {
    text: 'global.addTags',
    icon: 'label',
  },
  [ACTIONS.MOVE_MAIL]: {
    text: 'global.moveMail',
    icon: 'forward',
    emit: 'copy-mail-action',
  },
};
