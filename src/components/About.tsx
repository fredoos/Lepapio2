import React from 'react';
import { Heart, Utensils, Users, Star } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const About = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: Heart,
      title: t('about.feature1_title'),
      description: t('about.feature1_desc')
    },
    {
      icon: Utensils,
      title: t('about.feature2_title'), 
      description: t('about.feature2_desc')
    },
    {
      icon: Users,
      title: t('about.feature3_title'),
      description: t('about.feature3_desc')
    },
    {
      icon: Star,
      title: t('about.feature4_title'),
      description: t('about.feature4_desc')
    }
  ];

  return (
    <section className="py-20 bg-gray-100">
      {/* Image Michel bateau */}
      <div className="flex justify-center mb-4 -mt-8 px-4">
        <div className="relative overflow-hidden rounded-3xl w-full max-w-7xl">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-transparent bg-gradient-radial from-center opacity-20 pointer-events-none z-10"></div>
        <img
          src="/michel_en_bateau-min.jpg"
          alt="Michel sur son bateau - Le Papio restaurant Cherbourg"
          className="h-48 md:h-80 lg:h-96 w-full object-cover drop-shadow-2xl opacity-95 mask-fade-horizontal"
          style={{
            maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)'
          }}
          onError={(e) => {
            const fallback = document.createElement('div');
            fallback.innerHTML = '🛥️';
            fallback.style.fontSize = '4rem';
            fallback.className = 'text-4xl';
            (e.target as HTMLElement).parentNode?.appendChild(fallback);
            (e.target as HTMLElement).style.display = 'none';
          }}
        />
        </div>
      </div>
      
      {/* Wave decoration */}
      <div className="relative">
        <svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          className="absolute top-0 left-0 right-0 w-full h-16 transform rotate-180"
        >
          <path 
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
            fill="rgb(45, 183, 179)"
          />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-4 pt-16">
        {/* Title */}
        <div 
          className="text-center mb-16 relative"
        >
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">{t('about.title')}</h2>
          <div className="flex justify-center mb-4">
            <img 
              src="/bateau.gif" 
             alt="Animation bateau Papio - Histoire du restaurant Cherbourg-en-Cotentin"
              className="w-32 h-32 opacity-80 animate-[sailing_4s_ease-in-out_infinite]"
              onError={(e) => {
                const fallback = document.createElement('div');
                fallback.innerHTML = '⛵';
                fallback.style.fontSize = '2rem';
                fallback.className = 'text-2xl opacity-80';
                (e.target as HTMLElement).parentNode?.appendChild(fallback);
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
            {t('about.description')}
          </p>
        </div>
        </div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-papio-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-8 h-8 text-papio-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">{feature.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">{t('about.cta_title')}</h3>
          <p className="text-gray-600 mb-6">
            {t('about.cta_desc')}
          </p>
          <a 
            href="tel:0233921845"
            className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold px-12 py-4 text-xl rounded-full transition-all duration-300 shadow-2xl hover:shadow-red-500/50 hover:scale-105 animate-pulse border-4 border-red-400"
          >
            {t('about.cta_button')}
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;