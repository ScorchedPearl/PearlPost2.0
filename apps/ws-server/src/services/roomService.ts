import { prismaClient } from "@repo/db-config/client";
import { users } from "..";
import { WebSocket } from "ws";
class RoomService {
  public static async joinRoom(roomId: string, ws: WebSocket) {
    const roominDb = await prismaClient.room.findUnique({
      where: {
        id: roomId,
      },
    });
    if (!roominDb) {
      ws.send(JSON.stringify({ error: "RoomNotFound" }));
      ws.close();
      return;
    }
    const user = users.find((u) => u.ws === ws);
    if (!user) {
      ws.send(JSON.stringify({ error: "User not found" }));
      ws.close();
      return;
    }
    user.rooms.push(roomId);
  }
  public static async leaveRoom(roomId: string, ws: WebSocket) {
    const user = users.find((u) => u.ws === ws);
    if (!user) {
      ws.send("User not found");
      ws.close();
      return;
    }
    const index = user.rooms.indexOf(roomId);
    if (index === -1) {
      ws.send("Room not found");
      return;
    }
    user.rooms.splice(index, 1);
  }
  public static async msgInRoom(roomId: string, ws: WebSocket, message: string ,imageURL?:string){
    console.log("msgInRoom", roomId, ws, message);
    await prismaClient.message.create({
      data: {
        room:{
          connect:{
            id:roomId
          }
        },
        text: message,
        author:{
          connect:{
            id:users.find((u) => u.ws === ws)?.userid
          }
        },
        imageUrl:imageURL
      },
    });
    users.forEach((u) => { 
      if (u.rooms.includes(roomId)&&u.ws!==ws) {
        u.ws.send(JSON.stringify({
         type:"message_in_room",
         message:message,
         roomId:roomId,
         imageURL:imageURL,
        })); 
       }
     });
    }
  public static async reactInRoom(roomId: string, ws: WebSocket, messageId: string,reaction:string){
    console.log("reactInRoom", roomId, ws, messageId,reaction);
    await prismaClient.reaction.create({
      data: {
        message:{
          connect:{
            id:messageId
          }
        },
        type: reaction,
        author:{
          connect:{
            id:users.find((u) => u.ws === ws)?.userid
          }
        }
      },
    });
    users.forEach((u) => {
      if (u.rooms.includes(roomId)&&u.ws!==ws) {
        u.ws.send(JSON.stringify({
         type:"reaction_in_room",
         messageId:messageId,
         roomId:roomId,
         reaction:reaction,
        })); 
       }
     }
    );  
  }
}
export default RoomService;
