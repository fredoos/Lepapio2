/*
  # Mise à jour de la structure des horaires d'ouverture

  1. Modifications
    - Supprime l'ancien format des horaires
    - Insère une nouvelle structure avec horaires détaillés par jour de la semaine
    - Chaque jour a ses propres horaires pour le midi et le soir
    - Possibilité d'activer/désactiver chaque service (midi/soir) par jour
  
  2. Structure des données
    - Format JSON avec clés par jour (monday, tuesday, etc.)
    - Chaque jour contient:
      - enabled: boolean (jour ouvert ou fermé)
      - lunch: { enabled: boolean, start: "HH:MM", end: "HH:MM" }
      - dinner: { enabled: boolean, start: "HH:MM", end: "HH:MM" }
  
  3. Données par défaut
    - Tous les jours ouverts
    - Midi: 12:00 - 14:00
    - Soir: 19:00 - 22:00
*/

-- Insérer la nouvelle structure des horaires
INSERT INTO settings (key, value) VALUES
  ('opening_hours', '{
    "monday": {
      "enabled": true,
      "lunch": {"enabled": true, "start": "12:00", "end": "14:00"},
      "dinner": {"enabled": true, "start": "19:00", "end": "22:00"}
    },
    "tuesday": {
      "enabled": true,
      "lunch": {"enabled": true, "start": "12:00", "end": "14:00"},
      "dinner": {"enabled": true, "start": "19:00", "end": "22:00"}
    },
    "wednesday": {
      "enabled": true,
      "lunch": {"enabled": true, "start": "12:00", "end": "14:00"},
      "dinner": {"enabled": true, "start": "19:00", "end": "22:00"}
    },
    "thursday": {
      "enabled": true,
      "lunch": {"enabled": true, "start": "12:00", "end": "14:00"},
      "dinner": {"enabled": true, "start": "19:00", "end": "22:00"}
    },
    "friday": {
      "enabled": true,
      "lunch": {"enabled": true, "start": "12:00", "end": "14:00"},
      "dinner": {"enabled": true, "start": "19:00", "end": "22:00"}
    },
    "saturday": {
      "enabled": true,
      "lunch": {"enabled": true, "start": "12:00", "end": "14:00"},
      "dinner": {"enabled": true, "start": "19:00", "end": "22:00"}
    },
    "sunday": {
      "enabled": true,
      "lunch": {"enabled": true, "start": "12:00", "end": "14:00"},
      "dinner": {"enabled": true, "start": "19:00", "end": "22:00"}
    }
  }'::jsonb)
ON CONFLICT (key) DO UPDATE 
SET value = EXCLUDED.value;