# Guide - Modifier les Horaires (CMS Netlify uniquement)

## 🎯 Comment modifier les horaires

### Étape 1 : Accéder au CMS Admin

1. Allez sur `https://lepapio.fr/admin`
2. Connectez-vous avec Netlify Identity

### Étape 2 : Modifier les informations générales

Dans **⚙️ Paramètres** → **Informations générales** :

#### 1. Note de fermeture
- **Champ** : Note de fermeture
- **Par défaut** : "Nous consulter pour les fermetures hebdomadaires"
- **Exemples** :
  - "Fermé le mardi"
  - "Fermé le dimanche soir et lundi"
  - "Ouvert 7j/7"
  - "Congés annuels du 1er au 15 août"

#### 2. Résumé des horaires
- **Champ** : Résumé des horaires
- **Par défaut** : "12h-14h / 19h-22h"
- **Format court** affiché sur la page d'accueil

**Cliquez sur "Publier" en haut à droite**

### Étape 3 : Modifier les horaires détaillés

Dans **⚙️ Paramètres** → **Horaires d'ouverture** :

Pour chaque jour : cochez "Ouvert", activez les services déjeuner/dîner, modifiez les heures.

**Cliquez sur "Publier" en haut à droite**

## 📍 Affichage

**Page d'accueil** : Note + Résumé
**Section Contact** : Horaires détaillés jour par jour

## 🔄 Workflow

CMS → GitHub (commit auto) → Netlify Build (2-3 min) → Site mis à jour

## ⚡ Pas de cache configuré

Les visiteurs voient toujours la dernière version (pas de base de données, fichiers YAML chargés directement).
