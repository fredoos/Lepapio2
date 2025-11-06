import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useSettings } from '../hooks/useSettings';

const Footer = () => {
  const { t } = useLanguage();
  const { settings } = useSettings();

  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Navigation */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.navigation') || 'Navigation'}</h3>
            <nav className="space-y-2">
              <a href="#accueil" className="block text-gray-300 hover:text-white transition-colors">
                {t('nav.home')}
              </a>
              <a href="#carte" className="block text-gray-300 hover:text-white transition-colors">
                {t('nav.menu')}
              </a>
              <a href="#photos" className="block text-gray-300 hover:text-white transition-colors">
                {t('nav.gallery')}
              </a>
              <a href="#actualites" className="block text-gray-300 hover:text-white transition-colors">
                {t('nav.news')}
              </a>
              <a href="#contact" className="block text-gray-300 hover:text-white transition-colors">
                {t('nav.contact')}
              </a>
            </nav>
          </div>

          {/* Coordonnées */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.contact') || 'Contact'}</h3>
            <address className="not-italic space-y-2 text-gray-300">
              <p>24 quai de Caligny</p>
              <p>50100 Cherbourg-en-Cotentin</p>
              <p>
                <a href="tel:0233921845" className="hover:text-white transition-colors">
                  02 33 92 18 45
                </a>
              </p>
              <p>
                <a href="mailto:restaurantlepapio@gmail.com" className="hover:text-white transition-colors">
                  restaurantlepapio@gmail.com
                </a>
              </p>
            </address>
          </div>

          {/* Horaires */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.hours') || 'Horaires'}</h3>
            <p className="text-gray-300">
              {settings.hours_summary || '12h-14h / 19h-22h'}
            </p>
            <p className="text-gray-400 text-sm mt-2">
              {settings.closure_note || 'Fermé le mardi'}
            </p>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-6 text-center">
          <div className="mb-4">
            <button
              onClick={() => window.open('/mentions_legales_lepapio.html', '_blank')}
              className="text-gray-300 hover:text-white underline text-sm transition-colors"
            >
              {t('footer.legal_mentions')}
            </button>
          </div>
          <p className="text-sm text-gray-400">
            &copy; 2025 {settings.restaurant_name} - Restaurant Pizzeria Cherbourg-en-Cotentin
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;