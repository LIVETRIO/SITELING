import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Institution Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-accent-900 rounded-lg flex items-center justify-center">
                <span className="text-xl font-bold text-primary-900">E</span>
              </div>
              <div>
                <h3 className="font-bold text-lg">ESST</h3>
                <p className="text-sm opacity-80">Excellence & Innovation</p>
              </div>
            </div>
            <p className="text-sm opacity-90 leading-relaxed">
              École Supérieure des Sciences et Technologies - Formant les leaders de demain 
              dans un environnement d'innovation et d'excellence académique.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg border-b border-primary-700 pb-2">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm hover:text-accent-900 transition-colors duration-200">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/formations" className="text-sm hover:text-accent-900 transition-colors duration-200">
                  Formations
                </Link>
              </li>
              <li>
                <Link to="/research" className="text-sm hover:text-accent-900 transition-colors duration-200">
                  Recherche
                </Link>
              </li>
              <li>
                <Link to="/news" className="text-sm hover:text-accent-900 transition-colors duration-200">
                  Actualités
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm hover:text-accent-900 transition-colors duration-200">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg border-b border-primary-700 pb-2">Services</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/admissions" className="text-sm hover:text-accent-900 transition-colors duration-200">
                  Admissions
                </Link>
              </li>
              <li>
                <Link to="/student-life" className="text-sm hover:text-accent-900 transition-colors duration-200">
                  Vie Étudiante
                </Link>
              </li>
              <li>
                <Link to="/international" className="text-sm hover:text-accent-900 transition-colors duration-200">
                  Relations Internationales
                </Link>
              </li>
              <li>
                <Link to="/career-services" className="text-sm hover:text-accent-900 transition-colors duration-200">
                  Services Carrière
                </Link>
              </li>
              <li>
                <Link to="/library" className="text-sm hover:text-accent-900 transition-colors duration-200">
                  Bibliothèque
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg border-b border-primary-700 pb-2">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin size={16} className="text-accent-900 mt-1 flex-shrink-0" />
                <div className="text-sm">
                  <p>123 Avenue de l'Innovation</p>
                  <p>75001 Paris, France</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={16} className="text-accent-900 flex-shrink-0" />
                <span className="text-sm">+33 1 23 45 67 89</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={16} className="text-accent-900 flex-shrink-0" />
                <span className="text-sm">contact@esst.edu</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4 pt-4">
              <a 
                href="#" 
                className="p-2 bg-white bg-opacity-10 hover:bg-opacity-20 rounded-lg transition-all duration-200"
                aria-label="Facebook"
              >
                <Facebook size={16} />
              </a>
              <a 
                href="#" 
                className="p-2 bg-white bg-opacity-10 hover:bg-opacity-20 rounded-lg transition-all duration-200"
                aria-label="Twitter"
              >
                <Twitter size={16} />
              </a>
              <a 
                href="#" 
                className="p-2 bg-white bg-opacity-10 hover:bg-opacity-20 rounded-lg transition-all duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm opacity-80">
            © 2025 ESST - École Supérieure des Sciences et Technologies. Tous droits réservés.
          </p>
          <div className="flex space-x-6 text-sm">
            <Link to="/legal" className="hover:text-accent-900 transition-colors duration-200">
              Mentions légales
            </Link>
            <Link to="/privacy" className="hover:text-accent-900 transition-colors duration-200">
              Politique de confidentialité
            </Link>
            <Link to="/cookies" className="hover:text-accent-900 transition-colors duration-200">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;