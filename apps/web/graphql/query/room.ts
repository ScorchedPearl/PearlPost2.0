import { graphql } from "../../gql";

export const getAllRoomsQuery = graphql(`#graphql
  query GetAllRooms {
    getAllRooms {
      users {
        name
        profileImageURL
      }
      messages {
        text
        reactions {
          type
          author {
            name
            profileImageURL
          }
        }
        imageUrl
        createdAt
        author {
          name
          profileImageURL
        }
      }
      name
      avatar
    }
  }
`);
