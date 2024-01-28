import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// zustand에서 생성한 useStore 사용
import useStore from "./UserAuthStore";

const KakaoRedirectHandler = () => {
    const navigate = useNavigate();
    const code = new URL(window.location.href).searchParams.get('code');

    const setUser = useStore(state => state.setUser);
    const userState = useStore();

    useEffect(() => {
        const fetchData = async () => {
        console.log( {code} );
        // 요청 보내기
        if (code) {
            try {
                const response = await axios.post('http://localhost:5000/user/login/kakao', code, { withCredentials: true });
                const res = response.data;
                if (res.userNickname) {
                    navigate('/lobby');
                } else {
                    // zustand 사용해보기
                    setUser({ userSeq: res.userSeq, userNickname: null});
                    console.log("userInfo:", userState());
                    navigate('/auth/nickname');
                }
            } catch (error) {
                console.error('Error during Kakao login', error);
                // 적절한 에러 처리
            }
        }
    };
    fetchData();
}, [code, navigate, setUser, userState]);

    return (
        <div>
            {/* 로딩 인디케이터 또는 관련 메시지 표시 */}
            <h1>로그인 중 입니다,,,</h1>
        </div>
    );
};

export default KakaoRedirectHandler;
