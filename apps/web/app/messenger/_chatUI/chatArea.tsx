import React from 'react';
import { Phone, VideoIcon, Star, MoreVertical } from 'lucide-react';
import Avatar from './avatar';
import MessageBubble from './messageBubble';
import ChatInput from './chatInput';
import { User } from 'gql/graphql';

interface Reaction {
  emoji: string;
  count: number;
  reactedBy: string[];
}

interface Message {
  id: number;
  text: string;
  sender: string;
  senderAvatar: string;
  timestamp: string;
  reactions: Reaction[];
}

interface Chat {
  id: number;
  name: string;
  avatar: string;
  isOnline?: boolean;
}

interface ChatAreaProps {
  user:User
  chat: Chat;
  messages: Message[];
  showEmojiPicker: number | null;
  onEmojiPickerToggle: (id: number | null) => void;
  onReaction: (messageId: number, emoji: string) => void;
  onSendMessage: (message: string) => void;
}

const ChatArea: React.FC<ChatAreaProps> = ({
  user,
  chat,
  messages,
  showEmojiPicker,
  onEmojiPickerToggle,
  onReaction,
  onSendMessage
}) => {
  const quickEmojis = ['❤️', '👍', '😊', '😂', '🎉', '👏'];

  return (
    <div className="h-full flex flex-col ">
      {/* Chat Header */}
      <div className=" p-3 sm:p-4 glass-dark border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center">
          <Avatar
            src={chat.avatar}
            alt={chat.name}
            isOnline={chat.isOnline}
          />
          <div className="ml-3">
            <h2 className="font-medium text-white">{chat.name}</h2>
            <p className="text-xs text-chat-primary">
              {chat.isOnline ? 'Active now' : 'Offline'}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-1 sm:space-x-3">
          <button className="hidden sm:flex text-chat-primary hover:text-white p-2 rounded-full 
            transition-colors hover:bg-white/5">
            <Phone className="w-5 h-5" />
          </button>
          <button className="hidden sm:flex text-chat-primary hover:text-white p-2 rounded-full 
            transition-colors hover:bg-white/5">
            <VideoIcon className="w-5 h-5" />
          </button>
          <button className="text-chat-primary hover:text-white p-2 rounded-full 
            transition-colors hover:bg-white/5">
            <Star className="w-5 h-5" />
          </button>
          <button className="text-chat-primary hover:text-white p-2 rounded-full 
            transition-colors hover:bg-white/5">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient">
        {messages.map(message => (
          <MessageBubble
        user={user}
        key={message.id}
        id={message.id}
        text={message.text}
        sender={message.sender}
        senderAvatar={message.senderAvatar}
        timestamp={message.timestamp}
        reactions={message.reactions}
        showEmojiPicker={showEmojiPicker}
        onEmojiPickerToggle={onEmojiPickerToggle}
        onReaction={onReaction}
        quickEmojis={quickEmojis}
          />
        ))}
      </div>

      {/* Message Input */}
      <ChatInput onSendMessage={onSendMessage} />
    </div>
  );
};

export default ChatArea;
