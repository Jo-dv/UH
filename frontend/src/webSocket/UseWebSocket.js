import React, { useState, useEffect, createContext, useContext } from "react";
import WebSocketManager from "./WebSocketManager";
import useAccessorsStore from "../store/UseAccessorsStore";

const WebSocketContext = createContext(null);

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error("useWebSocket must be used within a WebSocketProvider");
  }
  return context;
};

export const WebSocketProvider = ({ children }) => {
  // 함수로 정의된 WebSocketManager를 사용하도록 변경
  const { connect, send, close } = WebSocketManager();
  const [sessionIds, setSessionIds] = useState([]);
  const [notificationMessage, setNotificationMessage] = useState(null);
  const { setAccessors } = useAccessorsStore();

  useEffect(() => {
    connect(
      "ws://localhost:5000/ws",
      () => {
        console.log("--------------------");
        /* 연결 성공 시 처리 */
      },
      (event) => {
        const parsedMessage = JSON.parse(event.data);
        if (parsedMessage.connectors) {
          setSessionIds(parsedMessage.connectors);
          setAccessors(parsedMessage.connectors);
        }
        if (parsedMessage.content) {
          setNotificationMessage(parsedMessage.content);
        }
      },
      () => {
        /* 연결 종료 시 처리 */
      }
    );

    return () => close();
  }, []);

  const contextValue = {
    send,
    sessionIds,
    notificationMessage,
  };

  return <WebSocketContext.Provider value={contextValue}>{children}</WebSocketContext.Provider>;
};
