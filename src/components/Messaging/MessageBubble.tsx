import React from 'react';
import { Message, User } from '../../types';

interface MessageBubbleProps {
  message: Message;
  sender?: User;
  isOwn: boolean;
  showAvatar?: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ 
  message, 
  sender, 
  isOwn, 
  showAvatar = true 
}) => {
  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`flex items-end space-x-2 max-w-xs lg:max-w-md ${isOwn ? 'flex-row-reverse space-x-reverse' : ''}`}>
        {/* Avatar */}
        {showAvatar && !isOwn && sender && (
          <div className="w-8 h-8 bg-primary-900 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white text-xs font-medium">
              {sender.firstName[0]}{sender.lastName[0]}
            </span>
          </div>
        )}
        
        {/* Message Content */}
        <div className="space-y-1">
          {/* Sender name for group chats */}
          {!isOwn && sender && (
            <p className="text-xs text-neutral-600 px-1">
              {sender.firstName} {sender.lastName}
            </p>
          )}
          
          {/* Message bubble */}
          <div
            className={`
              px-4 py-3 rounded-2xl max-w-full break-words
              ${isOwn 
                ? 'bg-primary-900 text-white rounded-br-md' 
                : 'bg-neutral-100 text-neutral-900 rounded-bl-md'
              }
            `}
          >
            <p className="text-sm whitespace-pre-wrap">{message.content}</p>
          </div>
          
          {/* Timestamp */}
          <p className={`text-xs text-neutral-500 px-1 ${isOwn ? 'text-right' : 'text-left'}`}>
            {message.timestamp.toLocaleTimeString('fr-FR', {
              hour: '2-digit',
              minute: '2-digit'
            })}
            {isOwn && (
              <span className="ml-1">
                {message.isRead ? '✓✓' : '✓'}
              </span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;