import { graphql } from "../../gql";

export const getAllPostsQuery = graphql(`#graphql
  query GetAllPosts {
    getAllPosts {
      id
      videoURL
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
      comments {
        id
        author {
          name
          profileImageURL
          id
          email
          title
        }
        likes {
          user {
            name
          }
          userId
        }
        content
        imageURL
        replies {
          id
          commentId
          imageURL
          likes {
            user {
              name
            }
          }
          author {
            name
            profileImageURL
            id
            email
            title
          }
          content
        }
        createdAt
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

export const getSignedUrlForImageQuery = graphql(`#graphql
  query GetSignedURLForImage($imageName: String!, $imageType: String!) {
  getSignedUrlForImage(imageName: $imageName, imageType: $imageType)
}
`);
export const getSignedUrlForVideoQuery = graphql(`#graphql
  query GetSignedURLForVideo($videoName: String!, $videoType: String!) {
  getSignedUrlForVideo(videoName: $videoName, videoType: $videoType)
}
`);