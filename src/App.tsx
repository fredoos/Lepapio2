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
import AdminSettings from './components/AdminSettings';

function App() {
  const [activeSection, setActiveSection] = useState('accueil');
  const [showAdmin, setShowAdmin] = useState(false);

  useEffect(() => {
    if (window.location.pathname === '/admin') {
      setShowAdmin(true);
    }
  }, []);

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

  if (showAdmin) {
    return (
      <LanguageProvider>
        <div className="min-h-screen bg-gray-50">
          <AdminSettings />
        </div>
      </LanguageProvider>
    );
  }

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-gray-100">
        <Header activeSection={activeSection} />

        <main>
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