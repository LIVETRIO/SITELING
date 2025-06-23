import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import ProgressBar from '../components/UI/ProgressBar';
import UserTypeStep from '../components/Registration/UserTypeStep';
import PersonalInfoStep from '../components/Registration/PersonalInfoStep';
import SecurityStep from '../components/Registration/SecurityStep';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    userType: '',
    // Personal info will be added dynamically based on user type
    // Security
    password: '',
    confirmPassword: '',
    acceptTerms: false,
    acceptNewsletter: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const steps = ['Type de compte', 'Informations personnelles', 'Sécurité'];
  const totalSteps = steps.length;

  const handleFieldChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!formData.userType) {
          newErrors.userType = 'Veuillez sélectionner un type de compte';
        }
        break;

      case 2:
        // Validate required fields based on user type
        const requiredFields = getRequiredFieldsForUserType(formData.userType);
        requiredFields.forEach(field => {
          if (!formData[field as keyof typeof formData]) {
            newErrors[field] = 'Ce champ est obligatoire';
          }
        });

        // Email validation
        if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          newErrors.email = 'Adresse email invalide';
        }
        break;

      case 3:
        // Password validation
        if (!formData.password) {
          newErrors.password = 'Le mot de passe est obligatoire';
        } else if (formData.password.length < 8) {
          newErrors.password = 'Le mot de passe doit contenir au moins 8 caractères';
        }

        if (!formData.confirmPassword) {
          newErrors.confirmPassword = 'Veuillez confirmer votre mot de passe';
        } else if (formData.password !== formData.confirmPassword) {
          newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
        }

        if (!formData.acceptTerms) {
          newErrors.acceptTerms = 'Vous devez accepter les conditions d\'utilisation';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getRequiredFieldsForUserType = (userType: string): string[] => {
    const common = ['firstName', 'lastName', 'email'];
    
    switch (userType) {
      case 'admin':
        return [...common, 'department', 'position', 'employeeId'];
      case 'teacher':
        return [...common, 'department', 'specialization', 'employeeId'];
      case 'student':
        return [...common, 'studentId', 'program', 'year'];
      case 'visitor':
        return [...common, 'interest', 'purpose'];
      default:
        return common;
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would normally send the data to your backend
      console.log('Registration data:', formData);
      
      // Redirect to success page or login
      navigate('/login', { 
        state: { 
          message: 'Inscription réussie ! Vous pouvez maintenant vous connecter.' 
        }
      });
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error);
      setErrors({ submit: 'Une erreur est survenue lors de l\'inscription' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <UserTypeStep
            selectedType={formData.userType}
            onTypeSelect={(type) => handleFieldChange('userType', type)}
          />
        );
      case 2:
        return (
          <PersonalInfoStep
            userType={formData.userType}
            formData={formData}
            onChange={handleFieldChange}
            errors={errors}
          />
        );
      case 3:
        return (
          <SecurityStep
            formData={formData}
            onChange={handleFieldChange}
            errors={errors}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-900 via-primary-800 to-secondary-900 flex items-center justify-center py-12 px-4">
      <div className="max-w-4xl w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-accent-900 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-2xl font-bold text-primary-900">E</span>
            </div>
          </div>
          <h1 className="mt-6 text-3xl font-bold text-white">
            Rejoignez l'ESST
          </h1>
          <p className="mt-2 text-white opacity-80">
            Créez votre compte pour accéder à la plateforme collaborative
          </p>
        </div>

        {/* Registration Form */}
        <Card className="bg-white shadow-2xl" padding="lg">
          {/* Progress Bar */}
          <ProgressBar
            currentStep={currentStep}
            totalSteps={totalSteps}
            steps={steps}
          />

          {/* Step Content */}
          <div className="min-h-[400px]">
            {renderStepContent()}
          </div>

          {/* Error Message */}
          {errors.submit && (
            <div className="mt-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {errors.submit}
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-neutral-200">
            <div>
              {currentStep > 1 ? (
                <Button
                  variant="ghost"
                  onClick={handlePrevious}
                  className="flex items-center space-x-2"
                >
                  <ArrowLeft size={20} />
                  <span>Précédent</span>
                </Button>
              ) : (
                <Link 
                  to="/login"
                  className="text-primary-900 hover:text-primary-700 font-medium transition-colors duration-200"
                >
                  Déjà un compte ? Se connecter
                </Link>
              )}
            </div>

            <div>
              {currentStep < totalSteps ? (
                <Button
                  onClick={handleNext}
                  disabled={currentStep === 1 && !formData.userType}
                  className="flex items-center space-x-2"
                >
                  <span>Suivant</span>
                  <ArrowRight size={20} />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  isLoading={isSubmitting}
                  className="flex items-center space-x-2"
                >
                  {isSubmitting ? (
                    <span>Création du compte...</span>
                  ) : (
                    <>
                      <CheckCircle size={20} />
                      <span>Créer mon compte</span>
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </Card>

        {/* Footer */}
        <div className="text-center">
          <p className="text-white opacity-80 text-sm">
            En créant un compte, vous acceptez nos{' '}
            <Link to="/terms" className="text-accent-900 hover:text-accent-800 underline">
              conditions d'utilisation
            </Link>{' '}
            et notre{' '}
            <Link to="/privacy" className="text-accent-900 hover:text-accent-800 underline">
              politique de confidentialité
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;