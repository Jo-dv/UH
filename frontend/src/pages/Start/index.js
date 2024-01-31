import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logoImg from "../../asset/image/LOGO.png";
import startBackImg from "../../asset/image/startBackGround.png";
function Start() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/auth/login"); // '/login'은 로그인 페이지의 경로
    }, 5000); // 5000ms(5초) 후에 페이지 이동

    return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 정리
  }, [navigate]);
  return (
    <>
      <div
        className="w-full h-screen bg-black
      text-9xl text-white
      flex justify-center items-center"
      >
        {/* <h1>abc 가나다</h1>
        <h2 className="font-['pixel']">abc 가나다</h2> */}
        <img
          className="w-4/5 max-w-2xl z-10"
          alt="Logo"
          src={logoImg}
        />

        <img
          className="animate-fade animate-delay-[2000ms] 
        absolute h-screen w-full"
          alt="Background"
          src={startBackImg}
        />
        {/* <div className='z-10 absolute w-3/4 h-3/4
      bg-gradient-to-r from-spaceP via-amber-300 via-white via-cyan-100 to-spaceB
      animate-fade-right animate-once animate-delay-[2000ms]'>
        Login
      </div> */}
      </div>
    </>
  );
}

export default Start;
