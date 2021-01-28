export default {
  snackbars: {
    updated: 'Updated',
    created: 'Created',
    deleted: 'Deleted',
    usersFetchError: "Unable to access users' list",
    emailSent: 'An email was sent',
  },
  global: {
    errors: {
      errorOccured: 'An error has occured',
      required: 'This field is required',
      userRequired: 'A user is required',
      nameRequired: 'A name is required',
      password: {
        error: {
          nouser: 'User not found',
          incorrect: 'Bad password'
        }
      },
      login: {
        error: {
          internal: 'An error occurred',
        }
      }
    },
    newTemplate: 'Add a template',
    template: 'Template | Templates',
    mailing: 'Email | Emails',
    newMailing: 'Add an email',
    user: 'User | Users',
    newUser: 'Add a user',
    group: 'Group | Groups',
    newGroup: 'Add a group',
    image: 'Image | Images',
    actions: 'Actions',
    save: 'Save',
    cancel: 'Cancel',
    create: 'Create',
    update: 'Update',
    delete: 'Delete',
    reset: 'Reset',
    duplicate: 'Duplicate',
    apply: 'Apply',
    confirm: 'Confirm',
    close: 'Close',
    show: 'Show',
    download: 'Download',
    preview: 'Preview',
    newPreview: 'Create a previeq',
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
      exportFtp: 'Export images on an FTP',
      exportCdn: 'Export images on a CDN',
      enable: 'Enable',
      ftpProtocol: 'FTP protocol',
      host: 'Host',
      username: 'Username',
      port: 'Port',
      path: "Folder's path",
      ftpProtocol: 'HTTP protocol',
      endpoint: "Images root'url",
      editorLabel: 'Button label',
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
    },
  },
  groups: {
    tabs: {
      informations: 'Informations',
    },
  },
  mailings: {
    transfer: {
      label: 'Transfer email',
      success: 'Email transfered',
    },
    creationNotice: 'Click on any of above templates to create email',
    list: 'Emails list',
    filters: {
      createdBetween: 'Created between',
      updatedBetween: 'Updated between',
      and: 'And',
    },
    duplicate: 'Duplcate email',
    duplicateNotice: 'Are you sure to duplicate <strong>{name}</strong> ?',
    rename: 'Rename email',
    selectedCount: '{count} email selected | {count} emails selected',
    deleteCount: 'Delete {count} email | Delete {count} emails',
    deleteNotice: 'This will definitely remove:',
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
    list: "Tags' list",
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
      send: "Send password's email",
      resend: "Resend password's email",
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
  },
  tableHeaders: {
    groups: {
      downloadWithoutEnclosingFolder: 'Download without parent folder',
      cdnDownload: 'CDN download',
      ftpDownload: 'FTP download',
    },
    users: {
      passwordMail: "Password' mail",
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
