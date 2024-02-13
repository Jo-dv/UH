import React, { useState, useEffect, createContext, useContext, useRef } from "react";
import useAccessorsStore from "../store/UseAccessorsStore";
import useStore from "../store/UserAuthStore";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

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
  const REST_API_KEY = process.env.REACT_APP_REST_API_KEY;
  const LOGOUT_REDIRECT_URI = process.env.REACT_APP_LOGOUT_REDIRECT_URI;
  const LogoutLink = `https://kauth.kakao.com/oauth/logout?client_id=${REST_API_KEY}&logout_redirect_uri=${LOGOUT_REDIRECT_URI}`;
  const userSeq = useStore((state) => state.user.userSeq);
  const resetUser = useStore((state) => state.resetUser);
  const nickname = useStore((state) => state.user.userNickname);
  const navigate = useNavigate();

  useEffect(() => {
    const connect = (url, onOpen, onMessage, onClose) => {
      socket.current = new WebSocket(url);

      socket.current.onopen = () => {
        if (onOpen) onOpen();
        setTimeout(() => {
          socket.current.close();
        }, 60000);
      };

      socket.current.onmessage = (event) => {
        // console.log("WebSocket 메시지 수신:", event.data);
        if (onMessage) onMessage(event);
      };

      socket.current.onclose = (event) => {
        if (event.code === 1008) {
          // 로그인 된 유저가 없을 때
          console.error("로그인 필요");
        } else if (event.code === 1002) {
          alert("이미 접속 중인 세션입니다.");
          navigate("/");
        } else if (event.code === 1007) {
          handleLogOut();
          alert("이미 로그인된 유저입니다.");
        } else {
          setTimeout(() => {
            con();
          }, 1000);
        }
      };
    };

    const handleLogOut = async () => {
      try {
        const response = await axios.post("user/logout", { userSeq: userSeq });
        const res = response.data;
        // console.log(res);
        // store의 유저 정보 초기화
        if (res === 1) {
          resetUser();
          console.log("로그아웃 완료");
          navigate("/auth/login");
        } else if (res === 2) {
          resetUser();
          console.log("카카오 로그아웃 완료");
          window.location.href = LogoutLink;
        } else {
          // 나중에 else만 나두기
          // console.log("로그아웃 대상 없음");
        }
      } catch (error) {
        console.error("로그아웃 에러", error);
      }
    };

    const con = () => {
      connect(
        "wss://i10e201.p.ssafy.io/ws",
        // "ws://localhost:5000/ws",
        null,
        (event) => {
          // console.log("WebSocket 메시지 수신:", event.data);
          const parsedMessage = JSON.parse(event.data);
          if (parsedMessage.connectors) {
            setSessionIds(parsedMessage.connectors);
            // console.log(parsedMessage.connectors);
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
                handleFollow(parsedMessage.roomId);
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
    };
    if (nickname != null) {
      con();
    }

    return () => {
      if (socket.current) {
        socket.current.onclose = null;
        socket.current.close();
        // console.log("웹 소캣 연결 종료");
      }
    };
  }, [nickname]);

  //초대 받기 처리
  const handleInvite = (message) => {
    console.log("Invite received", message.fromNickname,message.roomId);
    setNotificationMessage(`You are invited to join room ${message.roomId}`);
  };

  const handleFollow = (roomId) => {
    if (roomId == null) {
      alert("입장할 방이 없습니다.");
    } else {
      navigate(`/room/${roomId}`);
      // 따라가기 메시지 처리 로직
    }
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
