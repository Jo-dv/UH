import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// zustand에서 생성한 useStore 사용
import useStore from "../../store/UserAuthStore";

import googleLogo from "./img/googleLogo.png";
import kakaoLogo from "./img/kakaoLogoB.png";
import naverLogo from "./img/naverLogo.png";

const Login = () => {
  const navigate = useNavigate();
  // UserAuthStore의 User를 변경하기 위해
  const setUser = useStore((state) => state.setUser);

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
    window.location.href = LogoutLink;
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

  useEffect(() => {
    // useEffect 내에서 상태를 로그로 출력
    console.log("userInfo:", userState);
  }, [userState]); // userState가 변경될 때마다 실행

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
    // if (!form.userId && !form.password) {
    //     return setErr({
    //         userId: "아이디를 입력해주세요",
    //         password: "비밀번호를 입력해주세요",
    //     });
    // }
    // if (!form.userId) {
    //     setErr({ ...err, userId: "아이디를 입력해주세요", password: "" });
    // }
    // if (!form.password) {
    //     setErr({
    //         ...err,
    //         userId: "",
    //         password: "비밀번호를 입력해주세요",
    //     });
    // }
    // if (!!form.userId && !!form.password) {
    //     return setErr({
    //         userId: "",
    //         password: "",
    //     });
    // }
    setErr(newErr);

    if (newErr.userId === "" && newErr.userPassword === "") {
      const { userId, userPassword } = form;
      console.log("로그인 정보 :", { userId, userPassword });
      try {
        const response = await axios.post(
          "http://localhost:5000/user/login",
          { userId, userPassword },
          { withCredentials: true }
        );
        const res = response.data;
        console.log("서버 응답:", res);
        // 닉네임이 없다면
        if (res.userNickname === null) {
          sessionStorage.setItem("userSeq", res.userSeq);
          // zustand 사용해보기
          setUser({ userSeq: res.userSeq, userNickname: null, userPassword: res.userPassword });
          navigate("/auth/nickname");
          // 닉네임이 있다면
        } else {
          sessionStorage.setItem("userNickname", res.userNickname);
          sessionStorage.setItem("userSeq", res.userSeq);
          // zustand 사용해보기
          setUser({ userSeq: res.userSeq, userNickname: res.userNickname, userPassword: res.userPassword });
          console.log("로그인 성공");
          navigate("/lobby");
        }
      } catch (error) {
        if (error.response && error.response.status === 400){
          setErr({...err, general: "올바른 정보를 입력해주세요."});
        } else {
        console.error("로그인 중 에러 발생", error);
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
        className="bg-opacity-50 bg-formBG w-96 border-2 border-purple3
                flex flex-col justify-center items-center z-20"
      >
        <h2 className="font-['pixel'] text-7xl">로그인</h2>
        <input
          type="text"
          placeholder="아이디"
          onChange={onChange}
          name="userId"
          value={form.userId}
          className="font-['pixel'] p-2 m-1 border-2 rounded border-purple5 bg-input w-72"
        />
        <p className="font-['pixel'] text-red-500 mb-1">{err.userId}</p>
        {/* {!err.userId && <p>{err.userId}</p>} */}

        <input
          type="password"
          placeholder="비밀번호"
          onChange={onChange}
          name="userPassword"
          value={form.userPassword}
          className="font-['pixel'] p-2 m-1 border-2 rounded border-purple5 bg-input w-72"
        />
        <p className="font-['pixel'] text-red-500 mb-1">{err.userPassword}</p>

        <button className="font-['pixel'] p-2 m-1 rounded w-72 bg-formButton">로그인</button>
        <p className="font-['pixel'] text-red-500 mb-1">{err.general}</p>
        <h3 className="p-2 m-2">
          <Link to="/auth/signup">회원가입</Link>
        </h3>
        <h3 className="p-2 ">소셜로그인</h3>

        <div className="flex flex-row justify-around w-72">
          <img src={googleLogo} alt="google Logo" />
          <img src={kakaoLogo} alt="google Logo" />
          <img src={naverLogo} alt="google Logo" />
        </div>
        <button type="button" onClick={kakaoLoginHandler}>
          카카오 로그인
        </button>
      </form>
    </div>
  );
};

export default Login;
