import React, { useState, useEffect } from 'react';
import { ChefHat, Fish, Pizza, Coffee, Utensils, Clock, Baby, IceCream, Beef, Carrot, Phone, Shell } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useMenuData } from '../hooks/useMenuData';
import { useMenuVisibility } from '../hooks/useMenuVisibility';

const Menu = () => {
  const { language, t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('entrees');
  const [currentMarinImage, setCurrentMarinImage] = useState('/marin1.gif');

  const menuData = useMenuData();
  const visibility = useMenuVisibility();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMarinImage(prev => 
        prev === '/marin1.gif' ? '/marin4.gif' : '/marin1.gif'
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const allCategories = [
    { id: 'entrees', label: t('menu.starters'), icon: Utensils, visible: visibility.show_entrees },
    { id: 'potages', label: t('menu.soups'), icon: Fish, visible: visibility.show_potages },
    { id: 'plats', label: t('menu.mains'), icon: Beef, visible: visibility.show_plats },
    { id: 'moules', label: t('menu.mussels'), icon: Shell, visible: visibility.show_moules },
    { id: 'pizzas', label: t('menu.pizzas'), icon: Pizza, visible: visibility.show_pizzas },
    { id: 'formules', label: t('menu.formulas'), icon: Clock, visible: visibility.show_formules },
    { id: 'enfant', label: t('menu.kids'), icon: Baby, visible: visibility.show_enfant },
    { id: 'desserts', label: t('menu.desserts'), icon: Coffee, visible: visibility.show_desserts },
    { id: 'glaces', label: t('menu.ice_cream'), icon: IceCream, visible: visibility.show_glaces }
  ];

  const categories = allCategories.filter(cat => cat.visible);

  useEffect(() => {
    if (categories.length > 0 && !categories.find(cat => cat.id === activeCategory)) {
      setActiveCategory(categories[0].id);
    }
  }, [visibility]);

  const formatPrice = (price: number | string): string => {
    const numPrice = typeof price === 'number' ? price : parseFloat(price.toString().replace(',', '.'));
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(numPrice);
  };

  return (
    <section className="py-20 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header with marin image */}
        <div className="text-center mb-16">
          <div className="mb-8">
            <img 
              src={currentMarinImage}
             alt="Illustration marin pêcheur - Restaurant Le Papio Cherbourg spécialités mer"
              className="w-72 h-72 mx-auto object-contain drop-shadow-lg"
              onError={(e) => {
                const fallback = document.createElement('div');
                fallback.innerHTML = '⚓️';
                fallback.style.fontSize = '4rem';
                fallback.className = 'text-6xl';
                (e.target as HTMLElement).parentNode?.appendChild(fallback);
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>
          <h2 className="text-4xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Dancing Script, cursive' }}>
            {t('menu.title')}
          </h2>
          <h3 className="sr-only">{t('menu.subtitle')}</h3>
          <p className="text-lg text-gray-600">
            {t('menu.subtitle')}
          </p>
        </div>

        {/* Menu description section */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-gray-50 p-8 rounded-2xl shadow-lg border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center" style={{ fontFamily: 'Dancing Script, cursive' }}>
              {t('menu.description_title')}
            </h3>
            
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p className="text-base">
                {t('menu.description_intro')}
              </p>
              
              <p className="text-base">
                {t('menu.description_spirit')}
              </p>
              
              <p className="text-base font-medium">
                {t('menu.description_quality')}
              </p>
              
              <p className="text-base italic">
                {t('menu.description_location')}
              </p>
            </div>
          </div>
        </div>

        {/* Category buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center space-x-2 px-4 py-3 rounded-full text-sm font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 ${
                activeCategory === category.id
                  ? 'bg-papio-500 text-white shadow-papio-200'
                  : 'bg-white text-gray-700 hover:bg-papio-50 hover:text-papio-600'
              }`}
            >
              <category.icon className="w-5 h-5" />
              <span className="font-semibold">{category.label}</span>
            </button>
          ))}
        </div>

        {/* Pizza Takeaway Banner - Visible uniquement pour la section pizzas */}
        {activeCategory === 'pizzas' && (
          <div className="max-w-5xl mx-auto mb-8">
            <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-6 rounded-2xl shadow-2xl border-2 border-red-400">
              <div className="flex items-center justify-center space-x-4 mb-3">
                <Pizza className="w-8 h-8 text-yellow-300 animate-bounce" />
                <h3 className="text-2xl font-bold text-center">
                  {t('menu.pizza_takeaway')}
                </h3>
                <Pizza className="w-8 h-8 text-yellow-300 animate-bounce" />
              </div>
              <div className="flex items-center justify-center space-x-3 bg-red-400/30 rounded-xl p-4">
                <Phone className="w-6 h-6 text-yellow-300 animate-pulse" />
                <p className="text-lg font-semibold text-center">
                  {t('menu.pizza_order_phone')}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Menu items */}
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-5xl mx-auto border border-gray-100">
          <div className="space-y-8">
            {menuData[activeCategory as keyof typeof menuData]?.map((item, index) => (
              <div key={index} className="border-b border-gray-100 pb-6 last:border-b-0 hover:bg-gray-50 p-4 rounded-lg transition-colors">
                <div className="flex justify-between items-start gap-4 mb-4">
                  <h3 className="text-2xl font-black text-gray-800 flex-1 min-w-0" style={{ fontFamily: 'Dancing Script, cursive' }}>
                    {language === 'en' && item.nameEn ? item.nameEn : item.name}
                  </h3>
                  <span className="text-2xl sm:text-3xl font-black text-papio-600 whitespace-nowrap shrink-0">
                    {formatPrice(item.price)}
                  </span>
                </div>
                
                {(item.description || item.descriptionEn) && (
                  <p className="text-gray-700 text-base leading-relaxed mb-3 font-medium">
                    {language === 'en' && item.descriptionEn ? item.descriptionEn : item.description}
                  </p>
                )}
                
                {(item.ingredients || item.ingredientsEn) && (
                  <p className="text-gray-500 text-sm italic font-medium">
                    {language === 'en' && item.ingredientsEn ? item.ingredientsEn : item.ingredients}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Special annotations */}
          {activeCategory === 'plats' && (
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-start space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full mt-1 flex-shrink-0"></div>
                  <div className="text-sm text-green-800">
                    <p className="font-semibold mb-1">{t('menu.homemade_sauces')}</p>
                    <p>{t('menu.sauce_list')}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2 mt-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full mt-1 flex-shrink-0"></div>
                  <div className="text-sm text-green-800">
                    <p>{t('menu.dishes_accompanied')}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeCategory === 'pizzas' && (
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="bg-papio-50 p-4 rounded-lg">
                <div className="flex items-start space-x-2">
                  <div className="w-3 h-3 bg-papio-500 rounded-full mt-1 flex-shrink-0"></div>
                  <div className="text-sm text-papio-800">
                    <p><span className="font-semibold">{t('menu.pizza_extra_ingredient')}</span></p>
                    <p className="italic">{t('menu.pizza_extra_list')}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeCategory === 'glaces' && (
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-start space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mt-1 flex-shrink-0"></div>
                  <div className="text-sm text-blue-800">
                    <p className="font-semibold">{t('menu.ice_cream_flavors_title')}</p>
                    <p className="italic">{t('menu.ice_cream_flavors_list')}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer note */}
        <div className="text-center mt-8 bg-white rounded-lg p-6 shadow-lg max-w-4xl mx-auto">
          <div className="flex items-center justify-center space-x-2 mb-3">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <p className="text-lg font-semibold text-gray-800">{t('menu.all_homemade')}</p>
          </div>
          <p className="text-sm text-gray-600">{t('menu.prices_vary')}</p>
          <div className="mt-4 flex items-center justify-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <Carrot className="w-4 h-4 text-green-600" />
              <span>{t('menu.fresh_products')}</span>
            </div>
            <div className="flex items-center space-x-1">
              <ChefHat className="w-4 h-4 text-papio-600" />
              <span>{t('menu.homemade')}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Menu;