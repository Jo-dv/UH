import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// zustand에서 생성한 useStore 사용
import useStore from "../../store/UserAuthStore";
import startBackImg from "../../asset/image/startBackGround.png";

const CreateNickname = () => {
  const navigate = useNavigate();
  const onClick = (path) => navigate(`/${path}`);
  // UserAuthStore의 User를 변경하기 위해
  const setUser = useStore((state) => state.setUser);
  const userState = useStore((state) => state.user);

  useEffect(() => {
    console.log("userInfo:", userState);
  }, [userState]);

  const [form, setForm] = useState({
    userNickname: "",
  });

  const [err, setErr] = useState({
    userNickname: "",
  });

  const [checkUserNickname, setCheckUserNickname] = useState("");

  const onChange = (e) => {
    const { name, value } = e.currentTarget;
    setForm({ ...form, [name]: value });
    setErr({ ...err, [name]: "" });
  };

  // const checkNickname = async () => {
  //     console.log("ㄱㄱ")
  //     try {
  //         const response = await axios.post("/user/nickname-check", {
  //             userNickname: form.userNickname,
  //         });
  //         const res = response.data;
  //         console.log(res);
  //         if (res === "가능") {
  //             setCheckUserNickname("사용가능한 닉네임");
  //         } else {
  //             setCheckUserNickname("중복된 닉네임");
  //         }
  //     } catch (error) {
  //         console.error("에러 발생", error);
  //     }

  // };

    //닉네임 중복검사
    const checkUserNicknameDuplicate = async (e) => {
      const eRegEx = /^[a-z0-9A-Z가-힣ㄱ-ㅎ]{2,10}$/;
      if (!eRegEx.test(form.userNickname)) {
          setErr({ ...err, userNickname: "한글, 영어, 숫자만 써주세요 (4-20자)"});
      } else {
          try {
              const response = await axios.post("http://localhost:5000/api/user/nicknamecheck", {
                  userNickname: form.userNickname,
              });
              const res = response.data;
              console.log(res);
              if (res === 0) {
                  setErr({ ...err, userNickname: "중복된 닉네임입니다" }); // 중복된 경우 에러 메시지 설정
              } else {
                  setErr({ ...err, userNickname: "사용 가능한 아이디입니다" }); // 중복되지 않은 경우 에러 메시지 초기화
              }
          } catch (error) {
              console.error("에러 발생", error);
              setErr({ ...err, userNickname: "닉네임 중복 검사 중 오류 발생" }); // 에러 발생 시 에러 메시지 설정
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
      // 입력 기준을 충족하지 못했다면
    } else if (!eRegEx.test(form.userNickname)) {
      newErr.userNickname = "한글, 영어, 숫자만 써주세요 (2-10자)";
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
      console.log("닉네임 :", form);
      const userSeq = sessionStorage.getItem("userSeq");
      try {
        const response = await axios.post("http://localhost:5000/api/user/nickname", {userNickname: form.userNickname}, { withCredentials: true });
        const res = response.data;
        console.log("서버 응답:", res);
        if (res.status === 400) {
          setErr({ ...err, userNickname: "중복된 닉네임입니다" });
        } else {
          sessionStorage.setItem("userNickname", form.userNickname);
          // zustand 사용해보기
          setUser({ userSeq, userNickname: form.userNickname });
          console.log("닉네임 생성 성공")
          navigate("/lobby");
        }
      } catch (error) {
        console.error("닉네임 생성 중 에러 발생", error);
        setErr({ ...err, userNickname: "중복된 닉네임입니다."});
        // 에러 처리
        // 예: 사용자에게 에러 메시지 표시
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
        <h1 className="font-['pixel'] text-5xl">닉네임 생성</h1>

        {/* 닉네임 입력창 */}
        <input
          type="text"
          placeholder="닉네임"
          onChange={onChange}
          onBlur={checkUserNicknameDuplicate}
          name="userNickname"
          value={form.userNickname}
        />
        <p className="font-['pixel'] text-red-500 mb-1">{err.userNickname}</p>
        <span>{checkUserNickname}</span>

        <button className="font-['pixel'] p-2 m-1 rounded w-72 bg-formButton">입장하기</button>
      </form>
      <img className="absolute h-screen w-full" alt="Background" src={startBackImg} />

      <div className="absolute w-full h-screen bg-black opacity-50"></div>
    </div>
  );
};
export default CreateNickname;
