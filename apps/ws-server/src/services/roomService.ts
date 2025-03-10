import { prismaClient } from "@repo/db-config/client";
import { users } from "..";
import { WebSocket } from "ws";
class RoomService {
  public static async joinRoom(room: string, password: string, ws: WebSocket) {
    // const roominDb = await prismaClient.room.findUnique({
    //   where: {
    //     slug: room,
    //   },
    // });
    // if (!roominDb) {
    //   ws.send(JSON.stringify({ error: "Room not found" }));
    //   return;
    // }
    // if (roominDb.password !== password) {
    //   ws.send(JSON.stringify({ error: "PasswordIncorrect" }));
    //   return;
    // }
    const user = users.find((u) => u.ws === ws);
    if (!user) {
      ws.send(JSON.stringify({ error: "User not found" }));
      ws.close();
      return;
    }
    user.rooms.push(room);
  }
  public static async leaveRoom(room: string, ws: WebSocket) {
    const user = users.find((u) => u.ws === ws);
    if (!user) {
      ws.send("User not found");
      ws.close();
      return;
    }
    const index = user.rooms.indexOf(room);
    if (index === -1) {
      ws.send("Room not found");
      return;
    }
    user.rooms.splice(index, 1);
  }
  public static async chatInRoom(room: string, ws: WebSocket, message: string){
    console.log("chatInRoom", room, ws, message);
    // await prismaClient.chat.create({
    //   data: {
    //     roomId: room,
    //     message: message,
    //     userId: users.find((u) => u.ws === ws)?.userid as string,
    //   },
    // });
    users.forEach((u) => { 
      if (u.rooms.includes(room)&&u.ws!==ws) {
        u.ws.send(JSON.stringify({
         type:"chat",
         message:message,
         room:room,
        })); 
       }
     });
    }
}
export default RoomService;
