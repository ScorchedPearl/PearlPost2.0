import { prismaClient } from "@repo/db-config/client";
import { GraphqlContext } from "../../services/interfaces";
import PostService from "../../services/postService";
import { CreatePostPayload } from "./types";

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
  getSignedUrlForPostImage:async (parent:any,{imageType,imageName}:{imageType:string,imageName:string},ctx:GraphqlContext)=>{
    return await PostService.getSignedImageURL({imageType,imageName,ctx});
  }

}
const mutations={
  createPost:async (parent:any,{payload}:{payload:CreatePostPayload},ctx:GraphqlContext)=>{
    return PostService.createPost(payload,ctx);
  },
};
const authorResolvers={
  Post:{
    author:(parent)=>{
      return prismaClient.user.findUnique({
        where:{
          id:parent.authorId
        }
      })
    }
  }
}
export const resolvers={mutations,authorResolvers,queries};