import React, { useState } from 'react';
import { Upload, Search, Grid, List, Trash2, Download, Eye, Filter } from 'lucide-react';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import Modal from '../../components/UI/Modal';

interface MediaItem {
  id: string;
  name: string;
  type: 'image' | 'video' | 'document' | 'audio';
  url: string;
  size: number;
  uploadDate: Date;
  dimensions?: { width: number; height: number };
  alt?: string;
}

const MediaLibrary: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // Mock data
  const [mediaItems] = useState<MediaItem[]>([
    {
      id: '1',
      name: 'campus-esst.jpg',
      type: 'image',
      url: 'https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=800',
      size: 2048000,
      uploadDate: new Date(Date.now() - 86400000),
      dimensions: { width: 1920, height: 1080 },
      alt: 'Campus ESST'
    },
    {
      id: '2',
      name: 'formation-ia.jpg',
      type: 'image',
      url: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
      size: 1536000,
      uploadDate: new Date(Date.now() - 172800000),
      dimensions: { width: 1600, height: 900 },
      alt: 'Formation Intelligence Artificielle'
    },
    {
      id: '3',
      name: 'presentation-esst.pdf',
      type: 'document',
      url: '#',
      size: 5120000,
      uploadDate: new Date(Date.now() - 259200000),
    },
    {
      id: '4',
      name: 'laboratoire-recherche.jpg',
      type: 'image',
      url: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=800',
      size: 1843200,
      uploadDate: new Date(Date.now() - 345600000),
      dimensions: { width: 1800, height: 1200 },
      alt: 'Laboratoire de recherche'
    }
  ]);

  const mediaTypes = ['all', 'image', 'video', 'document', 'audio'];

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'image': return '🖼️';
      case 'video': return '🎥';
      case 'document': return '📄';
      case 'audio': return '🎵';
      default: return '📁';
    }
  };

  const filteredMedia = mediaItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || item.type === selectedType;
    return matchesSearch && matchesType;
  });

  const handleUpload = (files: FileList | null) => {
    if (!files) return;
    
    // Ici vous pourriez implémenter l'upload réel
    console.log('Fichiers à uploader:', files);
    setIsUploadModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
            <div>
              <h1 className="text-3xl font-bold text-neutral-900 mb-2">Bibliothèque Média</h1>
              <p className="text-neutral-600">Gérez vos fichiers et médias</p>
            </div>
            <Button
              onClick={() => setIsUploadModalOpen(true)}
              className="flex items-center space-x-2"
            >
              <Upload size={20} />
              <span>Télécharger des fichiers</span>
            </Button>
          </div>
        </div>

        {/* Filtres et contrôles */}
        <Card className="mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" size={20} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Rechercher des fichiers..."
                  className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                {mediaTypes.map(type => (
                  <option key={type} value={type}>
                    {type === 'all' ? 'Tous les types' : type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === 'grid' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid size={16} />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List size={16} />
              </Button>
            </div>
          </div>
        </Card>

        {/* Grille/Liste des médias */}
        <Card padding="none">
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 p-6">
              {filteredMedia.map((item) => (
                <div
                  key={item.id}
                  className="group relative bg-white border border-neutral-200 rounded-lg overflow-hidden hover:shadow-md transition-all duration-200 cursor-pointer"
                  onClick={() => setSelectedMedia(item)}
                >
                  {item.type === 'image' ? (
                    <img
                      src={item.url}
                      alt={item.alt || item.name}
                      className="w-full h-32 object-cover"
                    />
                  ) : (
                    <div className="w-full h-32 bg-neutral-100 flex items-center justify-center">
                      <span className="text-4xl">{getTypeIcon(item.type)}</span>
                    </div>
                  )}
                  
                  <div className="p-3">
                    <p className="text-sm font-medium text-neutral-900 truncate" title={item.name}>
                      {item.name}
                    </p>
                    <p className="text-xs text-neutral-500">
                      {formatFileSize(item.size)}
                    </p>
                  </div>
                  
                  {/* Actions au survol */}
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center space-x-2">
                    <Button size="sm" variant="ghost" className="bg-white text-neutral-900">
                      <Eye size={16} />
                    </Button>
                    <Button size="sm" variant="ghost" className="bg-white text-neutral-900">
                      <Download size={16} />
                    </Button>
                    <Button size="sm" variant="danger" className="bg-red-600 text-white">
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-neutral-50 border-b border-neutral-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">Fichier</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">Type</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">Taille</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">Date</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  {filteredMedia.map((item) => (
                    <tr key={item.id} className="hover:bg-neutral-50 transition-colors duration-200">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          {item.type === 'image' ? (
                            <img
                              src={item.url}
                              alt={item.alt || item.name}
                              className="w-10 h-10 object-cover rounded"
                            />
                          ) : (
                            <div className="w-10 h-10 bg-neutral-100 rounded flex items-center justify-center">
                              <span className="text-lg">{getTypeIcon(item.type)}</span>
                            </div>
                          )}
                          <div>
                            <p className="font-medium text-neutral-900">{item.name}</p>
                            {item.dimensions && (
                              <p className="text-sm text-neutral-500">
                                {item.dimensions.width} × {item.dimensions.height}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-neutral-700 capitalize">
                        {item.type}
                      </td>
                      <td className="px-6 py-4 text-sm text-neutral-700">
                        {formatFileSize(item.size)}
                      </td>
                      <td className="px-6 py-4 text-sm text-neutral-700">
                        {item.uploadDate.toLocaleDateString('fr-FR')}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setSelectedMedia(item)}
                          >
                            <Eye size={16} />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Download size={16} />
                          </Button>
                          <Button size="sm" variant="ghost" className="text-red-600 hover:text-red-700">
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>

        {/* Modal d'upload */}
        <Modal
          isOpen={isUploadModalOpen}
          onClose={() => setIsUploadModalOpen(false)}
          title="Télécharger des fichiers"
          size="lg"
        >
          <div className="space-y-6">
            <div className="border-2 border-dashed border-neutral-300 rounded-lg p-8 text-center">
              <Upload size={48} className="mx-auto text-neutral-400 mb-4" />
              <h3 className="text-lg font-medium text-neutral-900 mb-2">
                Glissez-déposez vos fichiers ici
              </h3>
              <p className="text-neutral-600 mb-4">
                ou cliquez pour sélectionner des fichiers
              </p>
              <input
                type="file"
                multiple
                onChange={(e) => handleUpload(e.target.files)}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload">
                <Button as="span" className="cursor-pointer">
                  Sélectionner des fichiers
                </Button>
              </label>
            </div>
            
            <div className="text-sm text-neutral-600">
              <p>Formats supportés: JPG, PNG, GIF, PDF, DOC, MP4, MP3</p>
              <p>Taille maximale: 10 MB par fichier</p>
            </div>
          </div>
        </Modal>

        {/* Modal de prévisualisation */}
        {selectedMedia && (
          <Modal
            isOpen={!!selectedMedia}
            onClose={() => setSelectedMedia(null)}
            title={selectedMedia.name}
            size="xl"
          >
            <div className="space-y-6">
              {selectedMedia.type === 'image' ? (
                <img
                  src={selectedMedia.url}
                  alt={selectedMedia.alt || selectedMedia.name}
                  className="w-full max-h-96 object-contain rounded-lg"
                />
              ) : (
                <div className="w-full h-48 bg-neutral-100 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <span className="text-6xl mb-4 block">{getTypeIcon(selectedMedia.type)}</span>
                    <p className="text-lg font-medium text-neutral-900">{selectedMedia.name}</p>
                  </div>
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium text-neutral-900">Type:</p>
                  <p className="text-neutral-600 capitalize">{selectedMedia.type}</p>
                </div>
                <div>
                  <p className="font-medium text-neutral-900">Taille:</p>
                  <p className="text-neutral-600">{formatFileSize(selectedMedia.size)}</p>
                </div>
                {selectedMedia.dimensions && (
                  <>
                    <div>
                      <p className="font-medium text-neutral-900">Dimensions:</p>
                      <p className="text-neutral-600">
                        {selectedMedia.dimensions.width} × {selectedMedia.dimensions.height}
                      </p>
                    </div>
                  </>
                )}
                <div>
                  <p className="font-medium text-neutral-900">Date d'upload:</p>
                  <p className="text-neutral-600">
                    {selectedMedia.uploadDate.toLocaleDateString('fr-FR')}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-neutral-200">
                <Button variant="ghost">
                  <Download size={16} className="mr-2" />
                  Télécharger
                </Button>
                <Button variant="danger">
                  <Trash2 size={16} className="mr-2" />
                  Supprimer
                </Button>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default MediaLibrary;