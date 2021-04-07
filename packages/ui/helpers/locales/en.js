export default {
  snackbars: {
    updated: 'Updated',
    created: 'Created',
    deleted: 'Deleted',
    usersFetchError: 'Unable to access users\' list',
    emailSent: 'An email was sent',
  },
  global: {
    errors: {
      errorOccured: 'An error has occurred',
      required: 'This field is required',
      userRequired: 'A user is required',
      nameRequired: 'A name is required',
      WORKSPACE_ALREADY_EXISTS: 'A workspace with this name already exists',
      FORBIDDEN_WORKSPACE_CREATION:
        'You don\'t have the rights to create this workspace',
      password: {
        error: {
          nouser: 'User not found',
          incorrect: 'Bad password',
        },
      },
      login: {
        error: {
          internal: 'An error occurred',
        },
      },
    },
    add: 'Add',
    teams: 'Workspaces',
    addTags: 'Add tags',
    copyMail: 'Copy',
    copyMailAction: 'Create copy',
    moveFolderAction: 'Move folder',
    moveMail: 'Move',
    location: 'Location',
    moveManyMail: 'Move',
    newTemplate: 'Add a template',
    newFolder: 'Add a folder',
    parentLocation: 'Parent location',
    template: 'Template | Templates',
    mailing: 'Email | Emails',
    newMailing: 'Add an email',
    user: 'User | Users',
    newUser: 'Add a user',
    newTeam: 'Add a workspace',
    newTag: 'Add a tag',
    backToMails: 'Back to mails',
    backToGroups: 'Back to groups',
    group: 'Group | Groups',
    workspaces: 'Workspaces',
    newGroup: 'Add a group',
    workspace: 'Workspace',
    newWorkspace: 'Add a workspace',
    newMail: 'New mail',
    image: 'Image | Images',
    actions: 'Actions',
    save: 'Save',
    cancel: 'Cancel',
    create: 'Create',
    createTag: 'Create tag',
    update: 'Update',
    delete: 'Delete',
    reset: 'Reset',
    duplicate: 'Duplicate',
    apply: 'Apply',
    confirm: 'Confirm',
    close: 'Close',
    show: 'Show',
    settings: 'Settings',
    download: 'Download',
    preview: 'Preview',
    newPreview: 'Create a preview',
    name: 'Name',
    description: 'Description',
    author: 'Author',
    tags: 'Tags',
    password: 'Password',
    email: 'Email',
    enable: 'Enable',
    disable: 'Disable',
    enabled: 'Enabled',
    disabled: 'Disabled',
    status: 'Status',
    createdAt: 'Created at',
    updatedAt: 'Updated at',
    edit: 'Edit',
    move: 'Move',
  },
  layout: {
    logout: 'Logout',
  },
  forms: {
    group: {
      downloadWithoutEnclosingFolder: {
        label: 'Zip file format',
        wrapped: 'Wrap in a parent folder',
        unwrapped: 'Leave files in root folder',
      },
      defaultWorkspace: {
        label: 'Default workspace\'s name',
      },
      exportFtp: 'Export images on an FTP',
      exportCdn: 'Export images on a CDN',
      enable: 'Enable',
      ftpProtocol: 'FTP protocol',
      host: 'Host',
      username: 'Username',
      port: 'Port',
      path: 'Folder\'s path',
      endpoint: 'Images root\'url',
      editorLabel: 'Button label',
      entryPoint: 'Entry point',
      issuer: 'Issuer',
    },
    template: {
      meta: 'Meta',
      files: 'Files',
      markup: 'Markup',
    },
    user: {
      passwordConfirm: 'Password confirmation',
      passwordReset: 'Password reset',
      login: 'Login',
      adminLogin: 'Admin Login',
      sendLink: 'Send reset link',
      forgottenPassword: 'Forgotten password ?',
      validate: 'Validate',
      errors: {
        password: {
          required: 'A password is required',
          confirm: 'You need to confirm your password',
          same: 'Your passwords should be identical',
        },
        email: {
          required: 'An email is required',
          valid: 'A valid email is required',
        },
      },
      tooltip: {
        noPassword: 'Disabled cause of SAML Authentication',
      },
    },
    workspace: {
      checkBoxError:
        'I understand that workspace\'s emails and folders will be removed too',
      inputError: 'The name is required',
      inputMaxLength: 'Name must not exceed 70 characters',
      moveFolderConfirmationMessage: 'Please choose the destination',
    },
  },
  groups: {
    tabs: {
      informations: 'Information',
    },
    mailingTab: {
      confirmationField: 'Type the mailing name to confirm',
      deleteWarningMessage:
        'You are about to delete the "<strong>{name}</strong>" mailing. This action can\'t be undone.',
      deleteSuccessful: 'Mailing deleted',
      deleteFolderWarning:
        'You are about to delete the "<strong>{name}</strong>" folder. This action can\'t be undone.',
      deleteFolderNotice:
        'Emails and folders contained in the folder will also be deleted',
      deleteFolderSuccessful: 'Folder deleted',
    },
    workspaceTab: {
      confirmationField: 'Type the workspace name to confirm',
      deleteNotice:
        'Emails and folders contained in the workspace will also be deleted',
      deleteWarningMessage:
        'You are about to delete the "<strong>{name}</strong>" workspace. This action can\'t be undone.',
      deleteSuccessful: 'Workspace deleted',
    },
  },
  mailings: {
    transfer: {
      label: 'Transfer email',
      success: 'Email transferred',
    },
    creationNotice: 'Click on any of above templates to create email',
    list: 'Emails list',
    filters: {
      createdBetween: 'Created between',
      updatedBetween: 'Updated between',
      and: 'And',
    },
    deleteManySuccessful: 'Mailings deleted',
    deleteConfirmationMessage:
      'You are about to delete the selected mailings. This action can\'t be undone.',
    duplicate: 'Duplicate email',
    duplicateNotice: 'Are you sure to duplicate <strong>{name}</strong> ?',
    name: 'Email name',
    rename: 'Rename email',
    selectedCount: '{count} email selected | {count} emails selected',
    selectedShortCount: '{count} email| {count} emails',
    deleteCount: 'Delete {count} email | Delete {count} emails',
    moveCount: 'Move {count} email | Move {count} emails',
    deleteNotice: 'This will definitely remove:',
    copyMailConfirmationMessage: 'Please choose the location of the new copy',
    copyMailSuccessful: 'Mail copied',
    moveMailSuccessful: 'Email moved',
    moveManySuccessful: 'Emails moved',
    editTagsSuccessful: 'Tags updated',
  },
  template: {
    noId: 'No ID',
    noMarkup: 'No markup',
    markup: 'Markup',
    download: 'Download markup',
    preview: 'Download template',
    removeImages: 'Delete all images',
    imagesRemoved: 'Images deleted',
    deleteNotice:
      'Deleting a template will also remove every mailings using this one',
  },
  tags: {
    list: 'Tags\' list',
    new: 'New tags',
    handle: 'Handle tags',
  },
  users: {
    actions: {
      reset: 'Reset',
      send: 'Send',
      resend: 'Resend',
    },
    passwordTooltip: {
      reset: 'Reset password',
      send: 'Send password\'s email',
      resend: 'Resend password\'s email',
    },
    enableNotice: 'are you sure you want to enable',
    disableNotice: 'Are you sure you want to disable',
    passwordNotice: {
      reset: 'Are you sure you want to reset the password of',
      send: 'Are you sure you want to send the password mail to',
      resend: 'Are you sure you want to resend the password mail to',
    },
    email: 'Email',
    lang: 'Language',
    details: 'Details',
    role: 'Role',
  },
  workspaces: {
    name: 'Name',
    description: 'Descritpion',
    members: 'Members',
    userIsGroupAdmin: 'The user is a group admin',
  },
  folders: {
    name: 'Folder name',
    nameUpdated: 'Folder renamed',
    renameTitle: 'Rename folder <strong  class="black--text">{name}</strong> ',
    rename: 'Rename',
    created: 'Folder created',
    conflict: 'Folder already exists',
    moveFolderConfirmationMessage: 'Please choose the destination',
    moveFolderSuccessful: 'Folder moved',
  },
  tableHeaders: {
    groups: {
      downloadWithoutEnclosingFolder: 'Download without parent folder',
      cdnDownload: 'CDN download',
      ftpDownload: 'FTP download',
    },
    users: {
      passwordMail: 'Password\' mail',
    },
    templates: {
      markup: 'Markup?',
    },
    mailings: {
      rename: 'Rename',
      transfer: 'Transfer',
    },
  },
};
