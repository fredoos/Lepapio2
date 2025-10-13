# Configuration Netlify CMS pour Le Papio

## Étapes de configuration sur Netlify

### 1. Activer Git Gateway

1. Allez sur votre dashboard Netlify : https://app.netlify.com
2. Sélectionnez votre site "Le Papio"
3. Allez dans **Site settings** > **Identity**
4. Cliquez sur **Enable Identity**
5. Dans la section **Services** > **Git Gateway**, cliquez sur **Enable Git Gateway**

### 2. Configurer l'authentification

1. Dans **Site settings** > **Identity** > **Registration**
   - Sélectionnez **Invite only** (pour contrôler qui peut s'inscrire)

2. Dans **Site settings** > **Identity** > **External providers** (optionnel)
   - Vous pouvez activer Google, GitHub, etc. pour faciliter la connexion

### 3. Inviter des utilisateurs admin

1. Allez dans **Identity** (onglet principal)
2. Cliquez sur **Invite users**
3. Entrez les adresses email des administrateurs
4. Ils recevront un email pour créer leur mot de passe

### 4. Accéder au CMS

Une fois configuré, les administrateurs peuvent accéder au CMS :
- URL : `https://votresite.com/admin/`
- Connexion avec email/mot de passe

## Fonctionnalités du CMS

Le CMS permet de gérer :

### Paramètres (⚙️)
- **Visibilité des sections du menu** - Activer/désactiver des sections entières
  - Parfait pour masquer les "Moules" en hiver
  - Ou masquer les "Potages" en été
  - Simple case à cocher pour chaque section
  - Les sections masquées n'apparaissent plus sur le site

### Menu
- **Entrées** - Tous les hors-d'œuvres
- **Potages** - Soupes et veloutés (masquable en été)
- **Plats** - Plats principaux
- **Moules** - Moules-frites (masquable en hiver)
- **Pizzas** - Toutes les pizzas
- **Formules** - Menus et formules
- **Menu Enfant** - Menu pour les enfants
- **Desserts** - Tous les desserts
- **Glaces** - Coupes glacées

### Actualités
- Articles de blog/actualités
- Avec date et contenu en Markdown

## Workflow

1. **Modifier un plat** : Cliquez sur le plat > Modifiez > Enregistrez
2. **Ajouter un plat** : Sélectionnez la catégorie > Nouveau > Remplissez le formulaire
3. **Publier** : Les modifications sont automatiquement :
   - Poussées sur GitHub (commit automatique)
   - Déployées sur Netlify (build automatique)
   - Visibles sur le site en 2-3 minutes

## Champs disponibles

Pour chaque élément du menu :
- **Nom (Français)** - Obligatoire
- **Nom (Anglais)** - Obligatoire
- **Prix** - Format : `12,50`
- **Description (Français)** - Optionnel
- **Description (Anglais)** - Optionnel
- **Ingrédients (Français)** - Optionnel
- **Ingrédients (Anglais)** - Optionnel
- **Ordre d'affichage** - Numéro pour l'ordre
- **Disponible** - Case à cocher (oui/non)

## Sécurité

- Authentification obligatoire (email + mot de passe)
- Seuls les utilisateurs invités peuvent accéder
- Toutes les modifications sont tracées dans Git
- Possibilité de revenir en arrière via GitHub

## Support

Si vous avez des questions, consultez :
- Documentation Netlify CMS : https://www.netlifycms.org/docs/
- Documentation Netlify Identity : https://docs.netlify.com/visitor-access/identity/
