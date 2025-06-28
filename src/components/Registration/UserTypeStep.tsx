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
      features: ['Gestion des utilisateurs', 'Administration système', 'Contrôle total'],
      requirements: 'Accès réservé au personnel autorisé'
    },
    {
      id: 'teacher',
      title: 'Enseignant',
      description: 'Création de cours, gestion des étudiants et projets',
      icon: BookOpen,
      color: 'from-secondary-900 to-secondary-700',
      features: ['Création de cours', 'Gestion des étudiants', 'Supervision de projets'],
      requirements: 'Personnel enseignant de l\'ESST'
    },
    {
      id: 'student',
      title: 'Étudiant',
      description: 'Accès aux cours, participation aux projets collaboratifs',
      icon: GraduationCap,
      color: 'from-success-900 to-success-700',
      features: ['Accès aux cours', 'Projets collaboratifs', 'Ressources pédagogiques'],
      requirements: 'Étudiant inscrit à l\'ESST'
    },
    {
      id: 'visitor',
      title: 'Visiteur',
      description: 'Découverte des formations et informations générales',
      icon: Eye,
      color: 'from-accent-900 to-accent-700',
      features: ['Catalogue formations', 'Informations générales', 'Demandes de renseignements'],
      requirements: 'Ouvert à tous les visiteurs'
    }
  ];

  const handleTypeSelect = (typeId: string) => {
    onTypeSelect(typeId);
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-neutral-900">Choisissez votre profil</h2>
        <p className="text-neutral-600">Sélectionnez le type de compte qui correspond à votre situation</p>
        {selectedType && (
          <div className="mt-4">
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
              Type sélectionné : {userTypes.find(t => t.id === selectedType)?.title}
            </span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {userTypes.map((type) => {
          const Icon = type.icon;
          const isSelected = selectedType === type.id;
          
          return (
            <div
              key={type.id}
              onClick={() => handleTypeSelect(type.id)}
              className={`
                cursor-pointer transition-all duration-300 transform hover:scale-105
                ${isSelected 
                  ? 'ring-2 ring-primary-500 shadow-lg' 
                  : 'hover:shadow-md'
                }
              `}
            >
              <Card
                className={`
                  h-full border-2 transition-all duration-300
                  ${isSelected 
                    ? 'bg-primary-50 border-primary-500' 
                    : 'border-neutral-200 hover:border-primary-300'
                  }
                `}
                padding="lg"
              >
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-center space-x-4">
                    <div className={`w-14 h-14 bg-gradient-to-br ${type.color} rounded-xl flex items-center justify-center shadow-md`}>
                      <Icon size={28} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className={`text-lg font-bold transition-colors duration-200 ${
                        isSelected ? 'text-primary-900' : 'text-neutral-900'
                      }`}>
                        {type.title}
                      </h3>
                      <p className="text-sm text-neutral-600">{type.description}</p>
                    </div>
                    {isSelected && (
                      <div className="w-8 h-8 bg-primary-900 rounded-full flex items-center justify-center animate-pulse">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Features */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-neutral-900">Fonctionnalités incluses :</h4>
                    <ul className="space-y-2">
                      {type.features.map((feature, index) => (
                        <li key={index} className="text-sm text-neutral-700 flex items-center space-x-2">
                          <div className={`w-1.5 h-1.5 rounded-full ${
                            isSelected ? 'bg-primary-900' : 'bg-neutral-400'
                          }`}></div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Requirements */}
                  <div className={`p-3 rounded-lg border-l-4 ${
                    isSelected 
                      ? 'bg-primary-100 border-primary-500' 
                      : 'bg-neutral-50 border-neutral-300'
                  }`}>
                    <p className="text-xs text-neutral-600">
                      <span className="font-medium">Prérequis :</span> {type.requirements}
                    </p>
                  </div>

                  {/* Selection indicator */}
                  {isSelected && (
                    <div className="text-center pt-2">
                      <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-primary-900 text-white shadow-md">
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Sélectionné
                      </span>
                    </div>
                  )}
                </div>
              </Card>
            </div>
          );
        })}
      </div>

      {/* Help text */}
      <div className="text-center">
        <p className="text-sm text-neutral-500">
          {selectedType 
            ? "Parfait ! Cliquez sur 'Suivant' pour continuer votre inscription."
            : "Cliquez sur une carte pour sélectionner votre type de compte"
          }
        </p>
      </div>
    </div>
  );
};

export default UserTypeStep;