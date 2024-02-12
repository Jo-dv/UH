import { useEffect, useState } from "react";

import AnswerInput from "../AnswerInput";
import TimerG102 from "../Timer/TimerG102";
import G102Info from "./G102Info";
import TurnTimer from "../Timer/TurnTimer";

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
  maxTime,
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
}) => {
  useEffect(() => {
  }, []);
  const [maxTurnTime, setMaxTurnTime] = useState(10000);
  const [turnTime, setTurnTime] = useState(0);
  return (
    <div className="w-full aspect-[4/3] relative flex flex-col ">
      {gameLoading ? (
        <G102Info
          maxTime={maxTime}
          maxRound={maxRound}
          setGameLoading={setGameLoading}
          session={session}
        />
      ) : (
        <>
          <div className="w-full h-full absolute flex flex-col">
            {isGameEnd ? (
              <>
                {ATeamScore > BTeamScore ? (
                  <div className="w-full h-full flex flex-col justify-center items-center bg-mc1">
                    <p className="text-3xl animate-shake animate-thrice">A Team Win</p>
                    <br />
                    <button onClick={goWaitRoom} className="text-xl z-30">
                      로비로
                    </button>
                  </div>
                ) : (
                  <>
                    {ATeamScore === BTeamScore ? (
                      <div className="w-full h-full flex flex-col justify-center items-center bg-mc10">
                        <p className="text-3xl animate-shake animate-thrice">무승부</p>
                        <button onClick={goWaitRoom} className="text-xl z-30">
                          로비로
                        </button>
                      </div>
                    ) : (
                      <div className="w-full h-full flex flex-col justify-center items-center bg-mc5">
                        <p className="text-3xl animate-bounce">B Team Win</p>
                        <button onClick={goWaitRoom} className="text-xl z-30">
                          로비로
                        </button>
                      </div>
                    )}
                  </>
                )}
              </>
            ) : (
              <>
                <div className="w-full h-full flex justify-center">
                  <TimerG102 time={time} setTime={setTime} setIsGameEnd={setIsGameEnd} />
                  <img
                    src={`https://uhproject.s3.ap-northeast-2.amazonaws.com/${quizData[quizIndex].quizId}.jpg`}
                    alt="정답사진"
                  />
                </div>
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
                    <div className="opacity-90 absolute w-full bottom-0 bg-tab10 p-1">
                      <div className="relative flex justify-center items-center">
                        <AnswerInput
                          myUserName={myUserName}
                          session={session}
                          answer={quizData[quizIndex].quizAnswer}
                          quizIndex={quizIndex}
                          setQuizIndex={setQuizIndex}
                          plusQuizIndex={plusQuizIndex}
                          Team={myTeam}
                          plusScore={plusScore}
                          changeTeamIndex={changeTeamIndex}
                          setTurnTime={setTurnTime}
                        />
                      </div>
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
