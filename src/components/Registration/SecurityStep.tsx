import React, { useState } from 'react';
import { Lock, Eye, EyeOff, Shield, Check, X } from 'lucide-react';
import Input from '../UI/Input';

interface SecurityStepProps {
  formData: any;
  onChange: (field: string, value: string) => void;
  errors: Record<string, string>;
}

const SecurityStep: React.FC<SecurityStepProps> = ({ formData, onChange, errors }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const passwordRequirements = [
    { text: 'Au moins 8 caractères', test: (pwd: string) => pwd.length >= 8 },
    { text: 'Une lettre majuscule', test: (pwd: string) => /[A-Z]/.test(pwd) },
    { text: 'Une lettre minuscule', test: (pwd: string) => /[a-z]/.test(pwd) },
    { text: 'Un chiffre', test: (pwd: string) => /\d/.test(pwd) },
    { text: 'Un caractère spécial', test: (pwd: string) => /[!@#$%^&*(),.?":{}|<>]/.test(pwd) },
  ];

  const getPasswordStrength = (password: string) => {
    const passedRequirements = passwordRequirements.filter(req => req.test(password)).length;
    if (passedRequirements <= 2) return { strength: 'Faible', color: 'bg-red-500', width: '33%' };
    if (passedRequirements <= 4) return { strength: 'Moyen', color: 'bg-yellow-500', width: '66%' };
    return { strength: 'Fort', color: 'bg-green-500', width: '100%' };
  };

  const passwordStrength = formData.password ? getPasswordStrength(formData.password) : null;

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-neutral-900">Sécurité du compte</h2>
        <p className="text-neutral-600">Créez un mot de passe sécurisé pour protéger votre compte</p>
      </div>

      <div className="space-y-6">
        {/* Password Field */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-neutral-700">
            Mot de passe <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" size={20} />
            <input
              type={showPassword ? 'text' : 'password'}
              value={formData.password || ''}
              onChange={(e) => onChange('password', e.target.value)}
              placeholder="Créez un mot de passe sécurisé"
              className={`
                block w-full pl-10 pr-12 py-3 border border-neutral-300 rounded-lg 
                focus:ring-2 focus:ring-primary-500 focus:border-primary-500 
                transition-colors duration-200
                ${errors.password ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}
              `}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors duration-200"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.password && (
            <p className="text-sm text-red-600">{errors.password}</p>
          )}

          {/* Password Strength Indicator */}
          {formData.password && passwordStrength && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-600">Force du mot de passe:</span>
                <span className={`text-sm font-medium ${
                  passwordStrength.strength === 'Fort' ? 'text-green-600' :
                  passwordStrength.strength === 'Moyen' ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {passwordStrength.strength}
                </span>
              </div>
              <div className="w-full bg-neutral-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                  style={{ width: passwordStrength.width }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Password Requirements */}
        {formData.password && (
          <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200">
            <h4 className="text-sm font-medium text-neutral-900 mb-3 flex items-center space-x-2">
              <Shield size={16} />
              <span>Exigences du mot de passe</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {passwordRequirements.map((requirement, index) => {
                const isValid = requirement.test(formData.password);
                return (
                  <div key={index} className="flex items-center space-x-2">
                    {isValid ? (
                      <Check size={16} className="text-green-600 flex-shrink-0" />
                    ) : (
                      <X size={16} className="text-red-500 flex-shrink-0" />
                    )}
                    <span className={`text-sm ${isValid ? 'text-green-600' : 'text-neutral-600'}`}>
                      {requirement.text}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Confirm Password Field */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-neutral-700">
            Confirmer le mot de passe <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" size={20} />
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              value={formData.confirmPassword || ''}
              onChange={(e) => onChange('confirmPassword', e.target.value)}
              placeholder="Confirmez votre mot de passe"
              className={`
                block w-full pl-10 pr-12 py-3 border border-neutral-300 rounded-lg 
                focus:ring-2 focus:ring-primary-500 focus:border-primary-500 
                transition-colors duration-200
                ${errors.confirmPassword ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}
              `}
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors duration-200"
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-sm text-red-600">{errors.confirmPassword}</p>
          )}

          {/* Password match indicator */}
          {formData.password && formData.confirmPassword && (
            <div className="flex items-center space-x-2">
              {formData.password === formData.confirmPassword ? (
                <>
                  <Check size={16} className="text-green-600" />
                  <span className="text-sm text-green-600">Les mots de passe correspondent</span>
                </>
              ) : (
                <>
                  <X size={16} className="text-red-500" />
                  <span className="text-sm text-red-500">Les mots de passe ne correspondent pas</span>
                </>
              )}
            </div>
          )}
        </div>

        {/* Terms and Conditions */}
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              id="terms"
              checked={formData.acceptTerms === 'true'}
              onChange={(e) => onChange('acceptTerms', e.target.checked.toString())}
              className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
              required
            />
            <label htmlFor="terms" className="text-sm text-neutral-700">
              J'accepte les{' '}
              <a href="/terms" target="_blank" className="text-primary-900 hover:text-primary-700 underline">
                conditions d'utilisation
              </a>{' '}
              et la{' '}
              <a href="/privacy" target="_blank" className="text-primary-900 hover:text-primary-700 underline">
                politique de confidentialité
              </a>{' '}
              de l'ESST <span className="text-red-500">*</span>
            </label>
          </div>
          {errors.acceptTerms && (
            <p className="text-sm text-red-600 ml-7">{errors.acceptTerms}</p>
          )}

          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              id="newsletter"
              checked={formData.acceptNewsletter === 'true'}
              onChange={(e) => onChange('acceptNewsletter', e.target.checked.toString())}
              className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
            />
            <label htmlFor="newsletter" className="text-sm text-neutral-700">
              Je souhaite recevoir les actualités et informations de l'ESST par email
            </label>
          </div>
        </div>

        {/* Security Tips */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="text-sm font-medium text-blue-900 mb-2">💡 Conseils de sécurité</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Utilisez un mot de passe unique pour votre compte ESST</li>
            <li>• Ne partagez jamais vos identifiants avec d'autres personnes</li>
            <li>• Déconnectez-vous toujours après utilisation sur un ordinateur partagé</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SecurityStep;