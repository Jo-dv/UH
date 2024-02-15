import React, { useEffect } from "react";
import { Outlet,useNavigate } from "react-router-dom";
import Header from "./Header.js";
import { WebSocketProvider } from "../../webSocket/UseWebSocket.js";
import useStore from "../../store/UserAuthStore.js";
import axios from "../../api/axios.js"

const Layout = () => {
  const navigate = useNavigate();
  const REST_API_KEY = process.env.REACT_APP_REST_API_KEY;
  const LOGOUT_REDIRECT_URI = process.env.REACT_APP_LOGOUT_REDIRECT_URI;
  const LogoutLink = `https://kauth.kakao.com/oauth/logout?client_id=${REST_API_KEY}&logout_redirect_uri=${LOGOUT_REDIRECT_URI}`;
  const userSeq = useStore((state) => state.user.userSeq);
  const resetUser = useStore((state) => state.resetUser);

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

  useEffect(() => {
    const checkMediaPermissions = async () => {
      try {
        // 미디어 장치에 접근하여 마이크와 카메라 권한을 확인합니다.
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
        // 권한이 있는 경우 스트림을 해제합니다.
        stream.getTracks().forEach(track => track.stop());
      } catch (error) {
        handleLogOut();
        alert('마이크 또는 카메라 권한이 필요합니다. 로그아웃됩니다.');
       
      }
    };

    checkMediaPermissions(); // 페이지 로드 시 권한 확인

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // useEffect를 한 번만 실행하기 위해 빈 배열을 의존성으로 설정


  return (
    <WebSocketProvider>
    <>
      <Header />
      <Outlet />
    </>
    </WebSocketProvider>
  );
};

export default Layout;
