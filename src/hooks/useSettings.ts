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
    logo_url: '/bateau.png',
    closure_note: 'Nous consulter pour les fermetures hebdomadaires',
    hours_summary: '12h-14h / 19h-22h'
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSettings();

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

  const fetchSettings = async () => {
    try {
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
          logo_url: null,
          closure_note: null,
          hours_summary: null
        };

        data.forEach((item) => {
          if (item.key === 'opening_hours') {
            settingsObj.opening_hours = item.value as WeekSchedule;
          } else if (item.key === 'logo_url') {
            settingsObj.logo_url = typeof item.value === 'string' ? item.value : '/bateau.png';
          } else if (item.key === 'closure_note') {
            settingsObj.closure_note = typeof item.value === 'string' ? item.value : 'Nous consulter pour les fermetures hebdomadaires';
          } else if (item.key === 'hours_summary') {
            settingsObj.hours_summary = typeof item.value === 'string' ? item.value : '12h-14h / 19h-22h';
          }
        });

        setSettings({
          opening_hours: settingsObj.opening_hours || defaultSchedule,
          logo_url: settingsObj.logo_url || '/bateau.png',
          closure_note: settingsObj.closure_note || 'Nous consulter pour les fermetures hebdomadaires',
          hours_summary: settingsObj.hours_summary || '12h-14h / 19h-22h'
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
