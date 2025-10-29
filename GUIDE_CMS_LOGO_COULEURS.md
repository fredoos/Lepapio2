# Guide : Modifier le logo et les couleurs via le CMS

## Accéder au CMS

1. Ouvrez votre navigateur et allez sur : `votre-site.com/admin/`
2. Connectez-vous avec vos identifiants Netlify

## Modifier le logo

1. Dans le menu de gauche, cliquez sur **"⚙️ Paramètres"**
2. Cliquez sur **"Informations générales"**
3. Dans le champ **"URL du logo"**, vous pouvez :
   - Cliquer sur **"Choose an image"** pour télécharger une nouvelle image
   - OU entrer manuellement le chemin d'une image existante (ex: `/bateau.png`)
4. Cliquez sur **"Ajout rapide"** (bouton en haut à droite)
5. Le logo sera utilisé dans l'en-tête du site

## Modifier les couleurs du site

1. Dans **"Informations générales"**, vous trouverez deux nouveaux champs :
   - **"Couleur principale"** : La couleur principale utilisée pour les boutons et éléments actifs
   - **"Couleur secondaire"** : La couleur utilisée pour les survols et accents

2. Entrez un code couleur au format hexadécimal (ex: `#3B82F6` pour du bleu)

   **Exemples de codes couleur :**
   - Bleu : `#3B82F6`
   - Rouge : `#EF4444`
   - Vert : `#10B981`
   - Orange : `#F59E0B`
   - Violet : `#8B5CF6`

3. Cliquez sur **"Ajout rapide"** pour enregistrer

## Modifier l'ordre des plats

1. Dans le menu de gauche, sélectionnez la section du menu que vous voulez modifier (ex: **"Menu - Entrées"**)
2. Cliquez sur le plat que vous voulez réorganiser
3. Modifiez le champ **"Ordre d'affichage"** :
   - Les plats avec un numéro plus petit apparaîtront en premier
   - Ex: ordre 1 apparaît avant ordre 2
4. Cliquez sur **"Ajout rapide"** pour enregistrer

## Modifier les prix

1. Sélectionnez la catégorie du menu concernée
2. Cliquez sur le plat à modifier
3. Modifiez le champ **"Prix"**
   - Format requis : `12,50` (avec une virgule)
4. Cliquez sur **"Ajout rapide"** pour enregistrer

## Notes importantes

- Les modifications sont enregistrées immédiatement dans le CMS
- Pour que les changements apparaissent sur le site, il faut que Netlify redéploie le site (automatique après quelques minutes)
- Le champ "Ordre d'affichage" accepte les nombres entiers (1, 2, 3, etc.)
- Tous les prix doivent être au format `XX,XX` avec une virgule

## Conseil pour l'ordre des plats

Pour réorganiser facilement vos plats :
1. Listez tous vos plats dans l'ordre souhaité
2. Attribuez-leur des numéros : 1, 2, 3, 4, etc.
3. Modifiez chaque plat dans le CMS avec son nouveau numéro d'ordre
4. Après quelques minutes, l'ordre sera mis à jour sur le site
