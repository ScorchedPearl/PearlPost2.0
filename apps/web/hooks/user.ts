import {  useQuery } from "@tanstack/react-query"
import { GetChartDataQuery, GetChartDataQueryVariables, GetCurrentUserQuery, GetCurrentUserQueryVariables, GetRecentActivityQuery, GetRecentActivityQueryVariables } from "gql/graphql";
import {   getChartDataQuery, getCurrentUserQuery, getRecentActivityQuery } from "graphql/query/user";
import { graphqlClient } from "@providers/graphqlClient/index";

export const useCurrentUser = () => {
 const query = useQuery<GetCurrentUserQuery,GetCurrentUserQueryVariables>({
  queryKey: ["getCurrentUser"],
  queryFn: async () => {
    const data = await graphqlClient.request(getCurrentUserQuery);
    return data;
  }
 });
 return {...query,user:query.data?.getCurrentUser,isLoading:query.isLoading}
}
export const useChartData=(userId:string)=>{
  const query=useQuery({
    queryKey:["getChartData",userId],
    queryFn:async()=>{
    const data=await graphqlClient.request<GetChartDataQuery,GetChartDataQueryVariables>(getChartDataQuery,{userId});
    return data;
    }
  })
  return {...query,chartData:query.data?.getChartData,isLoading5:query.isLoading}
}

export const useActivityData=(userId:string)=>{
  const query=useQuery({
    queryKey:["getRecentActivity",userId],
    queryFn:async()=>{
    const data=await graphqlClient.request<GetRecentActivityQuery,GetRecentActivityQueryVariables>(getRecentActivityQuery,{userId});
    return data;
    }
  })
  return {...query,activityData:query.data?.getRecentActivity,isLoading:query.isLoading}
}