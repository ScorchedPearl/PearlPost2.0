import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { graphqlClient } from "./../providers/graphqlClient"
import { createPostMutation } from "graphql/mutation/post";
import { getAllPostsQuery, getPostByUsernameQuery } from "graphql/query/post";
import { getPostCountQuery } from 'graphql/query/post';
import { CreatePostMutation, CreatePostMutationVariables, GetAllPostsQuery, GetAllPostsQueryVariables, GetPostCountQuery, GetPostCountQueryVariables, GetPostsByUsernameQuery, GetPostsByUsernameQueryVariables } from "gql/graphql";


export const useGetPosts=()=>{
  const query=useQuery<GetAllPostsQuery,GetAllPostsQueryVariables>({
    queryKey:["all-posts"],
    queryFn:()=>graphqlClient.request(getAllPostsQuery as any),
})
  return{ ...query,posts:query.data?.getAllPosts,
    isLoading2: query.isLoading,
  };
}
export const useGetPostsByUsername = (username: string) => {
  const query = useQuery<GetPostsByUsernameQuery, GetPostsByUsernameQueryVariables>({
    queryKey: ["post-username", username],
    queryFn: () =>
      graphqlClient.request(
        getPostByUsernameQuery as any,
        { username }
      ),
  });
  return{...query,posts:query.data?.getPostByUsername,
    isLoading4:query.isLoading,
  };
}

export const usePostCount = (username: string) => {
  const query = useQuery<GetPostCountQuery,GetPostCountQueryVariables>({
    queryKey: ["post-count", username],
    queryFn: () =>
      graphqlClient.request(
        getPostCountQuery,
        { username }
      ),
  });
  return { ...query, postCount:query.data?.getPostCount,
    isLoading3: query.isLoading,
   };
};
