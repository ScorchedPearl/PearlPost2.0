import { useEffect,useState } from "react";
import { WS_URL } from "@providers/wsClient";

export function useSocket(roomId:string){
  const [loading,setLoading] = useState(true);
  const [socket,setSocket] = useState<WebSocket>();
  useEffect(() => {
   const ws=new WebSocket(WS_URL);
   ws.onopen=()=>{
     setLoading(false);
     setSocket(ws);
     ws.send(JSON.stringify({type:"join_room",room:roomId}));
   }
  },[]);
  return {loading,socket};
}