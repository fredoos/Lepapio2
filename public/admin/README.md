# Admin CMS - Le Papio

## 🎯 Vue d'ensemble

Système d'administration complet pour gérer le contenu du site Le Papio sans base de données.

## 📁 Structure

```
/public/admin/
├── index.html      # Interface d'administration
├── admin.js        # Logique de gestion
└── README.md       # Documentation
```

## 🚀 Accès

URL: `https://votre-site.com/admin/`

## ✨ Fonctionnalités

### 📋 Gestion du Menu

Gérez toutes les catégories du menu :
- **Entrées** - Plats d'ouverture
- **Potages** - Soupes et bouillons
- **Plats** - Plats principaux
- **Moules-Frites** - Formules moules
- **Pizzas** - Pizzas artisanales
- **Formules** - Menus combinés
- **Menu Enfant** - Options pour enfants
- **Desserts** - Pâtisseries
- **Glaces** - Glaces et coupes

Pour chaque élément, vous pouvez :
- ✏️ Modifier les informations
- 🗑️ Supprimer
- ➕ Ajouter un nouveau

### 📰 Gestion des Actualités

Publiez et gérez les actualités du restaurant :
- Titre
- Date de publication
- Contenu complet
- Actions : Modifier / Supprimer

## 📝 Formulaires

### Élément de Menu

Champs disponibles :
- **Nom (Français)** * - Obligatoire
- **Nom (English)** * - Obligatoire
- **Prix** * - Format: 12,50
- **Description (Français)** - Optionnel
- **Description (English)** - Optionnel
- **Ingrédients (Français)** - Optionnel
- **Ingrédients (English)** - Optionnel

### Actualité

Champs disponibles :
- **Titre** * - Obligatoire
- **Date** * - Obligatoire
- **Contenu** * - Obligatoire

## 💾 Stockage

Les données sont stockées localement dans le navigateur via `localStorage` :
- **papio-menu-data** - Contenu du menu
- **papio-news-data** - Actualités

### ⚠️ Important

- Les données sont stockées uniquement dans le navigateur
- Ne pas vider le cache du navigateur sans backup
- Les modifications sont immédiates
- Pas de synchronisation multi-utilisateurs

## 🔄 Export

Le système simule un export vers des fichiers Markdown :
```
src/content/menu/{categorie}/{slug}.md
src/content/news/{slug}.md
```

Format Markdown généré :
```markdown
---
name: "Nom du plat"
nameEn: "Dish Name"
price: "12,50"
description: "Description en français"
descriptionEn: "English description"
ingredients: "Ingrédients"
ingredientsEn: "Ingredients"
order: 1
available: true
---
```

## 🎨 Interface

### Navigation
- Onglets par catégorie
- Interface claire et intuitive
- Design responsive

### Actions
- Boutons d'action visibles
- Confirmations pour suppressions
- Notifications de succès

### Formulaires
- Validation des champs
- Messages d'erreur clairs
- Interface modale

## 🛠️ Utilisation

### Ajouter un élément

1. Cliquez sur l'onglet de la catégorie
2. Cliquez sur "+ Ajouter..."
3. Remplissez le formulaire
4. Cliquez sur "Enregistrer"

### Modifier un élément

1. Trouvez l'élément dans la liste
2. Cliquez sur "✏️ Modifier"
3. Modifiez les informations
4. Cliquez sur "Enregistrer"

### Supprimer un élément

1. Trouvez l'élément dans la liste
2. Cliquez sur "🗑️ Supprimer"
3. Confirmez la suppression

## 🔐 Sécurité

### Recommandations

- Protéger l'accès à `/admin/` via `.htaccess` ou Netlify
- Utiliser une authentification basique
- Limiter les accès autorisés

### Configuration Netlify

Ajoutez dans `netlify.toml` :
```toml
[[redirects]]
  from = "/admin/*"
  to = "/admin/:splat"
  status = 200
  force = false
  conditions = {Role = ["admin"]}
```

## 📱 Responsive

L'interface s'adapte à tous les écrans :
- 📱 Mobile - Vue simplifiée
- 💻 Tablet - Vue intermédiaire
- 🖥️ Desktop - Vue complète

## 🐛 Debug

La console JavaScript affiche :
- Logs d'export Markdown
- Erreurs éventuelles
- Notifications système

## 🔄 Mise à jour

Pour mettre à jour le système :
1. Remplacez `admin.js` et `index.html`
2. Les données sont préservées dans localStorage
3. Rafraîchissez la page

## 💡 Astuces

- Utilisez Ctrl+S dans les formulaires pour enregistrer rapidement
- Les notifications disparaissent après 3 secondes
- Fermez les modals en cliquant en dehors
- Les données sont sauvegardées instantanément

## 📞 Support

Pour toute question ou problème, consultez ce fichier README ou contactez le développeur.
