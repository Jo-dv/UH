import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useStore from "../../store/UserAuthStore";

const LogOutModal = (props) => {
  const navigate = useNavigate();
  // resetUser 가져오기
  const resetUser = useStore((state) => state.resetUser);
  const userSeq = useStore((state) => state.user.userSeq);

  // 로그아웃 로직
  const handleLogOut = async () => {
    try {
      await axios.post("http://localhost:5000/user/logout", 
      { userSeq: userSeq } ,
      { withCredentials: true }
      );
      // store의 유저 정보 초기화
      resetUser();
      sessionStorage.clear();
      // 모달 검사 불리언 값 바꾸기
      props.setLogout(false);
      console.log("로그아웃 완료");
      navigate("/auth/login");
    } catch (error) {
      console.error("로그아웃 에러", error);
    }
  };
  // 카카오 소셜 로그인 / 로그아웃
  const REST_API_KEY = process.env.REACT_APP_REST_API_KEY;
  const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
  const LOGOUT_REDIRECT_URI = process.env.REACT_APP_LOGOUT_REDIRECT_URI;
  const loginLink = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  const LogoutLink = `https://kauth.kakao.com/oauth/logout?client_id=${REST_API_KEY}&logout_redirect_uri=${LOGOUT_REDIRECT_URI}`
  const kakaoLoginHandler = () => {
    window.location.href = loginLink;
  };
  const kakaoLogoutHandler = () => {
    handleLogOut();
    window.location.href = LogoutLink;
  };

  return (
    <>
      <div
        className="min-w-100 min-h-96 absolute inset-0
      flex justify-center items-center"
      >
        <div className=" bg-formBG rounded-2xl border-2 border-modalBorder justify-center items-center p-2 flex flex-col">
          <div className="text-center">
            <label>로그아웃하시겠습니까?</label>
            <div>
              <button onClick={props.setLogout} className="bg-cancelButton py-2 px-4 m-2 rounded">
                취소
              </button>

              <button onClick={kakaoLogoutHandler} className="bg-formButton py-2 px-4 m-2 rounded">
                로그아웃
              </button>
              <button onClick={kakaoLogoutHandler} className="bg-formButton py-2 px-4 m-2 rounded">plz</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogOutModal;
