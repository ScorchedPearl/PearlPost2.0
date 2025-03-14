import React, { useState } from 'react';
import { Image, Camera, Mic, Link2, Smile, Send } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [messageInput, setMessageInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (messageInput.trim()) {
      onSendMessage(messageInput);
      setMessageInput('');
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="p-3 sm:p-4 glass-dark border-t border-white/10"
    >
      <div className="flex items-center space-x-2 sm:space-x-4">
        <div className="hidden sm:flex space-x-2">
          <button type="button" className="text-chat-primary hover:text-white transition-colors p-2 rounded-full hover:bg-white/5">
            <Image className="w-5 h-5" />
          </button>
          <button type="button" className="text-chat-primary hover:text-white transition-colors p-2 rounded-full hover:bg-white/5">
            <Camera className="w-5 h-5" />
          </button>
          <button type="button" className="text-chat-primary hover:text-white transition-colors p-2 rounded-full hover:bg-white/5">
            <Mic className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex sm:hidden">
          <button type="button" className="text-chat-primary hover:text-white transition-colors p-2 rounded-full hover:bg-white/5">
            <Image className="w-5 h-5" />
          </button>
        </div>
        
        <div className="relative flex-1">
          <input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            placeholder="Message..."
            className="w-full pl-4 pr-4 py-2.5 glass text-white rounded-full 
              focus:outline-none focus:ring-2 focus:ring-chat-primary/50 transition-all duration-300
              placeholder:text-white/50"
          />
        </div>
        
        <div className="hidden sm:flex items-center space-x-2">
          <button type="button" className="text-chat-primary hover:text-white transition-colors p-2 rounded-full hover:bg-white/5">
            <Link2 className="w-5 h-5" />
          </button>
          <button type="button" className="text-chat-primary hover:text-white transition-colors p-2 rounded-full hover:bg-white/5">
            <Smile className="w-5 h-5" />
          </button>
        </div>
        
        <button
          type="submit"
          className="button-gradient p-2.5 rounded-full shadow-md transition-all duration-300
            hover:shadow-glow active:scale-95 focus:outline-none"
          disabled={!messageInput.trim()}
        >
          <Send className="w-4 h-4 text-white" />
        </button>
      </div>
    </form>
  );
};

export default ChatInput;
