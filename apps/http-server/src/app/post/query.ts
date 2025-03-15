export const query =`#graphql
  getAllPosts:[Post]
  getPostCount(username:String!):Int
  getPostByUsername(username:String!):[Post]
  getSignedUrlForImage(imageName:String!,imageType:String!):String
  getSignedUrlForVideo(videoName:String!,videoType:String!):String
`