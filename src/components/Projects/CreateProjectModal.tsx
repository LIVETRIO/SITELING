import React, { useState } from 'react';
import { Tag, Users, FileText } from 'lucide-react';
import Modal from '../UI/Modal';
import Input from '../UI/Input';
import Textarea from '../UI/Textarea';
import Button from '../UI/Button';
import { useAuth } from '../../context/AuthContext';

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (projectData: any) => void;
}

const CreateProjectModal: React.FC<CreateProjectModalProps> = ({
  isOpen,
  onClose,
  onSubmit
}) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    tags: '',
    maxParticipants: 5
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    'Intelligence Artificielle',
    'Développement Mobile',
    'Sciences',
    'Informatique',
    'Biotechnologie',
    'Robotique',
    'Cybersécurité',
    'Data Science'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const projectData = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        createdBy: user?.id,
        createdAt: new Date(),
        status: 'active',
        participants: user ? [user] : []
      };

      await onSubmit(projectData);
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        category: '',
        tags: '',
        maxParticipants: 5
      });
      
      onClose();
    } catch (error) {
      console.error('Erreur lors de la création du projet:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Créer un nouveau projet" size="lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Titre du projet"
          value={formData.title}
          onChange={(e) => handleChange('title', e.target.value)}
          placeholder="Ex: Système de recommandation IA"
          required
          icon={<FileText size={20} />}
        />

        <Textarea
          label="Description"
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          placeholder="Décrivez votre projet en détail..."
          rows={4}
          required
        />

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Catégorie
          </label>
          <select
            value={formData.category}
            onChange={(e) => handleChange('category', e.target.value)}
            className="block w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            required
          >
            <option value="">Sélectionner une catégorie</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <Input
          label="Tags (séparés par des virgules)"
          value={formData.tags}
          onChange={(e) => handleChange('tags', e.target.value)}
          placeholder="Ex: IA, Python, Machine Learning"
          icon={<Tag size={20} />}
        />

        <Input
          label="Nombre maximum de participants"
          type="number"
          value={formData.maxParticipants}
          onChange={(e) => handleChange('maxParticipants', parseInt(e.target.value))}
          min={2}
          max={20}
          icon={<Users size={20} />}
        />

        <div className="flex items-center justify-end space-x-4 pt-6 border-t border-neutral-200">
          <Button
            type="button"
            variant="ghost"
            onClick={onClose}
            disabled={isSubmitting}
          >
            Annuler
          </Button>
          <Button
            type="submit"
            isLoading={isSubmitting}
            disabled={!formData.title || !formData.description || !formData.category}
          >
            Créer le projet
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateProjectModal;