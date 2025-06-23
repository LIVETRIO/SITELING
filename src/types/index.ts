export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  userType: 'admin' | 'teacher' | 'student' | 'visitor';
  avatar?: string;
  department?: string;
  isOnline?: boolean;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
  attachments?: string[];
}

export interface Conversation {
  id: string;
  title?: string;
  participants: User[];
  lastMessage?: Message;
  isGroup: boolean;
  unreadCount: number;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  participants: User[];
  createdBy: string;
  createdAt: Date;
  status: 'active' | 'completed' | 'paused';
  tags: string[];
  resources: string[];
}

export interface Page {
  id: string;
  title: string;
  slug: string;
  content: string;
  status: 'draft' | 'published' | 'review';
  author: string;
  lastModified: Date;
  section: string;
}

export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: Date;
  category: string;
  imageUrl?: string;
  tags: string[];
}

export interface Formation {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: string;
  department: string;
  requirements: string[];
  objectives: string[];
}