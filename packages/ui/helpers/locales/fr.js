export default {
  snackbars: {
    updated: 'Mis à jour',
    created: 'Crée',
    deleted: 'Supprimé',
    usersFetchError: 'Impossible d\'accéder à la liste des utilisateurs',
    emailSent: 'Un email a été envoyé',
  },
  global: {
    errors: {
      errorOccured: 'Une erreur est survenue',
      required: 'Ce champ est requis',
      userRequired: 'Un utilisateur est requis',
      nameRequired: 'Un nom est requis',
      WORKSPACE_ALREADY_EXISTS: 'Un workspace avec ce nom existe déjà',
      FORBIDDEN_WORKSPACE_CREATION:
        'Vous n\'avez pas les droits pour créer ce workspace',
      password: {
        error: {
          nouser: 'Utilisateur introuvable',
          incorrect: 'Identifiants incorrects',
        },
      },
      login: {
        error: {
          internal: 'Une erreur est survenue',
        },
      },
    },
    copyMail: 'Copie de l\'email',
    copyMailAction: 'Créer une copie',
    teams: 'Workspaces',
    newTemplate: 'Ajouter un template',
    template: 'Template | Templates',
    mailing: 'Email | Emails',
    newMailing: 'Ajouter un email',
    user: 'Utilisateur | Utilisateurs',
    newUser: 'Ajouter un utilisateur',
    newTeam: 'Ajouter un workspace',
    newTag: 'Ajouter un tag',
    backToMails: 'Retour aux emails',
    backToGroups: 'Retour aux groupes',
    group: 'Groupe | Groupes',
    workspaces: 'Espaces de travail',
    newGroup: 'Ajouter un groupe',
    workspace: 'Workspace',
    newWorkspace: 'Ajouter un workspace',
    newMail: 'Nouvel email',
    image: 'Image | Images',
    actions: 'Actions',
    save: 'Enregistrer',
    settings: 'Réglages',
    cancel: 'Annuler',
    create: 'Créer',
    update: 'Mettre à jour',
    delete: 'Supprimer',
    reset: 'Réinitialiser',
    duplicate: 'Dupliquer',
    apply: 'Appliquer',
    confirm: 'Confirmer',
    close: 'Fermer',
    show: 'Visualiser',
    download: 'Télécharger',
    preview: 'Prévisualiser',
    newPreview: 'Créer une prévisulisation',
    name: 'Nom',
    description: 'Description',
    author: 'Auteur',
    tags: 'Labels',
    password: 'Mot de passe',
    email: 'Email',
    enable: 'Activer',
    disable: 'Désactiver',
    enabled: 'Activé',
    disabled: 'Désactivé',
    status: 'Statut',
    createdAt: 'Créé le',
    updatedAt: 'Mis à jour le',
    edit: 'Modifier',
    move: 'Déplacer',
  },
  layout: {
    logout: 'Déconnexion',
  },
  forms: {
    group: {
      downloadWithoutEnclosingFolder: {
        label: 'Format du fichier zip',
        wrapped: 'Englober dans un dossier parent',
        unwrapped: 'Laisser les fichiers à la racine',
      },
      defaultWorkspace: {
        label: 'Nom du workspace par défaut',
      },
      exportFtp: 'Exporter les images sur un FTP',
      exportCdn: 'Exporter les images sur un CDN',
      enable: 'Activer',
      ftpProtocol: 'Protocole FTP',
      host: 'Hôte',
      username: 'Identifiant',
      port: 'Port',
      path: 'Chemin du dossier',
      httpProtocol: 'Protocole HTTP',
      endpoint: 'Url racine des images',
      editorLabel: 'Libellé du bouton',
      entryPoint: 'Point d\'entrée',
      issuer: 'Issuer',
    },
    template: {
      meta: 'Meta',
      files: 'Fichiers',
      markup: 'Markup',
    },
    user: {
      passwordConfirm: 'Confirmation du mot de passe',
      passwordReset: 'Réinitialisation du mot de passe',
      login: 'Connexion',
      adminLogin: 'Connexion Admin',
      sendLink: 'Envoyer le lien de réinitialisation',
      forgottenPassword: 'Mot de passe oublié ?',
      validate: 'Valider',
      errors: {
        password: {
          required: 'Un mot de passe est requis',
          confirm: 'Vous devez confirmer votre mot de passe',
          same: 'Vos mots de passe sont différents',
        },
        email: {
          required: 'Un email est requis',
          valid: 'Un email valide est requis',
        },
      },
    },
    workspace: {
      checkBoxError:
        'Je comprends que les emails et les dossiers contenus dans le workspace seront aussi supprimés',
      inputError: 'Le nom est requis',
    },
  },
  groups: {
    tabs: {
      informations: 'Informations',
    },
    mailingTab: {
      confirmationField: 'Tapez le nom de l\'email pour confirmer',
      deleteWarningMessage:
        'Vous êtes sur le point de supprimer l\'email "<strong>{name}</strong>". Cette action est irréversible.',
      deleteSuccessful: 'Email supprimé',
    },
    workspaceTab: {
      confirmationField: 'Tapez le nom du workspace pour confirmer',
      deleteWarningMessage:
        'Vous êtes sur le point de supprimer le workspace "<strong>{name}</strong>". Cette action est irréversible.',
      deleteNotice:
        'Les emails et les dossiers que contient le workspace seront supprimés aussi',
      deleteSuccessful: 'Workspace supprimé',
    },
  },
  mailings: {
    transfer: {
      label: 'Transférer l\'email',
      success: 'Email transféré',
    },
    creationNotice:
      'Cliquez sur l\'un des templates ci-dessous pour créer un nouvel email',
    list: 'Liste des emails',
    filters: {
      createdBetween: 'Crée entre le',
      updatedBetween: 'Mis à jour entre le',
      and: 'Et le',
    },
    duplicate: 'Dupliquer l\'email',
    duplicateNotice:
      'Êtes-vous sûr de vouloir dupliquer <strong>{name}</strong> ?',
    name: 'Nommer l\'email',
    rename: 'Renommer l\'email',
    selectedCount: '{count} email sélectionné | {count} emails sélectionnés',
    deleteCount: 'Supprimer {count} email | Supprimer {count} emails',
    deleteNotice: 'Cela supprimera définitivement:',
    copyMailConfirmationMessage:
      'Veuillez choisir l\'emplacement de la nouvelle copie',
    copyMailSuccessful: 'Email copié',
  },
  template: {
    noId: 'Aucun ID',
    noMarkup: 'Aucun markup',
    markup: 'Markup',
    download: 'Télécharger le markup',
    preview: 'Prévisualiser le template',
    removeImages: 'Supprimer toute les images',
    imagesRemoved: 'Images supprimées',
    deleteNotice:
      'Supprimer un template supprimera aussi tout les emails utilisant celui-ci',
  },
  tags: {
    list: 'Liste des labels',
    new: 'Nouveau label',
    handle: 'Gérer les labels',
  },
  users: {
    actions: {
      reset: 'Réinitialiser',
      send: 'Envoyer',
      resend: 'Renvoyer',
    },
    passwordTooltip: {
      reset: 'Réinitialiser le mot de passe',
      send: 'Envoyer l\'email de mot de passe',
      resend: 'Renvoyer l\'email de mot de passe',
    },
    enableNotice: 'Êtes-vous sûr de vouloir activer',
    disableNotice: 'Êtes-vous sûr de vouloir désactiver',
    passwordNotice: {
      reset: 'Êtes-vous sûr de vouloir réinitialiser le mot de passe de',
      send: 'Êtes-vous sûr de vouloir envoyer l\'email de mot de passe à',
      resend: 'Êtes-vous sûr de vouloir renvoyer l\'email de mot de passe à',
    },
    email: 'Email',
    lang: 'Langue',
    details: 'Informations',
    role: 'Rôle',
    tooltip: {
      noPassword: 'Désactivé à cause de l\'authenfication SAML',
    },
  },
  workspaces: {
    name: 'Nom',
    description: 'Descritpion',
    members: 'Membres',
  },
  tableHeaders: {
    groups: {
      downloadWithoutEnclosingFolder: 'Télécharger sans dossier parent',
      cdnDownload: 'Téléchargement CDN',
      ftpDownload: 'Téléchargement FTP',
    },
    users: {
      passwordMail: 'Email de mot de passe',
    },
    templates: {
      markup: 'Markup?',
    },
    mailings: {
      rename: 'Renommer',
      transfer: 'Transférer',
    },
  },
};
