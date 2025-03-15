import { graphql } from "../../gql";

export const getAllRoomsQuery = graphql(`#graphql
  query GetAllRooms {
    getAllRooms {
      id
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
        imageURL
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
