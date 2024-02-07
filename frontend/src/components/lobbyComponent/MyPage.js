import React, { useEffect, useState } from "react";
// import DonutChart from "react-donut-chart";
import styled, { keyframes } from "styled-components";
import useLobbyApiCall from "../../api/useLobbyApiCall";
import useStore from "../../store/UserAuthStore";

function DonutChart({ color, percent, size }) {
  return (
    <Chart size={size}>
      <AniSvg viewBox="0 0 200 200">
        <circle cx="100" cy="100" r="90" fill="none" stroke="#F88585" strokeWidth="20" />
        <AnimatedCircle
          cx="100"
          cy="100"
          r="90"
          fill="none"
          stroke={color}
          strokeWidth="20"
          strokeDasharray={`${2 * Math.PI * 90 * percent} ${2 * Math.PI * 90 * (1 - percent)}`}
          strokeDashoffset={2 * Math.PI * 90 * 0.25}
        />
      </AniSvg>
      <Percent color={color}>{percent * 100}%</Percent>
    </Chart>
  );
}

const Chart = styled.div`
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  position: relative;
  padding: 10px;
`;

const AniSvg = styled.svg`
  position: relative;
`;

const circleFill = keyframes`
    0%{
        stroke-dasharray:0 ${2 * Math.PI * 90};
    }
`;

const AnimatedCircle = styled.circle`
  animation: ${circleFill} 2s ease;
`;

const Percent = styled.span`
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translateX(-50%);
  font-size: 20px;
  color: ${(props) => props.color};
`;

const MyPage = () => {
  const { getMyPageInfo } = useLobbyApiCall();
  const userSeq = useStore((state) => state.user.userSeq);
  const [myPageInfo, setMyPageInfo] = useState(null);
  const [recordPercent, setRecordPercent] = useState(null); // recordPercent 상태 추가
  const [winPercent, setWinPercent] = useState(0); // winPercent 상태 추가

  useEffect(() => {
    if (userSeq) {
      getMyPageInfo(userSeq).then((data) => {
        setMyPageInfo(data);
        let winCount = 0;
        let loseCount = 0;
        data.record.forEach((record) => {
          if (record.win) {
            winCount++;
          } else {
            loseCount++;
          }
        });
        const totalCount = winCount + loseCount;
        const winPercent = Math.round((winCount / totalCount) * 100) / 100;
        const losePercent = Math.round((loseCount / totalCount) * 100) / 100;
        // console.log("카운트",winCount, loseCount)
        // console.log("퍼센트",winPercent, losePercent );

        setRecordPercent({
          winPercent,
          losePercent,
          totalCount,
        });
        setWinPercent(winPercent);
      });
    }
  }, [userSeq]);

  return (
    <section className="rounded-lg mt-4 col-start-4 col-end-13 row-start-1 row-end-13 overflow-auto p-4">
      <h1 className="text-5xl border-b-4" style={{ fontFamily: "var(--font-bold)" }}>
        MyPage
      </h1>
      <div className="grid grid-cols-3 col-start-1 col-end-2">
        <div>
          {myPageInfo && (
            <div className="mt-7">
              <p className="text-2xl">닉네임: {myPageInfo.userNickname}</p>
              <p className="text-2xl">레이팅: {myPageInfo.rating}</p>
              <br></br>
              <div className="">
                <p className="text-2xl">경기 승률</p>
                <div className="flex justify-center items-center content-center h-full">
                  <DonutChart color="#86EFAC" percent={winPercent} size="200px" />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="col-start-2 col-end-4 relative border-l-4">
          {/* <div className="absolute left-0 top-0 h-full border-r-2 border-gray-300"></div> */}
          <div className="ml-5 mt-6">
            <h2 className="text-2xl" style={{ fontFamily: "var(--font-bold)" }}>
              경기 기록
            </h2>
            <div className="record-container overflow-auto h-96 border-t-2">
              {myPageInfo?.record?.map((record, index) => (
                <div
                  key={index}
                  className={`record-entry border-2 rounded-md border-cancelButton pb-2 pt-2 ${
                    record.win ? "bg-green-100" : "bg-red-100"
                  }`}
                >
                  <p className="ml-2" style={{ fontFamily: "var(--font-bold)" }}>
                    {record.gameCategory === 101 ? "고요속의 외침" : "인물 퀴즈"}
                  </p>
                  <p className="ml-2">
                    팀원 :
                    {[record.user1, record.user2, record.user3, record.user4]
                      .filter(Boolean)
                      .map((user, index, array) => (
                        <span key={user}>
                          {user}
                          {index !== array.length - 1 && ", "}
                        </span>
                      ))}
                  </p>
                  <p className="ml-2">점수: {record.score}</p>
                  <p className="ml-2">승리: {record.win ? "승리" : "패배"}</p>
                  <p className="ml-2">날짜: {new Date(record.created).toLocaleString()}</p>
                </div>
              ))}
              {myPageInfo?.record?.length === 0 && (
                <div className="record-entry border-2 rounded-md border-cancelButton pb-2 pt-2">
                  <p className="ml-2">등록된 경기 기록이 없습니다.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyPage;
