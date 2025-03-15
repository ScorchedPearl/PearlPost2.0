import { prismaClient } from "@repo/db-config/client";
import { GraphqlContext, Post } from "../../services/interfaces";
import PostService from "../../services/postService";
import { CreateCommentData, CreatePostPayload } from "./types";

const queries={
  getAllPosts:async()=>{ 
    return await PostService.getAllPost();
  },
  getPostCount: async (parent:any,{name}:{name:string},context:any,info:any) => {
    return await prismaClient.post.count({ where:{author:{name}} });
  },
  getPostByUsername:async (parent:any,{name}:{name:string})=>{
    return await PostService.getPostByUsername(name);
  },
  getSignedUrlForImage:async (parent:any,{imageType,imageName}:{imageType:string,imageName:string},ctx:GraphqlContext)=>{
    return await PostService.getSignedImageURL({imageType,imageName,ctx});
  },
  getSignedUrlForVideo:async (parent:any,{videoType,videoName}:{videoType:string,videoName:string},ctx:GraphqlContext)=>{
    return await PostService.getSignedVideoURL({videoType,videoName,ctx});
  }
}
const mutations={
  createPost:async (parent:any,{payload}:{payload:CreatePostPayload},ctx:GraphqlContext)=>{
    return await PostService.createPost(payload,ctx);
  },
  createComment:async (parent: any,{payload}:{payload:CreateCommentData},ctx: GraphqlContext)=>{
    if (!ctx.user) {
      throw new Error("You must be logged in to create a Comment");
    }
    return await PostService.createComment(payload,ctx);
  },
  createReply:async (parent:any,{payload}:{payload:CreateCommentData},ctx:GraphqlContext)=>{
    if (!ctx.user) {
      throw new Error("You must be logged in to create a Reply");
    }
    return await PostService.createReply(payload,ctx);
  }
};
const PostResolvers={
  Post:{
    author:async(parent:Post)=>{
      return await PostService.getAuthor(parent);
    },
    likes:async (parent:Post)=>{
      return await PostService.getLikes(parent);
    },
    comments:async (parent:Post)=>{
      return await PostService.getComments(parent);
    }
  }
}
const CommentResolvers={
  Comment:{
    author:async(parent:any)=>{
      return await PostService.getCommentAuthor(parent);
    },
    replies:async(parent:any)=>{
      return await PostService.getCommentReplies(parent);
    },
    likes:async(parent:any)=>{
      return await PostService.getCommentLikes(parent);  
    }
  }
}
const ReplyResolvers={
  Reply:{
    author:async(parent:any)=>{
      return await PostService.getReplyAuthor(parent);
    },
    likes:async(parent:any)=>{
      return await PostService.getReplyLikes(parent);
    }
  }
}
export const resolvers={mutations,PostResolvers,queries,CommentResolvers,ReplyResolvers};