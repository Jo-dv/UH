import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios.js";
// zustand에서 생성한 useStore 사용
import useStore from "../../store/UserAuthStore";
import startBackImg from "../../asset/image/BG.png";
import useClick from "../../hooks/useClick.js";

const CreateNickname = () => {
  const navigate = useNavigate();
  const onClick = (path) => navigate(`/${path}`);
  // UserAuthStore의 User를 변경하기 위해
  const setUser = useStore((state) => state.setUser);
  const userState = useStore((state) => state.user);
  const [animate, setAnimate] = useState(false);
  const { playClick } = useClick();

  // 애니메이션 트리거 로직
  const triggerAnimate = () => {
    setAnimate(false);
    setTimeout(() => setAnimate(true), 10);
  };

  useEffect(() => {
  }, [userState]);

  const [form, setForm] = useState({
    userNickname: "",
  });

  const [err, setErr] = useState({
    userNickname: "",
  });
  // 닉네임 중복 검사 통과 메시지
  const [nicknameDupMsg, setNicknameDupMsg] = useState({
    userNickname: "",
  });

  const [checkUserNickname, setCheckUserNickname] = useState("");

  const onChange = (e) => {
    const { name, value } = e.currentTarget;
    setForm({ ...form, [name]: value });
    setErr({ ...err, [name]: "" });
  };

  //닉네임 중복검사
  const checkUserNicknameDuplicate = async (e) => {
    const eRegEx = /^[a-z0-9A-Z가-힣ㄱ-ㅎ]{2,10}$/;
    if (!eRegEx.test(form.userNickname)) {
      setErr({ ...err, userNickname: "한글, 영어, 숫자만 써주세요 (4-20자)" });
      triggerAnimate();
      setNicknameDupMsg({ ...nicknameDupMsg, userNickname: "" }); // 성공 메시지 초기화
    } else {
      try {
        const response = await axios.post("user/nicknamecheck", {
          userNickname: form.userNickname,
        });
        const res = response.data;
        if (res === 0) {
          setErr({ ...err, userNickname: "중복된 닉네임입니다" }); // 중복된 경우 에러 메시지 설정
          triggerAnimate();
          setNicknameDupMsg({ ...nicknameDupMsg, userNickname: "" }); // 성공 메시지 초기화
        } else {
          setNicknameDupMsg({ ...nicknameDupMsg, userNickname: "사용 가능한 닉네임입니다" }); // 성공 메시지 초기화
          setErr({ ...err, userNickname: "" }); // 에러 메시지 초기화
        }
      } catch (error) {
        console.error("에러 발생", error);
        setErr({ ...err, userNickname: "닉네임 중복 검사 중 오류 발생" }); // 에러 발생 시 에러 메시지 설정
        setNicknameDupMsg({ ...nicknameDupMsg, userNickname: "" }); // 성공 메시지 초기화
      }
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    let newErr = { ...err };
    // 입력 값 범위 설정
    const eRegEx = /^[a-z0-9A-Z가-힣ㄱ-ㅎ]{2,10}$/;

    // 닉네임 검사
    // 닉네임 input에 입력하지 않았다면
    if (!form.userNickname) {
      newErr.userNickname = "닉네임을 입력해주세요";
      triggerAnimate();
      // 입력 기준을 충족하지 못했다면
    } else if (!eRegEx.test(form.userNickname)) {
      newErr.userNickname = "한글, 영어, 숫자만 써주세요 (2-10자)";
      triggerAnimate();
      // 닉네임 중복 검사
      // } else if (checkUserNickname !== "사용가능한 닉네임") {
      //     newErr.userNickname = "중복된 닉네임입니다";
      // 모든 기준 충족 시, 에러메시지 초기화
    } else {
      newErr.userNickname = "";
    }

    // 에러 상태 업데이트
    setErr(newErr);

    if (newErr.userNickname === "") {
      // const userSeq = sessionStorage.getItem("userSeq");
      try {
        const response = await axios.post("user/nickname", { userNickname: form.userNickname });
        const res = response.data;
        if (res.status === 400) {
          setErr({ ...err, userNickname: "중복된 닉네임입니다" });
          triggerAnimate();
        } else {
          // sessionStorage.setItem("userNickname", form.userNickname);
          // zustand 사용해보기
          setUser({ userSeq: userState.userSeq, userNickname: form.userNickname });
          navigate("/lobby");
        }
      } catch (error) {
        console.error("닉네임 생성 중 에러 발생", error);
        setErr({ ...err, userNickname: "중복된 닉네임입니다." });
        triggerAnimate();
        // 에러 처리
        // 예: 사용자에게 에러 메시지 표시
      }
    }
  };

  return (
    <div className="w-full h-screen p-5 flex justify-center items-center z-10">
      <form
        onSubmit={onSubmit}
        className="bg-opacity-50 bg-formBG w-96 border-2 rounded-3xl
        flex flex-col justify-center items-center z-20"
      >
        <h1 className="text-5xl m-5">닉네임 생성</h1>

        {/* 닉네임 입력창 */}
        <input
          type="text"
          placeholder="닉네임(한글, 영어, 숫자 4-10자)"
          onChange={onChange}
          onBlur={checkUserNicknameDuplicate}
          name="userNickname"
          value={form.userNickname}
          className={`p-2 m-1 w-72 border-2 rounded-xl text-center ${err.userNickname
              ? animate
                ? "animate-shake animate-twice animate-duration-150"
                : ""
              : ""
            }`}
        />
        {/* 성공 메시지 표시 */}
        {nicknameDupMsg.userNickname && (
          <p className="text-emerald-600">{nicknameDupMsg.userNickname}</p>
        )}
        {/* 에러 메시지 표시 */}
        {err.userNickname && <p className="text-red-500">{err.userNickname}</p>}

        <button className="p-2 m-1 rounded-xl w-72 mb-5 bg-tab10 hover:bg-tab10hover"
          onClick={playClick}>입장하기</button>
      </form>
      <img className="absolute h-screen w-full" alt="Background" src={startBackImg} />

      <div className="absolute w-full h-screen bg-black opacity-50"></div>
    </div>
  );
};
export default CreateNickname;
