import React from "react";
import { UserPlus } from "lucide-react";
import { Button } from "@ui/components/ui/button";
import UserAvatar from "./avatar";
import { suggestedUsers } from "@ui/lib/mockdata";

const Suggestions: React.FC = () => {
  return (
    <div className="glass-card slide-in-animation">
      <div className="p-4 border-b border-border">
        <h3 className="font-semibold">People you might know</h3>
      </div>
      <div className="p-2">
        {suggestedUsers.map((user) => (
          <div
            key={user.id}
            className="p-3 hover:bg-secondary/40 rounded-lg transition-colors"
          >
            <div className="flex items-center gap-3">
              <UserAvatar src={user.avatar} name={user.name} size="sm" />
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm truncate">{user.name}</h4>
                <p className="text-xs text-muted-foreground truncate">
                  {user.title}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {user.company}
                </p>
              </div>
              <Button size="sm" variant="outline" className="h-8">
                <UserPlus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
      <div className="p-3 border-t border-border">
        <Button variant="ghost" className="w-full text-primary text-sm">
          View all suggestions
        </Button>
      </div>
    </div>
  );
};

export default Suggestions;
