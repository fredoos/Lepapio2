import React, { useState, useEffect } from 'react';
import { Sun } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useSettings } from '../hooks/useSettings';
import LanguageSelector from './LanguageSelector';

interface HeaderProps {
  activeSection: string;
}

const Header = ({ activeSection }: HeaderProps) => {
  const { t } = useLanguage();
  const { settings } = useSettings();
  const [currentTime, setCurrentTime] = useState('20h42');
  const [temperature, setTemperature] = useState('20°');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [nextOpenTime, setNextOpenTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours}h${minutes}`);

      if (!settings.opening_hours) return;

      const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
      const currentDay = dayNames[now.getDay()] as keyof typeof settings.opening_hours;
      const todaySchedule = settings.opening_hours[currentDay];

      if (!todaySchedule || !todaySchedule.enabled) {
        setIsOpen(false);
        setNextOpenTime('Fermé aujourd\'hui');
        return;
      }

      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();
      const currentTimeInMinutes = currentHour * 60 + currentMinute;

      const parseTime = (time: string) => {
        const [h, m] = time.split(':').map(Number);
        return h * 60 + m;
      };

      let isCurrentlyOpen = false;
      let nextOpen = '';

      if (todaySchedule.lunch.enabled) {
        const lunchStart = parseTime(todaySchedule.lunch.start);
        const lunchEnd = parseTime(todaySchedule.lunch.end);

        if (currentTimeInMinutes >= lunchStart && currentTimeInMinutes < lunchEnd) {
          isCurrentlyOpen = true;
        } else if (currentTimeInMinutes < lunchStart && !nextOpen) {
          nextOpen = `Ouvre à ${todaySchedule.lunch.start}`;
        }
      }

      if (todaySchedule.dinner.enabled) {
        const dinnerStart = parseTime(todaySchedule.dinner.start);
        const dinnerEnd = parseTime(todaySchedule.dinner.end);

        if (currentTimeInMinutes >= dinnerStart && currentTimeInMinutes < dinnerEnd) {
          isCurrentlyOpen = true;
        } else if (!isCurrentlyOpen && !nextOpen) {
          if (currentTimeInMinutes < dinnerStart) {
            nextOpen = `Ouvre à ${todaySchedule.dinner.start}`;
          }
        } else if (!isCurrentlyOpen && todaySchedule.lunch.enabled && currentTimeInMinutes >= parseTime(todaySchedule.lunch.end) && currentTimeInMinutes < dinnerStart) {
          nextOpen = `Ouvre à ${todaySchedule.dinner.start}`;
        }
      }

      if (!isCurrentlyOpen && !nextOpen) {
        nextOpen = 'Fermé pour aujourd\'hui';
      }

      setIsOpen(isCurrentlyOpen);
      setNextOpenTime(nextOpen);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, [settings.opening_hours]);

  const navItems = [
    { id: 'accueil', label: t('nav.home') },
    { id: 'carte', label: t('nav.menu') },
    { id: 'photos', label: t('nav.photos') },
    { id: 'actualites', label: t('nav.news') },
    { id: 'contact', label: t('nav.contact') }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm" role="banner">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Weather widget */}
          <div className="flex flex-col items-start">
            <div className="flex items-center space-x-2 text-sm text-gray-600 mb-1" style={{marginLeft: '-8px'}}>
              <div className="w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-sm">
                <Sun className="w-4 h-4 text-white animate-pulse" />
              </div>
              <span className="font-medium">{temperature}</span>
              <span>{currentTime}</span>
            </div>
            
            {/* Small boat logo directly below weather */}
            <div className="ml-1">
              <img
                src={settings.logo_url}
               alt="Bateau de pêche normand - Le Papio restaurant Cherbourg"
                className="w-16 h-12 opacity-80 animate-[sailing_6s_ease-in-out_infinite] mt-1"
                onError={(e) => {
                  // Fallback SVG if image fails
                  const fallback = document.createElement('div');
                  fallback.innerHTML = `
                    <svg viewBox="0 0 24 24" class="w-16 h-12 text-gray-400 animate-[sailing_6s_ease-in-out_infinite] mt-1">
                      <path d="M5 18 L12 8 L19 18 L16 20 L12 16 L8 20 Z M12 8 L12 4 M10 12 L14 12" stroke="currentColor" stroke-width="2" fill="none"/>
                    </svg>
                  `;
                  (e.target as HTMLElement).parentNode?.appendChild(fallback);
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
          </div>


          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div>
              <h1 className="text-2xl md:text-xl font-bold text-gray-800">{settings.restaurant_name}</h1>
              <p className="text-sm text-gray-600">{t('header.restaurant')}</p>
              <div className="flex items-center justify-between mt-1">
                <span
                  className={`text-xs font-medium px-2 py-1 rounded-full ${
                    isOpen
                      ? 'bg-green-100 text-green-900'
                      : 'bg-red-100 text-red-900'
                  }`}
                  role="status"
                  aria-live="polite"
                >
                  {isOpen ? `🟢 ${t('header.open')}` : `🔴 ${t('header.closed')}`}
                </span>
                
                {/* Mobile Language Selector - visible uniquement sur mobile */}
                <div className="md:hidden">
                  <LanguageSelector />
                </div>
              </div>
              
              {/* Horaires d'ouverture - déplacés sur une nouvelle ligne pour mobile */}
              {!isOpen && nextOpenTime && (
                <div className="mt-1">
                  <span className="text-xs text-gray-500">
                    {nextOpenTime}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Navigation Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <nav aria-label="Navigation principale">
              <ul className="flex items-center space-x-8">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => scrollToSection(item.id)}
                      className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                        activeSection === item.id
                          ? 'bg-papio-500 text-white'
                          : 'bg-white text-gray-700 hover:bg-papio-50 hover:text-papio-600 shadow-sm'
                      }`}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
            
            {/* Desktop Language Selector */}
            <LanguageSelector />
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <div className="w-6 h-6 flex flex-col justify-center space-y-1">
              <div className={`w-full h-0.5 bg-gray-600 transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1' : ''}`}></div>
              <div className={`w-full h-0.5 bg-gray-600 transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></div>
              <div className={`w-full h-0.5 bg-gray-600 transition-transform duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1' : ''}`}></div>
            </div>
          </button>
        </div>
        
        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div id="mobile-menu" className="md:hidden bg-white border-t border-gray-100 shadow-lg">
            <nav className="px-4 py-6" aria-label="Navigation mobile">
              <ul className="space-y-4">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => {
                        scrollToSection(item.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 ${
                        activeSection === item.id
                          ? 'bg-papio-500 text-white'
                          : 'text-gray-700 hover:bg-papio-50 hover:text-papio-600'
                      }`}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
              
              {/* Note: Mobile Language Selector is now in the main header */}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;