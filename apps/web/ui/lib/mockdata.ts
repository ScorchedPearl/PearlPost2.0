export interface User {
  title?: string|null;
  name: string;
  profileImageURL?: string | null;
  id: string;
}

export interface Post {
 id: string;
 author: User;
 content: string;
 timestamp: string;
 likes: number;
 comments: number;
 shares: number;
 hasLiked: boolean;
 image?: string;
}

export const currentUser: User = {
 id: "current-user",
 name: "Alex Morgan",
 profileImageURL: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=250&h=250&fit=crop&crop=faces&auto=format&q=80",
 title: "Product Designer",
};

export const suggestedUsers: User[] = [
 {
   id: "user-1",
   name: "Emma Chen",
   profileImageURL: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=250&h=250&fit=crop&crop=faces&auto=format&q=80",
   title: "UX Researcher",

 },
 {
   id: "user-2",
   name: "Michael Kim",
   profileImageURL: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=250&h=250&fit=crop&crop=faces&auto=format&q=80",
   title: "Software Engineer",

 },
 {
   id: "user-3",
   name: "Sarah Johnson",
   profileImageURL: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=250&h=250&fit=crop&crop=faces&auto=format&q=80",
   title: "Marketing Manager",

 }
];

export const mockPosts: Post[] = [
 {
   id: "post-1",
   author: {
     id: "user-4",
     name: "David Park",
     profileImageURL: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=250&h=250&fit=crop&crop=faces&auto=format&q=80",
     title: "Senior Product Manager",
   },
   content: "Excited to announce that we've just launched our new product feature! It's been months in the making, and I'm incredibly proud of what our team has accomplished. Check it out and let me know your thoughts!",
   timestamp: "2h ago",
   likes: 142,
   comments: 28,
   shares: 12,
   hasLiked: false,
   image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&h=400&fit=crop&auto=format&q=80"
 },
 {
   id: "post-2",
   author: {
     id: "user-5",
     name: "Sophia Lee",
     profileImageURL: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=250&h=250&fit=crop&crop=faces&auto=format&q=80",
     title: "Design Director",
   },
   content: "Just wrapped up speaking at the Design Systems Conference. It was amazing to connect with so many talented designers and discuss the future of product design. Thanks to everyone who attended my talk!",
   timestamp: "5h ago",
   likes: 237,
   comments: 42,
   shares: 18,
   hasLiked: true
 },
 {
   id: "post-3",
   author: currentUser,
   content: "I'm looking for recommendations on the best design tools for prototyping. Currently using Figma but interested in exploring alternatives. What's everyone using these days?",
   timestamp: "1d ago",
   likes: 89,
   comments: 56,
   shares: 4,
   hasLiked: false
 },
 {
   id: "post-4",
   author: {
     id: "user-6",
     name: "James Wilson",
     profileImageURL: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=250&h=250&fit=crop&crop=faces&auto=format&q=80",
     title: "Frontend Developer",
   },
   content: "Just published my article on 'Building Accessible Web Applications'. Accessibility is not optional - it's essential for creating truly inclusive products. Check out the link in the comments!",
   timestamp: "1d ago",
   likes: 312,
   comments: 48,
   shares: 72,
   hasLiked: false,
   image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop&auto=format&q=80"
 },
 {
   id: "post-5",
   author: {
     id: "user-7",
     name: "Olivia Martinez",
     profileImageURL: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=250&h=250&fit=crop&crop=faces&auto=format&q=80",
     title: "Head of Marketing",
   },
   content: "Our team is hiring! We're looking for a creative Content Strategist to join our marketing department. If you're passionate about storytelling and have experience in B2B marketing, check out the job posting.",
   timestamp: "2d ago",
   likes: 156,
   comments: 23,
   shares: 34,
   hasLiked: true
 }
];

export const trendingTopics = [
 "Product Design",
 "UX Research",
 "Frontend Development",
 "AI in Design",
 "Remote Work"
];
