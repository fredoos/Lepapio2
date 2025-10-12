# Configuration Netlify pour Le Papio

## Variables d'environnement requises

Pour que le site fonctionne correctement sur Netlify, vous devez configurer les variables d'environnement suivantes :

### Dans Netlify Dashboard

1. Allez sur votre site dans Netlify
2. Cliquez sur **Site settings** > **Environment variables**
3. Ajoutez les variables suivantes :

```
VITE_SUPABASE_URL=https://fpsrmqcbruojllmctjzm.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZwc3JtcWNicnVvamxsbWN0anptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAyNzI5NjIsImV4cCI6MjA3NTg0ODk2Mn0.xGD7L2lU1e6y_m1fkUl_77FUAmHCk7beQ3aijNfY8hk
```

### Ou via fichier netlify.toml

Vous pouvez aussi créer un fichier `netlify.toml` à la racine du projet avec :

```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  VITE_SUPABASE_URL = "https://fpsrmqcbruojllmctjzm.supabase.co"
  VITE_SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZwc3JtcWNicnVvamxsbWN0anptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAyNzI5NjIsImV4cCI6MjA3NTg0ODk2Mn0.xGD7L2lU1e6y_m1fkUl_77FUAmHCk7beQ3aijNfY8hk"
```

## Après configuration

1. Sauvegardez les variables
2. Déclenchez un nouveau déploiement (Deploys > Trigger deploy)
3. Le site devrait maintenant charger correctement

## Mode dégradé

Si les variables ne sont pas configurées, le site fonctionnera en mode dégradé avec des horaires par défaut affichés.
