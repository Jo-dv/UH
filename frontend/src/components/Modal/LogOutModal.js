import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios.js";
import useStore from "../../store/UserAuthStore";

const LogOutModal = (props) => {
  const navigate = useNavigate();
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
      console.log(res);
      // store의 유저 정보 초기화
      if (res === 1){
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
        className="min-w-100 min-h-96 absolute inset-0
      flex justify-center items-center"
      >
        <div className=" bg-formBG rounded-2xl border-2 border-modalBorder justify-center items-center p-2 flex flex-col z-50">
          <div className="text-center">
            <label>로그아웃하시겠습니까?</label>
            <div>
              <button onClick={props.setLogout} className="bg-cancelButton py-2 px-4 m-2 rounded">
                취소
              </button>

              <button onClick={handleLogOut} className="bg-formButton py-2 px-4 m-2 rounded">
                로그아웃
              </button>
              {/* <button onClick={kakaoLogoutHandler} className="bg-formButton py-2 px-4 m-2 rounded">plz</button> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogOutModal;
