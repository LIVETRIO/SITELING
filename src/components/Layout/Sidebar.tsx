import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  MessageSquare, 
  FolderOpen, 
  Settings, 
  Users, 
  FileText, 
  Calendar,
  BarChart3,
  BookOpen,
  Search,
  GraduationCap,
  Building,
  Globe,
  UserCheck,
  Bell,
  Edit,
  Eye,
  Plus,
  Archive,
  Award,
  Clock,
  MapPin,
  Image,
  Palette
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const location = useLocation();

  const getMenuItems = () => {
    if (!user) return [];

    const commonItems = [
      { icon: Home, label: 'Tableau de bord', path: '/dashboard' },
      { icon: MessageSquare, label: 'Messages', path: '/messaging', badge: 3 },
    ];

    const adminItems = [
      ...commonItems,
      { 
        icon: FileText, 
        label: 'Gestion Contenu', 
        path: '/admin/cms',
        submenu: [
          { icon: Edit, label: 'Pages', path: '/admin/cms/pages' },
          { icon: Bell, label: 'Actualités', path: '/admin/cms/news' },
          { icon: Calendar, label: 'Événements', path: '/admin/cms/events' },
          { icon: GraduationCap, label: 'Formations', path: '/admin/cms/formations' },
          { icon: Image, label: 'Médias', path: '/admin/media' },
          { icon: Plus, label: 'Nouveau contenu', path: '/admin/cms/editor/new' },
        ]
      },
      { 
        icon: Users, 
        label: 'Utilisateurs', 
        path: '/admin/users',
        submenu: [
          { icon: Users, label: 'Tous les utilisateurs', path: '/admin/users/all' },
          { icon: UserCheck, label: 'Administrateurs', path: '/admin/users/admins' },
          { icon: BookOpen, label: 'Enseignants', path: '/admin/users/teachers' },
          { icon: GraduationCap, label: 'Étudiants', path: '/admin/users/students' },
          { icon: Eye, label: 'Visiteurs', path: '/admin/users/visitors' },
          { icon: Plus, label: 'Ajouter utilisateur', path: '/admin/users/create' },
        ]
      },
      { 
        icon: FolderOpen, 
        label: 'Projets', 
        path: '/projects',
        submenu: [
          { icon: FolderOpen, label: 'Tous les projets', path: '/projects/all' },
          { icon: Plus, label: 'Créer un projet', path: '/projects/create' },
          { icon: Eye, label: 'Projets supervisés', path: '/admin/projects/supervised' },
        ]
      },
      { 
        icon: BarChart3, 
        label: 'Statistiques', 
        path: '/admin/stats',
        submenu: [
          { icon: BarChart3, label: 'Vue d\'ensemble', path: '/admin/stats/overview' },
          { icon: Users, label: 'Utilisateurs', path: '/admin/stats/users' },
          { icon: FolderOpen, label: 'Projets', path: '/admin/stats/projects' },
          { icon: MessageSquare, label: 'Messages', path: '/admin/stats/messages' },
        ]
      },
      { 
        icon: Settings, 
        label: 'Paramètres', 
        path: '/admin/settings',
        submenu: [
          { icon: Settings, label: 'Configuration générale', path: '/admin/settings/general' },
          { icon: Palette, label: 'Apparence', path: '/admin/settings/appearance' },
          { icon: Users, label: 'Droits et permissions', path: '/admin/settings/permissions' },
          { icon: Bell, label: 'Notifications', path: '/admin/settings/notifications' },
          { icon: Archive, label: 'Sauvegarde', path: '/admin/settings/backup' },
        ]
      },
    ];

    const teacherItems = [
      ...commonItems,
      { 
        icon: BookOpen, 
        label: 'Mes Cours', 
        path: '/teacher/courses',
        submenu: [
          { icon: BookOpen, label: 'Liste des cours', path: '/teacher/courses/list' },
          { icon: Plus, label: 'Ajouter un cours', path: '/teacher/courses/create' },
          { icon: Archive, label: 'Ressources pédagogiques', path: '/teacher/resources' },
          { icon: Edit, label: 'Modifier ressources', path: '/teacher/resources/edit' },
        ]
      },
      { 
        icon: Calendar, 
        label: 'Emploi du Temps', 
        path: '/teacher/schedule',
        submenu: [
          { icon: Calendar, label: 'Mon planning', path: '/teacher/schedule/view' },
          { icon: Clock, label: 'Disponibilités', path: '/teacher/schedule/availability' },
        ]
      },
      { 
        icon: Users, 
        label: 'Étudiants', 
        path: '/teacher/students',
        submenu: [
          { icon: Users, label: 'Mes étudiants', path: '/teacher/students/list' },
          { icon: Award, label: 'Évaluations', path: '/teacher/students/grades' },
          { icon: MessageSquare, label: 'Communication', path: '/teacher/students/messages' },
        ]
      },
      { 
        icon: FolderOpen, 
        label: 'Projets', 
        path: '/projects',
        submenu: [
          { icon: FolderOpen, label: 'Tous les projets', path: '/projects/all' },
          { icon: Eye, label: 'Mes projets', path: '/teacher/projects/mine' },
          { icon: Plus, label: 'Créer un projet', path: '/projects/create' },
          { icon: Users, label: 'Projets supervisés', path: '/teacher/projects/supervised' },
        ]
      },
      { icon: Bell, label: 'Actualités', path: '/actualites' },
    ];

    const studentItems = [
      ...commonItems,
      { 
        icon: BookOpen, 
        label: 'Mes Cours', 
        path: '/student/courses',
        submenu: [
          { icon: BookOpen, label: 'Liste des cours', path: '/student/courses/list' },
          { icon: Archive, label: 'Ressources', path: '/student/courses/resources' },
          { icon: Award, label: 'Notes et évaluations', path: '/student/grades' },
        ]
      },
      { 
        icon: Calendar, 
        label: 'Emploi du Temps', 
        path: '/student/schedule',
        submenu: [
          { icon: Calendar, label: 'Mon planning', path: '/student/schedule/view' },
          { icon: Clock, label: 'Prochains cours', path: '/student/schedule/upcoming' },
        ]
      },
      { 
        icon: FolderOpen, 
        label: 'Projets', 
        path: '/projects',
        submenu: [
          { icon: FolderOpen, label: 'Tous les projets', path: '/projects/all' },
          { icon: Eye, label: 'Mes projets', path: '/student/projects/mine' },
          { icon: Search, label: 'Projets disponibles', path: '/projects/available' },
        ]
      },
      { 
        icon: Users, 
        label: 'Vie Étudiante', 
        path: '/vie-etudiante',
        submenu: [
          { icon: Users, label: 'Associations', path: '/vie-etudiante/associations' },
          { icon: Calendar, label: 'Événements', path: '/vie-etudiante/events' },
          { icon: MapPin, label: 'Services campus', path: '/vie-etudiante/services' },
        ]
      },
      { icon: Bell, label: 'Actualités', path: '/actualites' },
    ];

    const visitorItems = [
      { icon: Home, label: 'Tableau de bord', path: '/dashboard' },
      { 
        icon: GraduationCap, 
        label: 'Formations', 
        path: '/formations',
        submenu: [
          { icon: Search, label: 'Catalogue formations', path: '/formations/catalog' },
          { icon: FileText, label: 'Demande d\'information', path: '/formations/request-info' },
        ]
      },
      { icon: Bell, label: 'Actualités', path: '/actualites' },
      { 
        icon: MessageSquare, 
        label: 'Contact', 
        path: '/contact',
        submenu: [
          { icon: MessageSquare, label: 'Formulaire contact', path: '/contact/form' },
          { icon: FileText, label: 'Demandes spécifiques', path: '/contact/requests' },
        ]
      },
    ];

    switch (user.userType) {
      case 'admin':
        return adminItems;
      case 'teacher':
        return teacherItems;
      case 'student':
        return studentItems;
      case 'visitor':
        return visitorItems;
      default:
        return commonItems;
    }
  };

  const menuItems = getMenuItems();

  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + '/');

  const [expandedMenus, setExpandedMenus] = React.useState<string[]>([]);

  const toggleSubmenu = (path: string) => {
    setExpandedMenus(prev => 
      prev.includes(path) 
        ? prev.filter(p => p !== path)
        : [...prev, path]
    );
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`
          fixed top-0 left-0 z-50 h-full w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out
          lg:translate-x-0 lg:static lg:z-auto
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-neutral-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-900 rounded-lg flex items-center justify-center">
                <span className="text-xl font-bold text-white">E</span>
              </div>
              <div>
                <h2 className="font-bold text-lg text-neutral-900">ESST</h2>
                <p className="text-sm text-neutral-600">Espace Personnel</p>
              </div>
            </div>
          </div>

          {/* User Info */}
          {user && (
            <div className="p-4 border-b border-neutral-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-success-900 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium">
                    {user.firstName[0]}{user.lastName[0]}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-neutral-900 truncate">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="text-xs text-neutral-600 capitalize">
                    {user.userType === 'admin' ? 'Administrateur' : 
                     user.userType === 'teacher' ? 'Enseignant' : 
                     user.userType === 'student' ? 'Étudiant' : 'Visiteur'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <nav className="flex-1 p-4 overflow-y-auto">
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const hasSubmenu = item.submenu && item.submenu.length > 0;
                const isExpanded = expandedMenus.includes(item.path);
                
                return (
                  <li key={item.path}>
                    <div>
                      {hasSubmenu ? (
                        <button
                          onClick={() => toggleSubmenu(item.path)}
                          className={`
                            w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200
                            ${isActive(item.path)
                              ? 'bg-primary-900 text-white shadow-md'
                              : 'text-neutral-700 hover:bg-neutral-100 hover:text-primary-900'
                            }
                          `}
                        >
                          <div className="flex items-center space-x-3">
                            <Icon size={20} />
                            <span className="font-medium">{item.label}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            {item.badge && (
                              <span className="bg-primary-900 text-white text-xs px-2 py-1 rounded-full">
                                {item.badge}
                              </span>
                            )}
                            <svg 
                              className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </button>
                      ) : (
                        <Link
                          to={item.path}
                          onClick={onClose}
                          className={`
                            flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200
                            ${isActive(item.path)
                              ? 'bg-primary-900 text-white shadow-md'
                              : 'text-neutral-700 hover:bg-neutral-100 hover:text-primary-900'
                            }
                          `}
                        >
                          <div className="flex items-center space-x-3">
                            <Icon size={20} />
                            <span className="font-medium">{item.label}</span>
                          </div>
                          {item.badge && (
                            <span className="bg-primary-900 text-white text-xs px-2 py-1 rounded-full">
                              {item.badge}
                            </span>
                          )}
                        </Link>
                      )}
                    </div>

                    {/* Submenu */}
                    {hasSubmenu && isExpanded && (
                      <ul className="mt-2 ml-4 space-y-1 border-l-2 border-neutral-200 pl-4">
                        {item.submenu!.map((subItem) => {
                          const SubIcon = subItem.icon;
                          return (
                            <li key={subItem.path}>
                              <Link
                                to={subItem.path}
                                onClick={onClose}
                                className={`
                                  flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 text-sm
                                  ${isActive(subItem.path)
                                    ? 'bg-primary-100 text-primary-900 font-medium'
                                    : 'text-neutral-600 hover:bg-neutral-50 hover:text-primary-900'
                                  }
                                `}
                              >
                                <SubIcon size={16} />
                                <span>{subItem.label}</span>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-neutral-200">
            <p className="text-xs text-neutral-500 text-center">
              ESST Platform v1.0
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;