import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Check for success message from registration
  useEffect(() => {
    if (location.state?.message) {
      setSuccessMessage(location.state.message);
      if (location.state?.email) {
        setEmail(location.state.email);
      }
      // Clear the state to prevent showing the message on refresh
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const success = await login(email, password);
      if (success) {
        navigate('/dashboard');
      } else {
        setError('Email ou mot de passe incorrect');
      }
    } catch (err) {
      setError('Une erreur est survenue lors de la connexion');
    } finally {
      setIsLoading(false);
    }
  };

  const demoUsers = [
    { email: 'admin@esst.edu', role: 'Administrateur', name: 'Pierre Dupont' },
    { email: 'prof.dubois@esst.edu', role: 'Enseignant', name: 'Michel Dubois' },
    { email: 'sophie.martin@student.esst.edu', role: 'Étudiante', name: 'Sophie Martin' },
    { email: 'julien.moreau@esst.edu', role: 'Enseignant', name: 'Julien Moreau' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-900 via-primary-800 to-secondary-900 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-accent-900 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-2xl font-bold text-primary-900">E</span>
            </div>
          </div>
          <h1 className="mt-6 text-3xl font-bold text-white">
            Connexion ESST
          </h1>
          <p className="mt-2 text-white opacity-80">
            Accédez à votre espace personnel
          </p>
        </div>

        {/* Success Message */}
        {successMessage && (
          <Card className="bg-green-50 border border-green-200">
            <div className="flex items-center space-x-3 text-green-700">
              <CheckCircle size={20} />
              <p className="font-medium">{successMessage}</p>
            </div>
          </Card>
        )}

        {/* Login Form */}
        <Card className="bg-white shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                  Adresse email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" size={20} />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="block w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                    placeholder="votre.email@esst.edu"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-2">
                  Mot de passe
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" size={20} />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="block w-full pl-10 pr-12 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                    placeholder="Votre mot de passe"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors duration-200"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                />
                <span className="ml-2 text-sm text-neutral-700">Se souvenir de moi</span>
              </label>
              <Link 
                to="/forgot-password" 
                className="text-sm text-primary-900 hover:text-primary-700 transition-colors duration-200"
              >
                Mot de passe oublié ?
              </Link>
            </div>

            <Button
              type="submit"
              size="lg"
              isLoading={isLoading}
              className="w-full"
            >
              {isLoading ? 'Connexion...' : 'Se connecter'}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-neutral-200">
            <p className="text-center text-sm text-neutral-600">
              Pas encore de compte ?{' '}
              <Link 
                to="/register" 
                className="text-primary-900 hover:text-primary-700 font-medium transition-colors duration-200"
              >
                Créer un compte
              </Link>
            </p>
          </div>
        </Card>

        {/* Demo Users */}
        <Card className="bg-white bg-opacity-95">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-neutral-900 text-center">
              Comptes de démonstration
            </h3>
            <p className="text-sm text-neutral-600 text-center">
              Utilisez un des comptes suivants (mot de passe: <code className="bg-neutral-100 px-2 py-1 rounded">password</code>)
            </p>
            <div className="space-y-2">
              {demoUsers.map((user, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setEmail(user.email);
                    setPassword('password');
                  }}
                  className="w-full text-left p-3 bg-neutral-50 hover:bg-neutral-100 rounded-lg transition-colors duration-200 border border-neutral-200"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium text-neutral-900">{user.name}</div>
                      <div className="text-sm text-neutral-600">{user.email}</div>
                    </div>
                    <span className="text-xs bg-primary-100 text-primary-800 px-2 py-1 rounded-full">
                      {user.role}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Login;