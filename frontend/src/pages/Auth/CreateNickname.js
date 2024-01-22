import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateNickname = () => {
    const navigate = useNavigate();
    const onClick = (path) => navigate(`/${path}`);

    const [form, setForm] = useState({
        userNickname: "",
    });

    const [err, setErr] = useState({
        userNickname: "",
    });

    const onChange = (e) => {
        const { name, value } = e.currentTarget;
        setForm({ ...form, [name]: value });
        setErr({ ...err, [name]: "" });
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
            // 모든 기준 충족 시, 에러메시지 초기화
        } else {
            newErr.userNickname = "";
        }

        // 에러 상태 업데이트
        setErr(newErr);

        if (newErr.userNickname === "") {
            console.log("닉네임 :", form);
        }
    };

    // const CreateNickname = () => {
    //     const navigate = useNavigate();
    //     const onClick = (path) => navigate(`/${path}`);

    //     const [form, setForm] = useState({
    //         nickname: "",
    //     });

    //     const [err, setErr] = useState({
    //         nickname: "",
    //     });

    //     const onChange = (e) => {
    //         const { name, value } = e.currentTarget;
    //         setForm({ ...form, [name]: value });
    //         setErr({ ...err, [name]: "" });
    //     };

    //     const onSubmit = async (e) => {
    //         e.preventDefault();
    //         // 입력 값 범위 설정
    //         const eRegEx = /^[a-z0-9A-Z가-힣ㄱ-ㅎ]{2,10}$/;

    //         if (!eRegEx.test(form.nickname)) {
    //             setErr((err) => ({ ...err, nickname: "한글, 영어, 숫자만 써주세요" }));
    //         }
    //         if (form.nickname.length < 2 || form.nickname.length > 10) {
    //             setErr((err) => ({ ...err, nickname: "2-10글자 사이로 써주세요" }));
    //         }
    //     };
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
                    name="userNickname"
                    value={form.userNickname}
                />
                <p className="font-['pixel'] text-red-500 mb-1">{err.userNickname}</p>

                <button className="font-['pixel'] p-2 m-1 rounded w-72 bg-formButton">입장하기</button>
            </form>
        </div>
    );
};
export default CreateNickname;
