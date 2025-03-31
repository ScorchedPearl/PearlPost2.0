import React from 'react';
import { Search } from 'lucide-react';
import Avatar from './avatar';

interface Chat {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  isOnline?: boolean;
}

interface ChatListProps {
  chats: Chat[];
  selectedChat: number | null;
  onSelectChat: (id: number) => void;
}

const ChatList: React.FC<ChatListProps> = ({ chats, selectedChat, onSelectChat }) => {
  return (
    <div className="h-full flex flex-col glass-dark">
      <div className="p-4 sm:p-6 border-b border-white/10">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl text-white sm:text-2xl font-medium">PearlPost</h1>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60" />
          <input
            type="text"
            placeholder="Search messages"
            className="w-full pl-10 pr-4 py-2.5 glass text-white rounded-xl 
            focus:outline-none focus:ring-2 focus:ring-chat-primary/50 transition-all duration-300
            placeholder:text-white/50 text-sm"
          />
        </div>
      </div>
      
      <div className="overflow-y-auto flex-1">
        {chats.map(chat => (
          <div
            key={chat.id}
            onClick={() => onSelectChat(chat.id)}
            className={`flex items-center p-4 cursor-pointer transition-all duration-300
            hover:bg-white/5 ${selectedChat === chat.id ? 'bg-white/5' : ''}`}
          >
            <Avatar
              src={chat.avatar}
              alt={chat.name}
              size="lg"
              isOnline={chat.isOnline}
            />
            
            <div className="ml-3 flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h2 className="font-medium text-white truncate">{chat.name}</h2>
                <span className="text-xs text-white/60 whitespace-nowrap">{chat.time}</span>
              </div>
              
              <div className="flex items-center justify-between mt-0.5">
                <p className="text-sm text-white/70 truncate max-w-[150px]">{chat.lastMessage}</p>
                {chat.unread > 0 && (
                  <span className="bg-chat-primary text-white rounded-full h-5 min-w-5 flex items-center justify-center px-1.5 text-xs font-medium">
                    {chat.unread}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatList;
