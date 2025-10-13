import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.warn('⚠️ Variables Supabase manquantes - skip sync (normal sur Netlify)');
  process.exit(0);
}

async function syncSettings() {
  try {
    const hoursFilePath = path.join(__dirname, '../src/content/settings/opening-hours.yml');
    const hoursContent = fs.readFileSync(hoursFilePath, 'utf-8');

    const lines = hoursContent.split('\n');
    const schedule = {};

    let currentDay = '';
    let currentService = '';

    lines.forEach(line => {
      const dayMatch = line.match(/^(monday|tuesday|wednesday|thursday|friday|saturday|sunday):/);
      if (dayMatch) {
        currentDay = dayMatch[1];
        schedule[currentDay] = {
          enabled: false,
          lunch: { enabled: false, start: '12:00', end: '14:00' },
          dinner: { enabled: false, start: '19:00', end: '22:00' }
        };
      }

      if (currentDay) {
        if (line.includes('enabled: true') && !line.includes('Service')) {
          schedule[currentDay].enabled = true;
        }

        if (line.includes('lunch:')) currentService = 'lunch';
        if (line.includes('dinner:')) currentService = 'dinner';

        if (currentService && line.includes('enabled: true')) {
          schedule[currentDay][currentService].enabled = true;
        }

        const startMatch = line.match(/start: "([^"]+)"/);
        if (startMatch && currentService) {
          schedule[currentDay][currentService].start = startMatch[1];
        }

        const endMatch = line.match(/end: "([^"]+)"/);
        if (endMatch && currentService) {
          schedule[currentDay][currentService].end = endMatch[1];
        }
      }
    });

    const generalFilePath = path.join(__dirname, '../src/content/settings/general.yml');
    const generalContent = fs.readFileSync(generalFilePath, 'utf-8');
    const generalLines = generalContent.split('\n');

    let logoUrl = '/bateau.png';
    let closureNote = 'Nous consulter pour les fermetures hebdomadaires';
    let hoursSummary = '12h-14h / 19h-22h';

    generalLines.forEach(line => {
      const logoMatch = line.match(/^logo_url:\s*["']?([^"'\n]+)["']?/);
      if (logoMatch) {
        logoUrl = logoMatch[1].trim();
      }
      const closureMatch = line.match(/^closure_note:\s*["']?([^"'\n]+)["']?/);
      if (closureMatch) {
        closureNote = closureMatch[1].trim();
      }
      const hoursMatch = line.match(/^hours_summary:\s*["']?([^"'\n]+)["']?/);
      if (hoursMatch) {
        hoursSummary = hoursMatch[1].trim();
      }
    });

    const response = await fetch(`${supabaseUrl}/functions/v1/sync-settings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${supabaseKey}`
      },
      body: JSON.stringify({
        settings: {
          opening_hours: schedule,
          logo_url: logoUrl,
          closure_note: closureNote,
          hours_summary: hoursSummary
        }
      })
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('❌ Erreur lors de la synchronisation:', error);
      return false;
    }

    const result = await response.json();
    console.log('✅ Paramètres synchronisés vers Supabase:', result);
    return true;
  } catch (error) {
    console.error('❌ Erreur:', error);
    return false;
  }
}

syncSettings();
