import React from 'react';
import { User, Mail, Phone, MapPin, Calendar, Building } from 'lucide-react';
import Input from '../UI/Input';
import Textarea from '../UI/Textarea';

interface PersonalInfoStepProps {
  userType: string;
  formData: any;
  onChange: (field: string, value: string) => void;
  errors: Record<string, string>;
}

const PersonalInfoStep: React.FC<PersonalInfoStepProps> = ({ 
  userType, 
  formData, 
  onChange, 
  errors 
}) => {
  const departments = [
    'Informatique',
    'Sciences',
    'Technologies',
    'Mathématiques',
    'Physique',
    'Chimie',
    'Biologie',
    'Ingénierie'
  ];

  const getFieldsForUserType = () => {
    const commonFields = [
      { key: 'firstName', label: 'Prénom', type: 'text', icon: <User size={20} />, required: true },
      { key: 'lastName', label: 'Nom', type: 'text', icon: <User size={20} />, required: true },
      { key: 'email', label: 'Adresse email', type: 'email', icon: <Mail size={20} />, required: true },
      { key: 'phone', label: 'Téléphone', type: 'tel', icon: <Phone size={20} />, required: false },
      { key: 'birthDate', label: 'Date de naissance', type: 'date', icon: <Calendar size={20} />, required: false },
    ];

    switch (userType) {
      case 'admin':
        return [
          ...commonFields,
          { key: 'department', label: 'Département', type: 'select', icon: <Building size={20} />, required: true, options: departments },
          { key: 'position', label: 'Poste', type: 'text', icon: <Building size={20} />, required: true },
          { key: 'employeeId', label: 'ID Employé', type: 'text', icon: <User size={20} />, required: true },
        ];
      
      case 'teacher':
        return [
          ...commonFields,
          { key: 'department', label: 'Département', type: 'select', icon: <Building size={20} />, required: true, options: departments },
          { key: 'specialization', label: 'Spécialisation', type: 'text', icon: <Building size={20} />, required: true },
          { key: 'employeeId', label: 'ID Enseignant', type: 'text', icon: <User size={20} />, required: true },
          { key: 'bio', label: 'Biographie professionnelle', type: 'textarea', required: false },
        ];
      
      case 'student':
        return [
          ...commonFields,
          { key: 'studentId', label: 'Numéro étudiant', type: 'text', icon: <User size={20} />, required: true },
          { key: 'program', label: 'Programme d\'études', type: 'text', icon: <Building size={20} />, required: true },
          { key: 'year', label: 'Année d\'études', type: 'select', icon: <Calendar size={20} />, required: true, options: ['1ère année', '2ème année', '3ème année', 'Master 1', 'Master 2', 'Doctorat'] },
          { key: 'address', label: 'Adresse', type: 'text', icon: <MapPin size={20} />, required: false },
        ];
      
      case 'visitor':
        return [
          ...commonFields,
          { key: 'organization', label: 'Organisation', type: 'text', icon: <Building size={20} />, required: false },
          { key: 'interest', label: 'Domaine d\'intérêt', type: 'select', icon: <Building size={20} />, required: true, options: departments },
          { key: 'purpose', label: 'Objectif de visite', type: 'textarea', required: true },
        ];
      
      default:
        return commonFields;
    }
  };

  const fields = getFieldsForUserType();

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-neutral-900">Informations personnelles</h2>
        <p className="text-neutral-600">Complétez vos informations pour finaliser votre profil</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {fields.map((field) => {
          if (field.type === 'select') {
            return (
              <div key={field.key} className="space-y-2">
                <label className="block text-sm font-medium text-neutral-700">
                  {field.label} {field.required && <span className="text-red-500">*</span>}
                </label>
                <div className="relative">
                  {field.icon && (
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400">
                      {field.icon}
                    </div>
                  )}
                  <select
                    value={formData[field.key] || ''}
                    onChange={(e) => onChange(field.key, e.target.value)}
                    className={`
                      block w-full px-4 py-3 border border-neutral-300 rounded-lg 
                      focus:ring-2 focus:ring-primary-500 focus:border-primary-500 
                      transition-colors duration-200
                      ${field.icon ? 'pl-10' : ''}
                      ${errors[field.key] ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}
                    `}
                    required={field.required}
                  >
                    <option value="">Sélectionner...</option>
                    {field.options?.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                {errors[field.key] && (
                  <p className="text-sm text-red-600">{errors[field.key]}</p>
                )}
              </div>
            );
          }

          if (field.type === 'textarea') {
            return (
              <div key={field.key} className="md:col-span-2">
                <Textarea
                  label={`${field.label} ${field.required ? '*' : ''}`}
                  value={formData[field.key] || ''}
                  onChange={(e) => onChange(field.key, e.target.value)}
                  placeholder={`Entrez votre ${field.label.toLowerCase()}...`}
                  rows={4}
                  error={errors[field.key]}
                  required={field.required}
                />
              </div>
            );
          }

          return (
            <Input
              key={field.key}
              label={`${field.label} ${field.required ? '*' : ''}`}
              type={field.type}
              value={formData[field.key] || ''}
              onChange={(e) => onChange(field.key, e.target.value)}
              placeholder={`Entrez votre ${field.label.toLowerCase()}...`}
              icon={field.icon}
              error={errors[field.key]}
              required={field.required}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PersonalInfoStep;