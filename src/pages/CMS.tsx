import React, { useState } from 'react';
import { Search, Plus, Edit, Trash2, Eye, Filter } from 'lucide-react';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import { mockPages } from '../data/mockData';
import { Page } from '../types';

const CMS: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('pages');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sectionFilter, setSectionFilter] = useState('all');

  const tabs = [
    { id: 'pages', label: 'Pages', count: mockPages.length },
    { id: 'news', label: 'Actualités', count: 15 },
    { id: 'events', label: 'Événements', count: 8 },
    { id: 'formations', label: 'Formations', count: 12 },
    { id: 'media', label: 'Médias', count: 45 },
    { id: 'settings', label: 'Paramètres', count: 0 },
  ];

  const statuses = ['all', 'published', 'draft', 'review'];
  const sections = ['all', 'Institution', 'Formation', 'Recherche', 'Admission'];

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'published': return 'Publié';
      case 'draft': return 'Brouillon';
      case 'review': return 'Révision';
      default: return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-success-100 text-success-800';
      case 'draft': return 'bg-accent-100 text-accent-800';
      case 'review': return 'bg-secondary-100 text-secondary-800';
      default: return 'bg-neutral-100 text-neutral-800';
    }
  };

  const filteredPages = mockPages.filter(page => {
    const matchesSearch = page.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || page.status === statusFilter;
    const matchesSection = sectionFilter === 'all' || page.section === sectionFilter;
    
    return matchesSearch && matchesStatus && matchesSection;
  });

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
            <div>
              <h1 className="text-3xl font-bold text-neutral-900 mb-2">Gestion du Contenu</h1>
              <p className="text-neutral-600">Administrez le contenu de la plateforme ESST</p>
            </div>
            <Button className="flex items-center space-x-2">
              <Plus size={20} />
              <span>Nouveau Contenu</span>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card padding="none">
              <div className="p-6 border-b border-neutral-200">
                <h2 className="font-bold text-lg text-primary-900">Gestion de Contenu</h2>
              </div>
              
              <nav className="p-4">
                <ul className="space-y-2">
                  {tabs.map((tab) => (
                    <li key={tab.id}>
                      <button
                        onClick={() => setSelectedTab(tab.id)}
                        className={`
                          w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-all duration-200
                          ${selectedTab === tab.id
                            ? 'bg-primary-900 text-white shadow-md'
                            : 'text-neutral-700 hover:bg-neutral-100 hover:text-primary-900'
                          }
                        `}
                      >
                        <span className="font-medium">{tab.label}</span>
                        {tab.count > 0 && (
                          <span className={`
                            text-xs px-2 py-1 rounded-full
                            ${selectedTab === tab.id
                              ? 'bg-white bg-opacity-20 text-white'
                              : 'bg-neutral-200 text-neutral-600'
                            }
                          `}>
                            {tab.count}
                          </span>
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card padding="none">
              {/* Content Header */}
              <div className="p-6 border-b border-neutral-200">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
                  <h2 className="text-xl font-bold text-neutral-900">
                    Gestion des {tabs.find(t => t.id === selectedTab)?.label}
                  </h2>
                  <Button className="flex items-center space-x-2">
                    <Plus size={20} />
                    <span>Nouvelle Page</span>
                  </Button>
                </div>
              </div>

              {/* Filters */}
              <div className="p-6 border-b border-neutral-200 bg-neutral-50">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                  <div className="lg:col-span-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" size={20} />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Rechercher..."
                        className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    >
                      {statuses.map(status => (
                        <option key={status} value={status}>
                          {status === 'all' ? 'Tous les statuts' : getStatusLabel(status)}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <select
                      value={sectionFilter}
                      onChange={(e) => setSectionFilter(e.target.value)}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    >
                      {sections.map(section => (
                        <option key={section} value={section}>
                          {section === 'all' ? 'Toutes les sections' : section}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Pages Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-neutral-50 border-b border-neutral-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">Titre</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">Statut</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">Section</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">Dernière modif.</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">Auteur</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200">
                    {filteredPages.map((page) => (
                      <tr key={page.id} className="hover:bg-neutral-50 transition-colors duration-200">
                        <td className="px-6 py-4">
                          <div className="font-medium text-neutral-900">{page.title}</div>
                          <div className="text-sm text-neutral-500">/{page.slug}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(page.status)}`}>
                            {getStatusLabel(page.status)}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-neutral-700">
                          {page.section}
                        </td>
                        <td className="px-6 py-4 text-sm text-neutral-700">
                          {page.lastModified.toLocaleDateString('fr-FR')}
                        </td>
                        <td className="px-6 py-4 text-sm text-neutral-700">
                          {page.author}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <button className="p-2 text-neutral-600 hover:text-primary-900 hover:bg-primary-50 rounded-lg transition-colors duration-200">
                              <Eye size={16} />
                            </button>
                            <button className="p-2 text-neutral-600 hover:text-secondary-900 hover:bg-secondary-50 rounded-lg transition-colors duration-200">
                              <Edit size={16} />
                            </button>
                            <button className="p-2 text-neutral-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="px-6 py-4 border-t border-neutral-200 bg-neutral-50">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-neutral-700">
                    Affichage de 1 à {filteredPages.length} sur {mockPages.length} pages
                  </p>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" disabled>
                      Précédent
                    </Button>
                    <Button variant="ghost" size="sm" className="bg-primary-900 text-white">
                      1
                    </Button>
                    <Button variant="ghost" size="sm">
                      2
                    </Button>
                    <Button variant="ghost" size="sm">
                      Suivant
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CMS;