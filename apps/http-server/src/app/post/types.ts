export const types=`#graphql
  type Like {
    id: ID!         
    createdAt: DateTime     
    userId: String     
    postId: String      
    user: User         
    post: Post         
  }
  input CreatePostData {
    content: String!
    imageUrl: String!
  }
  scalar DateTime
  type Post {
    id: ID!
    content: String!
    imageURL: String!
    createdAt: DateTime!
    updatedAt: DateTime
    author: User!
    likes: [Like]
  }
`;
export interface CreatePostPayload{
  content: string
  imageUrl: string
}