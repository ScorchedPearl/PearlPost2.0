import { graphql } from "gql";

export const verifyCredentialsTokenQuery = graphql(`#graphql
query Query($email: String!, $password: String!) {
  verifyCredentialsToken(email: $email, password: $password)
}
`)
export const getCurrentUserQuery = graphql(`#graphql
 query GetCurrentUser {
  getCurrentUser {
    id
    name
    profileImageURL
    title
    email
    posts {
      content
      likes {
        user {
          name
        }
      }
      imageURL
    }
    recommendedUsers {
      name
      title
      followers {
        profileImageURL
        name
        title
      }
      profileImageURL
    }
    following {
        name
        profileImageURL
        title
        id
    }
    followers {
      name
      title
      profileImageURL
    }
  }
}
`)
export const sendOtpEmailQuery=graphql(`#graphql
  query SendOtpEmail($email: String!, $otp: String!) {
  sendOtpEmail(email: $email, otp: $otp)
  }
`)