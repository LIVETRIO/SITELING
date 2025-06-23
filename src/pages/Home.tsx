import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, BookOpen, Award, Globe, ChevronRight, Search, Phone, Mail } from 'lucide-react';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import { mockNews } from '../data/mockData';

const Home: React.FC = () => {
  const stats = [
    { icon: Users, label: 'Étudiants', value: '2,500+' },
    { icon: BookOpen, label: 'Formations', value: '25+' },
    { icon: Award, label: 'Diplômés', value: '10,000+' },
    { icon: Globe, label: 'Partenaires Internationaux', value: '50+' },
  ];

  const quickLinks = [
    {
      title: 'Formations',
      description: 'Découvrez nos parcours académiques d\'excellence',
      items: ['Parcours académiques', 'Admissions', 'Vie étudiante'],
      link: '/formations',
      color: 'bg-gradient-to-br from-primary-900 to-primary-700',
    },
    {
      title: 'Recherche',
      description: 'Innovation et excellence scientifique',
      items: ['Laboratoires', 'Publications', 'Projets collaboratifs'],
      link: '/recherche',
      color: 'bg-gradient-to-br from-secondary-900 to-secondary-700',
    },
    {
      title: 'Actualités',
      description: 'Restez informé de nos dernières nouvelles',
      items: ['Événements', 'Annonces', 'Newsletter'],
      link: '/actualites',
      color: 'bg-gradient-to-br from-success-900 to-success-700',
    },
  ];

  const institutionalLinks = [
    {
      title: 'Présentation ESST',
      description: 'Histoire, mission et valeurs de notre institution',
      link: '/presentation',
      icon: BookOpen,
    },
    {
      title: 'Facultés & Départements',
      description: 'Découvrez notre organisation académique',
      link: '/facultes',
      icon: Users,
    },
    {
      title: 'Vie Étudiante',
      description: 'Services, associations et activités',
      link: '/vie-etudiante',
      icon: Award,
    },
    {
      title: 'Relations Internationales',
      description: 'Partenariats et programmes d\'échange',
      link: '/international',
      icon: Globe,
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-900 via-primary-800 to-secondary-900 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  Bienvenue à l'
                  <span className="text-accent-900">ESST</span>
                </h1>
                <p className="text-xl lg:text-2xl opacity-90 leading-relaxed">
                  École Supérieure des Sciences et Technologies - Découvrez notre plateforme 
                  collaborative universitaire où l'excellence académique rencontre l'innovation technologique.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="group">
                  <Link to="/formations" className="flex items-center space-x-2 w-full">
                    <span>Découvrir nos formations</span>
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-200" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="bg-white bg-opacity-10 border-white text-white hover:bg-white hover:text-primary-900">
                  <Link to="/presentation">En savoir plus</Link>
                </Button>
              </div>

              {/* Quick Contact */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <div className="flex items-center space-x-2 text-white opacity-90">
                  <Phone size={16} />
                  <span className="text-sm">+33 1 23 45 67 89</span>
                </div>
                <div className="flex items-center space-x-2 text-white opacity-90">
                  <Mail size={16} />
                  <span className="text-sm">contact@esst.edu</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <img 
                src="https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Campus ESST"
                className="rounded-2xl shadow-2xl w-full h-96 object-cover animate-slide-up"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-900 via-transparent to-transparent opacity-30 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 -mt-8 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-all duration-300" hover>
                  <div className="space-y-4">
                    <div className="w-16 h-16 bg-primary-900 rounded-full flex items-center justify-center mx-auto">
                      <Icon size={24} className="text-white" />
                    </div>
                    <div>
                      <div className="text-2xl lg:text-3xl font-bold text-primary-900">
                        {stat.value}
                      </div>
                      <div className="text-neutral-600 font-medium">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Institutional Links Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900">
              Découvrez l'ESST
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Une institution d'excellence dédiée à la formation et à la recherche 
              dans les sciences et technologies
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {institutionalLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <Link key={index} to={link.link} className="group">
                  <Card className="h-full hover:shadow-lg transition-all duration-300" hover>
                    <div className="text-center space-y-4">
                      <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto group-hover:bg-primary-900 transition-colors duration-300">
                        <Icon size={24} className="text-primary-900 group-hover:text-white transition-colors duration-300" />
                      </div>
                      <div>
                        <h3 className="font-bold text-neutral-900 group-hover:text-primary-900 transition-colors duration-300 mb-2">
                          {link.title}
                        </h3>
                        <p className="text-sm text-neutral-600 leading-relaxed">
                          {link.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900">
              Explorez nos Domaines
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Découvrez nos différents domaines d'excellence et trouvez votre voie 
              vers un avenir brillant
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {quickLinks.map((section, index) => (
              <div key={index} className="group">
                <Card className="h-full hover:shadow-xl transition-all duration-300 overflow-hidden" padding="none">
                  <div className={`${section.color} p-6 text-white`}>
                    <h3 className="text-2xl font-bold mb-2">{section.title}</h3>
                    <p className="opacity-90">{section.description}</p>
                  </div>
                  <div className="p-6 space-y-4">
                    <ul className="space-y-2">
                      {section.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-center space-x-2 text-neutral-700">
                          <ChevronRight size={16} className="text-primary-900" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <Link 
                      to={section.link}
                      className="inline-flex items-center space-x-2 text-primary-900 font-medium hover:text-primary-700 transition-colors duration-200 group-hover:translate-x-1 transform"
                    >
                      <span>Découvrir</span>
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 space-y-4 lg:space-y-0">
            <div className="space-y-2">
              <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900">
                Actualités Récentes
              </h2>
              <p className="text-xl text-neutral-600">
                Restez au courant des dernières nouvelles de l'ESST
              </p>
            </div>
            <Link 
              to="/actualites"
              className="inline-flex items-center space-x-2 text-primary-900 font-medium hover:text-primary-700 transition-colors duration-200"
            >
              <span>Voir toutes les actualités</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {mockNews.slice(0, 2).map((news) => (
              <Card key={news.id} className="overflow-hidden hover:shadow-lg" hover padding="none">
                <img 
                  src={news.imageUrl}
                  alt={news.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6 space-y-4">
                  <div className="flex items-center space-x-4 text-sm text-neutral-600">
                    <span className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full">
                      {news.category}
                    </span>
                    <span>{news.publishedAt.toLocaleDateString('fr-FR')}</span>
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900 hover:text-primary-900 transition-colors duration-200">
                    {news.title}
                  </h3>
                  <p className="text-neutral-700 leading-relaxed">
                    {news.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-neutral-600">
                      Par {news.author}
                    </span>
                    <Link 
                      to={`/actualites/${news.id}`}
                      className="inline-flex items-center space-x-1 text-primary-900 font-medium hover:text-primary-700 transition-colors duration-200"
                    >
                      <span>Lire plus</span>
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-16 bg-neutral-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-neutral-900 mb-4">
            Recherchez sur notre plateforme
          </h2>
          <p className="text-xl text-neutral-600 mb-8">
            Trouvez rapidement les informations, formations ou ressources que vous cherchez
          </p>
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400" size={24} />
            <input
              type="text"
              placeholder="Rechercher formations, actualités, projets..."
              className="w-full pl-12 pr-6 py-4 text-lg border border-neutral-300 rounded-full focus:ring-2 focus:ring-primary-500 focus:border-primary-500 shadow-lg"
            />
            <Button className="absolute right-2 top-2 rounded-full px-6">
              Rechercher
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-900 to-secondary-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-3xl lg:text-4xl font-bold">
            Rejoignez la Communauté ESST
          </h2>
          <p className="text-xl opacity-90 leading-relaxed">
            Découvrez comment notre plateforme collaborative peut transformer 
            votre expérience universitaire et académique.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-accent-900 hover:bg-accent-800 text-primary-900">
              <Link to="/login">Accéder à la plateforme</Link>
            </Button>
            <Button variant="outline" size="lg" className="bg-transparent border-white text-white hover:bg-white hover:text-primary-900">
              <Link to="/contact">Nous contacter</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;