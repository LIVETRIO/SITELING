import React, { useState } from 'react';
import { Save, Upload, Palette, Globe, Mail, Phone, MapPin } from 'lucide-react';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';
import Textarea from '../../components/UI/Textarea';

const SiteSettings: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  
  const [settings, setSettings] = useState({
    // Paramètres généraux
    siteName: 'École Supérieure des Sciences et Technologies',
    siteDescription: 'Excellence & Innovation',
    siteUrl: 'https://esst.edu',
    adminEmail: 'admin@esst.edu',
    
    // Contact
    phone: '+33 1 23 45 67 89',
    email: 'contact@esst.edu',
    address: '123 Avenue de l\'Innovation, 75001 Paris, France',
    
    // Réseaux sociaux
    facebook: 'https://facebook.com/esst',
    twitter: 'https://twitter.com/esst',
    linkedin: 'https://linkedin.com/company/esst',
    
    // Apparence
    primaryColor: '#1A4B8C',
    secondaryColor: '#4D88D8',
    accentColor: '#FFD700',
    logo: '',
    favicon: '',
    
    // SEO
    metaTitle: 'ESST - École Supérieure des Sciences et Technologies',
    metaDescription: 'Formation d\'excellence en sciences et technologies. Découvrez nos programmes innovants et rejoignez notre communauté académique.',
    metaKeywords: 'ESST, école, sciences, technologies, formation, université',
    
    // Maintenance
    maintenanceMode: false,
    maintenanceMessage: 'Site en maintenance. Nous reviendrons bientôt.',
    
    // Analytics
    googleAnalytics: '',
    facebookPixel: '',
  });

  const tabs = [
    { id: 'general', label: 'Général', icon: Globe },
    { id: 'contact', label: 'Contact', icon: Phone },
    { id: 'appearance', label: 'Apparence', icon: Palette },
    { id: 'seo', label: 'SEO', icon: Globe },
    { id: 'maintenance', label: 'Maintenance', icon: Settings },
  ];

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Paramètres sauvegardés:', settings);
      // Ici vous pourriez envoyer les données à votre API
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <div className="space-y-6">
            <Input
              label="Nom du site"
              value={settings.siteName}
              onChange={(e) => handleInputChange('siteName', e.target.value)}
              placeholder="Nom de votre institution"
            />
            
            <Input
              label="Description du site"
              value={settings.siteDescription}
              onChange={(e) => handleInputChange('siteDescription', e.target.value)}
              placeholder="Slogan ou description courte"
            />
            
            <Input
              label="URL du site"
              value={settings.siteUrl}
              onChange={(e) => handleInputChange('siteUrl', e.target.value)}
              placeholder="https://votre-site.com"
            />
            
            <Input
              label="Email administrateur"
              type="email"
              value={settings.adminEmail}
              onChange={(e) => handleInputChange('adminEmail', e.target.value)}
              placeholder="admin@votre-site.com"
            />
          </div>
        );

      case 'contact':
        return (
          <div className="space-y-6">
            <Input
              label="Téléphone"
              value={settings.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              placeholder="+33 1 23 45 67 89"
              icon={<Phone size={20} />}
            />
            
            <Input
              label="Email de contact"
              type="email"
              value={settings.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="contact@votre-site.com"
              icon={<Mail size={20} />}
            />
            
            <Textarea
              label="Adresse"
              value={settings.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              placeholder="Adresse complète de l'institution"
              rows={3}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                label="Facebook"
                value={settings.facebook}
                onChange={(e) => handleInputChange('facebook', e.target.value)}
                placeholder="https://facebook.com/votre-page"
              />
              
              <Input
                label="Twitter"
                value={settings.twitter}
                onChange={(e) => handleInputChange('twitter', e.target.value)}
                placeholder="https://twitter.com/votre-compte"
              />
              
              <Input
                label="LinkedIn"
                value={settings.linkedin}
                onChange={(e) => handleInputChange('linkedin', e.target.value)}
                placeholder="https://linkedin.com/company/votre-entreprise"
              />
            </div>
          </div>
        );

      case 'appearance':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Couleur primaire
                </label>
                <div className="flex items-center space-x-3">
                  <input
                    type="color"
                    value={settings.primaryColor}
                    onChange={(e) => handleInputChange('primaryColor', e.target.value)}
                    className="w-12 h-10 border border-neutral-300 rounded cursor-pointer"
                  />
                  <Input
                    value={settings.primaryColor}
                    onChange={(e) => handleInputChange('primaryColor', e.target.value)}
                    placeholder="#1A4B8C"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Couleur secondaire
                </label>
                <div className="flex items-center space-x-3">
                  <input
                    type="color"
                    value={settings.secondaryColor}
                    onChange={(e) => handleInputChange('secondaryColor', e.target.value)}
                    className="w-12 h-10 border border-neutral-300 rounded cursor-pointer"
                  />
                  <Input
                    value={settings.secondaryColor}
                    onChange={(e) => handleInputChange('secondaryColor', e.target.value)}
                    placeholder="#4D88D8"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Couleur d'accent
                </label>
                <div className="flex items-center space-x-3">
                  <input
                    type="color"
                    value={settings.accentColor}
                    onChange={(e) => handleInputChange('accentColor', e.target.value)}
                    className="w-12 h-10 border border-neutral-300 rounded cursor-pointer"
                  />
                  <Input
                    value={settings.accentColor}
                    onChange={(e) => handleInputChange('accentColor', e.target.value)}
                    placeholder="#FFD700"
                  />
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Logo (URL)
                </label>
                <Input
                  value={settings.logo}
                  onChange={(e) => handleInputChange('logo', e.target.value)}
                  placeholder="https://exemple.com/logo.png"
                />
                <Button variant="ghost" className="mt-2 flex items-center space-x-2">
                  <Upload size={16} />
                  <span>Télécharger un logo</span>
                </Button>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Favicon (URL)
                </label>
                <Input
                  value={settings.favicon}
                  onChange={(e) => handleInputChange('favicon', e.target.value)}
                  placeholder="https://exemple.com/favicon.ico"
                />
                <Button variant="ghost" className="mt-2 flex items-center space-x-2">
                  <Upload size={16} />
                  <span>Télécharger un favicon</span>
                </Button>
              </div>
            </div>
            
            {/* Aperçu des couleurs */}
            <div className="border border-neutral-200 rounded-lg p-6">
              <h4 className="font-semibold text-neutral-900 mb-4">Aperçu des couleurs</h4>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div 
                    className="w-full h-16 rounded-lg mb-2"
                    style={{ backgroundColor: settings.primaryColor }}
                  ></div>
                  <p className="text-sm text-neutral-600">Primaire</p>
                </div>
                <div className="text-center">
                  <div 
                    className="w-full h-16 rounded-lg mb-2"
                    style={{ backgroundColor: settings.secondaryColor }}
                  ></div>
                  <p className="text-sm text-neutral-600">Secondaire</p>
                </div>
                <div className="text-center">
                  <div 
                    className="w-full h-16 rounded-lg mb-2"
                    style={{ backgroundColor: settings.accentColor }}
                  ></div>
                  <p className="text-sm text-neutral-600">Accent</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'seo':
        return (
          <div className="space-y-6">
            <Input
              label="Titre Meta par défaut"
              value={settings.metaTitle}
              onChange={(e) => handleInputChange('metaTitle', e.target.value)}
              placeholder="Titre qui apparaît dans les résultats de recherche"
            />
            
            <Textarea
              label="Description Meta par défaut"
              value={settings.metaDescription}
              onChange={(e) => handleInputChange('metaDescription', e.target.value)}
              placeholder="Description qui apparaît dans les résultats de recherche"
              rows={3}
            />
            
            <Input
              label="Mots-clés Meta"
              value={settings.metaKeywords}
              onChange={(e) => handleInputChange('metaKeywords', e.target.value)}
              placeholder="mot-clé1, mot-clé2, mot-clé3"
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Google Analytics ID"
                value={settings.googleAnalytics}
                onChange={(e) => handleInputChange('googleAnalytics', e.target.value)}
                placeholder="GA-XXXXXXXXX-X"
              />
              
              <Input
                label="Facebook Pixel ID"
                value={settings.facebookPixel}
                onChange={(e) => handleInputChange('facebookPixel', e.target.value)}
                placeholder="123456789012345"
              />
            </div>
          </div>
        );

      case 'maintenance':
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="maintenanceMode"
                checked={settings.maintenanceMode}
                onChange={(e) => handleInputChange('maintenanceMode', e.target.checked)}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
              />
              <label htmlFor="maintenanceMode" className="text-sm font-medium text-neutral-700">
                Activer le mode maintenance
              </label>
            </div>
            
            <Textarea
              label="Message de maintenance"
              value={settings.maintenanceMessage}
              onChange={(e) => handleInputChange('maintenanceMessage', e.target.value)}
              placeholder="Message affiché aux visiteurs pendant la maintenance"
              rows={4}
            />
            
            {settings.maintenanceMode && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800">
                      Mode maintenance activé
                    </h3>
                    <div className="mt-2 text-sm text-yellow-700">
                      <p>Le site est actuellement en mode maintenance. Seuls les administrateurs peuvent y accéder.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-neutral-900 mb-2">Paramètres du Site</h1>
              <p className="text-neutral-600">Configurez les paramètres généraux de votre site</p>
            </div>
            <Button
              onClick={handleSave}
              isLoading={isLoading}
              className="flex items-center space-x-2"
            >
              <Save size={20} />
              <span>Sauvegarder</span>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Navigation des onglets */}
          <div className="lg:col-span-1">
            <Card padding="none">
              <div className="p-6 border-b border-neutral-200">
                <h2 className="font-bold text-lg text-primary-900">Configuration</h2>
              </div>
              <nav className="p-4">
                <ul className="space-y-2">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <li key={tab.id}>
                        <button
                          onClick={() => setActiveTab(tab.id)}
                          className={`
                            w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200
                            ${activeTab === tab.id
                              ? 'bg-primary-900 text-white shadow-md'
                              : 'text-neutral-700 hover:bg-neutral-100 hover:text-primary-900'
                            }
                          `}
                        >
                          <Icon size={20} />
                          <span className="font-medium">{tab.label}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </Card>
          </div>

          {/* Contenu des onglets */}
          <div className="lg:col-span-3">
            <Card>
              <h2 className="text-xl font-bold text-neutral-900 mb-6">
                {tabs.find(tab => tab.id === activeTab)?.label}
              </h2>
              {renderTabContent()}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SiteSettings;