import { useEffect, useState } from "react";
import { WS_URL } from "@providers/wsClient";

export function useSocket(roomId: string) {
  const [loading4, setLoading] = useState(true);
  const [websocket, setSocket] = useState<WebSocket>();

  useEffect(() => {
    const connectSocket = async () => {
      const ws = new WebSocket(WS_URL);
      console.log("roomId", roomId);  
      ws.onopen = () => {
        setLoading(false);
        setSocket(ws);
        ws.send(JSON.stringify({ type: "join_room", roomId: roomId }));
      };
    };
    
    if(roomId!==undefined) {connectSocket();}

    console.log("Connecting to socket server...");
    return () => {
      websocket?.close();
    };
  }, [roomId]);

  return { websocket,loading4 };
}