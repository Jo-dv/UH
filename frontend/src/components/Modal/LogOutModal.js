import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LogOutModal = (props) => {
    const navigate = useNavigate();

    // 로그아웃 로직
    const handleLogOut = async () => {
        try {
            await axios.post("http://localhost:5000/user/logout");
            sessionStorage.clear();
            // 모달 검사 불리언 값 바꾸기
            props.setLogout(false);
            console.log("로그아웃 완료")
            navigate("/auth/login");
        } catch (error) {
            console.error("로그아웃 에러", error);
        }
    };

    return (
        <>
            <div
                className="min-w-100 min-h-96 absolute inset-0
      flex justify-center items-center"
            >
                <div className=" bg-formBG rounded-2xl border-2 border-modalBorder justify-center items-center p-2 flex flex-col">
                    <div className="text-center">
                        <label>로그아웃하시겠습니까?</label>
                        <div>
                            <button
                                onClick={props.setLogout}
                                className="bg-cancelButton py-2 px-4 m-2 rounded"
                            >
                                취소
                            </button>

                            <button
                                onClick={handleLogOut}
                                className="bg-formButton py-2 px-4 m-2 rounded"
                            >
                                로그아웃
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LogOutModal;
