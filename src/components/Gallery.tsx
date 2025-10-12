import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Gallery = () => {
  const { t } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const images = [
    { src: "/chalutier.jpg", alt: "Chalutier de pêche normand au port de Cherbourg" },
    { src: "/vue_du_port.jpg", alt: "Vue panoramique du port de Cherbourg depuis la terrasse" },
    { src: "/facade.jpg", alt: "Façade du restaurant Le Papio" },
    { src: "/interieur.jpg", alt: "Intérieur chaleureux du restaurant" },
    { src: "/entrecote .jpg", alt: "Entrecôte grillée" },
    { src: "/saumon.jpg", alt: "Plat de saumon" },
    { src: "/pizzas.jpeg", alt: "Pizzas artisanales" },
    { src: "/Pizza.jpg", alt: "Pizza artisanale" },
    { src: "/Hareng mariné.jpg", alt: "Hareng mariné" },
    { src: "/papillotte.jpg", alt: "Poisson en papillotte" },
    { src: "/tiramissu.jpg", alt: "Tiramisu maison" },
    { src: "/fondant.jpeg", alt: "Fondant au chocolat" }
  ];

  const openModal = (index: number) => {
    setSelectedImage(index);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % images.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? images.length - 1 : selectedImage - 1);
    }
  };

  return (
    <section className="py-20 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">{t('gallery.title')}</h2>
          <p className="text-lg text-gray-600">
            {t('gallery.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div 
              key={index}
              className="relative group cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 aspect-square"
              onClick={() => openModal(index)}
            >
              <img 
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://images.pexels.com/photos/1146760/pexels-photo-1146760.jpeg";
                }}
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-white text-center">
                  <p className="text-sm">{t('gallery.click_to_enlarge')}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedImage !== null && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
            <div className="relative max-w-4xl w-full">
              <button
                onClick={closeModal}
                className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
              >
                <X className="w-8 h-8" />
              </button>
              
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors bg-black/50 rounded-full p-2"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors bg-black/50 rounded-full p-2"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              <img 
                src={images[selectedImage].src}
                alt={images[selectedImage].alt}
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://images.pexels.com/photos/1146760/pexels-photo-1146760.jpeg";
                }}
              />
              
              <div className="text-center mt-4">
                <p className="text-gray-300 text-sm">{images[selectedImage].alt}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;