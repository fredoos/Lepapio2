import { useState, useEffect } from 'react';
import { Settings, WeekSchedule } from '../types/settings';

const defaultSchedule: WeekSchedule = {
  monday: {
    enabled: true,
    lunch: { enabled: true, start: '12:00', end: '14:00' },
    dinner: { enabled: true, start: '19:00', end: '22:00' }
  },
  tuesday: {
    enabled: false,
    lunch: { enabled: false, start: '12:00', end: '14:00' },
    dinner: { enabled: false, start: '19:00', end: '22:00' }
  },
  wednesday: {
    enabled: true,
    lunch: { enabled: true, start: '12:00', end: '14:00' },
    dinner: { enabled: true, start: '19:00', end: '22:00' }
  },
  thursday: {
    enabled: true,
    lunch: { enabled: true, start: '12:00', end: '14:00' },
    dinner: { enabled: true, start: '19:00', end: '22:00' }
  },
  friday: {
    enabled: true,
    lunch: { enabled: true, start: '12:00', end: '14:00' },
    dinner: { enabled: true, start: '19:00', end: '22:00' }
  },
  saturday: {
    enabled: true,
    lunch: { enabled: true, start: '12:00', end: '14:00' },
    dinner: { enabled: true, start: '19:00', end: '22:00' }
  },
  sunday: {
    enabled: true,
    lunch: { enabled: true, start: '12:00', end: '14:00' },
    dinner: { enabled: true, start: '19:00', end: '22:00' }
  }
};

export const useSettings = () => {
  const [settings, setSettings] = useState<Settings>({
    opening_hours: defaultSchedule,
    logo_url: '/bateau.png'
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setLoading(true);

      // Load opening hours
      const hoursResponse = await fetch(`/src/content/settings/opening-hours.yml?t=${Date.now()}`);
      if (hoursResponse.ok) {
        const text = await hoursResponse.text();
        const lines = text.split('\n');
        const schedule: WeekSchedule = {} as WeekSchedule;

        let currentDay = '';
        let currentService = '';

        lines.forEach(line => {
          const dayMatch = line.match(/^(monday|tuesday|wednesday|thursday|friday|saturday|sunday):/);
          if (dayMatch) {
            currentDay = dayMatch[1];
            schedule[currentDay as keyof WeekSchedule] = {
              enabled: false,
              lunch: { enabled: false, start: '12:00', end: '14:00' },
              dinner: { enabled: false, start: '19:00', end: '22:00' }
            };
          }

          if (currentDay) {
            if (line.includes('enabled: true') && !line.includes('Service')) {
              schedule[currentDay as keyof WeekSchedule].enabled = true;
            }

            if (line.includes('lunch:')) currentService = 'lunch';
            if (line.includes('dinner:')) currentService = 'dinner';

            if (currentService && line.includes('enabled: true')) {
              schedule[currentDay as keyof WeekSchedule][currentService as 'lunch' | 'dinner'].enabled = true;
            }

            const startMatch = line.match(/start: "([^"]+)"/);
            if (startMatch && currentService) {
              schedule[currentDay as keyof WeekSchedule][currentService as 'lunch' | 'dinner'].start = startMatch[1];
            }

            const endMatch = line.match(/end: "([^"]+)"/);
            if (endMatch && currentService) {
              schedule[currentDay as keyof WeekSchedule][currentService as 'lunch' | 'dinner'].end = endMatch[1];
            }
          }
        });

        setSettings(prev => ({
          ...prev,
          opening_hours: schedule
        }));
      }

      // Load general settings
      const generalResponse = await fetch(`/src/content/settings/general.yml?t=${Date.now()}`);
      if (generalResponse.ok) {
        const text = await generalResponse.text();
        const lines = text.split('\n');
        let logoUrl = '/bateau.png';
        let restaurantName = 'Le Papio';

        lines.forEach(line => {
          const logoMatch = line.match(/^logo_url:\s*["']?([^"'\n]+)["']?/);
          if (logoMatch) {
            logoUrl = logoMatch[1].trim();
          }
          const nameMatch = line.match(/^restaurant_name:\s*["']?([^"'\n]+)["']?/);
          if (nameMatch) {
            restaurantName = nameMatch[1].trim();
          }
        });

        setSettings(prev => ({
          ...prev,
          logo_url: logoUrl,
          restaurant_name: restaurantName
        }));
      }

      setLoading(false);
    } catch (error) {
      console.error('Could not load settings from YAML:', error);
      setError(error instanceof Error ? error.message : 'Unknown error');
      setLoading(false);
    }
  };

  return { settings, loading, error, refetch: loadSettings };
};
