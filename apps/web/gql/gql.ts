/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "#graphql\n  mutation CreatePost($payload: CreatePostData!) {\n    createPost(payload: $payload) {\n      id\n    }\n}\n": typeof types.CreatePostDocument,
    "#graphql\n mutation CreateCredentialsToken($email: String!, $password: String!, $name: String!) {\n  createCredentialsToken(email: $email, password: $password, name: $name)\n}\n": typeof types.CreateCredentialsTokenDocument,
    "#graphql\n mutation VerifyGoogleToken($token: String!) {\n  verifyGoogleToken(token: $token)\n}\n": typeof types.VerifyGoogleTokenDocument,
    "#graphql\n  mutation ChangePassword($email: String!, $newPassword: String!) {\n  changePassword(email: $email, newPassword: $newPassword)\n}\n": typeof types.ChangePasswordDocument,
    "#graphql\n  mutation FollowUser($to: ID!) {\n    followUser(to: $to)\n  }\n": typeof types.FollowUserDocument,
    "#graphql\n  mutation UnfollowUser($to: ID!) {\n  unfollowUser(to: $to)\n}\n": typeof types.UnfollowUserDocument,
    "#graphql\n  mutation LikePost($likePostId: ID!) {\n    likePost(id: $likePostId)\n  }\n": typeof types.LikePostDocument,
    "#graphql\n  mutation UnlikePost($unlikePostId: ID!) {\n    unlikePost(id: $unlikePostId)\n  }\n": typeof types.UnlikePostDocument,
    "#graphql\n  query GetAllPosts {\n    getAllPosts {\n      id\n      content\n      imageURL\n      createdAt\n      updatedAt\n      \n      author {\n        name\n        profileImageURL\n        id\n        title\n        email\n      }\n    likes {\n      user {\n        name\n      }\n      userId\n    }\n    }\n  }\n": typeof types.GetAllPostsDocument,
    "#graphql\n  query GetPostCount($username: String!) {\n    getPostCount(username: $username)\n  }\n": typeof types.GetPostCountDocument,
    "#graphql\n  query GetPostsByUsername($username: String!) {\n    getPostByUsername(username: $username) {\n      id\n      content\n      imageURL\n      createdAt\n      updatedAt\n      likes {\n        postId\n        userId\n        createdAt\n      }\n      author {\n        name\n        profileImageURL\n        name\n        id\n        title\n      }\n    }\n  }\n": typeof types.GetPostsByUsernameDocument,
    "#graphql\n  query GetSignedURL($imageName: String!, $imageType: String!) {\n  getSignedUrlForPostImage(imageName: $imageName, imageType: $imageType)\n}\n": typeof types.GetSignedUrlDocument,
    "#graphql\nquery Query($email: String!, $password: String!) {\n  verifyCredentialsToken(email: $email, password: $password)\n}\n": typeof types.QueryDocument,
    "#graphql\n query GetCurrentUser {\n  getCurrentUser {\n    id\n    name\n    profileImageURL\n    title\n    email\n    posts {\n      content\n      likes {\n        user {\n          name\n        }\n      }\n      imageURL\n    }\n    recommendedUsers {\n      name\n      title\n      followers {\n        profileImageURL\n        name\n        title\n      }\n      profileImageURL\n    }\n    following {\n        name\n        profileImageURL\n        title\n        id\n    }\n    followers {\n      name\n      title\n      profileImageURL\n    }\n  }\n}\n": typeof types.GetCurrentUserDocument,
    "#graphql\n  query SendOtpEmail($email: String!, $otp: String!) {\n  sendOtpEmail(email: $email, otp: $otp)\n  }\n": typeof types.SendOtpEmailDocument,
};
const documents: Documents = {
    "#graphql\n  mutation CreatePost($payload: CreatePostData!) {\n    createPost(payload: $payload) {\n      id\n    }\n}\n": types.CreatePostDocument,
    "#graphql\n mutation CreateCredentialsToken($email: String!, $password: String!, $name: String!) {\n  createCredentialsToken(email: $email, password: $password, name: $name)\n}\n": types.CreateCredentialsTokenDocument,
    "#graphql\n mutation VerifyGoogleToken($token: String!) {\n  verifyGoogleToken(token: $token)\n}\n": types.VerifyGoogleTokenDocument,
    "#graphql\n  mutation ChangePassword($email: String!, $newPassword: String!) {\n  changePassword(email: $email, newPassword: $newPassword)\n}\n": types.ChangePasswordDocument,
    "#graphql\n  mutation FollowUser($to: ID!) {\n    followUser(to: $to)\n  }\n": types.FollowUserDocument,
    "#graphql\n  mutation UnfollowUser($to: ID!) {\n  unfollowUser(to: $to)\n}\n": types.UnfollowUserDocument,
    "#graphql\n  mutation LikePost($likePostId: ID!) {\n    likePost(id: $likePostId)\n  }\n": types.LikePostDocument,
    "#graphql\n  mutation UnlikePost($unlikePostId: ID!) {\n    unlikePost(id: $unlikePostId)\n  }\n": types.UnlikePostDocument,
    "#graphql\n  query GetAllPosts {\n    getAllPosts {\n      id\n      content\n      imageURL\n      createdAt\n      updatedAt\n      \n      author {\n        name\n        profileImageURL\n        id\n        title\n        email\n      }\n    likes {\n      user {\n        name\n      }\n      userId\n    }\n    }\n  }\n": types.GetAllPostsDocument,
    "#graphql\n  query GetPostCount($username: String!) {\n    getPostCount(username: $username)\n  }\n": types.GetPostCountDocument,
    "#graphql\n  query GetPostsByUsername($username: String!) {\n    getPostByUsername(username: $username) {\n      id\n      content\n      imageURL\n      createdAt\n      updatedAt\n      likes {\n        postId\n        userId\n        createdAt\n      }\n      author {\n        name\n        profileImageURL\n        name\n        id\n        title\n      }\n    }\n  }\n": types.GetPostsByUsernameDocument,
    "#graphql\n  query GetSignedURL($imageName: String!, $imageType: String!) {\n  getSignedUrlForPostImage(imageName: $imageName, imageType: $imageType)\n}\n": types.GetSignedUrlDocument,
    "#graphql\nquery Query($email: String!, $password: String!) {\n  verifyCredentialsToken(email: $email, password: $password)\n}\n": types.QueryDocument,
    "#graphql\n query GetCurrentUser {\n  getCurrentUser {\n    id\n    name\n    profileImageURL\n    title\n    email\n    posts {\n      content\n      likes {\n        user {\n          name\n        }\n      }\n      imageURL\n    }\n    recommendedUsers {\n      name\n      title\n      followers {\n        profileImageURL\n        name\n        title\n      }\n      profileImageURL\n    }\n    following {\n        name\n        profileImageURL\n        title\n        id\n    }\n    followers {\n      name\n      title\n      profileImageURL\n    }\n  }\n}\n": types.GetCurrentUserDocument,
    "#graphql\n  query SendOtpEmail($email: String!, $otp: String!) {\n  sendOtpEmail(email: $email, otp: $otp)\n  }\n": types.SendOtpEmailDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n  mutation CreatePost($payload: CreatePostData!) {\n    createPost(payload: $payload) {\n      id\n    }\n}\n"): (typeof documents)["#graphql\n  mutation CreatePost($payload: CreatePostData!) {\n    createPost(payload: $payload) {\n      id\n    }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n mutation CreateCredentialsToken($email: String!, $password: String!, $name: String!) {\n  createCredentialsToken(email: $email, password: $password, name: $name)\n}\n"): (typeof documents)["#graphql\n mutation CreateCredentialsToken($email: String!, $password: String!, $name: String!) {\n  createCredentialsToken(email: $email, password: $password, name: $name)\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n mutation VerifyGoogleToken($token: String!) {\n  verifyGoogleToken(token: $token)\n}\n"): (typeof documents)["#graphql\n mutation VerifyGoogleToken($token: String!) {\n  verifyGoogleToken(token: $token)\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n  mutation ChangePassword($email: String!, $newPassword: String!) {\n  changePassword(email: $email, newPassword: $newPassword)\n}\n"): (typeof documents)["#graphql\n  mutation ChangePassword($email: String!, $newPassword: String!) {\n  changePassword(email: $email, newPassword: $newPassword)\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n  mutation FollowUser($to: ID!) {\n    followUser(to: $to)\n  }\n"): (typeof documents)["#graphql\n  mutation FollowUser($to: ID!) {\n    followUser(to: $to)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n  mutation UnfollowUser($to: ID!) {\n  unfollowUser(to: $to)\n}\n"): (typeof documents)["#graphql\n  mutation UnfollowUser($to: ID!) {\n  unfollowUser(to: $to)\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n  mutation LikePost($likePostId: ID!) {\n    likePost(id: $likePostId)\n  }\n"): (typeof documents)["#graphql\n  mutation LikePost($likePostId: ID!) {\n    likePost(id: $likePostId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n  mutation UnlikePost($unlikePostId: ID!) {\n    unlikePost(id: $unlikePostId)\n  }\n"): (typeof documents)["#graphql\n  mutation UnlikePost($unlikePostId: ID!) {\n    unlikePost(id: $unlikePostId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n  query GetAllPosts {\n    getAllPosts {\n      id\n      content\n      imageURL\n      createdAt\n      updatedAt\n      \n      author {\n        name\n        profileImageURL\n        id\n        title\n        email\n      }\n    likes {\n      user {\n        name\n      }\n      userId\n    }\n    }\n  }\n"): (typeof documents)["#graphql\n  query GetAllPosts {\n    getAllPosts {\n      id\n      content\n      imageURL\n      createdAt\n      updatedAt\n      \n      author {\n        name\n        profileImageURL\n        id\n        title\n        email\n      }\n    likes {\n      user {\n        name\n      }\n      userId\n    }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n  query GetPostCount($username: String!) {\n    getPostCount(username: $username)\n  }\n"): (typeof documents)["#graphql\n  query GetPostCount($username: String!) {\n    getPostCount(username: $username)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n  query GetPostsByUsername($username: String!) {\n    getPostByUsername(username: $username) {\n      id\n      content\n      imageURL\n      createdAt\n      updatedAt\n      likes {\n        postId\n        userId\n        createdAt\n      }\n      author {\n        name\n        profileImageURL\n        name\n        id\n        title\n      }\n    }\n  }\n"): (typeof documents)["#graphql\n  query GetPostsByUsername($username: String!) {\n    getPostByUsername(username: $username) {\n      id\n      content\n      imageURL\n      createdAt\n      updatedAt\n      likes {\n        postId\n        userId\n        createdAt\n      }\n      author {\n        name\n        profileImageURL\n        name\n        id\n        title\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n  query GetSignedURL($imageName: String!, $imageType: String!) {\n  getSignedUrlForPostImage(imageName: $imageName, imageType: $imageType)\n}\n"): (typeof documents)["#graphql\n  query GetSignedURL($imageName: String!, $imageType: String!) {\n  getSignedUrlForPostImage(imageName: $imageName, imageType: $imageType)\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\nquery Query($email: String!, $password: String!) {\n  verifyCredentialsToken(email: $email, password: $password)\n}\n"): (typeof documents)["#graphql\nquery Query($email: String!, $password: String!) {\n  verifyCredentialsToken(email: $email, password: $password)\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n query GetCurrentUser {\n  getCurrentUser {\n    id\n    name\n    profileImageURL\n    title\n    email\n    posts {\n      content\n      likes {\n        user {\n          name\n        }\n      }\n      imageURL\n    }\n    recommendedUsers {\n      name\n      title\n      followers {\n        profileImageURL\n        name\n        title\n      }\n      profileImageURL\n    }\n    following {\n        name\n        profileImageURL\n        title\n        id\n    }\n    followers {\n      name\n      title\n      profileImageURL\n    }\n  }\n}\n"): (typeof documents)["#graphql\n query GetCurrentUser {\n  getCurrentUser {\n    id\n    name\n    profileImageURL\n    title\n    email\n    posts {\n      content\n      likes {\n        user {\n          name\n        }\n      }\n      imageURL\n    }\n    recommendedUsers {\n      name\n      title\n      followers {\n        profileImageURL\n        name\n        title\n      }\n      profileImageURL\n    }\n    following {\n        name\n        profileImageURL\n        title\n        id\n    }\n    followers {\n      name\n      title\n      profileImageURL\n    }\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n  query SendOtpEmail($email: String!, $otp: String!) {\n  sendOtpEmail(email: $email, otp: $otp)\n  }\n"): (typeof documents)["#graphql\n  query SendOtpEmail($email: String!, $otp: String!) {\n  sendOtpEmail(email: $email, otp: $otp)\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;