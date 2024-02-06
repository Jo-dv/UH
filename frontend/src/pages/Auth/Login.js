import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../api/axios.js";
// zustand에서 생성한 useStore 사용
import useStore from "../../store/UserAuthStore";

import startBackImg from "../../asset/image/startBackGround.png";
import googleLogo from "./img/googleLogo.png";
import kakaoLogo from "./img/kakaoLogoB.png";
import naverLogo from "./img/naverLogo.png";
import kakaologinimg from "./img/kakao_login.png";

const Login = () => {
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
        { userSeq: userSeq },
        { withCredentials: true }
      );
      const res = response.data;
      console.log(res);
      // store의 유저 정보 초기화
      if (res === 1) {
        resetUser();
        console.log("로그아웃 완료");
        navigate("/auth/login");
      } else if (res === 2) {
        resetUser();
        console.log("카카오 로그아웃 완료");
        window.location.href = LogoutLink;
      }
    } catch (error) {
      console.error("로그아웃 에러", error);
    }
  };

  useEffect(() => {
    handleLogOut();
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
        console.log("서버 응답:", res);
        // 닉네임이 없다면
        if (res.userNickname === null) {
          // zustand 사용해보기
          setUser({ userSeq: res.userSeq, userNickname: null });
          navigate("/auth/nickname");
          // 닉네임이 있다면
        } else {
          // zustand 사용해보기
          setUser({ userSeq: res.userSeq, userNickname: res.userNickname });
          console.log("로그인 성공");
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
        className="bg-opacity-50 bg-formBG w-96 border-2 rounded-md
                flex flex-col justify-center items-center z-20"
      >
        <h2 className="font-['pixel'] text-7xl">로그인</h2>
        <input
          type="text"
          placeholder="아이디"
          onChange={onChange}
          name="userId"
          value={form.userId}
          className={`font-['pixel'] p-2 m-1 border-2 rounded w-72 ${err.userId || err.general ? (animate ? 'animate-shake animate-twice animate-duration-150 border-red-500' : '') : ''}`}
        />
        <p className="font-['pixel'] text-red-500 mb-1">{err.userId}</p>
        {/* {!err.userId && <p>{err.userId}</p>} */}

        <input
          type="password"
          placeholder="비밀번호"
          onChange={onChange}
          name="userPassword"
          value={form.userPassword}
          className={`font-['pixel'] p-2 m-1 border-2 rounded border-purple5 bg-input w-72 ${err.userPassword || err.general ? (animate ? 'animate-shake animate-twice animate-duration-150 border-red-500' : '') : ''}`}
        />
        <p className="font-['pixel'] text-red-500 mb-1">{err.userPassword}</p>

        <button className="font-['pixel'] p-2 m-1 rounded w-72 bg-formButton">로그인</button>
        <p className="font-['pixel'] text-red-500 mb-1">{err.general}</p>
        {/* <h3 className="p-2 m-2">
          <Link to="/auth/signup">회원가입</Link>
        </h3> */}
        {/* <h3 className="p-2 ">소셜로그인</h3> */}

        <div className="flex flex-row justify-around w-72 mb-3">
          {/* <img src={googleLogo} alt="google Logo" />
          <img src={kakaoLogo} alt="google Logo" type="button" onClick={kakaoLoginHandler} />
          <img src={naverLogo} alt="google Logo" /> */}
          <img src={kakaologinimg} alt="카카오로그인버튼" type="button" onClick={kakaoLoginHandler} />
        </div>
        <h3 className="p-2 m-2">
          <Link to="/auth/signup">회원가입</Link>
        </h3>
      </form>
      <img className="absolute h-screen w-full" alt="Background" src={startBackImg} />

      <div className="absolute w-full h-screen bg-black opacity-50"></div>
    </div>
  );
};

export default Login;
