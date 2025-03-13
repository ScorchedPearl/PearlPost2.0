import React from "react";
import { User } from "@ui/lib/mockdata";
import UserAvatar from "../../feed/_PostApp/avatar";

interface ProfileCardProps {
  user: User;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ user }) => {
  return (
    <div className="glass-card p-5 slide-in-animation">
      <div className="flex flex-col items-center">
        <div className="relative mb-4">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent rounded-full"></div>
          <UserAvatar src={user.profileImageURL} name={user.name} size="lg" className="ring-4 ring-white" />
        </div>
        
        <h3 className="font-semibold text-lg">{user.name}</h3>
        <p className="text-muted-foreground text-sm mt-1">{user.title}</p>
        
        <div className="border-t border-gray-200 w-full my-4"></div>
        
        <div className="w-full">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">Profile views</span>
            <span className="text-sm font-medium">247</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Post impressions</span>
            <span className="text-sm font-medium">2,854</span>
          </div>
        </div>
        
        <div className="border-t border-gray-200 w-full my-4"></div>
        
        <button className="w-full bg-secondary hover:bg-secondary/80 text-foreground font-medium py-2 rounded-full transition-colors duration-200">
          View Profile
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;
