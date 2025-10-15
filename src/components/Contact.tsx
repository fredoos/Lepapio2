import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useSettings } from '../hooks/useSettings';

const Contact = () => {
  const { t, language } = useLanguage();
  const { settings } = useSettings();

  const contactInfo = {
    address: '24 quai de Caligny, 50100 Cherbourg-en-Cotentin',
    phone: '02 33 92 18 45',
    email: 'restaurantlepapio@gmail.com'
  };

  return (
    <section className="py-20 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">{t('contact.title')}</h2>
          <p className="text-lg text-gray-600">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-6">{t('contact.info')}</h3>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-papio-100 rounded-full flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-papio-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">{t('contact.address')}</h4>
                  <p className="text-gray-600 whitespace-pre-line">{contactInfo.address}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-papio-100 rounded-full flex items-center justify-center">
                  <Phone className="w-4 h-4 text-papio-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">{t('contact.phone')}</h4>
                  <a href={`tel:${contactInfo.phone.replace(/\s/g, '')}`} className="text-gray-600 hover:text-papio-600 transition-colors">
                    {contactInfo.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-papio-100 rounded-full flex items-center justify-center">
                  <Mail className="w-4 h-4 text-papio-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">{t('contact.email')}</h4>
                  <a href={`mailto:${contactInfo.email}`} className="text-gray-600 hover:text-papio-600 transition-colors">
                    {contactInfo.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-papio-100 rounded-full flex items-center justify-center">
                  <Clock className="w-4 h-4 text-papio-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800 mb-2">{t('contact.hours')}</h4>
                  {settings.opening_hours && (
                    <div className="text-gray-600 space-y-1">
                      {Object.entries(settings.opening_hours).map(([day, schedule]) => {
                        const dayLabelsFr: Record<string, string> = {
                          monday: 'Lundi',
                          tuesday: 'Mardi',
                          wednesday: 'Mercredi',
                          thursday: 'Jeudi',
                          friday: 'Vendredi',
                          saturday: 'Samedi',
                          sunday: 'Dimanche'
                        };

                        const dayLabelsEn: Record<string, string> = {
                          monday: 'Monday',
                          tuesday: 'Tuesday',
                          wednesday: 'Wednesday',
                          thursday: 'Thursday',
                          friday: 'Friday',
                          saturday: 'Saturday',
                          sunday: 'Sunday'
                        };

                        const dayLabels = language === 'fr' ? dayLabelsFr : dayLabelsEn;
                        const closedText = language === 'fr' ? 'Fermé' : 'Closed';
                        const andText = language === 'fr' ? ' et ' : ' and ';

                        if (!schedule || !schedule.enabled) {
                          return (
                            <p key={day} className="text-sm">
                              <span className="font-medium">{dayLabels[day] || day}:</span> {closedText}
                            </p>
                          );
                        }

                        const services = [];
                        if (schedule.lunch && schedule.lunch.enabled) {
                          services.push(`${schedule.lunch.start}-${schedule.lunch.end}`);
                        }
                        if (schedule.dinner && schedule.dinner.enabled) {
                          services.push(`${schedule.dinner.start}-${schedule.dinner.end}`);
                        }

                        if (services.length === 0) {
                          return (
                            <p key={day} className="text-sm">
                              <span className="font-medium">{dayLabels[day] || day}:</span> {closedText}
                            </p>
                          );
                        }

                        return (
                          <p key={day} className="text-sm">
                            <span className="font-medium">{dayLabels[day] || day}:</span> {services.join(andText)}
                          </p>
                        );
                      })}
                      <p className="text-sm text-gray-500 mt-2">
                        {language === 'fr'
                          ? (settings.closure_note || '* Fermé le mardi')
                          : (settings.closure_note_en || '* Closed on Tuesday')
                        }
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Map section */}
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-6">{t('contact.find_us')}</h3>
            <iframe
              src="https://www.openstreetmap.org/export/embed.html?bbox=-1.6316%2C49.6350%2C-1.6116%2C49.6450&layer=mapnik&marker=49.639980%2C-1.621612"
              className="w-full h-80 rounded-lg mb-4"
              frameBorder="0"
              scrolling="no"
              marginHeight={0}
              marginWidth={0}
             title="Plan localisation restaurant Le Papio 24 quai Caligny Cherbourg-en-Cotentin"
            ></iframe>
            <p className="text-sm text-gray-600 text-center">
              📍 <a href="https://www.openstreetmap.org/?mlat=49.639980&mlon=-1.621612#map=18/49.639980/-1.621612" target="_blank" rel="noopener noreferrer"><strong className="text-papio-600 hover:text-papio-700 transition-colors cursor-pointer">{t('contact.location_desc')}</strong></a>
            </p>
          </div>
        </div>

        {/* Follow us section */}
        {/* Reviews section */}
        <div className="mt-16">
          <h3 className="text-xl font-bold text-gray-800 text-center mb-6">{t('contact.reviews_title')}</h3>
          <div className="flex justify-center space-x-4 mb-8">
            <a 
              href="https://g.co/kgs/nELyCFo" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full transition-colors flex items-center space-x-2"
            >
              <span>⭐</span>
              <span>{t('contact.google_reviews')}</span>
            </a>
            <a 
              href="https://www.tripadvisor.fr/Restaurant_Review-g187183-d33325915-Reviews-Le_Papio-Cherbourg_Octeville_Cherbourg_en_Cotentin_Manche_Basse_Normandie_Norman.html?m=69573" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full transition-colors flex items-center space-x-2"
            >
              <img src="/tripadvisor.gif" alt="Logo TripAdvisor" className="w-6 h-6" />
              <span>{t('contact.tripadvisor_reviews')}</span>
            </a>
          </div>
        </div>

        <div className="mt-16">
          <h3 className="text-xl font-bold text-gray-800 text-center mb-6">{t('contact.follow_us')}</h3>
          <div className="flex justify-center space-x-4">
            <a 
              href="https://www.facebook.com/share/16wkNBoYsx/?mibextid=wwXIfr" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center space-x-2 font-semibold"
            >
              <img src="/Facebook.gif" alt="Logo Facebook" className="w-6 h-6" />
              <span>Facebook</span>
            </a>
            <a 
              href="https://instagram.com/lepapio" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 hover:from-purple-600 hover:via-pink-600 hover:to-orange-500 text-white px-8 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center space-x-2 font-semibold"
            >
              <img src="/instagram.gif" alt="Logo Instagram" className="w-6 h-6" />
              <span>Instagram</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;