import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, LogOut, Menu, X, Bell, Search, ChevronDown } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface HeaderProps {
  onMenuToggle: () => void;
  isMobileMenuOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({ onMenuToggle, isMobileMenuOpen }) => {
  const { user, logout, isAuthenticated } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  // Navigation items for non-authenticated users
  const publicNavItems = [
    { label: 'Accueil', path: '/' },
    { label: 'Présentation ESST', path: '/presentation' },
    { label: 'Formations', path: '/formations' },
    { label: 'Facultés & Départements', path: '/facultes' },
    { label: 'Recherche & Laboratoires', path: '/recherche' },
    { label: 'Vie Étudiante', path: '/vie-etudiante' },
    { label: 'Relations Internationales', path: '/international' },
    { label: 'Admission & Inscription', path: '/admission' },
    { label: 'Actualités', path: '/actualites' },
    { label: 'Contact', path: '/contact' },
  ];

  // Navigation items for authenticated users (common)
  const getAuthenticatedNavItems = () => {
    const commonItems = [
      { label: 'Accueil', path: '/' },
      { label: 'Tableau de bord', path: '/dashboard' },
      { label: 'Messages', path: '/messaging' },
      { label: 'Projets', path: '/projects' },
      { label: 'Actualités', path: '/actualites' },
    ];

    if (!user) return commonItems;

    switch (user.userType) {
      case 'admin':
        return [
          ...commonItems,
          { label: 'Gestion Contenu', path: '/admin/cms' },
          { label: 'Utilisateurs', path: '/admin/users' },
          { label: 'Paramètres', path: '/admin/settings' },
        ];
      case 'teacher':
        return [
          ...commonItems,
          { label: 'Mes Cours', path: '/teacher/courses' },
          { label: 'Ressources', path: '/teacher/resources' },
          { label: 'Emploi du Temps', path: '/teacher/schedule' },
        ];
      case 'student':
        return [
          ...commonItems,
          { label: 'Mes Cours', path: '/student/courses' },
          { label: 'Emploi du Temps', path: '/student/schedule' },
          { label: 'Vie Étudiante', path: '/vie-etudiante' },
        ];
      case 'visitor':
        return [
          { label: 'Accueil', path: '/' },
          { label: 'Tableau de bord', path: '/dashboard' },
          { label: 'Formations', path: '/formations' },
          { label: 'Actualités', path: '/actualites' },
          { label: 'Contact', path: '/contact' },
        ];
      default:
        return commonItems;
    }
  };

  const navItems = isAuthenticated ? getAuthenticatedNavItems() : publicNavItems;

  const getUserTypeLabel = () => {
    switch (user?.userType) {
      case 'admin': return 'Administrateur';
      case 'teacher': return 'Enseignant';
      case 'student': return 'Étudiant';
      case 'visitor': return 'Visiteur';
      default: return 'Utilisateur';
    }
  };

  return (
    <header className="bg-primary-900 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo and Title */}
          <div className="flex items-center space-x-4">
            <Link 
              to="/" 
              className="flex items-center space-x-3 group transition-transform duration-200 hover:scale-105"
            >
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-accent-900 rounded-lg flex items-center justify-center">
                <span className="text-xl lg:text-2xl font-bold text-primary-900">E</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg lg:text-xl font-bold leading-tight">
                  École Supérieure des Sciences<br />
                  <span className="text-sm lg:text-base font-normal opacity-90">et Technologies</span>
                </h1>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-6">
            {navItems.slice(0, 6).map((item) => (
              <Link 
                key={item.path}
                to={item.path} 
                className="text-white hover:text-accent-900 transition-colors duration-200 font-medium px-3 py-2 rounded-lg hover:bg-white hover:bg-opacity-10"
              >
                {item.label}
              </Link>
            ))}
            
            {navItems.length > 6 && (
              <div className="relative group">
                <button className="text-white hover:text-accent-900 transition-colors duration-200 font-medium px-3 py-2 rounded-lg hover:bg-white hover:bg-opacity-10 flex items-center space-x-1">
                  <span>Plus</span>
                  <ChevronDown size={16} />
                </button>
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-neutral-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  {navItems.slice(6).map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className="block px-4 py-3 text-neutral-700 hover:bg-neutral-50 hover:text-primary-900 transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {/* Search Icon */}
            <button className="p-2 hover:bg-white hover:bg-opacity-10 rounded-lg transition-colors duration-200">
              <Search size={20} />
            </button>

            {isAuthenticated && user ? (
              <div className="hidden lg:flex items-center space-x-4">
                {/* Notifications */}
                <div className="relative">
                  <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="p-2 hover:bg-white hover:bg-opacity-10 rounded-lg transition-colors duration-200 relative"
                  >
                    <Bell size={20} />
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent-900 text-primary-900 text-xs rounded-full flex items-center justify-center font-bold">
                      3
                    </span>
                  </button>
                  
                  {showNotifications && (
                    <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-neutral-200 z-50">
                      <div className="p-4 border-b border-neutral-200">
                        <h3 className="font-semibold text-neutral-900">Notifications</h3>
                      </div>
                      <div className="max-h-64 overflow-y-auto">
                        <div className="p-4 hover:bg-neutral-50 border-b border-neutral-100">
                          <p className="text-sm text-neutral-900 font-medium">Nouveau message</p>
                          <p className="text-xs text-neutral-600">Prof. Dubois vous a envoyé un message</p>
                          <p className="text-xs text-neutral-500 mt-1">Il y a 5 minutes</p>
                        </div>
                        <div className="p-4 hover:bg-neutral-50 border-b border-neutral-100">
                          <p className="text-sm text-neutral-900 font-medium">Projet mis à jour</p>
                          <p className="text-xs text-neutral-600">Le projet IA a été modifié</p>
                          <p className="text-xs text-neutral-500 mt-1">Il y a 1 heure</p>
                        </div>
                        <div className="p-4 hover:bg-neutral-50">
                          <p className="text-sm text-neutral-900 font-medium">Nouvelle actualité</p>
                          <p className="text-xs text-neutral-600">Formation en Intelligence Artificielle</p>
                          <p className="text-xs text-neutral-500 mt-1">Il y a 2 heures</p>
                        </div>
                      </div>
                      <div className="p-4 border-t border-neutral-200">
                        <Link 
                          to="/notifications" 
                          className="text-sm text-primary-900 hover:text-primary-700 font-medium"
                          onClick={() => setShowNotifications(false)}
                        >
                          Voir toutes les notifications
                        </Link>
                      </div>
                    </div>
                  )}
                </div>

                {/* User Menu */}
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-2 bg-white bg-opacity-10 hover:bg-opacity-20 px-3 py-2 rounded-lg transition-all duration-200"
                  >
                    <div className="w-8 h-8 bg-success-900 rounded-full flex items-center justify-center">
                      <User size={16} className="text-white" />
                    </div>
                    <div className="text-left">
                      <span className="text-sm font-medium block">
                        {user.firstName} {user.lastName}
                      </span>
                      <span className="text-xs opacity-80 block">
                        {getUserTypeLabel()}
                      </span>
                    </div>
                    <ChevronDown size={16} />
                  </button>

                  {showUserMenu && (
                    <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-neutral-200 z-50">
                      <div className="p-4 border-b border-neutral-200">
                        <p className="font-medium text-neutral-900">{user.firstName} {user.lastName}</p>
                        <p className="text-sm text-neutral-600">{user.email}</p>
                        <p className="text-xs text-neutral-500 capitalize">{getUserTypeLabel()}</p>
                      </div>
                      <div className="py-2">
                        <Link
                          to="/profile"
                          className="block px-4 py-2 text-neutral-700 hover:bg-neutral-50 hover:text-primary-900 transition-colors duration-200"
                          onClick={() => setShowUserMenu(false)}
                        >
                          Mon Profil
                        </Link>
                        <Link
                          to="/dashboard"
                          className="block px-4 py-2 text-neutral-700 hover:bg-neutral-50 hover:text-primary-900 transition-colors duration-200"
                          onClick={() => setShowUserMenu(false)}
                        >
                          Tableau de bord
                        </Link>
                        <Link
                          to="/messaging"
                          className="block px-4 py-2 text-neutral-700 hover:bg-neutral-50 hover:text-primary-900 transition-colors duration-200"
                          onClick={() => setShowUserMenu(false)}
                        >
                          Messages
                        </Link>
                        <Link
                          to="/settings"
                          className="block px-4 py-2 text-neutral-700 hover:bg-neutral-50 hover:text-primary-900 transition-colors duration-200"
                          onClick={() => setShowUserMenu(false)}
                        >
                          Paramètres
                        </Link>
                      </div>
                      <div className="border-t border-neutral-200 py-2">
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors duration-200 flex items-center space-x-2"
                        >
                          <LogOut size={16} />
                          <span>Déconnexion</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex items-center space-x-4">
                <Link 
                  to="/login" 
                  className="bg-accent-900 hover:bg-accent-800 text-primary-900 px-6 py-2 rounded-full font-medium transition-colors duration-200"
                >
                  Connexion
                </Link>
                <Link 
                  to="/register" 
                  className="border border-white text-white hover:bg-white hover:text-primary-900 px-6 py-2 rounded-full font-medium transition-colors duration-200"
                >
                  Inscription
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={onMenuToggle}
              className="lg:hidden p-2 hover:bg-white hover:bg-opacity-10 rounded-lg transition-colors duration-200"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-primary-800 border-t border-primary-700">
          <div className="px-4 py-4 space-y-4">
            {/* Search Bar Mobile */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" size={20} />
              <input
                type="text"
                placeholder="Rechercher..."
                className="w-full pl-10 pr-4 py-2 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-white placeholder-white placeholder-opacity-70 focus:bg-opacity-20 focus:outline-none"
              />
            </div>

            {/* Navigation Items */}
            {navItems.map((item) => (
              <Link 
                key={item.path}
                to={item.path} 
                className="block text-white hover:text-accent-900 transition-colors duration-200 py-2 px-2 rounded-lg hover:bg-white hover:bg-opacity-10"
                onClick={onMenuToggle}
              >
                {item.label}
              </Link>
            ))}
            
            {isAuthenticated && user ? (
              <>
                <div className="border-t border-primary-700 pt-4 mt-4">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-success-900 rounded-full flex items-center justify-center">
                      <User size={20} className="text-white" />
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        {user.firstName} {user.lastName}
                      </p>
                      <p className="text-white text-sm opacity-80">
                        {getUserTypeLabel()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Link 
                      to="/profile" 
                      className="block text-white hover:text-accent-900 transition-colors duration-200 py-2 px-2 rounded-lg hover:bg-white hover:bg-opacity-10"
                      onClick={onMenuToggle}
                    >
                      Mon Profil
                    </Link>
                    <Link 
                      to="/notifications" 
                      className="block text-white hover:text-accent-900 transition-colors duration-200 py-2 px-2 rounded-lg hover:bg-white hover:bg-opacity-10 flex items-center justify-between"
                      onClick={onMenuToggle}
                    >
                      <span>Notifications</span>
                      <span className="bg-accent-900 text-primary-900 text-xs px-2 py-1 rounded-full font-bold">3</span>
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        onMenuToggle();
                      }}
                      className="w-full text-left text-white hover:text-red-300 transition-colors duration-200 py-2 px-2 rounded-lg hover:bg-red-600 hover:bg-opacity-20 flex items-center space-x-2"
                    >
                      <LogOut size={16} />
                      <span>Déconnexion</span>
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="border-t border-primary-700 pt-4 mt-4 space-y-2">
                <Link 
                  to="/login" 
                  className="block bg-accent-900 hover:bg-accent-800 text-primary-900 px-4 py-2 rounded-lg font-medium transition-colors duration-200 text-center"
                  onClick={onMenuToggle}
                >
                  Connexion
                </Link>
                <Link 
                  to="/register" 
                  className="block border border-white text-white hover:bg-white hover:text-primary-900 px-4 py-2 rounded-lg font-medium transition-colors duration-200 text-center"
                  onClick={onMenuToggle}
                >
                  Inscription
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Click outside to close dropdowns */}
      {(showUserMenu || showNotifications) && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => {
            setShowUserMenu(false);
            setShowNotifications(false);
          }}
        />
      )}
    </header>
  );
};

export default Header;