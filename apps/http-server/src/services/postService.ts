import { prismaClient } from "@repo/db-config/client";
import { GraphqlContext, ImageSignedURLPayload } from "./interfaces.js";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { CreatePostPayload } from "../app/post/types.js";
import { redisClient } from "@repo/redis-config/client";
import * as dotenv from "dotenv";
dotenv.config();
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
});
class PostService {
  public static async getAllPost() {
    const posts = prismaClient.post.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        likes: {
          include: {
            user: true,
          },
        },
      },
    });
    return posts;
  }
  public static async getPostByUsername(name: string) {
    const post = await prismaClient.post.findMany({
      where: {
        author: {
          name,
        },
      },
    });
    return post;
  }
  public static async getSignedImageURL(payload: ImageSignedURLPayload) {
    if (!payload.ctx.user || !payload.ctx.user.id) {
      throw new Error("You must be logged in to create a post");
    }
    const allowedImagetype = [
      "image/jpg",
      "image/jpeg",
      "image/png",
      "image/webp",
    ];
    if (!allowedImagetype.includes(payload.imageType)) {
      throw new Error("Invalid image type");
    }
    const putObjectCommand = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: `upload/${payload.ctx.user.id}/post/${payload.imageName}-${Date.now()}.${payload.imageType}}`,
    });
    const signedURL = await getSignedUrl(s3Client, putObjectCommand);
    return signedURL;
  }
  public static async createPost(
    payload: CreatePostPayload,
    ctx: GraphqlContext
  ) {
    if (!ctx.user) {
      throw new Error("You must be logged in to create a post");
    }
    console.log("Received payload:", payload);
    const post = await prismaClient.post.create({
      data: {
        content: payload.content,
        imageURL: payload.imageUrl,
        author: {
          connect: {
            id: ctx.user.id,
          },
        },
      },
    });
    await redisClient.del("posts");
    return post;
  }
  public static async changePassword(email: string, newPassword: string) {
    const user = await prismaClient.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) {
      throw new Error("User not found");
    }
    await prismaClient.user.update({
      where: {
        email: email,
      },
      data: {
        password: newPassword,
      },
    });
    return true;
  }
  public static async getAuthor(post: any) {
    return await prismaClient.user.findUnique({
      where:{
        id:post.author.id
      }
    })
  }
  public static async getLikes(post: any) {
    return await prismaClient.like.findMany({
      where:{
        postId:post.id
      }
    })
  }
}
export default PostService;
