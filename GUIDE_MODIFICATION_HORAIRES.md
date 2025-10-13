# Guide - Modifier les Horaires et Fermetures

## 🎯 Comment modifier les horaires

### Étape 1 : Accéder au CMS Admin

1. Allez sur `https://lepapio.fr/admin`
2. Connectez-vous avec Netlify Identity

### Étape 2 : Modifier les informations générales

Dans **⚙️ Paramètres** → **Informations générales**, vous pouvez modifier :

#### 1. Note de fermeture
- Champ : **Note de fermeture**
- Par défaut : "Nous consulter pour les fermetures hebdomadaires"
- Exemples :
  - "Fermé le mardi"
  - "Fermé le dimanche soir et lundi"
  - "Ouvert 7j/7"
  - "Congés annuels du 1er au 15 août"

#### 2. Résumé des horaires
- Champ : **Résumé des horaires**
- Par défaut : "12h-14h / 19h-22h"
- Format court des horaires
- Exemples :
  - "12h-14h / 19h-22h" (midi et soir)
  - "12h-14h" (midi seulement)
  - "19h-22h" (soir seulement)
  - "12h-23h" (service continu)

#### 3. Logo
- Champ : **URL du logo**
- Par défaut : "/bateau.png"

**Cliquez sur "Publier" après vos modifications**

### Étape 3 : Modifier les horaires détaillés

Dans **⚙️ Paramètres** → **Horaires d'ouverture**, vous pouvez :

1. **Pour chaque jour** (Lundi à Dimanche) :
   - Activer/désactiver le jour entier (**Ouvert**)
   - **Déjeuner** :
     - Activer/désactiver le service
     - Modifier les heures d'ouverture/fermeture
   - **Dîner** :
     - Activer/désactiver le service
     - Modifier les heures d'ouverture/fermeture

2. **Cliquez sur "Publier"** en haut

## 📍 Où s'affichent ces informations ?

### Sur la page d'accueil (Hero) - Carte "Horaires"

```
[Note de fermeture]
[Résumé des horaires]
```

**Exemple :**
```
Nous consulter pour les fermetures hebdomadaires
12h-14h / 19h-22h
```

### Dans la section Contact - Horaires détaillés

Les horaires complets jour par jour :
```
Lundi: 12:00-14:00 et 19:00-22:00
Mardi: Fermé
Mercredi: 12:00-14:00 et 19:00-22:00
...
```

## 🔄 Synchronisation automatique

Quand vous publiez des modifications :

1. **Sauvegarde** : Le CMS enregistre dans les fichiers YAML
2. **Commit Git** : Un commit est créé automatiquement
3. **Build Netlify** : Le site se reconstruit (2-3 minutes)
4. **Synchronisation Supabase** : Les données sont envoyées vers la base de données
5. **Mise à jour** : Les visiteurs voient les nouveaux horaires immédiatement

## ⚡ Temps réel - Pas de cache !

- Les horaires sont chargés depuis Supabase en temps réel
- Pas besoin de vider le cache du navigateur
- Les modifications apparaissent dès que le build Netlify est terminé
- Les utilisateurs voient toujours les horaires actuels

## 🛠️ Configuration actuelle

### Paramètres généraux
- **Note de fermeture** : "Nous consulter pour les fermetures hebdomadaires"
- **Résumé des horaires** : "12h-14h / 19h-22h"
- **Logo** : "/bateau.png"

### Horaires détaillés
- **Lundi** : Ouvert (12:00-14:00 et 19:00-22:00)
- **Mardi** : Fermé
- **Mercredi à Dimanche** : Ouvert (12:00-14:00 et 19:00-22:00)

## 🎨 Exemples de personnalisation

### Exemple 1 : Fermeture hebdomadaire fixe
**Note de fermeture** : "Fermé le mardi"
**Résumé des horaires** : "12h-14h / 19h-22h"

### Exemple 2 : Horaires d'été
**Note de fermeture** : "Ouvert 7j/7 en été"
**Résumé des horaires** : "12h-14h / 19h-23h"

### Exemple 3 : Service midi uniquement
**Note de fermeture** : "Fermé le soir en janvier"
**Résumé des horaires** : "12h-14h"

### Exemple 4 : Congés annuels
**Note de fermeture** : "Congés du 1er au 20 août"
**Résumé des horaires** : "Réouverture le 21 août"

### Exemple 5 : Service continu
**Note de fermeture** : "Ouvert en continu"
**Résumé des horaires** : "12h-22h non-stop"

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
Edge Function Supabase (sync-settings)
    ↓ écrit dans
Base de données Supabase (table settings)
    ├── closure_note
    ├── hours_summary
    ├── opening_hours
    └── logo_url
    ↓ lu par
Site Web React (useSettings hook)
    ↓ affiche aux
Visiteurs (temps réel, pas de cache)
```

## ❓ Aide et dépannage

**Les modifications n'apparaissent pas ?**
1. Vérifiez que vous avez cliqué sur "Publier"
2. Attendez 2-3 minutes (temps de build Netlify)
3. Consultez les logs de build sur Netlify
4. Ouvrez la console (F12) et vérifiez les erreurs
5. En dernier recours : Ctrl+Shift+R pour forcer le rechargement

**Comment vérifier les données dans Supabase ?**
- Ouvrez votre projet Supabase
- Allez dans "Table Editor"
- Sélectionnez la table "settings"
- Vous devriez voir 4 lignes :
  - `closure_note`
  - `hours_summary`
  - `opening_hours`
  - `logo_url`

**Besoin d'aide ?**
- Consultez les logs de build sur Netlify
- Vérifiez que l'Edge Function `sync-settings` fonctionne
- Vérifiez les variables d'environnement dans Netlify
