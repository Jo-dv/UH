import React, { useEffect, useState } from 'react';
import useLobbyApiCall from '../../api/useLobbyApiCall';
import useStore from '../../store/UserAuthStore';

const MyPage = () => {
  const { getMyPageInfo } = useLobbyApiCall();
  const userSeq = useStore((state) => state.user.userSeq);
  const [myPageInfo, setMyPageInfo] = useState(null);

  useEffect(() => {
    if (userSeq) {
      getMyPageInfo(userSeq).then(data => {
        console.log("myPageInfo:", data); // 여기에서 myPageInfo 값을 콘솔에 출력
        setMyPageInfo(data);
      });
    }
  }, []);

  return(
    <section className="border-7 border-mc1 mt-4 col-start-2 col-end-7 row-start-1 row-end-13">
        <div>
        <h1>마이페이지</h1>
        {myPageInfo && ( // myPageInfo가 null이 아닐 때만 아래 내용 렌더링
          <>
            <p>닉네임: {myPageInfo.userNickname}</p>
            <p>레이팅: {myPageInfo.rating}</p>
            <h2>경기 기록</h2>
            {myPageInfo?.record?.map((record, index) => (
              <div key={index}>
                <p>게임 카테고리: {record.gameCategory}</p>
                <p>팀원 : {record.user1}, {record.user2}, {record.user3}, {record.user4}</p>
                <p>점수: {record.score}</p>
                <p>승리: {record.win ? '승리' : '패배'}</p>
                <p>생성일: {new Date(record.created).toLocaleString()}</p>
              </div>
            ))}
          </>
        )}
      </div>
    </section>
  );
};

export default MyPage;