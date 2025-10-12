import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const News = () => {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">{t('news.title')}</h2>
          <p className="text-lg text-gray-600">
            {t('news.subtitle')}
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <article className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
            <img 
              src="/facade.jpg" 
             alt="Façade restaurant Le Papio quai de Caligny Cherbourg-en-Cotentin vue port"
              className="w-full h-64 object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg";
              }}
            />
            <div className="p-6">
              <div className="text-sm text-gray-500 mb-2">📅 {t('news.article_date')}</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                {t('news.article_title')}
              </h3>
              <p className="text-gray-600 mb-4">
                {t('news.article_content')}
              </p>
              <a 
                href="https://actu.fr/normandie/cherbourg-en-cotentin_50129/accompagne-dun-chef-bien-connu-christophe-ouvre-un-nouveau-restaurant-sur-les-quais-de-cherbourg_62853356.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-papio-600 hover:text-papio-700 text-sm font-medium"
              >
                {t('news.read_full_article')}
              </a>
            </div>
          </article>

          {/* Call to action */}
          <div className="bg-papio-500 rounded-lg p-8 text-center text-white">
            <h3 className="text-xl font-bold mb-4">{t('news.stay_informed')}</h3>
            <p className="mb-6">
              {t('news.follow_desc')}
            </p>
            <div className="flex justify-center space-x-4">
              <a 
                href="https://www.facebook.com/share/16wkNBoYsx/?mibextid=wwXIfr" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center space-x-2 font-semibold"
              >
                <img src="/Facebook.gif" alt="Logo Facebook" className="w-6 h-6" />
                <span>{t('news.follow_facebook')}</span>
              </a>
              <a 
                href="https://instagram.com/lepapio" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 hover:from-purple-600 hover:via-pink-600 hover:to-orange-500 text-white px-8 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center space-x-2 font-semibold"
              >
                <img src="/instagram.gif" alt="Logo Instagram" className="w-6 h-6" />
                <span>{t('news.follow_instagram')}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default News;