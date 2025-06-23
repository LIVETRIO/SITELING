import React from 'react';
import { Link } from 'react-router-dom';
import { 
  MessageSquare, 
  FolderOpen, 
  Users, 
  Calendar, 
  TrendingUp,
  BookOpen,
  Bell,
  Activity
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import { mockConversations, mockProjects, mockNews } from '../data/mockData';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  if (!user) return null;

  const getWelcomeMessage = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bonjour';
    if (hour < 18) return 'Bon après-midi';
    return 'Bonsoir';
  };

  const getQuickActions = () => {
    const common = [
      { icon: MessageSquare, label: 'Messages', path: '/messaging', count: 3 },
      { icon: FolderOpen, label: 'Projets', path: '/projects', count: mockProjects.length },
    ];

    switch (user.userType) {
      case 'admin':
        return [
          ...common,
          { icon: Users, label: 'Utilisateurs', path: '/admin/users', count: 245 },
          { icon: Activity, label: 'Statistiques', path: '/admin/stats' },
        ];
      case 'teacher':
        return [
          ...common,
          { icon: BookOpen, label: 'Mes Cours', path: '/teacher/courses', count: 4 },
          { icon: Users, label: 'Étudiants', path: '/teacher/students', count: 85 },
        ];
      case 'student':
        return [
          ...common,
          { icon: BookOpen, label: 'Mes Cours', path: '/student/courses', count: 6 },
          { icon: Calendar, label: 'Planning', path: '/student/schedule' },
        ];
      default:
        return common;
    }
  };

  const quickActions = getQuickActions();

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">
            {getWelcomeMessage()}, {user.firstName} !
          </h1>
          <p className="text-neutral-600">
            Voici un aperçu de votre activité sur la plateforme ESST
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Link key={index} to={action.path}>
                <Card className="hover:shadow-lg transition-all duration-200 group" hover>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary-900 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                      <Icon size={24} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-neutral-900 group-hover:text-primary-900 transition-colors duration-200">
                        {action.label}
                      </h3>
                      {action.count && (
                        <p className="text-2xl font-bold text-primary-900">
                          {action.count}
                        </p>
                      )}
                    </div>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Messages */}
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-neutral-900 flex items-center space-x-2">
                <MessageSquare size={24} className="text-primary-900" />
                <span>Messages Récents</span>
              </h2>
              <Link to="/messaging">
                <Button variant="ghost" size="sm">
                  Voir tout
                </Button>
              </Link>
            </div>
            <div className="space-y-4">
              {mockConversations.slice(0, 3).map((conversation) => (
                <div key={conversation.id} className="flex items-center space-x-3 p-3 hover:bg-neutral-50 rounded-lg transition-colors duration-200">
                  <div className="w-10 h-10 bg-primary-900 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium text-sm">
                      {conversation.participants[0]?.firstName[0]}
                      {conversation.participants[0]?.lastName[0]}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-neutral-900 truncate">
                        {conversation.isGroup 
                          ? conversation.title 
                          : `${conversation.participants[0]?.firstName} ${conversation.participants[0]?.lastName}`
                        }
                      </p>
                      {conversation.unreadCount > 0 && (
                        <span className="bg-primary-900 text-white text-xs rounded-full px-2 py-1">
                          {conversation.unreadCount}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-neutral-600 truncate">
                      {conversation.lastMessage?.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Active Projects */}
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-neutral-900 flex items-center space-x-2">
                <FolderOpen size={24} className="text-primary-900" />
                <span>Projets Actifs</span>
              </h2>
              <Link to="/projects">
                <Button variant="ghost" size="sm">
                  Voir tout
                </Button>
              </Link>
            </div>
            <div className="space-y-4">
              {mockProjects.filter(p => p.status === 'active').slice(0, 3).map((project) => (
                <div key={project.id} className="p-4 border border-neutral-200 rounded-lg hover:border-primary-300 transition-colors duration-200">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-neutral-900">{project.title}</h3>
                    <span className="bg-success-100 text-success-800 text-xs px-2 py-1 rounded-full">
                      {project.status}
                    </span>
                  </div>
                  <p className="text-sm text-neutral-600 mb-3 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex -space-x-2">
                      {project.participants.slice(0, 3).map((participant, index) => (
                        <div 
                          key={participant.id} 
                          className="w-6 h-6 bg-primary-900 rounded-full border-2 border-white flex items-center justify-center"
                        >
                          <span className="text-white text-xs">
                            {participant.firstName[0]}
                          </span>
                        </div>
                      ))}
                      {project.participants.length > 3 && (
                        <div className="w-6 h-6 bg-neutral-400 rounded-full border-2 border-white flex items-center justify-center">
                          <span className="text-white text-xs">
                            +{project.participants.length - 3}
                          </span>
                        </div>
                      )}
                    </div>
                    <span className="text-xs text-neutral-500">
                      {project.tags.slice(0, 2).join(', ')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Recent News */}
        <Card className="mt-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-neutral-900 flex items-center space-x-2">
              <Bell size={24} className="text-primary-900" />
              <span>Actualités Récentes</span>
            </h2>
            <Link to="/news">
              <Button variant="ghost" size="sm">
                Voir toutes
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockNews.slice(0, 2).map((news) => (
              <div key={news.id} className="flex items-start space-x-4 p-4 hover:bg-neutral-50 rounded-lg transition-colors duration-200">
                <img 
                  src={news.imageUrl}
                  alt={news.title}
                  className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded-full">
                      {news.category}
                    </span>
                    <span className="text-xs text-neutral-500">
                      {news.publishedAt.toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                  <h3 className="font-semibold text-neutral-900 mb-1 line-clamp-2">
                    {news.title}
                  </h3>
                  <p className="text-sm text-neutral-600 line-clamp-2">
                    {news.excerpt}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;