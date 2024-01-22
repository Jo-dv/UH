import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    const onSubmit = async (e) => {
        e.preventDefault();
        // 입력 값 범위 설정
        const eRegEx = /^[a-z0-9A-Z]{4,20}$/;
        // 아이디 입력 안했을 때
        if (!form.userId) {
            setErr((err) => ({ ...err, userId: "아이디를 입력해주세요" }));
            // 영어와 숫자를 제외한 것을 입력했을 때
        } else if (!eRegEx.test(form.userId)) {
            setErr((err) => ({ ...err, userId: "영어랑 숫자만 써주세요" }));
        }
        // 비밀번호 입력 안했을 때
        if (!form.userPassword) {
            setErr((err) => ({ ...err, userPassword: "비밀번호를 입력해주세요" }));
            // 영어와 숫자를 제외한 것을 입력했을 때
        } else if (!eRegEx.test(form.userPassword)) {
            setErr((err) => ({ ...err, userPassword: "영어랑 숫자만 써주세요" }));
        }
        // 비밀번호가 4자리 미만일 때
        if (form.userPassword.length > 0 && form.userPassword.length < 4) {
            setErr((err) => ({ ...err, userPassword: "비밀번호는 4자 이상으로 입력해주세요" }));
        }
        // 비밀번호 길이가 20자가 넘어갔을 때
        if (form.userPassword.length > 20) {
            setErr((err) => ({ ...err, userPassword: "비밀번호는 20자 이하로 입력해주세요" }));
        }
        // 비밀번호 확인 입력 안했을 때
        if (!form.passwordCheck) {
            setErr((err) => ({ ...err, passwordCheck: "비밀번호를 입력해주세요" }));
        }
        // 비밀번호와 비밀번호 확인이 일치하지 않을 때
        if (form.userPassword !== form.passwordCheck) {
            setErr((err) => ({ ...err, passwordCheck: "비밀번호가 일치하지 않습니다" }));
        }
        // 비밀번호와 비밀번호 확인이 일치하면 에러메시지 지우기
        if (form.userPassword === form.passwordCheck) {
            setErr((err) => ({ ...err, passwordCheck: "" }));
        }
        // 모든 유효성 검사를 통과했다고 가정
        if (!err.userId && !err.userPassword && !err.passwordCheck && form.userPassword === form.passwordCheck) {
            // 콘솔창에 사용자 입력 값 출력
            console.log("회원가입 정보:", form);
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
                <input type="text" placeholder="아이디" onChange={onChange} name="userId" value={form.userId} />
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
