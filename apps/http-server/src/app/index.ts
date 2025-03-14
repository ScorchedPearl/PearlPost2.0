import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import JWTService from "../services/jwtService";
import { User } from "./user";
import { Post } from "./post";
import { Room } from "./room";
export async function initServer(){
  const app=express();
  app.use(cors());
  app.use(bodyParser.json());
  const server=new ApolloServer({
   typeDefs:`
   ${User.Types}
   ${Post.types}
   ${Room.types}
   type Query{
     ${User.queries}
     ${Post.query}
     ${Room.query}
   }
   type Mutation{
     ${User.mutations}
     ${Post.mutations}
     ${Room.mutations}
   }
    `,
    resolvers:{
      Query:{
        ...User.resolvers.queries,
        ...Post.resolvers.queries,
        ...Room.resolvers.queries
       },
       Mutation:{
        ...User.resolvers.mutations,
        ...Post.resolvers.mutations,
        ...Room.resolvers.mutations
       },
       ...Post.resolvers.PostResolvers,
       ...User.resolvers.UserResolvers,
       ...Room.resolvers.RoomResolvers,
       ...Room.resolvers.MessageResolvers,
       ...Room.resolvers.ReactionResolvers,
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