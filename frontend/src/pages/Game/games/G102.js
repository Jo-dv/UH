import { useEffect, useState } from "react";

import AnswerInput from "../AnswerInput";
import TimerG102 from "../Timer/TimerG102";
import G102Info from "./G102Info";
import TurnTimer from "../Timer/TurnTimer";
import Chipi from "../../../asset/items/Chipi.mp4";
import Tooth from "../../../asset/items/Tooth.mp4";
import Josh from "../../../asset/items/Josh.mp4";
import Win from "../Win/Win";

const G102 = ({
  session,
  myConnectionId,
  myUserName,
  myTeam,
  gameLoading,
  setGameLoading,
  teamChangeLoading,
  time,
  setTime,
  // maxTime,
  round,
  setRound,
  maxRound,
  turnPlayerId,
  ATeamScore,
  BTeamScore,
  isGameEnd,
  goWaitRoom,
  quizData,
  quizIndex,
  setQuizIndex,
  plusQuizIndex,
  plusScore,
  changeTeamIndex,
  changeTeamTurn,
  setIsGameEnd,
  isItem,
  rand01,
}) => {
  useEffect(() => {
    // isEnded 상태가 true일 때 Chipi 영상을 재생
    if (isItem) {
      setIsEnded(true); // 영상을 재생하는 것을 알리는 상태 변경
    }
  }, [isItem]); // isEnded 상태가 변경될 때마다 실행되도록 useEffect 의존성 배열에 추가

  const [maxTurnTime, setMaxTurnTime] = useState(7000);
  const [turnTime, setTurnTime] = useState(0);
  const [isEnded, setIsEnded] = useState(false);
  return (
    <div className="w-full aspect-[4/3] relative flex flex-col ">
      {gameLoading ? (
        <G102Info
          maxTime={60000}
          maxRound={maxRound}
          setGameLoading={setGameLoading}
          session={session}
        />
      ) : (
        <>
          <div className="w-full h-full absolute flex flex-col">
            {isGameEnd ? (
              <Win
                ATeamScore={ATeamScore}
                BTeamScore={BTeamScore}
                goWaitRoom={goWaitRoom}
                rand01={rand01}
              />
            ) : (
              <>
                {isEnded ? (
                  <video
                    autoPlay
                    onEnded={() => setIsEnded(false)}
                    style={{ width: "100%", height: "100%", objectFit: "fill" }}
                  >
                    <source src={Chipi} type="video/mp4" />
                  </video>
                ) : (
                  <div className="w-full h-full flex justify-center">
                    <TimerG102 time={time} setTime={setTime} setIsGameEnd={setIsGameEnd} />
                    <img
                      src={`https://uhproject.s3.ap-northeast-2.amazonaws.com/${quizData[quizIndex].quizId}.jpg`}
                      alt="정답사진"
                    />
                  </div>
                )}
                {teamChangeLoading ? (
                  <div className="absolute w-full h-full bg-black text-white text-3xl flex justify-center items-center">
                    {turnPlayerId[2] === "A" ? (
                      <p className="animate-fade-left animate-duration-1000">
                        <p className="animate-fade-right animate-duration-1000 animate-delay-1000 animate-reverse text-mc1 font-bold">
                          A팀 차례
                        </p>
                      </p>
                    ) : (
                      <p className="animate-fade-right animate-duration-1000">
                        <p className="animate-fade-left animate-duration-1000 animate-delay-1000 animate-reverse text-mc8 font-bold">
                          B팀 차례
                        </p>
                      </p>
                    )}
                  </div>
                ) : (
                  <>
                    <div className="opacity-90 absolute w-full  top-0">
                      <TurnTimer
                        maxTurnTime={maxTurnTime}
                        turnTime={turnTime}
                        setTurnTime={setTurnTime}
                        quizIndex={quizIndex}
                        plusQuizIndex={plusQuizIndex}
                      />
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default G102;
