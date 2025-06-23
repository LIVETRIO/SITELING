import React, { useState, useEffect, useRef } from 'react';
import { Search, Phone, Video, MoreVertical, Users, Plus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import MessageBubble from '../components/Messaging/MessageBubble';
import MessageInput from '../components/Messaging/MessageInput';
import { mockConversations, mockUsers } from '../data/mockData';
import { Conversation, Message } from '../types';

const Messaging: React.FC = () => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mock messages for the selected conversation
  const generateMockMessages = (conversationId: string): Message[] => {
    return [
      {
        id: '1',
        conversationId,
        senderId: '2',
        content: 'Bonjour ! Comment avancez-vous sur le projet final ?',
        timestamp: new Date(Date.now() - 1800000), // 30 min ago
        isRead: true,
      },
      {
        id: '2',
        conversationId,
        senderId: user?.id || '3',
        content: 'Bonjour Professeur ! J\'ai terminé la première partie et je travaille actuellement sur l\'implémentation de l\'algorithme.',
        timestamp: new Date(Date.now() - 1500000), // 25 min ago
        isRead: true,
      },
      {
        id: '3',
        conversationId,
        senderId: '2',
        content: 'Excellent ! Pourriez-vous me l\'envoyer pour révision ? J\'aimerais voir votre approche.',
        timestamp: new Date(Date.now() - 1200000), // 20 min ago
        isRead: true,
      },
      {
        id: '4',
        conversationId,
        senderId: user?.id || '3',
        content: 'Bien sûr ! Je vous l\'envoie dans quelques minutes. J\'ai aussi quelques questions sur la partie théorique.',
        timestamp: new Date(Date.now() - 900000), // 15 min ago
        isRead: true,
      },
      {
        id: '5',
        conversationId,
        senderId: '2',
        content: 'Parfait ! N\'hésitez pas à me poser toutes vos questions. Je suis disponible cet après-midi pour en discuter.',
        timestamp: new Date(Date.now() - 300000), // 5 min ago
        isRead: false,
      },
    ];
  };

  useEffect(() => {
    if (selectedConversation) {
      setMessages(generateMockMessages(selectedConversation.id));
    }
  }, [selectedConversation, user?.id]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (content: string) => {
    if (!selectedConversation || !user) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      conversationId: selectedConversation.id,
      senderId: user.id,
      content,
      timestamp: new Date(),
      isRead: false,
    };

    setMessages(prev => [...prev, newMessage]);

    // Update conversation's last message
    setConversations(prev => prev.map(conv => 
      conv.id === selectedConversation.id 
        ? { ...conv, lastMessage: newMessage }
        : conv
    ));
  };

  const getOtherParticipant = (conversation: Conversation) => {
    if (conversation.isGroup) return null;
    return conversation.participants.find(p => p.id !== user?.id);
  };

  const filteredConversations = conversations.filter(conversation => {
    if (!searchQuery) return true;
    
    const searchTerm = searchQuery.toLowerCase();
    if (conversation.isGroup) {
      return conversation.title?.toLowerCase().includes(searchTerm);
    } else {
      const otherParticipant = getOtherParticipant(conversation);
      return otherParticipant && 
        `${otherParticipant.firstName} ${otherParticipant.lastName}`.toLowerCase().includes(searchTerm);
    }
  });

  const markAsRead = (conversationId: string) => {
    setConversations(prev => prev.map(conv => 
      conv.id === conversationId 
        ? { ...conv, unreadCount: 0 }
        : conv
    ));
  };

  const handleSelectConversation = (conversation: Conversation) => {
    setSelectedConversation(conversation);
    markAsRead(conversation.id);
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">Messagerie</h1>
          <p className="text-neutral-600">Communiquez avec la communauté ESST</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-12rem)]">
          {/* Conversations List */}
          <Card className="lg:col-span-1 flex flex-col" padding="none">
            {/* Search Bar */}
            <div className="p-4 border-b border-neutral-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" size={20} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Rechercher..."
                  className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>

            {/* New Message Button */}
            <div className="p-4 border-b border-neutral-200">
              <Button className="w-full flex items-center justify-center space-x-2">
                <Plus size={20} />
                <span>Nouveau Message</span>
              </Button>
            </div>

            {/* Conversations Header */}
            <div className="p-4 border-b border-neutral-200 bg-neutral-50">
              <h3 className="font-semibold text-neutral-900">Conversations</h3>
            </div>

            {/* Conversations List */}
            <div className="flex-1 overflow-y-auto">
              {filteredConversations.map((conversation) => {
                const otherParticipant = getOtherParticipant(conversation);
                const isSelected = selectedConversation?.id === conversation.id;
                
                return (
                  <div
                    key={conversation.id}
                    onClick={() => handleSelectConversation(conversation)}
                    className={`
                      p-4 border-b border-neutral-100 cursor-pointer transition-all duration-200
                      ${isSelected 
                        ? 'bg-primary-50 border-l-4 border-l-primary-900' 
                        : 'hover:bg-neutral-50'
                      }
                    `}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <div className="w-12 h-12 bg-primary-900 rounded-full flex items-center justify-center">
                          <span className="text-white font-medium">
                            {conversation.isGroup 
                              ? conversation.title?.[0] || 'G'
                              : `${otherParticipant?.firstName[0]}${otherParticipant?.lastName[0]}`
                            }
                          </span>
                        </div>
                        {!conversation.isGroup && otherParticipant?.isOnline && (
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success-500 border-2 border-white rounded-full"></div>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-neutral-900 truncate">
                            {conversation.isGroup 
                              ? conversation.title
                              : `${otherParticipant?.firstName} ${otherParticipant?.lastName}`
                            }
                          </p>
                          <span className="text-xs text-neutral-500">
                            {conversation.lastMessage?.timestamp.toLocaleTimeString('fr-FR', {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-neutral-600 truncate">
                            {conversation.lastMessage?.content}
                          </p>
                          {conversation.unreadCount > 0 && (
                            <span className="bg-primary-900 text-white text-xs rounded-full px-2 py-1 ml-2 flex-shrink-0">
                              {conversation.unreadCount}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Chat Window */}
          <Card className="lg:col-span-2 flex flex-col" padding="none">
            {selectedConversation ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-neutral-200 bg-neutral-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary-900 rounded-full flex items-center justify-center">
                        <span className="text-white font-medium">
                          {selectedConversation.isGroup 
                            ? selectedConversation.title?.[0] || 'G'
                            : (() => {
                                const otherParticipant = getOtherParticipant(selectedConversation);
                                return `${otherParticipant?.firstName[0]}${otherParticipant?.lastName[0]}`;
                              })()
                          }
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-neutral-900">
                          {selectedConversation.isGroup 
                            ? selectedConversation.title
                            : (() => {
                                const otherParticipant = getOtherParticipant(selectedConversation);
                                return `${otherParticipant?.firstName} ${otherParticipant?.lastName}`;
                              })()
                          }
                        </h3>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-success-500 rounded-full"></div>
                          <p className="text-sm text-success-600">En ligne</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button className="p-2 hover:bg-neutral-200 rounded-lg transition-colors duration-200">
                        <Phone size={20} className="text-neutral-600" />
                      </button>
                      <button className="p-2 hover:bg-neutral-200 rounded-lg transition-colors duration-200">
                        <Video size={20} className="text-neutral-600" />
                      </button>
                      {selectedConversation.isGroup && (
                        <button className="p-2 hover:bg-neutral-200 rounded-lg transition-colors duration-200">
                          <Users size={20} className="text-neutral-600" />
                        </button>
                      )}
                      <button className="p-2 hover:bg-neutral-200 rounded-lg transition-colors duration-200">
                        <MoreVertical size={20} className="text-neutral-600" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4">
                  {messages.map((message) => {
                    const isOwn = message.senderId === user?.id;
                    const sender = mockUsers.find(u => u.id === message.senderId);
                    
                    return (
                      <MessageBubble
                        key={message.id}
                        message={message}
                        sender={sender}
                        isOwn={isOwn}
                        showAvatar={selectedConversation.isGroup}
                      />
                    );
                  })}
                  <div ref={messagesEndRef} />
                </div>

                {/* Message Input */}
                <MessageInput onSendMessage={handleSendMessage} />
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-neutral-200 rounded-full flex items-center justify-center mx-auto">
                    <Users size={32} className="text-neutral-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-neutral-900">
                      Sélectionnez une conversation
                    </h3>
                    <p className="text-neutral-600">
                      Choisissez une conversation pour commencer à discuter
                    </p>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Messaging;