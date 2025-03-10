import { WebSocketServer } from "ws";
import UserService from "./services/userService";
import { User } from "./interfaces";
import RoomService from "./services/roomService";

const wss = new WebSocketServer({ port:8080,});

export const users:User[]=[];

wss.on("connection", async(ws,request) => {
  const url =request.url;
  if(!url){
    return;
  }
  const queryParams=new URLSearchParams(url.split("?")[1]);
  const token=queryParams.get("token")||"";
  const user=await UserService.verifyUser(token);
  const userid=user?.id;
  if(!userid){
    ws.send("Unauthorized");
    ws.close();
    return;
  }
  users.push({userid,ws,rooms:[]});
  ws.on("message", (message) => {
    const parsedData=JSON.parse(message.toString());
    if(parsedData.type==="join_room"){
      RoomService.joinRoom(parsedData.room,parsedData.password,ws);
    }
    if(parsedData.type==="leave_room"){
      RoomService.leaveRoom(parsedData.room,ws);
    }
    if(parsedData.type==="chat_in_room"||parsedData.type==="shape"){
      RoomService.chatInRoom(parsedData.room,ws,parsedData.message);
    }
  });
}
);