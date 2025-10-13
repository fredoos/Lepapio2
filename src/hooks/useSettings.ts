import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
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
    loadOpeningHours();
    fetchSettings();

    // Only subscribe to changes if Supabase is configured
    if (import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY) {
      const channel = supabase
        .channel('settings-changes')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'settings'
          },
          () => {
            fetchSettings();
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, []);

  const loadOpeningHours = async () => {
    try {
      const response = await fetch('/src/content/settings/opening-hours.yml?raw');
      if (response.ok) {
        const text = await response.text();
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
    } catch (error) {
      console.warn('Could not load opening hours from YAML:', error);
    }
  };

  const fetchSettings = async () => {
    try {
      // Check if Supabase is configured
      if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
        console.warn('Supabase not configured, using default settings');
        setLoading(false);
        return;
      }

      const { data, error: fetchError } = await supabase
        .from('settings')
        .select('key, value')
        .returns<Array<{ key: string; value: any }>>();

      if (fetchError) {
        console.error('Error fetching settings:', fetchError);
        setError(fetchError.message);
        setLoading(false);
        return;
      }

      if (data && data.length > 0) {
        const settingsObj: Settings = {
          opening_hours: null,
          logo_url: null
        };

        data.forEach((item) => {
          if (item.key === 'opening_hours') {
            settingsObj.opening_hours = item.value as WeekSchedule;
          } else if (item.key === 'logo_url') {
            settingsObj.logo_url = typeof item.value === 'string' ? item.value : '/bateau.png';
          }
        });

        setSettings({
          opening_hours: settingsObj.opening_hours || defaultSchedule,
          logo_url: settingsObj.logo_url || '/bateau.png'
        });
      }

      setLoading(false);
    } catch (err) {
      console.error('Error in fetchSettings:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
      setLoading(false);
    }
  };

  return { settings, loading, error, refetch: fetchSettings };
};
