import React, { useEffect, useState } from "react";
import useLobbyApiCall from "../../api/useLobbyApiCall";
import useStore from "../../store/UserAuthStore";

const MyPage = () => {
  const { getMyPageInfo } = useLobbyApiCall();
  const userSeq = useStore((state) => state.user.userSeq);
  const [myPageInfo, setMyPageInfo] = useState(null);

  useEffect(() => {
    if (userSeq) {
      getMyPageInfo(userSeq).then((data) => {
        console.log("myPageInfo:", data); // 여기에서 myPageInfo 값을 콘솔에 출력
        setMyPageInfo(data);
      });
    }
  }, []);

  return (
    <section className="rounded-lg bg-bg1 mt-4 col-start-2 col-end-7 row-start-1 row-end-13 overflow-auto p-4">
      <div className="ml-10 mt-6">
        <h1 className="text-5xl border-b-2 border-gray-300 pb-2">MyPage</h1>
        {myPageInfo && ( // myPageInfo가 null이 아닐 때만 아래 내용 렌더링
          <>
            <p>닉네임: {myPageInfo.userNickname}</p>
            <p>레이팅: {myPageInfo.rating}</p>
            <h2>경기 기록</h2>
            <div className="record-container overflow-auto h-96 border-t-2">
              {myPageInfo?.record?.map((record, index) => (
                <div
                  key={index}
                  className={`record-entry border-4 rounded-md border-cancelButton pb-2 pt-2 ${
                    record.win ? "bg-green-200" : "bg-red-200"
                  }`}
                >
                  <p className="ml-2">
                    {record.gameCategory === 101 ? "고요속의 외침" : "인물 퀴즈"}
                  </p>
                  <p className="ml-2">
                    팀원 : {record.user1}, {record.user2}, {record.user3}, {record.user4}
                  </p>
                  <p className="ml-2">점수: {record.score}</p>
                  <p className="ml-2">승리: {record.win ? "승리" : "패배"}</p>
                  <p className="ml-2">날짜: {new Date(record.created).toLocaleString()}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default MyPage;
