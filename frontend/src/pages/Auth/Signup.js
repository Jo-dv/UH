import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
    const navigate = useNavigate();
    const onClick = (path) => navigate(`/${path}`);

    const [form, setForm] = useState({
        userId: "",
        userPassword: "",
        passwordCheck: "",
    });
    const [err, setErr] = useState({
        userId: "",
        userPassword: "",
        passwordCheck: "",
    });

    const [checkUserId, setCheckUserId] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    const onChange = (e) => {
        const { name, value } = e.currentTarget;
        setForm({ ...form, [name]: value });
        setErr({ ...err, [name]: "" });
    };
    // 버튼 클릭 시, 비밀번호 입력창에서 text와 "*" 사이를 전환
    const togglePassword = (e) => {
        e.preventDefault();
        setShowPassword((showPassword) => !showPassword);
    };

    // 비밀번호 확인 검사
    const checkPasswordMatch = () => {
        let newErr = { ...err };
        if (!form.passwordCheck) {
            newErr.passwordCheck = "비밀번호를 입력해주세요";
        } else if (form.userPassword !== form.passwordCheck) {
            newErr.passwordCheck = "비밀번호가 일치하지 않습니다";
        } else {
            newErr.passwordCheck = "";
        }
        setErr(newErr);
    };
    //아이디 중복검사
    const checkUserIdDuplicate = async (e) => {
        const eRegEx = /^[a-z0-9A-Z]{4,20}$/;
        if (!eRegEx.test(form.userId)) {
            setErr({ ...err, userId: "영어, 숫자만 써주세요 (4-20자)"});
        } else {
            try {
                const response = await axios.post("http://localhost:5000/user/idcheck", {
                    userId: form.userId,
                });
                const res = response.data;
                console.log(res);
                if (res === 0) {
                    setErr({ ...err, userId: "중복된 아이디입니다" }); // 중복된 경우 에러 메시지 설정
                } else {
                    setErr({ ...err, userId: "사용 가능한 아이디입니다" }); // 중복되지 않은 경우 에러 메시지 초기화
                }
            } catch (error) {
                console.error("에러 발생", error);
                setErr({ ...err, userId: "아이디 중복 검사 중 오류 발생" }); // 에러 발생 시 에러 메시지 설정
            }
        }
    };

    // const onBlurUserId = async (e) => {
    //     if(!form.userId) {
    //         setErr({ ...err, userId: "아이디를 입력해주세요"});
    //     } else {
    //         await checkUserIdDuplicate(form.userId);
    //     }
    // };

    const onSubmit = async (e) => {
        e.preventDefault();

        // 새로운 에러 객체 생성
        let newErr = { ...err };
        // 아이디, 비밀번호 입력 기준 설정
        const eRegEx = /^[a-z0-9A-Z]{4,20}$/;

        // 아이디 검사
        // 아이디 input에 입력하지 않았다면
        if (!form.userId) {
            newErr.userId = "아이디를 입력해주세요";
            // 입력 기준 충족하지 못한다면
        } else if (!eRegEx.test(form.userId)) {
            newErr.userId = "영어, 숫자만 써주세요 (4-20자)";
        // } else if (checkUserId !== "사용가능한 아이디") {
        //     newErr.userId = "중복된 아이디입니다";
        } else {
            newErr.userId = "";
        }

        // 비밀번호 검사
        // 비밀번호 input에 입력하지 않았다면
        if (!form.userPassword) {
            newErr.userPassword = "비밀번호를 입력해주세요";
            // 입력 기준 충족하지 못한다면
        } else if (!eRegEx.test(form.userPassword)) {
            newErr.userPassword = "영어랑 숫자만 써주세요 (4-20자)";
        } else {
            newErr.userPassword = "";
        }

        // 비밀번호 확인 검사
        if (!form.passwordCheck) {
            newErr.passwordCheck = "비밀번호를 입력해주세요";
        } else if (form.userPassword !== form.passwordCheck) {
            newErr.passwordCheck = "비밀번호가 일치하지 않습니다";
        } else {
            newErr.passwordCheck = "";
        }

        // 에러 상태 업데이트
        setErr(newErr);

        // 모든 유효성 검사를 통과하면 서버로 데이터 전송
        if (newErr.userId === "" && newErr.userPassword === "" && newErr.passwordCheck === "") {
            const { userId, userPassword } = form;
            console.log("회원가입 정보:", { userId, userPassword });
            try {
                const response = await axios.post("http://localhost:5000/user/join", { userId, userPassword });
                console.log("서버 응답:", response);
                // 회원가입 성공 후 처리
                // 예: navigate("/login") 또는 성공 메시지 표시
                navigate("/auth/login");
            } catch (error) {
                console.error("회원가입 중 에러 발생", error);
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
                <h1 className="font-['pixel'] text-7xl">회원가입</h1>

                {/* 아이디 입력창 */}
                <input 
                type="text" 
                placeholder="아이디" 
                onChange={onChange} 
                onBlur={checkUserIdDuplicate}
                name="userId" 
                value={form.userId} 
                />
                <p className="font-['pixel'] text-red-500 mb-1">{err.userId}</p>

                {/* 비밀번호 입력창 */}
                <input
                    type={showPassword ? "text" : "password"}
                    placeholder="비밀번호 (영문, 숫자 4-20자)"
                    onChange={onChange}
                    name="userPassword"
                    value={form.userPassword}
                />
                <button onClick={togglePassword}>{showPassword ? "숨기기" : "보이기"}</button>
                <p className="font-['pixel'] text-red-500 mb-1">{err.userPassword}</p>

                {/* 비밀번호 확인 입력창 */}
                <input
                    type={showPassword ? "text" : "password"}
                    placeholder="비밀번호 확인"
                    onChange={onChange}
                    onBlur={checkPasswordMatch}
                    name="passwordCheck"
                    value={form.passwordCheck}
                />
                <p className="font-['pixel'] text-red-500 mb-1">{err.passwordCheck}</p>

                <button className="font-['pixel'] p-2 m-1 rounded w-72 bg-formButton">회원가입</button>
            </form>
        </div>
    );
};

export default Signup;