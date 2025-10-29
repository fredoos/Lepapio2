import React, { useState, useEffect } from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Menu from './components/Menu';
import Gallery from './components/Gallery';
import News from './components/News';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Seagull from './components/Seagull';

function App() {
  const [activeSection, setActiveSection] = useState('accueil');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['accueil', 'carte', 'photos', 'actualites', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-gray-100">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-papio-600 focus:text-white focus:rounded-lg focus:shadow-lg"
        >
          Aller au contenu principal
        </a>
        <Header activeSection={activeSection} />

        <main id="main-content">
          <section id="accueil">
            <Hero />
          </section>

          <About />

          <section id="carte">
            <Menu />
          </section>

          <section id="photos">
            <Gallery />
          </section>

          <section id="actualites">
            <News />
          </section>

          <section id="contact">
            <Contact />
          </section>
        </main>

        <Footer />

        {/* Animation de mouette */}
        <Seagull />
      </div>
    </LanguageProvider>
  );
}

export default App;