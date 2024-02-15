import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../api/axios.js";
// zustand에서 생성한 useStore 사용
import useStore from "../../store/UserAuthStore";

import startBackImg from "../../asset/image/BG.png";
import googleLogo from "./img/googleLogo.png";
import kakaoLogo from "./img/kakaoLogoB.png";
import naverLogo from "./img/naverLogo.png";
import kakaologinimg from "./img/kakao_login.png";
import kakaoSymbol from "./img/kakaosymbol.png";

import useClick from "../../hooks/useClick.js";

const Login = () => {
  const { playClick } = useClick();

  const navigate = useNavigate();
  // UserAuthStore의 User를 변경하기 위해
  const setUser = useStore((state) => state.setUser);
  const resetUser = useStore((state) => state.resetUser);
  // 에러 메시지 애니메이션 트리거 상태관리
  const [animate, setAnimate] = useState(false);

  // 카카오 소셜 로그인 / 로그아웃
  const REST_API_KEY = process.env.REACT_APP_REST_API_KEY;
  const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
  const LOGOUT_REDIRECT_URI = process.env.REACT_APP_LOGOUT_REDIRECT_URI;
  const loginLink = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  const LogoutLink = `https://kauth.kakao.com/oauth/logout?client_id=${REST_API_KEY}&logout_redirect_uri=${LOGOUT_REDIRECT_URI}`;
  const kakaoLoginHandler = () => {
    window.location.href = loginLink;
  };

  const [form, setForm] = useState({
    userId: "",
    userPassword: "",
  });
  const [err, setErr] = useState({
    userId: "",
    userPassword: "",
  });
  const onChange = (e) => {
    const { name, value } = e.currentTarget;
    setForm({ ...form, [name]: value });
  };

  // useStore를 통해 스토어의 상태를 가져오는 함수
  const userState = useStore();

  const userSeq = useStore((state) => state.user.userSeq);

  const handleLogOut = async () => {
    try {
      const response = await axios.post(
        "user/logout",
        { userSeq: userSeq }
      );
      const res = response.data;
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
    const checkLogin = async () => {
      try {
        const response = await axios.get("user/check");
        const res = response.data;
        //세션에 로그인된 유저가 없다면 클라이언트의 유저 정보 로그아웃 처리
        if (res == "") {
          handleLogOut();
        }//로그인된 정보가 있다면 클라이언트의 스토어에 유저 정보를 담고 로비로 보냄
        else {
          setUser({ userSeq: res.userSeq, userNickname: res.userNickname });
          navigate("/lobby");
        }
      } catch {
        setErr({ ...err, general: "서버가 아파요ㅠㅠ" });
      }
    }
    checkLogin();

  }, []);
  const onSubmit = async (e) => {
    e.preventDefault();

    let newErr = { ...err };
    if (!form.userId) {
      newErr.userId = "아이디를 입력해주세요";
    } else {
      newErr.userId = "";
    }
    if (!form.userPassword) {
      newErr.userPassword = "비밀번호를 입력해주세요";
    } else {
      newErr.userPassword = "";
    }
    setErr(newErr);

    setAnimate(false);
    setTimeout(() => setAnimate(true), 10);

    if (newErr.userId === "" && newErr.userPassword === "") {
      const { userId, userPassword } = form;
      try {
        const response = await axios.post("user/login", { userId, userPassword });
        const res = response.data;
        // 닉네임이 없다면
        if (res.userNickname === null) {
          // zustand 사용해보기
          setUser({ userSeq: res.userSeq, userNickname: null });
          navigate("/auth/nickname");
          // 닉네임이 있다면
        } else {
          // zustand 사용해보기
          setUser({ userSeq: res.userSeq, userNickname: res.userNickname });
          navigate("/lobby");
        }
      } catch (error) {
        if (error.response && error.response.status === 400) {
          setErr({ userId: "", userPassword: "", general: "올바른 정보를 입력해주세요." });
        } else {
          console.error("로그인 중 에러 발생", error);
          setErr({ ...err, general: "서버가 아파요ㅠㅠ" });
          // 에러 처리
          // 예: 사용자에게 에러 메시지 표시
        }
      }
    }
  };

  return (
    <div className="w-full h-screen p-5 flex justify-center items-center z-10">
      <form
        onSubmit={onSubmit}
        className="bg-opacity-50 bg-formBG p-4 w-96 border-2 rounded-3xl
                flex flex-col justify-center items-center z-20"
      >
        {/* 티커 추가 */}
        {/* <div className="w-full overflow-hidden m-2">
        <div className="whitespace-nowrap animate-scroll">
          <span className="py-2 px-4 bg-mc9">카메라와 마이크 권한이 필요해요!</span>
        </div>
      </div> */}
        <p className="m-2">카메라와 마이크 권한이 필요해요!</p>
        <h2 className=" text-5xl mt-3 mb-5">로그인</h2>
        <div className="p-3">
          <input
            type="text"
            placeholder="아이디"
            onChange={onChange}
            name="userId"
            value={form.userId}
            className={` p-2 m-1 border-2 rounded-xl w-72 ${err.userId || err.general
              ? animate
                ? "animate-shake animate-twice animate-duration-150 border-red-500"
                : ""
              : "border-stone-500"
              }`}
          />
          <p className=" text-red-500 mb-1">{err.userId}</p>
          {/* {!err.userId && <p>{err.userId}</p>} */}

          <input
            type="password"
            placeholder="비밀번호"
            onChange={onChange}
            name="userPassword"
            autoComplete="off"
            value={form.userPassword}
            className={` p-2 m-1 border-2 rounded-xl bg-input w-72 ${err.userPassword || err.general
              ? animate
                ? "animate-shake animate-twice animate-duration-150 border-red-500"
                : ""
              : "border-stone-500"
              }`}
          />
          <p className=" text-red-500 mb-1">{err.userPassword}</p>
        </div>

        <button className=" p-2 m-1 rounded-xl w-72 bg-tab10 hover:bg-tab10hover"
          onClick={playClick}>
          로그인
        </button>
        <p className=" text-red-500 mb-1">{err.general}</p>
        <button
          className="flex items-center justify-center p-2 m-1 rounded-xl w-72 bg-[#fee500] hover:bg-[#ddc700]"
          onClick={() => {
            kakaoLoginHandler();
            playClick();
          }}
        >
          <img src={kakaoSymbol} alt="카카오 로그인" className="w-4 h-4 mr-2" /> {/* 이미지 크기와 마진 조정 */}
          카카오 로그인
        </button>
        {/* <h3 className="p-2 m-2">
          <Link to="/auth/signup">회원가입</Link>
        </h3> */}
        {/* <h3 className="p-2 ">소셜로그인</h3> */}

        {/* <div className="flex flex-row justify-around w-72"> */}
        {/* <img src={googleLogo} alt="google Logo" />
          <img src={kakaoLogo} alt="google Logo" type="button" onClick={kakaoLoginHandler} />
          <img src={naverLogo} alt="google Logo" /> */}
        {/* <img
            src={kakaologinimg}
            alt="카카오로그인버튼"
            type="button"
            onClick={kakaoLoginHandler}
            className="rounded-xl"
          /> */}
        {/* </div> */}
        <h3 className="p-2 m-2 mb-0">
          <Link to="/auth/signup">회원가입</Link>
        </h3>
      </form>
      <img className="absolute h-screen w-full" alt="Background" src={startBackImg} />

      <div className="absolute w-full h-screen bg-black opacity-50"></div>
    </div>
  );
};

export default Login;
