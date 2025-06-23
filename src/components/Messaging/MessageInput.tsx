import React, { useState } from 'react';
import { Send, Paperclip, Smile } from 'lucide-react';
import Button from '../UI/Button';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage, disabled = false }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="p-4 border-t border-neutral-200 bg-neutral-50">
      <form onSubmit={handleSubmit} className="flex items-end space-x-3">
        <button 
          type="button"
          className="p-2 hover:bg-neutral-200 rounded-lg transition-colors duration-200"
          disabled={disabled}
        >
          <Paperclip size={20} className="text-neutral-600" />
        </button>
        
        <div className="flex-1 relative">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Tapez votre message..."
            className="w-full px-4 py-3 pr-12 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
            rows={1}
            style={{ minHeight: '48px', maxHeight: '120px' }}
            disabled={disabled}
          />
          <button 
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-neutral-200 rounded transition-colors duration-200"
            disabled={disabled}
          >
            <Smile size={16} className="text-neutral-600" />
          </button>
        </div>
        
        <Button
          type="submit"
          disabled={!message.trim() || disabled}
          className="px-4 py-3"
        >
          <Send size={20} />
        </Button>
      </form>
    </div>
  );
};

export default MessageInput;