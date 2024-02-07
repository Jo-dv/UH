import React, { useState, useEffect, createContext, useContext, useRef } from "react";
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
  const socket = useRef(null);
  const [sessionIds, setSessionIds] = useState([]);
  const [notificationMessage, setNotificationMessage] = useState(null);
  const { setAccessors } = useAccessorsStore();
  const [refreshRequested, setRefreshRequested] = useState(false);

  useEffect(() => {
    const connect = (url, onOpen, onMessage, onClose) => {
      socket.current = new WebSocket(url);

      socket.current.onopen = () => {
        console.log("웹 소켓 연결됨");
        if (onOpen) onOpen();
        setTimeout(() => {
          socket.current.close();
          console.log("웹 소캣 연결 종료");
        }, 60000);
      };

      socket.current.onmessage = (event) => {
        console.log("WebSocket 메시지 수신:", event.data);
        if (onMessage) onMessage(event);
      };

      socket.current.onclose = () => {
        if (onClose) onClose();
        con();
      };
    };

    const con = () => {
      connect(
        "wss://i10e201.p.ssafy.io/ws",
        // "ws://localhost:5000/ws",
        null,
        (event) => {
          console.log("WebSocket 메시지 수신:", event.data);
          const parsedMessage = JSON.parse(event.data);
          if (parsedMessage.connectors) {
            setSessionIds(parsedMessage.connectors);
            setAccessors(parsedMessage.connectors);
          }

          if (parsedMessage.type === "refresh") {
            handleRefresh(); // 새로고침 처리 로직 호출
          }

          if (parsedMessage.type) {
            switch (parsedMessage.type) {
              case "invite":
                handleInvite(parsedMessage);
                break;
              case "follow":
                handleFollow(parsedMessage);
                break;
              default:
                // 기타 메시지 처리
                break;
            }
          }
        },
        () => {
          /* 연결 종료 시 처리 */
        }
      );
    }
    con();

    return () => {
      if (socket) {
        socket.current.close();
        console.log("웹 소캣 연결 종료");
      }
    };
  }, []);

  const handleInvite = (message) => {
    console.log("Invite received", message);
    setNotificationMessage(`You are invited to join room ${message.roomId}`);
  };

  const handleFollow = (message) => {
    console.log("Follow received", message);
    // 따라가기 메시지 처리 로직
  };

  const handleRefresh = () => {
    // console.log("Follow received", message);
    setRefreshRequested(true);
  };

  const send = (message) => {
    if (socket.current && socket.current.readyState === WebSocket.OPEN) {
      socket.current.send(JSON.stringify(message));
    }
  };

  const contextValue = {
    send,
    sessionIds,
    notificationMessage,
    refreshRequested,
    setRefreshRequested,
  };

  return <WebSocketContext.Provider value={contextValue}>{children}</WebSocketContext.Provider>;
};
