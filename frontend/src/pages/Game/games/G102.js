import { useEffect } from "react";
import UserVideoComponent from "../../RoomId/UserVideoComponent";
import AnswerInput from "../AnswerInput";
import Timer from "../Timer";
import G102Info from "./G102Info";

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
  plusQuizIndex,
  plusScore,
  changeTeamIndex,
  changeTeamTurn,
  setIsGameEnd,
}) => {
  useEffect(() => {
    console.log("G102 퀴즈데이터", quizData);
  }, []);
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
          <div className="h-full aspect-[4/3] absolute flex flex-col">
            {isGameEnd ? (
              <>
                {ATeamScore > BTeamScore ? (
                  <div className="w-full h-full flex flex-col justify-center items-center bg-mc1">
                    <p className="text-3xl animate-shake animate-thrice">A Team Win</p>
                    <br />
                    <button onClick={goWaitRoom} className="text-xl">
                      로비로
                    </button>
                  </div>
                ) : (
                  <>
                    {ATeamScore === BTeamScore ? (
                      <div className="w-full h-full flex flex-col justify-center items-center bg-mc10">
                        <p className="text-3xl animate-shake animate-thrice">무승부</p>
                        <br />
                        <button onClick={goWaitRoom} className="text-xl">
                          로비로
                        </button>
                      </div>
                    ) : (
                      <div className="w-full h-full flex flex-col justify-center items-center bg-mc5">
                        <p className="text-3xl animate-bounce">B Team Win</p>
                        <br />
                        <button onClick={goWaitRoom} className="text-xl">
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
                  <div className="opacity-90 absolute w-full bottom-[-20px]">
                    <div className="relative flex justify-center items-center">
                      <Timer
                        maxTime={maxTime}
                        time={time}
                        setTime={setTime}
                        maxRound={maxRound}
                        round={round}
                        setRound={setRound}
                        changeTeamTurn={changeTeamTurn}
                        setIsGameEnd={setIsGameEnd}
                      />
                      <div className="absolute flex text-black">
                        {turnPlayerId[2] !== myTeam ? (
                          <>
                            <p>{quizData[quizIndex].quizAnswer}</p>

                            <div className="hidden">
                              <AnswerInput
                                myUserName={myUserName}
                                session={session}
                                answer={quizData[quizIndex].quizAnswer}
                                plusQuizIndex={plusQuizIndex}
                                Team={turnPlayerId[2]}
                                plusScore={plusScore}
                                changeTeamIndex={changeTeamIndex}
                              />
                            </div>
                          </>
                        ) : (
                          <AnswerInput
                            myUserName={myUserName}
                            session={session}
                            answer={quizData[quizIndex].quizAnswer}
                            plusQuizIndex={plusQuizIndex}
                            Team={turnPlayerId[2]}
                            plusScore={plusScore}
                            changeTeamIndex={changeTeamIndex}
                          />
                        )}
                      </div>
                    </div>
                  </div>
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
