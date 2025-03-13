import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import JWTService from "../services/jwtService";
import { User } from "./user";
import { Post } from "./post";
export async function initServer(){
  const app=express();
  app.use(cors());
  app.use(bodyParser.json());
  const server=new ApolloServer({
   typeDefs:`
   ${User.Types}
   ${Post.types}
   type Query{
     ${User.queries}
     ${Post.query}
   }
   type Mutation{
     ${User.mutations}
     ${Post.mutations}
   }
    `,
    resolvers:{
      Query:{
        ...User.resolvers.queries,
        ...Post.resolvers.queries
       },
       Mutation:{
        ...User.resolvers.mutations,
        ...Post.resolvers.mutations
       },
       ...Post.resolvers.authorResolvers,
       ...User.resolvers.PostResolvers
    },
  });
  await server.start();
  app.use("/graphql", expressMiddleware(server, {
    context: async ({ req }) => {
      return {
        user: req.headers.authorization ? await JWTService.decodeToken(req.headers.authorization.split('Bearer ')[1] || '') : undefined
      };
    }
  }) as unknown as express.RequestHandler);
  return app;
}