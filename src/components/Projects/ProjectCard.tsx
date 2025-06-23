import React from 'react';
import { Calendar, Tag, Users, Eye, UserPlus } from 'lucide-react';
import Card from '../UI/Card';
import Button from '../UI/Button';
import { Project } from '../../types';
import { useAuth } from '../../context/AuthContext';

interface ProjectCardProps {
  project: Project;
  onJoin?: (projectId: string) => void;
  onView?: (projectId: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onJoin, onView }) => {
  const { user } = useAuth();
  
  const isParticipant = user && project.participants.some(p => p.id === user.id);
  const canJoin = user && !isParticipant && project.status === 'active';

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

  return (
    <Card className="hover:shadow-lg transition-all duration-200 h-full" hover>
      <div className="flex flex-col h-full space-y-4">
        {/* Header */}
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

        {/* Description */}
        <p className="text-neutral-700 text-sm line-clamp-3 leading-relaxed flex-grow">
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
        <div className="flex items-center justify-between pt-4 border-t border-neutral-200 mt-auto">
          <div className="flex items-center space-x-2 text-sm text-neutral-600">
            <Calendar size={16} />
            <span>Créé le {project.createdAt.toLocaleDateString('fr-FR')}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex items-center space-x-1"
              onClick={() => onView?.(project.id)}
            >
              <Eye size={16} />
              <span>Voir</span>
            </Button>
            {canJoin && (
              <Button 
                size="sm"
                onClick={() => onJoin?.(project.id)}
                className="flex items-center space-x-1"
              >
                <UserPlus size={16} />
                <span>Rejoindre</span>
              </Button>
            )}
            {isParticipant && (
              <span className="text-xs bg-success-100 text-success-800 px-2 py-1 rounded-full">
                Participant
              </span>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProjectCard;