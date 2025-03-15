"use client"
import React, { useState, useEffect } from 'react';
import { MessageCircle, Settings } from 'lucide-react';
import ChatList from './_chatUI/chatList';
import ChatArea from './_chatUI/chatArea';
import { useIsMobile } from '@hooks/isMobile';
import { useGetRooms } from '@hooks/room';
import Loader from 'app/loading';
import { useCurrentUser } from '@hooks/user';
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
  senderAvatar: string
  timestamp: string;
  reactions: Reaction[];
}

interface Chat {
  Messages:any,
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  isOnline?: boolean;
}

const Index = () => {
  const isMobile = useIsMobile();
  const [selectedChat, setSelectedChat] = useState<number | null>(1);
  const [messages, setMessages] = useState<Message[]>([]);
  const [showChatList, setShowChatList] = useState(!isMobile);
  const [showEmojiPicker, setShowEmojiPicker] = useState<number | null>(null);
  const {rooms,isLoading3}=useGetRooms();
  const {user,isLoading}=useCurrentUser();
  useEffect(() => {
    if (!isMobile) {
      setShowChatList(true);
    }
  }, [isMobile]);
  const handleRoomName=(room)=>{
    if(!room.name){
    return room.users.map((roomUser: { id: string; name: string; }) => {
      console.log(roomUser)
      return user && roomUser.name !== user.name ? roomUser.name : "";
    }).filter((name: string) => name).join(", ");
  }else{
    return room.name
  }
}
const handleSelectChat = (chatId: number) => {
  setSelectedChat(chatId);
  if (isMobile) {
    setShowChatList(false);
  }
};

const handleReaction = (messageId: number, emoji: string) => {
  setMessages(prevMessages => 
    prevMessages.map(message => {
      if (message.id === messageId) {
        const existingReaction = message.reactions.find(r => r.emoji === emoji);
        if (existingReaction) {
          // Remove reaction if user already reacted
          if (existingReaction.reactedBy.includes(user.name)) {
            return {
              ...message,
              reactions: message.reactions.map(r => 
                r.emoji === emoji 
                  ? { 
                      ...r, 
                      count: r.count - 1,
                      reactedBy: r.reactedBy.filter(u => u !== user.name)
                    }
                  : r
              ).filter(r => r.count > 0)
            };
          }
          // Add user to existing reaction
          return {
            ...message,
            reactions: message.reactions.map(r =>
              r.emoji === emoji
                ? {
                    ...r,
                    count: r.count + 1,
                    reactedBy: [...r.reactedBy, user.name]
                  }
                : r
            )
          };
        }
        return {
          ...message,
          reactions: [...message.reactions, { emoji, count: 1, reactedBy: [`${user.name}`] }]
        };
      }
      return message;
    })
  );
  setShowEmojiPicker(null);
};
const handleSendMessage = (text: string) => {
  const newMessage: Message = {
    id: messages.length+1,
    text,
    sender: user.name,
    senderAvatar: user.profileImageURL,
    timestamp: new Date().toISOString(),
    reactions: []
  };

  setMessages([...messages, newMessage]);
};
  const handleRoomAvatar=(room)=>{
    if(!room.avatar){
      return room.users.map((roomUser)=>{
        return roomUser.name!==user.name?roomUser.profileImageURL:""
    }).filter((avatar)=>avatar)[0]
  }else{
    return room.avatar
  }
}
useEffect(() => {
  if (!isLoading||!isLoading3) {
    setSelectedChat(0);
    updateMessageandReaction(rooms[0].messages);
  }
}, [rooms]);
const updateMessageandReaction=(messages)=>{
  setMessages(messages.map((message,index)=>{
    const messageReactionMap = new Map<string, { emoji: string; count: number; reactedBy: string[] }>();
    message.reactions.forEach((reaction: any) => {
      if (messageReactionMap.has(reaction.type)) {
        const existingReaction = messageReactionMap.get(reaction.type);
        existingReaction.count += 1;
        existingReaction.reactedBy.push(reaction.author.name);
      } else {
        messageReactionMap.set(reaction.type, {
          emoji: reaction.type,
          count: 1,
          reactedBy: [reaction.author.name]
        });
      }
    });

    return {
      id: index,
      text: message.text,
      sender: message.author.name,
      senderAvatar: message.author.profileImageURL,
      timestamp: message.createdAt,
      reactions: Array.from(messageReactionMap.values())
    };
  }));
}
if(isLoading||isLoading3){
  return <Loader></Loader>
}
console.log(rooms);
  const chats: Chat[] = rooms.map((room,index)=>{
    if (room.users.some((roomUser) => 
      roomUser.name === user.name)) {
      return {
      id: index,
      name: handleRoomName(room),
      avatar: handleRoomAvatar(room),
      lastMessage: room.messages[room.messages.length - 1].text,
      time: room.messages[room.messages.length - 1].createdAt,
      unread: 0,
      isOnline: true,
      Messages:room.messages
      };
    }
    return null;
  }
  )
  console.log(chats);
const selectedChatData = chats.find(chat => chat.id === selectedChat) || chats[0];
  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col bg-gradient">
      {isMobile && (
        <div className="flex items-center justify-between p-3 glass-dark border-b border-white/10">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowChatList(!showChatList)}
              className="text-white p-2 rounded-full hover:bg-white/5"
            >
              <MessageCircle className="w-5 h-5" />
            </button>
            <h1 className="text-lg font-medium text-gradient">
              {showChatList ? 'Messages' : selectedChatData.name}
            </h1>
          </div>
          <button className="text-white p-2 rounded-full hover:bg-white/5">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      )}

      <div className="flex flex-1 h-full overflow-hidden">
        {(showChatList || !isMobile) && (
          <div className={`${isMobile ? 'w-full' : 'w-80 md:w-96'} border-r border-white/10 h-full`}>
            <ChatList
              chats={chats}
              selectedChat={selectedChat}
              onSelectChat={handleSelectChat}
            />
          </div>
        )}

        {(!showChatList || !isMobile) && (
          <div className="flex-1 h-full">
            <ChatArea
              user={user as User}
              chat={selectedChatData}
              messages={messages}
              showEmojiPicker={showEmojiPicker}
              onEmojiPickerToggle={setShowEmojiPicker}
              onReaction={handleReaction}
              onSendMessage={handleSendMessage}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
