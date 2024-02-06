import { useEffect } from "react";
import UserVideoComponent from "../../RoomId/UserVideoComponent";
import AnswerInput from "../AnswerInput";
import Timer from "../Timer";
import G101Info from "./G101Info";

const G101 = ({
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
    console.log("G101 퀴즈데이터", quizData);
  }, []);
  return (
    <div className="gameBox relative flex flex-col bg-black text-white px-1">
      {gameLoading ? (
        <G101Info
          maxTime={maxTime}
          maxRound={maxRound}
          setGameLoading={setGameLoading}
          session={session}
        />
      ) : (
        <>
          <div className="h-full aspect-[4/3] absolute flex flex-col">
            <div className="absolute bottom-0 w-full flex justify-around bg-black">
              <p>A: {ATeamScore}</p>
              {/* <p> Team: {TeamTurn}</p> */}
              <p>round: {round}</p>
              {/* <p>{time}</p> */}
              <p> B: {BTeamScore}</p>
            </div>
            {isGameEnd ? (
              <div className="bg-mc5 text-white w-full h-full flex flex-col justify-center items-center">
                <div>
                  {ATeamScore > BTeamScore ? (
                    <p className="text-3xl animate-shake animate-thrice">A Team Win</p>
                  ) : (
                    <>
                      {ATeamScore === BTeamScore ? (
                        <p className="text-3xl animate-shake animate-thrice">무승부</p>
                      ) : (
                        <p className="text-3xl animate-shake animate-thrice">B Team Win</p>
                      )}
                    </>
                  )}
                </div>
                <br></br>
                <button onClick={goWaitRoom} className="animate-bounce">
                  로비로
                </button>
              </div>
            ) : (
              <>
                <div>
                  <UserVideoComponent
                    streamManager={turnPlayerId[1]}
                    session={session}
                    gamePlayer={turnPlayerId[0]}
                  />
                </div>

                {/* {myConnectionId === turnPlayerId[0] || turnPlayerId[2] !== myTeam ? (
                  <div className="absolute right-0 w-1/4">
                    <img
                      src={`https://uhproject.s3.ap-northeast-2.amazonaws.com/${quizData[quizIndex].quizId}.jpg`}
                      alt="정답사진"
                    />
                  </div>
                ) : null} */}

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
                  <div className="opacity-90 absolute w-full bottom-0">
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
                        {myConnectionId === turnPlayerId[0] || turnPlayerId[2] !== myTeam ? (
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

export default G101;
