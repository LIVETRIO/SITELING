import React from 'react';
import { User, BookOpen, GraduationCap, Eye } from 'lucide-react';
import Card from '../UI/Card';

interface UserTypeStepProps {
  selectedType: string;
  onTypeSelect: (type: string) => void;
}

const UserTypeStep: React.FC<UserTypeStepProps> = ({ selectedType, onTypeSelect }) => {
  const userTypes = [
    {
      id: 'admin',
      title: 'Administrateur',
      description: 'Gestion complète de la plateforme et des utilisateurs',
      icon: User,
      color: 'from-primary-900 to-primary-700',
      features: ['Gestion des utilisateurs', 'Administration système', 'Contrôle total']
    },
    {
      id: 'teacher',
      title: 'Enseignant',
      description: 'Création de cours, gestion des étudiants et projets',
      icon: BookOpen,
      color: 'from-secondary-900 to-secondary-700',
      features: ['Création de cours', 'Gestion des étudiants', 'Supervision de projets']
    },
    {
      id: 'student',
      title: 'Étudiant',
      description: 'Accès aux cours, participation aux projets collaboratifs',
      icon: GraduationCap,
      color: 'from-success-900 to-success-700',
      features: ['Accès aux cours', 'Projets collaboratifs', 'Ressources pédagogiques']
    },
    {
      id: 'visitor',
      title: 'Visiteur',
      description: 'Découverte des formations et informations générales',
      icon: Eye,
      color: 'from-accent-900 to-accent-700',
      features: ['Catalogue formations', 'Informations générales', 'Demandes de renseignements']
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-neutral-900">Choisissez votre profil</h2>
        <p className="text-neutral-600">Sélectionnez le type de compte qui correspond à votre situation</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {userTypes.map((type) => {
          const Icon = type.icon;
          const isSelected = selectedType === type.id;
          
          return (
            <Card
              key={type.id}
              className={`
                cursor-pointer transition-all duration-200 hover:shadow-lg
                ${isSelected 
                  ? 'ring-2 ring-primary-500 shadow-lg' 
                  : 'hover:shadow-md'
                }
              `}
              onClick={() => onTypeSelect(type.id)}
              padding="lg"
            >
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${type.color} rounded-xl flex items-center justify-center`}>
                    <Icon size={24} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-neutral-900">{type.title}</h3>
                    <p className="text-sm text-neutral-600">{type.description}</p>
                  </div>
                  {isSelected && (
                    <div className="w-6 h-6 bg-primary-900 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  )}
                </div>

                {/* Features */}
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-neutral-900">Fonctionnalités incluses :</h4>
                  <ul className="space-y-1">
                    {type.features.map((feature, index) => (
                      <li key={index} className="text-sm text-neutral-700 flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-primary-900 rounded-full"></div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default UserTypeStep;