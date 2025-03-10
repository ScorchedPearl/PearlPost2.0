export const queries=`#graphql
 verifyCredentialsToken(email:String!,password:String!): String
 getCurrentUser: User
 sendOtpEmail(email:String!,otp:String!):Boolean
`