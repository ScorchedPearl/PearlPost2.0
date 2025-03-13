import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@ui/components/ui/card';
import { Avatar } from '@ui/components/ui/avatar';
import { 
  HeartIcon, 
  MessageCircleIcon, 
  UserPlusIcon,
  ShareIcon,
  StarIcon
} from 'lucide-react';
import { cn } from '@ui/lib/utils';
import { Badge } from '@ui/components/ui/badge';

const activities = [
  {
    id: 1,
    user: { name: 'Sarah Johnson', avatar: null, username: '@sarahj' },
    action: 'like',
    content: 'liked your post "The Future of Design Systems"',
    time: '2 minutes ago',
    icon: HeartIcon
  },
  {
    id: 2,
    user: { name: 'Michael Chen', avatar: null, username: '@mchen' },
    action: 'comment',
    content: 'commented on your photo: "This is incredible work!"',
    time: '15 minutes ago',
    icon: MessageCircleIcon
  },
  {
    id: 3,
    user: { name: 'Emma Williams', avatar: null, username: '@emma' },
    action: 'follow',
    content: 'started following you',
    time: '1 hour ago',
    icon: UserPlusIcon
  },
  {
    id: 4,
    user: { name: 'Kevin Patel', avatar: null, username: '@kevinp' },
    action: 'share',
    content: 'shared your post "Minimalism in UI Design"',
    time: '3 hours ago',
    icon: ShareIcon
  },
  {
    id: 5,
    user: { name: 'Social Media Today', avatar: null, username: '@smtoday' },
    action: 'mention',
    content: 'mentioned you in a post about "Top Designers to Follow"',
    time: '5 hours ago',
    icon: StarIcon
  }
];

interface ActivityItemProps {
  activity: typeof activities[0];
  index: number;
}

const ActivityItem = ({ activity, index }: ActivityItemProps) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), index * 150);
    return () => clearTimeout(timer);
  }, [index]);

  const Icon = activity.icon;
  
  const getActionColor = (action: string) => {
    switch(action) {
      case 'like': return 'text-pink-500 bg-pink-500/10';
      case 'comment': return 'text-blue-500 bg-blue-500/10';
      case 'follow': return 'text-emerald-500 bg-emerald-500/10';
      case 'share': return 'text-purple-500 bg-purple-500/10';
      case 'mention': return 'text-amber-500 bg-amber-500/10';
      default: return 'text-primary bg-primary/10';
    }
  };

  return (
    <div 
      className={cn(
        "flex gap-3 p-3 rounded-lg transition-all duration-500 hover:bg-secondary/40",
        !isVisible ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
      )}
    >
      <Avatar className="h-9 w-9 border border-border/50">
        <div className="bg-gradient-to-br from-primary/70 to-accent/70 h-full w-full" />
      </Avatar>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium truncate">{activity.user.name}</p>
          <span className="text-xs text-muted-foreground">{activity.user.username}</span>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2 mt-0.5">
          {activity.content}
        </p>
        <div className="flex items-center gap-2 mt-1">
          <p className="text-xs text-muted-foreground">{activity.time}</p>
          <div className={cn(
            "flex items-center px-1.5 py-0.5 rounded text-xs",
            getActionColor(activity.action)
          )}>
            <Icon className="h-3 w-3 mr-1" />
            <span>{activity.action}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ActivityFeed = () => {
  return (
    <Card className="glass-card border-border/50 animate-fade-in delay-200 mb-20">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium">Recent Activity</CardTitle>
          <Badge variant="outline" className="text-xs px-2 py-0">
            5 new
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-3">
        <div className="space-y-1 max-h-[290px] overflow-y-auto scrollbar-hide">
          {activities.map((activity, index) => (
            <ActivityItem key={activity.id} activity={activity} index={index} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
