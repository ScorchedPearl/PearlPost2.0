import { graphql } from "gql";

export const createCredentialsTokenMutation = graphql(`#graphql
 mutation CreateCredentialsToken($email: String!, $password: String!, $name: String!) {
  createCredentialsToken(email: $email, password: $password, name: $name)
}
`)
export const verifyGoogleTokenMutation = graphql(`#graphql
 mutation VerifyGoogleToken($token: String!) {
  verifyGoogleToken(token: $token)
}
`)
export const changePasswordMutation = graphql(`#graphql
  mutation ChangePassword($email: String!, $newPassword: String!) {
  changePassword(email: $email, newPassword: $newPassword)
}
`)
export const followUserMutation= graphql(`#graphql
  mutation FollowUser($to: ID!) {
    followUser(to: $to)
  }
`);
export const unfollowUserMutation= graphql(`#graphql
  mutation UnfollowUser($to: ID!) {
  unfollowUser(to: $to)
}
`);
export const likePostMutation= graphql(`#graphql
  mutation LikePost($likePostId: ID!) {
    likePost(id: $likePostId)
  }
`);
export const unlikePostMutation= graphql(`#graphql
  mutation UnlikePost($unlikePostId: ID!) {
    unlikePost(id: $unlikePostId)
  }
`);