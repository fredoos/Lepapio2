# Guide de Modification du Site Le Papio

## 🛠️ Outils Nécessaires

### 1. Éditeur de Code
- **Visual Studio Code** (gratuit, recommandé)
  - Télécharger : https://code.visualstudio.com/
  - Extensions utiles : ES7+ React/Redux/React-Native snippets, Auto Rename Tag

- **Alternatives** : Sublime Text, Atom, WebStorm

### 2. Node.js et npm
- Télécharger Node.js : https://nodejs.org/
- Vérifier l'installation : `node --version` et `npm --version`

## 📁 Structure du Projet

```
src/
├── components/           # Composants du site
│   ├── Header.tsx       # En-tête avec navigation
│   ├── Hero.tsx         # Section d'accueil
│   ├── About.tsx        # Section à propos
│   ├── Menu.tsx         # Carte du restaurant
│   ├── Gallery.tsx      # Galerie photos
│   ├── News.tsx         # Actualités
│   ├── Contact.tsx      # Contact et plan
│   ├── Footer.tsx       # Pied de page
│   └── Seagull.tsx      # Animation mouette
├── App.tsx              # Application principale
├── index.css            # Styles CSS
└── main.tsx             # Point d'entrée

public/                  # Images et fichiers statiques
├── *.jpg, *.png, *.gif  # Images du site
└── index.html           # Page HTML principale
```

## 🚀 Démarrer le Projet

1. **Ouvrir le terminal** dans le dossier du projet
2. **Installer les dépendances** : `npm install`
3. **Lancer le serveur de développement** : `npm run dev`
4. **Ouvrir** http://localhost:5173 dans votre navigateur

## ✏️ Modifications Courantes

### 📝 Modifier le Contenu Textuel

#### Header (src/components/Header.tsx)
```typescript
// Modifier le nom du restaurant
<h1 className="text-2xl md:text-xl font-bold text-gray-800">Le Papio</h1>
<p className="text-sm text-gray-600">Restaurant - Pizzeria</p>

// Modifier les éléments de navigation
const navItems = [
  { id: 'accueil', label: 'Accueil' },
  { id: 'carte', label: 'Carte' },
  // Ajouter/supprimer des éléments ici
];
```

#### Hero - Page d'Accueil (src/components/Hero.tsx)
```typescript
// Modifier le slogan principal
<p className="text-xl text-white/90 mb-8">
  Votre nouveau slogan ici
</p>

// Modifier l'adresse
<p className="text-base font-medium text-white/95">
  24 quai de Caligny<br />
  50100 Cherbourg-en-Cotentin
</p>

// Modifier le numéro de téléphone
<p className="text-lg font-semibold text-white">
  02 33 92 18 45
</p>
```

#### Menu - Carte (src/components/Menu.tsx)
```typescript
// Ajouter un nouveau plat
const menuItems = {
  entrees: [
    {
      name: "Nouveau plat",
      description: "Description du plat",
      price: "12,50"
    },
    // ... autres plats
  ]
};

// Modifier un prix
{ name: "Salade de chèvre chaud", price: "11,50" } // Ancien : 11,00
```

### 🖼️ Modifier les Images

1. **Ajouter une nouvelle image** : Placez-la dans le dossier `public/`
2. **Utiliser l'image** dans le code :
```typescript
<img src="/nouvelle-image.jpg" alt="Description de l'image" />
```

#### Galerie Photos (src/components/Gallery.tsx)
```typescript
const images = [
  { src: "/facade.jpg", alt: "Façade du restaurant" },
  { src: "/nouvelle-photo.jpg", alt: "Nouvelle photo" }, // Ajouter ici
  // ... autres images
];
```

### 🎨 Modifier les Couleurs

#### Couleurs Principales (tailwind.config.js)
```javascript
colors: {
  'papio': {
    500: '#6EB8B2', // Couleur principale - modifier ici
    600: '#5a9a95', // Couleur hover
    // ... autres nuances
  }
}
```

#### Styles CSS (src/index.css)
```css
/* Modifier la police principale */
body {
  font-family: 'Votre-Police', sans-serif;
}

/* Personnaliser l'animation de la mouette */
@keyframes fly {
  /* Modifier les valeurs ici */
}
```

### 📞 Modifier les Informations de Contact

#### Contact (src/components/Contact.tsx)
```typescript
// Modifier l'adresse
<p className="text-gray-600">
  Nouvelle adresse<br />
  Code postal Ville
</p>

// Modifier le téléphone
<a href="tel:0233921845">02 33 92 18 45</a>

// Modifier l'email
<a href="mailto:nouveau@email.com">nouveau@email.com</a>

// Modifier les horaires
<p><span className="font-medium">Lundi :</span> Dimanche</p>
<p>12h00 - 14h00</p>
<p>19h00 - 22h00</p>
```

### 📱 Modifier les Réseaux Sociaux

#### Liens Facebook/Instagram (src/components/Contact.tsx et News.tsx)
```typescript
// Facebook
<a href="https://facebook.com/votre-page">Facebook</a>

// Instagram  
<a href="https://instagram.com/votre-compte">Instagram</a>
```

## 🏗️ Construire pour la Production

1. **Créer la version de production** : `npm run build`
2. **Dossier créé** : `dist/` (contient tous les fichiers optimisés)
3. **Téléverser** le contenu du dossier `dist/` sur votre serveur web

## 🔧 Conseils et Bonnes Pratiques

### Sauvegarde
- **Toujours sauvegarder** avant de modifier
- **Utiliser Git** pour versionner vos modifications
- **Tester** les modifications en local avant de publier

### Modification Sécurisée
1. **Faire une copie** du fichier avant modification
2. **Modifier une chose à la fois**
3. **Vérifier** que le site fonctionne après chaque modification
4. **Garder le terminal ouvert** pour voir les erreurs

### Structure des Prix
```typescript
// Format standard pour les prix
price: "12,50"  // Toujours avec virgule et 2 décimales
```

### Images Optimisées
- **Taille recommandée** : 1200px de largeur maximum
- **Format** : JPG pour les photos, PNG pour les logos
- **Poids** : Moins de 500Ko par image

## 🆘 En Cas de Problème

### Erreurs Communes
1. **Site blanc** → Vérifier la console du navigateur (F12)
2. **Image non affichée** → Vérifier le chemin `/nom-image.jpg`
3. **Erreur de syntaxe** → Vérifier les guillemets et accolades

### Restaurer une Version
1. **Annuler les modifications** : Ctrl+Z dans l'éditeur
2. **Restaurer un fichier** : Copier depuis la sauvegarde
3. **Redémarrer le serveur** : Ctrl+C puis `npm run dev`

### Aide
- **Documentation React** : https://react.dev/
- **Documentation Tailwind CSS** : https://tailwindcss.com/
- **Communauté** : Stack Overflow, forums de développement

---

**💡 Astuce** : Commencez par de petites modifications (texte, prix) avant de vous attaquer aux éléments plus complexes (structure, animations).