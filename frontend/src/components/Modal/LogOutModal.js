import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios.js";
import useStore from "../../store/UserAuthStore";
import useClick from "../../hooks/useClick";

const LogOutModal = (props) => {
  const navigate = useNavigate();
  const { playClick } = useClick();
  // resetUser 가져오기
  const resetUser = useStore((state) => state.resetUser);
  const userSeq = useStore((state) => state.user.userSeq);
  // 카카오 소셜 로그인 / 로그아웃
  const REST_API_KEY = process.env.REACT_APP_REST_API_KEY;
  const LOGOUT_REDIRECT_URI = process.env.REACT_APP_LOGOUT_REDIRECT_URI;
  const LogoutLink = `https://kauth.kakao.com/oauth/logout?client_id=${REST_API_KEY}&logout_redirect_uri=${LOGOUT_REDIRECT_URI}`

  // 로그아웃 로직
  const handleLogOut = async () => {
    try {
      const response = await axios.post("user/logout",
        { userSeq: userSeq }
      );
      const res = response.data
      // store의 유저 정보 초기화
      if (res === 1) {
        resetUser();
        sessionStorage.clear();
        // 모달 검사 불리언 값 바꾸기
        props.setLogout(false);
        console.log("로그아웃 완료");
        navigate("/auth/login");
      } else if (res === 2) {
        resetUser();
        sessionStorage.clear();
        props.setLogout(false);
        console.log("카카오 로그아웃 완료");
        window.location.href = LogoutLink;
      }

    } catch (error) {
      console.error("로그아웃 에러", error);
    }
  };

  const kakaoLogoutHandler = () => {
    window.location.href = LogoutLink;
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
        onClick={() => {
          props.setLogout(false);
        }}
      >
        <div className="bg-white rounded-3xl border-gray-200 border shadow-lg p-5 md:p-6 mx-2"
          onClick={(e) => e.stopPropagation()}>
          <h2 className="text-lg font-medium text-gray-900 mb-4">로그아웃하시겠습니까?</h2>
          <div className="flex justify-center items-center space-x-4">
            <button onClick={() => {
              props.setLogout();
              playClick();
            }} className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-xl">
              취소
            </button>

            <button onClick={() => {
              handleLogOut();
              playClick();
            }}
              className="bg-tab10 hover:bg-tab10hover py-2 px-4 rounded-xl">
              로그아웃
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogOutModal;
