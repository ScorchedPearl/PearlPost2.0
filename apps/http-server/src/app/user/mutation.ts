export const mutations=`#graphql
    verifyGoogleToken(token:String!): String
    createCredentialsToken(email:String!,password:String!,name:String!): String
    changePassword(email:String!,newPassword:String!):Boolean
    followUser(to:ID!):Boolean
    unfollowUser(to:ID!):Boolean
    likePost(id:ID!):Boolean
    unlikePost(id:ID!):Boolean
`