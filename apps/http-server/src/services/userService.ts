import axios from "axios";
import { prismaClient } from "@repo/db-config/client";
import { GoogleTokenResult, User } from "./interfaces.js";
import JWTService from "./jwtService.js";
import {
  CreateCredentialsTokenType,
  VerifyCredentialsTokenType,
} from "../app/user/types.js";
import { SignInSchema } from "@repo/common-config/types";
import nodemailer from "nodemailer";
class UserService {
  public static async verifyGoogleAuthToken(token: string) {
    const googletoken = token;
    const googleoauthurl = new URL(
      "https://www.googleapis.com/oauth2/v3/userinfo"
    );
    const { data } = await axios.get<GoogleTokenResult>(
      googleoauthurl.toString(),
      {
        headers: {
          Authorization: `Bearer ${googletoken}`,
        },
        responseType: "json",
      }
    );
    const user = await prismaClient.user.findUnique({
      where: { email: data.email },
    });
    if (!user) {
      await prismaClient.user.create({
        data: {
          email: data.email,
          name: data.given_name,
          profileImageURL: data.picture,
        },
      });
    }
    const userInDb = await prismaClient.user.findUnique({
      where: { email: data.email },
    });
    if (!userInDb) throw Error("User.email not found");
    const session = await JWTService.generateTokenForUser(userInDb);
    return session;
  }
  public static async verifyCredentialsToken(payload: VerifyCredentialsTokenType) {
    const data = {
      email: payload.email as string,
      password: payload.password as string,
    };
    const d = SignInSchema.safeParse(data);
    if (!d.success) {
      throw new Error("Invalid Data");
    }
    const email = payload.email as string;
    const password = payload.password as string;
    const user = await prismaClient.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) {
      throw new Error("User not found. Redirect to signup page.");
    }
    if (user.password !== password) {
      throw new Error("Password Incorrect");
    }
    const session = await JWTService.generateTokenForUser(user);
    return session;
  }
  public static async createCredentialsToken(payload: CreateCredentialsTokenType) {
    const email = payload.email as string;
    const password = payload.password as string;
    const name = payload.name as string;
    const user = await prismaClient.user.findUnique({
      where: {
        email: email,
      },
    });
    if (user) {
      throw new Error("User Already Exists. Redirect to signin page.");
    }
    const userInDb = await prismaClient.user.create({
      data: {
        email: email,
        password: password,
        name: name,
      },
    });
    const session = await JWTService.generateTokenForUser(userInDb);
    return session;
  }
  public static async getCurrentUser(id: string) {
    const user = await prismaClient.user.findUnique({
      where: {
        id: id,
      },
      include: {
        posts: {
          include: {
            likes: {
              include: {
                user: true,
              },
            },
          },
        },
        likes: true,
        followers: true,
        following: true,
        comments: true,
      },
    });
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }
  public static async sendOtpEmail(email: string, otp: string) {
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        secure: true,
        port: 465,
        auth: {
          user: "pearlautherizer@gmail.com",
          pass: "egjvzollbsxedjni",
        },
      });

      const mailOptions = {
        from: "pearlautherizer@gmail.com",
        to: email,
        subject: "Email Verification OTP",
        text: `Your OTP for email verification is: ${otp}. It is valid for 10 minutes.`,
      };
      await transporter.sendMail(mailOptions);
      return true;
    } catch (error) {
      console.error("Error sending OTP email:", error);
      return false;
    }
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
  public static async followUser(from: string, to: string) {
    await prismaClient.follows.create({
      data: {
        follower: { connect: { id: from } },
        following: { connect: { id: to } },
      },
    });
    // await redisClient.del(`recommendedUsers:${ctx.user.id}`);
    return;
  }
  public static async unfollowUser(from: string, to: string) {
    await prismaClient.follows.delete({
      where: {
        followerid_followingid: {
          followerid: from,
          followingid: to,
        },
      },
    });
    // await redisClient.del(`recommendedUsers:${ctx.user.id}`);
    return;
  }
  public static async like(user: string, id:string,name:string) {
    if(name==="post"){
    await prismaClient.like.create({
      data: {
        userId: user,
        postId: id,
      },
    });
  }else if(name=='comment'){
    await prismaClient.like.create({
      data: {
        userId: user,
        commentId: id,
      },
    });
  }else if(name=='reply'){
    await prismaClient.like.create({
      data: {
        userId: user,
        replyId: id,
      },
    });
  }
  }
  public static async unlike(user: string, id:string,name:string) {
    if(name==="post"){
    await prismaClient.like.deleteMany({
      where: {
        userId: user,
        postId: id,
      },
    });
  }else if(name=='comment'){
    await prismaClient.like.deleteMany({
      where: {
        userId: user,
        commentId: id,
      },
    });
  }else if(name=='reply'){
    await prismaClient.like.deleteMany({
      where: {
        userId: user,
        replyId: id,
      },
    });
  }
  }
  public static async getFollowers(id: string) {
    const result = await prismaClient.follows.findMany({
      where: { following: { id: id } },
      include: {
        follower: true,
        following: true,
      },
    });
    return result.map((el) => el.follower);
  }
  public static async getFollowing(id: string) {
    const result = await prismaClient.follows.findMany({
      where: { follower: { id: id } },
      include: {
        follower: true,
        following: true,
      },
    });
    return result.map((el) => el.following);
  }
  public static async getRecommendedUsers(id: string) {
    // const cachedValue=await redisClient.get(`recommendedUsers:${id}`);
    // if(cachedValue) return JSON.parse(cachedValue);
    const myFollowing = await prismaClient.follows.findMany({
      where: { follower: { id: id } },
      include: {
        following: {
          include: {
            followers: {
              include: {
                following: true,
              },
            },
          },
        },
      },
    });
    const userToRecommend: User[] = [];
    for (const followings of myFollowing) {
      for (const follower of followings.following.followers) {
        if (
          follower.following.id !== id &&
          myFollowing.findIndex(
            (e) => e.followingid === follower.following.id
          ) < 0
        ) {
          userToRecommend.push(follower.following);
        }
      }
    }
    const uniqueArray = userToRecommend.filter(
      (item, index, self) =>
        index === self.findIndex((other) => other.id === item.id)
    );

    // await redisClient.set(`recommendedUsers:${id}`,JSON.stringify(uniqueArray));
    return uniqueArray;
  }
}
export default UserService;
