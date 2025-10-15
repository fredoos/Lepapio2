import React from 'react';
import { MapPin, Phone, Clock } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useSettings } from '../hooks/useSettings';

const Hero = () => {
  const { t, language } = useLanguage();
  const { settings, loading } = useSettings();

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-papio-400 to-papio-500 pt-20">
      {/* Wave decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          className="relative block w-full h-16"
        >
          <path 
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
            fill="#f3f4f6"
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-20">
        {/* Main logo and title */}
        <div className="text-center mb-16 relative">
          {/* Background image for title */}
          <div 
            className="absolute inset-0 rounded-3xl opacity-20 blur-sm"
            style={{
              backgroundImage: 'url(/vue_du_port_bleu.gif)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          ></div>
          
          <div className="flex items-center justify-center text-white mb-8">
            <h1 className="text-6xl md:text-9xl font-bold mr-1 text-white/90" style={{ fontFamily: 'Montserrat, sans-serif', WebkitTextStroke: '1px black' }} role="heading" aria-level={1}>
              <span className="md:hidden" style={{ fontFamily: 'Trebuchet MS, Verdana, Geneva, sans-serif', fontWeight: '900', letterSpacing: '0.02em' }}>Le</span>
              <span className="hidden md:inline" style={{ fontFamily: 'Dancing Script, cursive', fontWeight: 'normal' }}>Le</span>
            </h1>
            <img 
              src="/papio2y copy.gif" 
              className="h-32 md:h-48 w-auto drop-shadow-lg mr-4"
              alt="Logo animé Le Papio - Restaurant pizzeria Cherbourg-en-Cotentin"
              onError={(e) => {
                const fallback = document.createElement('h1');
                fallback.textContent = 'Papio';
                fallback.className = 'text-8xl font-normal text-white/90';
                fallback.style.fontFamily = 'Dancing Script, cursive';
                (e.target as HTMLElement).parentNode?.appendChild(fallback);
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>

          <p className="relative z-10 text-xl text-white/90 mb-8 font-light bg-white/15 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/20 shadow-lg max-w-4xl mx-auto">
            {t('hero.tagline')}
          </p>

          <p className="relative z-10 text-lg text-white/80 max-w-3xl mx-auto leading-relaxed">
            {t('hero.description')}
          </p>
          
          {/* Histoire du nom Papio */}
          <div className="relative z-10 mt-6 max-w-2xl mx-auto">
            <p className="text-base text-white/70 italic leading-relaxed">
              {t('hero.story')}
            </p>
          </div>
        </div>

        {/* Info cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <a 
            href="#carte" 
            className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center text-white hover:bg-white/20 transition-colors cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('carte')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <MapPin className="w-8 h-8 mx-auto mb-4 text-white/90" />
            <h3 className="font-semibold mb-2">{t('hero.address')}</h3>
            <p className="text-base font-medium text-white/95">
              {t('hero.address_full').split('\n').map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  {i < t('hero.address_full').split('\n').length - 1 && <br />}
                </React.Fragment>
              ))}
            </p>
          </a>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center text-white">
            <Phone className="w-8 h-8 mx-auto mb-4 text-white/90" />
            <h3 className="font-semibold mb-2">{t('hero.reservations')}</h3>
            <p className="text-lg font-semibold text-white">
              02 33 92 18 45
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center text-white">
            <Clock className="w-8 h-8 mx-auto mb-4 text-white/90" />
            <h3 className="font-semibold mb-2">{t('hero.hours')}</h3>
            <p className="text-base font-semibold text-white">
              {loading ? (
                'Chargement...'
              ) : (
                language === 'fr'
                  ? (settings.hours_summary || '12h-14h / 19h-22h')
                  : (settings.hours_summary_en || '12pm-2pm / 7pm-10pm')
              )}
            </p>
            <p className="text-xs text-white/60 mt-3 italic">
              {loading ? '' : (
                language === 'fr'
                  ? (settings.closure_note || 'Fermé le mardi')
                  : (settings.closure_note_en || 'Closed on Tuesday')
              )}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;