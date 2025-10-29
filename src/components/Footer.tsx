import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useSettings } from '../hooks/useSettings';

const Footer = () => {
  const { t } = useLanguage();
  const { settings } = useSettings();

  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <div className="mb-4 space-x-4">
          <button
            onClick={() => window.open('/mentions_legales_lepapio.html', '_blank')}
            className="text-gray-300 hover:text-white underline text-sm transition-colors"
          >
            {t('footer.legal_mentions')}
          </button>
          <span className="text-gray-600">|</span>
          <a
            href="/admin-menu.html"
            className="text-gray-300 hover:text-white underline text-sm transition-colors"
          >
            🔐 Admin Menu
          </a>
        </div>
        <p className="text-sm text-gray-400">
          &copy; 2025 {settings.restaurant_name} - Restaurant Pizzeria Cherbourg-en-Cotentin
        </p>
      </div>
    </footer>
  );
};

export default Footer;