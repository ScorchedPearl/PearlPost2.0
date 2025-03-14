import { User } from 'gql/graphql';
import { Smile, Share2 } from 'lucide-react';

interface Reaction {
  emoji: string;
  count: number;
  reactedBy: string[];
}

interface MessageBubbleProps {
  user:User
  id: number;
  text: string;
  sender: string;
  timestamp: string;
  reactions: Reaction[];
  senderAvatar: string;
  showEmojiPicker: number | null;
  onEmojiPickerToggle: (id: number | null) => void;
  onReaction: (messageId: number, emoji: string) => void;
  quickEmojis: string[];
}

const MessageBubble: React.FC<MessageBubbleProps> = ({
  user,
  id,
  text,
  sender,
  senderAvatar,
  timestamp,
  reactions,
  showEmojiPicker,
  onEmojiPickerToggle,
  onReaction,
  quickEmojis
}) => {
  const isUser = sender === user.name;

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} animate-slide-up`}>
      {!isUser && (
     <img
       src={senderAvatar}
       alt={`${sender}'s avatar`}
       className="w-8 h-8 rounded-full mr-2"
     />
      )}
      <div className="relative group max-w-[85%] sm:max-w-[70%]">
     <div
       className={`rounded-2xl px-4 py-2.5 shadow-md
      ${isUser 
        ? 'bg-chat-bubble-user rounded-tr-sm' 
        : 'glass-dark rounded-tl-sm'
      }`}
     >
       <p className="text-white text-sm sm:text-base whitespace-pre-wrap break-words">{text}</p>
       <div className="flex items-center justify-between mt-1">
      <p className="text-xs text-white/60">{timestamp}</p>
      <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <button
       onClick={() => onEmojiPickerToggle(id)}
       className="text-white/80 hover:text-white transition-colors"
        >
       <Smile className="w-3.5 h-3.5" />
        </button>
        <button className="text-white/80 hover:text-white transition-colors">
       <Share2 className="w-3.5 h-3.5" />
        </button>
      </div>
       </div>
       
       {reactions.length > 0 && (
      <div className="flex gap-1 mt-1.5 flex-wrap">
        {reactions.map((reaction, index) => (
       <span
         key={index}
         className={`
        ${isUser ? 'bg-white/20' : 'bg-white/10'} 
        px-1.5 py-0.5 rounded-full text-xs cursor-pointer 
        hover:bg-white/30 transition-colors
         `}
         onClick={() => onReaction(id, reaction.emoji)}
       >
         {reaction.emoji} {reaction.count}
       </span>
        ))}
      </div>
       )}
     </div>
     
     {showEmojiPicker === id && (
       <div className="absolute bottom-full mb-2 flex gap-1 glass-strong p-2 rounded-xl shadow-lg z-10 animate-scale-in">
      {quickEmojis.map(emoji => (
        <button
       key={emoji}
       onClick={() => onReaction(id, emoji)}
       className="hover:scale-125 transition-transform p-1 text-base"
        >
       {emoji}
        </button>
      ))}
       </div>
     )}
      </div>
      {isUser && (
     <img
       src={user.profileImageURL}
       alt="Your avatar"
       className="w-8 h-8 rounded-full ml-2"
     />
      )}
    </div>
  );
};

export default MessageBubble;
