import React, { useState } from 'react';
import { Search, Filter, Plus, Users, Calendar, Tag, Eye } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import { mockProjects } from '../data/mockData';

const Projects: React.FC = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const categories = ['all', 'Intelligence Artificielle', 'Développement Mobile', 'Sciences', 'Informatique'];
  const statuses = ['all', 'active', 'completed', 'paused'];

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Actif';
      case 'completed': return 'Terminé';
      case 'paused': return 'En pause';
      default: return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-success-100 text-success-800';
      case 'completed': return 'bg-primary-100 text-primary-800';
      case 'paused': return 'bg-neutral-100 text-neutral-800';
      default: return 'bg-neutral-100 text-neutral-800';
    }
  };

  const filteredProjects = mockProjects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || project.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
            <div>
              <h1 className="text-3xl font-bold text-neutral-900 mb-2">Projets Collaboratifs</h1>
              <p className="text-neutral-600">Découvrez et participez aux projets de la communauté ESST</p>
            </div>
            {user && (user.userType === 'teacher' || user.userType === 'admin') && (
              <Button className="flex items-center space-x-2">
                <Plus size={20} />
                <span>Nouveau Projet</span>
              </Button>
            )}
          </div>
        </div>

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
                  placeholder="Rechercher un projet..."
                  className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'Toutes les catégories' : category}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                {statuses.map(status => (
                  <option key={status} value={status}>
                    {status === 'all' ? 'Tous les statuts' : getStatusLabel(status)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </Card>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="hover:shadow-lg transition-all duration-200" hover>
              <div className="space-y-4">
                {/* Project Header */}
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                        {getStatusLabel(project.status)}
                      </span>
                      <span className="text-xs text-neutral-500">
                        {project.createdAt.toLocaleDateString('fr-FR')}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-neutral-900 mb-2 line-clamp-2">
                      {project.title}
                    </h3>
                  </div>
                </div>

                {/* Project Description */}
                <p className="text-neutral-700 text-sm line-clamp-3 leading-relaxed">
                  {project.description}
                </p>

                {/* Category */}
                <div className="flex items-center space-x-2">
                  <Tag size={16} className="text-primary-900" />
                  <span className="text-sm font-medium text-primary-900">
                    {project.category}
                  </span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.slice(0, 3).map((tag, index) => (
                    <span 
                      key={index}
                      className="bg-neutral-100 text-neutral-700 text-xs px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 3 && (
                    <span className="bg-neutral-100 text-neutral-700 text-xs px-2 py-1 rounded-full">
                      +{project.tags.length - 3}
                    </span>
                  )}
                </div>

                {/* Participants */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users size={16} className="text-neutral-600" />
                    <div className="flex -space-x-2">
                      {project.participants.slice(0, 4).map((participant, index) => (
                        <div 
                          key={participant.id}
                          className="w-8 h-8 bg-primary-900 rounded-full border-2 border-white flex items-center justify-center"
                          title={`${participant.firstName} ${participant.lastName}`}
                        >
                          <span className="text-white text-xs font-medium">
                            {participant.firstName[0]}{participant.lastName[0]}
                          </span>
                        </div>
                      ))}
                      {project.participants.length > 4 && (
                        <div className="w-8 h-8 bg-neutral-400 rounded-full border-2 border-white flex items-center justify-center">
                          <span className="text-white text-xs">
                            +{project.participants.length - 4}
                          </span>
                        </div>
                      )}
                    </div>
                    <span className="text-sm text-neutral-600 ml-2">
                      {project.participants.length} participant{project.participants.length > 1 ? 's' : ''}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-neutral-200">
                  <div className="flex items-center space-x-2 text-sm text-neutral-600">
                    <Calendar size={16} />
                    <span>Créé le {project.createdAt.toLocaleDateString('fr-FR')}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" className="flex items-center space-x-1">
                      <Eye size={16} />
                      <span>Voir</span>
                    </Button>
                    <Button size="sm">
                      Rejoindre
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <Card className="text-center py-12">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-neutral-200 rounded-full flex items-center justify-center mx-auto">
                <Search size={32} className="text-neutral-400" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-neutral-900 mb-2">
                  Aucun projet trouvé
                </h3>
                <p className="text-neutral-600">
                  Aucun projet ne correspond à vos critères de recherche.
                </p>
              </div>
              <Button 
                variant="ghost" 
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setSelectedStatus('all');
                }}
              >
                Réinitialiser les filtres
              </Button>
            </div>
          </Card>
        )}

        {/* Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="text-center">
            <div className="space-y-2">
              <div className="text-2xl font-bold text-primary-900">
                {mockProjects.length}
              </div>
              <div className="text-neutral-600">Projets au total</div>
            </div>
          </Card>
          <Card className="text-center">
            <div className="space-y-2">
              <div className="text-2xl font-bold text-success-900">
                {mockProjects.filter(p => p.status === 'active').length}
              </div>
              <div className="text-neutral-600">Projets actifs</div>
            </div>
          </Card>
          <Card className="text-center">
            <div className="space-y-2">
              <div className="text-2xl font-bold text-secondary-900">
                {Array.from(new Set(mockProjects.flatMap(p => p.participants.map(participant => participant.id)))).length}
              </div>
              <div className="text-neutral-600">Participants uniques</div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Projects;