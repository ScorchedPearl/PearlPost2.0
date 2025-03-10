import {  useQuery } from "@tanstack/react-query"
import { GetCurrentUserQuery, GetCurrentUserQueryVariables } from "gql/graphql";
import {   getCurrentUserQuery } from "graphql/query/user";
import { graphqlClient } from "@providers/graphqlClient/index";

export const useGetCurrentUser = () => {
 const query = useQuery({
  queryKey: ["getCurrentUser"],
  queryFn: async () => {
    const data = await graphqlClient.request<GetCurrentUserQuery,GetCurrentUserQueryVariables>(getCurrentUserQuery as any);
    return data;
  }
 });
 return {...query,user:query.data?.getCurrentUser,isLoading:query.isLoading}
}