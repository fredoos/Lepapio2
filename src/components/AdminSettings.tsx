import React, { useState, useEffect } from 'react';
import { Save, RefreshCw } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useSettings } from '../hooks/useSettings';
import { WeekSchedule, DaySchedule } from '../types/settings';

type DayKey = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

const dayLabels: Record<DayKey, string> = {
  monday: 'Lundi',
  tuesday: 'Mardi',
  wednesday: 'Mercredi',
  thursday: 'Jeudi',
  friday: 'Vendredi',
  saturday: 'Samedi',
  sunday: 'Dimanche'
};

const AdminSettings = () => {
  const { settings, loading, refetch } = useSettings();
  const [schedule, setSchedule] = useState<WeekSchedule>(settings.opening_hours);
  const [logoUrl, setLogoUrl] = useState(settings.logo_url || '/bateau.png');
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (settings.opening_hours) {
      setSchedule(settings.opening_hours);
    }
    if (settings.logo_url) {
      setLogoUrl(settings.logo_url);
    }
  }, [settings]);

  const updateDayEnabled = (day: DayKey, enabled: boolean) => {
    if (!schedule) return;
    setSchedule({
      ...schedule,
      [day]: { ...schedule[day], enabled }
    });
  };

  const updateServiceEnabled = (day: DayKey, service: 'lunch' | 'dinner', enabled: boolean) => {
    if (!schedule) return;
    setSchedule({
      ...schedule,
      [day]: {
        ...schedule[day],
        [service]: { ...schedule[day][service], enabled }
      }
    });
  };

  const updateServiceTime = (day: DayKey, service: 'lunch' | 'dinner', field: 'start' | 'end', value: string) => {
    if (!schedule) return;
    setSchedule({
      ...schedule,
      [day]: {
        ...schedule[day],
        [service]: { ...schedule[day][service], [field]: value }
      }
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    setMessage('');

    try {
      const { error: hoursError } = await supabase
        .from('settings')
        .update({ value: schedule })
        .eq('key', 'opening_hours');

      if (hoursError) throw hoursError;

      const { error: logoError } = await supabase
        .from('settings')
        .update({ value: logoUrl })
        .eq('key', 'logo_url');

      if (logoError) throw logoError;

      setMessage('Paramètres enregistrés avec succès!');
      setTimeout(() => setMessage(''), 3000);
      refetch();
    } catch (error) {
      console.error('Error saving settings:', error);
      setMessage('Erreur lors de l\'enregistrement');
    } finally {
      setIsSaving(false);
    }
  };

  if (loading || !schedule) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-papio-600" />
          <p className="text-gray-600">Chargement des paramètres...</p>
        </div>
      </div>
    );
  }

  const days: DayKey[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Administration du Restaurant</h1>

        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 pb-4 border-b">Paramètres Restaurant</h2>

            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Logo du bateau</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">URL de l'image</label>
                  <input
                    type="text"
                    value={logoUrl}
                    onChange={(e) => setLogoUrl(e.target.value)}
                    placeholder="/bateau.png"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-papio-500 focus:border-transparent"
                  />
                </div>

                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">Aperçu:</span>
                  <img
                    src={logoUrl}
                    alt="Logo preview"
                    className="w-16 h-12 object-contain border border-gray-200 rounded"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/bateau.png';
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 pb-4 border-b">Horaires d'ouverture</h2>

            <div className="space-y-6">
              {days.map((day) => (
                <div key={day} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <div className="flex items-center mb-4">
                    <input
                      type="checkbox"
                      id={`day-${day}`}
                      checked={schedule[day].enabled}
                      onChange={(e) => updateDayEnabled(day, e.target.checked)}
                      className="w-5 h-5 text-papio-600 rounded focus:ring-papio-500"
                    />
                    <label htmlFor={`day-${day}`} className="ml-3 text-lg font-semibold text-gray-800">
                      {dayLabels[day]}
                    </label>
                  </div>

                  {schedule[day].enabled && (
                    <div className="grid md:grid-cols-2 gap-6 ml-8">
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id={`${day}-lunch`}
                            checked={schedule[day].lunch.enabled}
                            onChange={(e) => updateServiceEnabled(day, 'lunch', e.target.checked)}
                            className="w-4 h-4 text-papio-600 rounded focus:ring-papio-500"
                          />
                          <label htmlFor={`${day}-lunch`} className="ml-2 font-medium text-gray-700">
                            Service du midi
                          </label>
                        </div>

                        {schedule[day].lunch.enabled && (
                          <div className="flex items-center space-x-3 ml-6">
                            <div>
                              <label className="block text-xs text-gray-600 mb-1">Ouverture</label>
                              <input
                                type="time"
                                value={schedule[day].lunch.start}
                                onChange={(e) => updateServiceTime(day, 'lunch', 'start', e.target.value)}
                                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-papio-500 focus:border-transparent text-sm"
                              />
                            </div>
                            <div>
                              <label className="block text-xs text-gray-600 mb-1">Fermeture</label>
                              <input
                                type="time"
                                value={schedule[day].lunch.end}
                                onChange={(e) => updateServiceTime(day, 'lunch', 'end', e.target.value)}
                                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-papio-500 focus:border-transparent text-sm"
                              />
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id={`${day}-dinner`}
                            checked={schedule[day].dinner.enabled}
                            onChange={(e) => updateServiceEnabled(day, 'dinner', e.target.checked)}
                            className="w-4 h-4 text-papio-600 rounded focus:ring-papio-500"
                          />
                          <label htmlFor={`${day}-dinner`} className="ml-2 font-medium text-gray-700">
                            Service du soir
                          </label>
                        </div>

                        {schedule[day].dinner.enabled && (
                          <div className="flex items-center space-x-3 ml-6">
                            <div>
                              <label className="block text-xs text-gray-600 mb-1">Ouverture</label>
                              <input
                                type="time"
                                value={schedule[day].dinner.start}
                                onChange={(e) => updateServiceTime(day, 'dinner', 'start', e.target.value)}
                                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-papio-500 focus:border-transparent text-sm"
                              />
                            </div>
                            <div>
                              <label className="block text-xs text-gray-600 mb-1">Fermeture</label>
                              <input
                                type="time"
                                value={schedule[day].dinner.end}
                                onChange={(e) => updateServiceTime(day, 'dinner', 'end', e.target.value)}
                                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-papio-500 focus:border-transparent text-sm"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>


          <div className="flex items-center justify-between pt-6 border-t">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center space-x-2 bg-papio-500 hover:bg-papio-600 text-white px-8 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  <span>Enregistrement...</span>
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  <span>Enregistrer</span>
                </>
              )}
            </button>

            {message && (
              <span className={`text-sm font-medium ${message.includes('Erreur') ? 'text-red-600' : 'text-green-600'}`}>
                {message}
              </span>
            )}
          </div>
        </div>

        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> Les modifications seront visibles immédiatement sur le site.
            Décochez un jour pour le fermer complètement. Décochez un service (midi/soir) pour le désactiver.
          </p>
        </div>

        <div className="mt-4 text-center">
          <a
            href="/"
            className="text-papio-600 hover:text-papio-700 font-medium transition-colors"
          >
            ← Retour au site
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
