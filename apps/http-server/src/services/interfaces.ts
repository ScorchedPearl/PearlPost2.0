export interface GoogleTokenResult {
 email:string;
 email_verified:string;
 given_name:string;
 name:string;
 picture:string;
 sub?:string;
}
export interface JWTPayload extends JWTUser{
 [key: string]: any; 
}
export interface ImageSignedURLPayload{
 imageType:string;
 imageName:string;
 ctx:GraphqlContext;
}
export type User = {
 id: string;
 email: string;
 name: string;
 password: string|null;
 createdAt: Date;
 updatedAt: Date;
 posts?:Post[]
}
export interface JWTUser{
 id: string;
 email: string;
 expiresAt: Date;
 name:string;
}
export interface GraphqlContext{
 user?: JWTUser
}
export interface Post{
  id: string
  content: string
  imageURL?: string
  createdAt: Date
  updatedAt: Date
  author: User
  likes: Like[]
}
export interface Like{       
  createdAt: Date  
  userId: string     
  postId: string      
  user: User         
  post: Post         
}