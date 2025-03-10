export const mutations=`#graphql
    verifyGoogleToken(token:String!): String
    createCredentialsToken(email:String!,password:String!,name:String!): String
    changePassword(email:String!,newPassword:String!):Boolean
`