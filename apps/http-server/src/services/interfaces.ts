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
export type User = {
 id: string;
 email: string;
 name: string;
 password: string|null;
 createdAt: Date;
 updatedAt: Date;
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
