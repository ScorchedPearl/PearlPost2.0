import { graphql } from "../../gql";

export const getAllPostsQuery = graphql(`#graphql
  query GetAllPosts {
    getAllPosts {
      id
      content
      imageURL
      createdAt
      updatedAt
      
      author {
        name
        profileImageURL
        id
        title
        email
      }
    likes {
      user {
        name
      }
      userId
    }
    }
  }
`);

export const getPostCountQuery = graphql(`#graphql
  query GetPostCount($username: String!) {
    getPostCount(username: $username)
  }
`);

export const getPostByUsernameQuery = graphql(`#graphql
  query GetPostsByUsername($username: String!) {
    getPostByUsername(username: $username) {
      id
      content
      imageURL
      createdAt
      updatedAt
      likes {
        postId
        userId
        createdAt
      }
      author {
        name
        profileImageURL
        name
        id
        title
      }
    }
  }
`);

export const getSignedUrlForPostImageQuery = graphql(`#graphql
  query GetSignedURL($imageName: String!, $imageType: String!) {
  getSignedUrlForPostImage(imageName: $imageName, imageType: $imageType)
}
`);
