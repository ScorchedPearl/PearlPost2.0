"use client"
import React, { useEffect, useState } from "react";
import Header from "./_PostApp/navbar";
import { ProfileCard } from "app/dashboard/_profile/profileCard";
import CreatePost from "./_PostApp/creatPost";
import { PostCard }from "./_PostApp/postcard";
import RightSidebar from "./_PostApp/rightSidebar";
import PostSkeleton from "./_PostApp/skeleton";
import Stories from "./_PostApp/stories";
import Suggestions from "./_PostApp/suggestions";
import { useIsMobile } from "@hooks/isMobile";
import ChatBot from "app/_chatbot/page";
import { useCurrentUser } from "@hooks/user";
import Loader from "app/loading";
import { useGetPosts } from "@hooks/posts";
const Index: React.FC = () => {
  const [isLoad, setIsLoading] = useState(true);
  const isMobile = useIsMobile();
  const {user,isLoading}=useCurrentUser();
  const {posts,isLoading2}=useGetPosts(); 
  useEffect(() => {
    setIsLoading(true);
  }, [posts, user]);
  if(!isLoading2&&isLoad){
    setIsLoading(false);
    console.log(posts);
  }
  if(isLoading){
    return <Loader></Loader>
  }
  return (
    <div className="min-h-screen bg-background">
      <Header user={user}/>
      
      <main className="pt-24 pb-16 px-4 md:px-6 max-w-7xl mx-auto ">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {!isMobile && (
            <div className="lg:col-span-3">
              <div className="sticky top-24 space-y-">
                <ProfileCard user={user} />
                <Stories />
              </div>
            </div>
          )}
          <div className="lg:col-span-6">
            <CreatePost user={user}/>
            {isMobile && <Stories />}
            
            {isLoad ? (
              <>
                <PostSkeleton />
                <PostSkeleton />
                <PostSkeleton />
              </>
            ) : (
              posts.map((post, index) => (
                <PostCard key={post.id} post={post} delay={index} user={user} />
              ))
            )}
          </div>
          
          {!isMobile && (
            <div className="lg:col-span-3">
              <div className="sticky top-24 space-y-4">
                <Suggestions user={user}/>
                <RightSidebar />
              </div>
            </div>
          )}
        </div>
        <ChatBot></ChatBot>
      </main>
    </div>
  );
};

export default Index;
