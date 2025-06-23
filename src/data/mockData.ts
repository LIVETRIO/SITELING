import { Message, Conversation, Project, Page, NewsItem, Formation, User } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@esst.edu',
    firstName: 'Pierre',
    lastName: 'Dupont',
    userType: 'admin',
    department: 'Administration',
    isOnline: true,
  },
  {
    id: '2',
    email: 'prof.dubois@esst.edu',
    firstName: 'Michel',
    lastName: 'Dubois',
    userType: 'teacher',
    department: 'Informatique',
    isOnline: true,
  },
  {
    id: '3',
    email: 'sophie.martin@student.esst.edu',
    firstName: 'Sophie',
    lastName: 'Martin',
    userType: 'student',
    department: 'Informatique',
    isOnline: true,
  },
  {
    id: '4',
    email: 'julien.moreau@esst.edu',
    firstName: 'Julien',
    lastName: 'Moreau',
    userType: 'teacher',
    department: 'Sciences',
    isOnline: false,
  },
  {
    id: '5',
    email: 'marie.bernard@student.esst.edu',
    firstName: 'Marie',
    lastName: 'Bernard',
    userType: 'student',
    department: 'Sciences',
    isOnline: true,
  },
];

export const mockConversations: Conversation[] = [
  {
    id: '1',
    participants: [mockUsers[1], mockUsers[2]],
    isGroup: false,
    unreadCount: 2,
    lastMessage: {
      id: '1',
      conversationId: '1',
      senderId: '2',
      content: 'Concernant le projet final...',
      timestamp: new Date(),
      isRead: false,
    },
  },
  {
    id: '2',
    title: 'Groupe Projet IA',
    participants: [mockUsers[2], mockUsers[4], mockUsers[1]],
    isGroup: true,
    unreadCount: 0,
    lastMessage: {
      id: '2',
      conversationId: '2',
      senderId: '5',
      content: 'Marie: Voici les références...',
      timestamp: new Date(Date.now() - 86400000),
      isRead: true,
    },
  },
];

export const mockProjects: Project[] = [
  {
    id: '1',
    title: 'Système de Recommandation IA',
    description: 'Développement d\'un système de recommandation utilisant l\'intelligence artificielle pour améliorer l\'expérience utilisateur.',
    category: 'Intelligence Artificielle',
    participants: [mockUsers[1], mockUsers[2], mockUsers[4]],
    createdBy: '2',
    createdAt: new Date(Date.now() - 604800000),
    status: 'active',
    tags: ['IA', 'Machine Learning', 'Python'],
    resources: ['dataset.csv', 'research_papers.pdf'],
  },
  {
    id: '2',
    title: 'Application Mobile Étudiante',
    description: 'Création d\'une application mobile dédiée aux étudiants pour faciliter l\'accès aux services universitaires.',
    category: 'Développement Mobile',
    participants: [mockUsers[2], mockUsers[4]],
    createdBy: '3',
    createdAt: new Date(Date.now() - 1209600000),
    status: 'active',
    tags: ['React Native', 'Mobile', 'UX/UI'],
    resources: ['mockups.fig', 'specifications.docx'],
  },
];

export const mockPages: Page[] = [
  {
    id: '1',
    title: 'Accueil',
    slug: 'accueil',
    content: 'Contenu de la page d\'accueil...',
    status: 'published',
    author: 'Pierre Dupont',
    lastModified: new Date(Date.now() - 432000000),
    section: 'Institution',
  },
  {
    id: '2',
    title: 'Présentation ESST',
    slug: 'presentation',
    content: 'Contenu de présentation de l\'ESST...',
    status: 'published',
    author: 'Pierre Dupont',
    lastModified: new Date(Date.now() - 345600000),
    section: 'Institution',
  },
  {
    id: '3',
    title: 'Admission 2025/2026',
    slug: 'admission-2025',
    content: 'Procédures d\'admission pour l\'année 2025/2026...',
    status: 'draft',
    author: 'Marie Bernard',
    lastModified: new Date(),
    section: 'Admission',
  },
];

export const mockNews: NewsItem[] = [
  {
    id: '1',
    title: 'Nouvelle Formation en Intelligence Artificielle',
    excerpt: 'L\'ESST lance un nouveau programme de Master en Intelligence Artificielle pour la rentrée 2025.',
    content: 'Contenu complet de l\'actualité...',
    author: 'Michel Dubois',
    publishedAt: new Date(Date.now() - 172800000),
    category: 'Formation',
    imageUrl: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['IA', 'Formation', 'Master'],
  },
  {
    id: '2',
    title: 'Collaboration Internationale Signée',
    excerpt: 'Partenariat stratégique avec l\'Université de Stanford pour les échanges étudiants.',
    content: 'Détails du partenariat...',
    author: 'Pierre Dupont',
    publishedAt: new Date(Date.now() - 259200000),
    category: 'International',
    imageUrl: 'https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['International', 'Partenariat'],
  },
];

export const mockFormations: Formation[] = [
  {
    id: '1',
    title: 'Master en Intelligence Artificielle',
    description: 'Formation approfondie en IA, machine learning et deep learning.',
    duration: '2 ans',
    level: 'Master',
    department: 'Informatique',
    requirements: ['Licence en informatique', 'Bases en mathématiques', 'Anglais B2'],
    objectives: ['Maîtriser les algorithmes d\'IA', 'Développer des solutions innovantes', 'Comprendre l\'éthique de l\'IA'],
  },
  {
    id: '2',
    title: 'Licence Sciences et Technologies',
    description: 'Formation généraliste en sciences et technologies.',
    duration: '3 ans',
    level: 'Licence',
    department: 'Sciences',
    requirements: ['Baccalauréat scientifique', 'Niveau correct en mathématiques'],
    objectives: ['Acquérir les bases scientifiques', 'Développer l\'esprit critique', 'Préparer la spécialisation'],
  },
];