import React, { useState } from 'react';
import { Search, Filter, Plus, Users, Calendar, Tag, Eye } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import ProjectCard from '../components/Projects/ProjectCard';
import CreateProjectModal from '../components/Projects/CreateProjectModal';
import { mockProjects } from '../data/mockData';
import { Project } from '../types';

const Projects: React.FC = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const categories = ['all', 'Intelligence Artificielle', 'Développement Mobile', 'Sciences', 'Informatique', 'Biotechnologie', 'Robotique', 'Cybersécurité', 'Data Science'];
  const statuses = ['all', 'active', 'completed', 'paused'];

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Actif';
      case 'completed': return 'Terminé';
      case 'paused': return 'En pause';
      default: return status;
    }
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || project.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleCreateProject = (projectData: any) => {
    const newProject: Project = {
      id: Date.now().toString(),
      ...projectData,
      resources: []
    };
    
    setProjects(prev => [newProject, ...prev]);
  };

  const handleJoinProject = (projectId: string) => {
    if (!user) return;
    
    setProjects(prev => prev.map(project => {
      if (project.id === projectId && !project.participants.some(p => p.id === user.id)) {
        return {
          ...project,
          participants: [...project.participants, user]
        };
      }
      return project;
    }));
  };

  const handleViewProject = (projectId: string) => {
    // Ici vous pourriez naviguer vers une page de détail du projet
    console.log('Voir le projet:', projectId);
  };

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
            {user && (user.userType === 'teacher' || user.userType === 'admin' || user.userType === 'student') && (
              <Button 
                className="flex items-center space-x-2"
                onClick={() => setIsCreateModalOpen(true)}
              >
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
            <ProjectCard
              key={project.id}
              project={project}
              onJoin={handleJoinProject}
              onView={handleViewProject}
            />
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
                {projects.length}
              </div>
              <div className="text-neutral-600">Projets au total</div>
            </div>
          </Card>
          <Card className="text-center">
            <div className="space-y-2">
              <div className="text-2xl font-bold text-success-900">
                {projects.filter(p => p.status === 'active').length}
              </div>
              <div className="text-neutral-600">Projets actifs</div>
            </div>
          </Card>
          <Card className="text-center">
            <div className="space-y-2">
              <div className="text-2xl font-bold text-secondary-900">
                {Array.from(new Set(projects.flatMap(p => p.participants.map(participant => participant.id)))).length}
              </div>
              <div className="text-neutral-600">Participants uniques</div>
            </div>
          </Card>
        </div>

        {/* Create Project Modal */}
        <CreateProjectModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={handleCreateProject}
        />
      </div>
    </div>
  );
};

export default Projects;