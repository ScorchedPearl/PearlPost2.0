import {  useQuery } from "@tanstack/react-query"
import { GetAllRoomsQuery, GetAllRoomsQueryVariables } from "gql/graphql";
import { graphqlClient } from "@providers/graphqlClient/index";
import { getAllRoomsQuery } from "graphql/query/room";

export const useGetRooms = () => {
 const query = useQuery<GetAllRoomsQuery,GetAllRoomsQueryVariables>({
  queryKey: ["all-Rooms"],
  queryFn: async () => {
    const data = await graphqlClient.request(getAllRoomsQuery as any);
    return data;
  }
 });
 return {...query,rooms:query.data?.getAllRooms,isLoading3:query.isLoading}
}