import React, { useState, useRef } from "react";
import { graphqlClient } from "@providers/graphqlClient";
import { getSignedUrlForPostImageQuery } from "graphql/query/post";
import {  GetSignedUrlQuery, GetSignedUrlQueryVariables } from "gql/graphql";
import axios from "axios";
import {  useQueryClient } from "@tanstack/react-query";
import { createPostMutation } from "graphql/mutation/post";
import UserAvatar from "./avatar";
import { Calendar, FileText, Video, Image } from "lucide-react";
import { Button } from "@ui/components/ui/button";
const CreatePost = ({ user }) => {
  const [postText, setPostText] = useState("");
  const [imageurl, setImageurl] = useState("");
  const fileInputRefs = useRef({
    photos: null,
    videos: null,
    documents: null
  });

  const handleFileChange = async (e, type) => {
    const files:File[] = Array.from(e.target.files);
    if(type==="photos"){
      const file:File = files[0];
      console.log(file);
    const response = await graphqlClient.request<GetSignedUrlQuery,GetSignedUrlQueryVariables>(
      getSignedUrlForPostImageQuery,
      {
        imageName: file.name,
        imageType: file.type,
      }
    );
    const { getSignedUrlForPostImage } = response;

    if (getSignedUrlForPostImage) {
      await axios.put(getSignedUrlForPostImage, file, {
        headers: {
          "Content-Type": file.type,
        },
      });
      const url = new URL(getSignedUrlForPostImage);
      const filepath = `${url.origin}${url.pathname}`;
      setImageurl(filepath);
      console.log(filepath);
    }   
  }
  };

  const handleEventCreation = () => {
    const eventName = prompt("Enter event name:");
  };
  const queryClient = useQueryClient();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Post text:", postText);
    const payload = {
      content: postText,
      imageUrl: imageurl,
    };
    await graphqlClient.request(createPostMutation as any, { payload });
    queryClient.invalidateQueries(["all-posts"] as any);
    setPostText("");
    setImageurl("");
    e.target.reset();
  };
  return (
    <div className="glass-card p-4 mb-4 slide-in-animation">
      <form onSubmit={handleSubmit}>
        <div className="flex items-start space-x-3">
          <UserAvatar src={user.profileImageURL} name={user.name} />
          <div className="flex-1">
            <textarea
              className="w-full resize-none bg-transparent border border-gray-200 rounded-lg p-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="What's on your mind?"
              rows={postText.length > 80 ? 4 : 2}
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
            />
          </div>
        </div>

        <div className="flex mt-4 justify-between">
          <div className="flex space-x-2">
            <PostButton
              icon={<Image className="h-4 w-4" />}
              label="Photo"
              color="text-sky-500"
              onClick={() => fileInputRefs.current.photos.click()}
            />
            <PostButton
              icon={<Video className="h-4 w-4" />}
              label="Video"
              color="text-green-500"
              onClick={() => fileInputRefs.current.videos.click()}
              />
            <PostButton
              icon={<FileText className="h-4 w-4" />}
              label="Document"
              color="text-amber-500"
              onClick={() => fileInputRefs.current.documents.click()}
              />
              <PostButton
              icon={<Calendar className="h-4 w-4" />}
              label="Event"
              color="text-rose-500"
              onClick={handleEventCreation}
            />
          <Button
            type="submit"
            size="sm"
            disabled={!postText.trim()}
            className="bg-primary hover:bg-primary/90 text-white px-4 rounded-full transition-opacity duration-200 bg-blue-400 fixed right-8.5"
          >
            Post
          </Button>
        </div>
        </div>
      </form>

      <input
        type="file"
        accept="image/*"
        multiple
        onChange={(e) => handleFileChange(e, "photos")}
        style={{ display: "none" }}
        ref={(el) => { fileInputRefs.current.photos = el; }}
      />
      <input
        type="file"
        accept="video/*"
        multiple
        onChange={(e) => handleFileChange(e, "videos")}
        style={{ display: "none" }}
        ref={(el) => { fileInputRefs.current.videos = el; }}
      />
      <input
        type="file"
        accept=".pdf,.doc,.docx,.txt"
        multiple
        onChange={(e) => handleFileChange(e, "documents")}
        style={{ display: "none" }}
        ref={(el) => { fileInputRefs.current.documents = el; }}
      />

      <div className="mt-4">
          {imageurl&&<img
              src={imageurl}
              alt={`Photo`}
              className="w-32 h-32 object-cover"
            />}  
      </div>
    </div>
  );
};

const PostButton = ({ icon, label, color, onClick }) => (
  <button
    type="button"
    className="flex items-center px-2 py-1 rounded-full text-xs hover:bg-blue-400/10 transition-colors duration-200"
    onClick={onClick}
  >
    <span className={`mr-1 ${color}`}>{icon}</span>
    <span className="hidden sm:inline">{label}</span>
  </button>
);


export default CreatePost;
