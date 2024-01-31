import React, { useState, useEffect, useRef } from "react";

import WebSocketContext from "./WebSocketManager";
const Socket = () => {
  const [connected, setConnected] = useState(false);
  const [sessionIds, setSessionIds] = useState([]);
  const [notificationMessage, setNotificationMessage] = useState(null);
  const socketRef = useRef(null);

  useEffect(() => {
    // WebSocket 연결 초기화
    socketRef.current = new WebSocket("ws://localhost:5000/ws");

    socketRef.current.onopen = () => {
      setConnected(true);
    };

    socketRef.current.onmessage = (event) => {
      try {
        const parsedMessage = JSON.parse(event.data);

        if (parsedMessage && parsedMessage.connectors) {
          setSessionIds(parsedMessage.connectors); // Zustand store 업데이트
        }

        if (parsedMessage && parsedMessage.content) {
          setNotificationMessage(parsedMessage.content);
        }
      } catch (error) {
        console.error("메시지 파싱 오류:", error);
      }
    };

    socketRef.current.onclose = () => {
      setConnected(false);
    };

    // 컴포넌트 언마운트 시 WebSocket 연결 해제
    return () => {
      if (socketRef.current.readyState === WebSocket.OPEN) {
        socketRef.current.close();
      }
    };
  }, []);

  const sendNotification = (sessionId) => {
    const notificationMessage = {
      type: "notification",
      content: sessionId,
    };

    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(notificationMessage));
    }
  };

  return (
    <div>
      <WebSocketContext.Provider></WebSocketContext.Provider>
    </div>
  );
};
