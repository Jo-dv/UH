import React, { useEffect, useState } from "react";
// import DonutChart from "react-donut-chart";
import styled, { keyframes } from "styled-components";
import useLobbyApiCall from "../../api/useLobbyApiCall";
import useStore from "../../store/UserAuthStore";

function DonutChart({ color, percent, size }) {
  return (
    <Chart size={size}>
      <AniSvg viewBox="0 0 200 200">
        <circle cx="100" cy="100" r="70" fill="none" stroke="#F88585" strokeWidth="40" />
        <AnimatedCircle
          cx="100"
          cy="100"
          r="70"
          fill="none"
          stroke={color}
          strokeWidth="40"
          strokeDasharray={`${2 * Math.PI * 70 * percent} ${2 * Math.PI * 70 * (1 - percent)}`}
          strokeDashoffset={2 * Math.PI * 70 * 0.25}
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
        stroke-dasharray:0 ${2 * Math.PI * 70};
    }
`;

const AnimatedCircle = styled.circle`
  animation: ${circleFill} 2s ease;
`;

const Percent = styled.span`
  position: absolute;
  top: 45%;
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
    <section className="rounded-lg mt-4 col-start-4 col-end-13 row-start-1 row-end-13 ">
      <div className="flex items-center justify-between">
        <h1 className="text-5xl ml-14" style={{ fontFamily: "var(--font-bold)" }}>
          {myPageInfo && myPageInfo.userNickname}
        </h1>
        <p className="text-2xl mr-10 mt-5">레이팅 : {myPageInfo && myPageInfo.rating}</p>
      </div>
      <div className="grid grid-cols-3 col-start-1 col-end-2">
        <div className="mt-5">
          {myPageInfo && (
            <div className="mt-7">
              {/* <h2 className="text-2xl text-center mb-3" style={{ fontFamily: "var(--font-bold)" }}>
                프로필
              </h2>
              <p className="text-2xl text-center">닉네임: {myPageInfo.userNickname}</p>
              <p className="text-2xl text-center">레이팅: {myPageInfo.rating}</p>
              <br></br> */}
              <div className="mt-6">
                <p className="text-2xl text-center" style={{ fontFamily: "var(--font-bold)" }}>
                  경기 승률
                </p>
                {myPageInfo?.record?.length !== 0 && (
                  <div className="flex justify-center items-center content-center h-full mt-4">
                    <DonutChart color="#3498db" percent={winPercent} size="250px" />
                  </div>
                )}
                {myPageInfo?.record?.length === 0 && (
                  <div className="record-entry border-2 rounded-md border-cancelButton pb-2 pt-2 mt-4">
                    <p className="ml-2 text-center">경기 승률이 없습니다.</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="col-start-2 col-end-4 relative mt-7 ">
          <div className="ml-5 mt-4">
            <h2 className="text-2xl text-center" style={{ fontFamily: "var(--font-bold)" }}>
              경기 기록
            </h2>
            <div className="record-container overflow-auto p-4 h-[360px] mt-4">
              {myPageInfo?.record?.map((record, index) => (
                <div
                  key={index}
                  className={`record-entry rounded-md border-cancelButton pb-2 pt-2 mb-2 ${
                    record.win ? "bg-blue-100" : "bg-red-100"
                  }`}
                  style={{ height: '7rem', display: 'flex', alignItems: 'center'}}
                >
                  <div className="grid grid-cols-3 gap-4 text-center w-full">
                    <div className="my-auto">
                      <p className="text-2xl ml-2" style={{ fontFamily: "var(--font-bold)" }}>
                        {record.gameCategory === 101 ? "고요속의 외침" : "인물 퀴즈"}
                      </p>
                      <p className="ml-2">점수: {record.score}</p>
                      <p className="ml-2 text-gray-500">{new Date(record.created).toLocaleDateString('ko-KR', { year: '2-digit', month: '2-digit', day: '2-digit', separator: '' })}</p>
                    </div>
                    <div className="my-auto">
                      <p className="ml-2">
                        {[record.user1, record.user2, record.user3, record.user4]
                          .filter(Boolean)
                          .map((user, index) => (
                            <p key={index} className="ml-4">
                              {user}
                            </p>
                          ))}
                      </p>
                    </div>

                    <p
                      className={`text-4xl ml-2 my-auto ${
                        record.win ? "text-blue-500" : "text-red-500"
                      }`}
                    >
                      {record.win ? "승리" : "패배"}
                    </p>
                  </div>
                </div>
              ))}
              {myPageInfo?.record?.length === 0 && (
                <div className="record-entry border-2 rounded-md border-cancelButton pb-2 pt-2">
                  <p className="ml-2 text-center">경기 기록이 없습니다.</p>
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
