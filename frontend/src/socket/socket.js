import React, { useState, useEffect, useRef } from "react";

const Socket = () => {
  const [connected, setConnected] = useState(false);
  const [sessionIds, setSessionIds] = useState([]);
  const [notificationMessage, setNotificationMessage] = useState(null);
  let socket;

  useEffect(() => {
    // WebSocket 연결
    socket = new WebSocket("ws://192.168.219.104:5000/ws");
    socket.onopen = () => {
      setConnected(true);
    };
    console.log(socket);

    socket.onmessage = (event) => {
      try {
        const parsedMessage = JSON.parse(event.data);
        console.log(parsedMessage);
        if (parsedMessage && parsedMessage.content) {
          setNotificationMessage(parsedMessage.content);
        } else if (parsedMessage && parsedMessage.connectors) {
          setSessionIds(parsedMessage.connectors);
        }
      } catch (error) {
        console.error("메시지 파싱 오류:", error);
      }
    };

    socket.onclose = () => {
      setConnected(false);
    };

    // 컴포넌트가 언마운트될 때 WebSocket 연결 해제
    return () => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.close();
      }
    };
  }, [socket]);

  const sendNotification = (sessionId) => {
    const notificationMessage = {
      type: "notification",
      content: sessionId,
    };

    try {
      if (socket.readyState === WebSocket.OPEN) {
        console.log("보내기 성공");
        socket.send(JSON.stringify(notificationMessage));
      }
    } catch (error) {
      console.error("알림 전송 오류:", error);
    }
  };

  return (
    <div>
      <h1 className="text-white">WebSocket Chat</h1>
      <div className="text-white">{connected ? "Connected to WebSocket" : "Connecting..."}</div>
      <button
        className="text-white"
        onClick={() => {
          sendNotification("sadasd");
        }}
      >
        보내기 테스트
      </button>
      {sessionIds.length > 0 && (
        <>
          <h2>연결된 사용자</h2>
          <ul>
            {sessionIds.map((sessionId) => (
              <li key={sessionId} onClick={() => sendNotification(sessionId)}>
                {sessionId}
              </li>
            ))}
          </ul>
        </>
      )}
      {notificationMessage && (
        <>
          <h2>알림</h2>
          <p>{notificationMessage}</p>
        </>
      )}
    </div>
  );
};

export default Socket;
