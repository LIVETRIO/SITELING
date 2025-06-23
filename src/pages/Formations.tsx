import React, { useState } from 'react';
import { Search, Filter, BookOpen, Clock, Award, Users } from 'lucide-react';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import { mockFormations } from '../data/mockData';

const Formations: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  const levels = ['all', 'Licence', 'Master', 'Doctorat'];
  const departments = ['all', 'Informatique', 'Sciences', 'Technologies'];

  const filteredFormations = mockFormations.filter(formation => {
    const matchesSearch = formation.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         formation.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = selectedLevel === 'all' || formation.level === selectedLevel;
    const matchesDepartment = selectedDepartment === 'all' || formation.department === selectedDepartment;
    
    return matchesSearch && matchesLevel && matchesDepartment;
  });

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-900 to-secondary-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl lg:text-5xl font-bold">Nos Formations</h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Découvrez notre large gamme de formations d'excellence conçues pour préparer 
              les leaders de demain dans les sciences et technologies
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters */}
        <Card className="mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" size={20} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Rechercher une formation..."
                  className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>

            {/* Level Filter */}
            <div>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                {levels.map(level => (
                  <option key={level} value={level}>
                    {level === 'all' ? 'Tous les niveaux' : level}
                  </option>
                ))}
              </select>
            </div>

            {/* Department Filter */}
            <div>
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                {departments.map(department => (
                  <option key={department} value={department}>
                    {department === 'all' ? 'Tous les départements' : department}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </Card>

        {/* Formations Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredFormations.map((formation) => (
            <Card key={formation.id} className="hover:shadow-lg transition-all duration-200" hover>
              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-12 h-12 bg-primary-900 rounded-lg flex items-center justify-center">
                        <BookOpen size={24} className="text-white" />
                      </div>
                      <div>
                        <span className="bg-primary-100 text-primary-800 text-sm px-3 py-1 rounded-full font-medium">
                          {formation.level}
                        </span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-neutral-900 mb-2">
                      {formation.title}
                    </h3>
                  </div>
                </div>

                {/* Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2 text-neutral-600">
                    <Clock size={16} />
                    <span className="text-sm">{formation.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-neutral-600">
                    <Award size={16} />
                    <span className="text-sm">{formation.department}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-neutral-700 leading-relaxed">
                  {formation.description}
                </p>

                {/* Requirements */}
                <div>
                  <h4 className="font-semibold text-neutral-900 mb-2">Prérequis:</h4>
                  <ul className="space-y-1">
                    {formation.requirements.slice(0, 3).map((requirement, index) => (
                      <li key={index} className="text-sm text-neutral-700 flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-primary-900 rounded-full"></div>
                        <span>{requirement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Objectives */}
                <div>
                  <h4 className="font-semibold text-neutral-900 mb-2">Objectifs:</h4>
                  <ul className="space-y-1">
                    {formation.objectives.slice(0, 3).map((objective, index) => (
                      <li key={index} className="text-sm text-neutral-700 flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-success-900 rounded-full"></div>
                        <span>{objective}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-neutral-200">
                  <Button variant="ghost">
                    En savoir plus
                  </Button>
                  <Button>
                    Candidater
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredFormations.length === 0 && (
          <Card className="text-center py-12">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-neutral-200 rounded-full flex items-center justify-center mx-auto">
                <Search size={32} className="text-neutral-400" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-neutral-900 mb-2">
                  Aucune formation trouvée
                </h3>
                <p className="text-neutral-600">
                  Aucune formation ne correspond à vos critères de recherche.
                </p>
              </div>
              <Button 
                variant="ghost" 
                onClick={() => {
                  setSearchQuery('');
                  setSelectedLevel('all');
                  setSelectedDepartment('all');
                }}
              >
                Réinitialiser les filtres
              </Button>
            </div>
          </Card>
        )}

        {/* CTA Section */}
        <Card className="mt-12 bg-gradient-to-r from-primary-900 to-secondary-900 text-white" padding="lg">
          <div className="text-center space-y-6">
            <h2 className="text-3xl font-bold">Prêt à rejoindre l'ESST ?</h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Découvrez comment nos formations peuvent transformer votre avenir professionnel 
              et vous préparer aux défis de demain.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-accent-900 hover:bg-accent-800 text-primary-900">
                Processus d'admission
              </Button>
              <Button variant="outline" size="lg" className="bg-transparent border-white text-white hover:bg-white hover:text-primary-900">
                Nous contacter
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Formations;