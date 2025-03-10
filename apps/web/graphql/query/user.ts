import { graphql } from "gql";

export const verifyCredentialsTokenQuery = graphql(`#graphql
query Query($email: String!, $password: String!) {
  verifyCredentialsToken(email: $email, password: $password)
}
`)
export const getCurrentUserQuery = graphql(`#graphql
 query GetCurrentUser {
  getCurrentUser {
    name
    profileImageURL
    email
    id
  }
}
`)
export const sendOtpEmailQuery=graphql(`#graphql
  query SendOtpEmail($email: String!, $otp: String!) {
  sendOtpEmail(email: $email, otp: $otp)
  }
`)