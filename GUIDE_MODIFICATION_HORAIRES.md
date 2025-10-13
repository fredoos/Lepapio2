# Guide - Modifier les Horaires et Fermetures

## 🎯 Comment modifier les horaires

### Étape 1 : Accéder au CMS Admin

1. Allez sur `https://lepapio.fr/admin`
2. Connectez-vous avec Netlify Identity

### Étape 2 : Modifier les horaires d'ouverture

1. Cliquez sur **⚙️ Paramètres**
2. Cliquez sur **Horaires d'ouverture**
3. Pour chaque jour, vous pouvez :
   - **Activer/désactiver le jour entier** (Ouvert)
   - **Modifier les horaires du déjeuner** (Service déjeuner, Ouverture, Fermeture)
   - **Modifier les horaires du dîner** (Service dîner, Ouverture, Fermeture)
4. Cliquez sur **Publier** en haut

### Étape 3 : Modifier le texte de fermeture

1. Cliquez sur **⚙️ Paramètres**
2. Cliquez sur **Informations générales**
3. Modifiez le champ **Note de fermeture**
   - Par défaut : "Nous consulter pour les fermetures hebdomadaires"
   - Exemples d'alternatives :
     - "Fermé le mardi"
     - "Fermé le dimanche soir et lundi"
     - "Ouvert 7j/7"
4. Cliquez sur **Publier** en haut

## 📍 Où s'affichent ces informations ?

### Sur la page d'accueil (Hero)

Le texte affiché dans la carte "Horaires" :
```
[Note de fermeture]
12h-14h / 19h-22h
```

### Dans la section Contact

Les horaires détaillés jour par jour :
```
Lundi: 12:00-14:00 et 19:00-22:00
Mardi: Fermé
...
```

## 🔄 Synchronisation automatique

Quand vous publiez des modifications dans le CMS :

1. **Sauvegarde** : Le CMS enregistre dans les fichiers YAML
2. **Commit Git** : Un commit est créé automatiquement
3. **Build Netlify** : Le site se reconstruit (2-3 minutes)
4. **Synchronisation Supabase** : Les données sont envoyées vers la base de données
5. **Mise à jour** : Les visiteurs voient les nouveaux horaires immédiatement

## ⚡ Pas de cache !

Les horaires sont chargés depuis Supabase en temps réel :
- Pas besoin de vider le cache du navigateur
- Les modifications apparaissent dès que le build Netlify est terminé
- Les utilisateurs voient toujours les horaires actuels

## 🛠️ Configuration actuelle

### Horaires par défaut
- **Lundi** : Ouvert (12:00-14:00 et 19:00-22:00)
- **Mardi** : Fermé
- **Mercredi à Dimanche** : Ouvert (12:00-14:00 et 19:00-22:00)

### Texte de fermeture
- "Nous consulter pour les fermetures hebdomadaires"

## 🎨 Personnalisation avancée

### Modifier le logo

Dans **Informations générales** :
- Champ **URL du logo**
- Par défaut : `/bateau.png`
- Changez le chemin vers une autre image

### Exemples de notes de fermeture

**Fermetures hebdomadaires fixes :**
- "Fermé le mardi"
- "Fermé le dimanche et lundi"
- "Fermé le lundi midi"

**Fermetures exceptionnelles :**
- "Fermé du 24 au 26 décembre"
- "Congés annuels du 1er au 15 août"
- "Fermé pour travaux jusqu'au 15 mars"

**Messages positifs :**
- "Ouvert 7j/7"
- "Toujours ouvert midi et soir"
- "Nous consulter pour les horaires d'été"

## 📊 Architecture technique

```
CMS Admin (/admin)
    ↓ modifie
Fichiers YAML (general.yml, opening-hours.yml)
    ↓ commit git
Netlify Build
    ↓ exécute
Script de synchronisation
    ↓ appelle
Edge Function Supabase
    ↓ écrit dans
Base de données Supabase (table settings)
    ↓ lu par
Site Web React (useSettings hook)
    ↓ affiche aux
Visiteurs (pas de cache)
```

## ❓ Aide et dépannage

**Les modifications n'apparaissent pas ?**
1. Vérifiez que vous avez cliqué sur "Publier"
2. Attendez 2-3 minutes (temps de build Netlify)
3. Consultez les logs de build sur Netlify
4. En dernier recours : Ctrl+Shift+R pour forcer le rechargement

**Comment vérifier que ça fonctionne ?**
- Ouvrez la console développeur (F12)
- Vérifiez qu'il n'y a pas d'erreurs rouges
- Les données devraient se charger depuis Supabase

**Besoin d'aide ?**
- Consultez les logs de build sur Netlify
- Vérifiez que l'Edge Function `sync-settings` fonctionne sur Supabase
