import UserVideoComponent from "../../RoomId/UserVideoComponent";
import AnswerInput from "../AnswerInput";
import Timer from "../Timer";
import G101Info from "./G101Info";

const G101 = (props) => {
  return (
    <div className="gameBox relative flex flex-col bg-black text-white px-1">
      {props.gameLoading ? (
        <G101Info
          maxTime={props.maxTime}
          maxRound={props.maxRound}
          setGameLoading={props.setGameLoading}
          session={props.session}
        />
      ) : (
        <>
          <div className="h-full aspect-[4/3] absolute flex flex-col">
            <div className="absolute bottom-0 w-full flex justify-around bg-black">
              <p>A: {props.ATeamScore}</p>
              {/* <p> Team: {TeamTurn}</p> */}
              <p>round: {props.round}</p>
              {/* <p>{time}</p> */}
              <p> B: {props.BTeamScore}</p>
            </div>
            {props.isGameEnd ? (
              <div className="bg-mc5 text-white w-full h-full flex flex-col justify-center items-center">
                <div>
                  {props.ATeamScore > props.BTeamScore ? (
                    <p className="text-3xl animate-shake animate-thrice">A Team Win</p>
                  ) : (
                    <>
                      {props.ATeamScore === props.BTeamScore ? (
                        <p className="text-3xl animate-shake animate-thrice">무승부</p>
                      ) : (
                        <p className="text-3xl animate-shake animate-thrice">B Team Win</p>
                      )}
                    </>
                  )}
                </div>
                <br></br>
                <button onClick={props.goWaitRoom} className="animate-bounce">
                  로비로
                </button>
              </div>
            ) : (
              <>
                <div class>
                  <UserVideoComponent
                    streamManager={props.turnPlayerId[1]}
                    session={props.session}
                    gamePlayer={props.turnPlayerId[0]}
                  />
                </div>

                {props.myConnectionId === props.turnPlayerId[0] ||
                props.turnPlayerId[2] !== props.myTeam ? (
                  <div className="absolute right-0 w-1/4">
                    <img
                      src={`https://uhproject.s3.ap-northeast-2.amazonaws.com/${
                        props.quizData[props.quizIndex].quizId
                      }.jpg`}
                      alt="정답사진"
                    />
                  </div>
                ) : null}

                {props.teamChangeLoading ? (
                  <div className="absolute w-full h-full bg-black text-white text-3xl flex justify-center items-center">
                    {props.turnPlayerId[2] === "A" ? (
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
                        maxTime={props.maxTime}
                        time={props.time}
                        setTime={props.setTime}
                        maxRound={props.maxRound}
                        round={props.round}
                        setRound={props.setRound}
                        changeTeamTurn={props.changeTeamTurn}
                        setIsGameEnd={props.setIsGameEnd}
                      />
                      <div className="absolute flex text-black">
                        {props.myConnectionId === props.turnPlayerId[0] ||
                        props.turnPlayerId[2] !== props.myTeam ? (
                          <>
                            <p>{props.quizData[props.quizIndex].quizAnswer}</p>

                            <div className="hidden">
                              <AnswerInput
                                myUserName={props.myUserName}
                                session={props.session}
                                answer={props.quizData[props.quizIndex].quizAnswer}
                                plusQuizIndex={props.plusQuizIndex}
                                Team={props.turnPlayerId[2]}
                                plusScore={props.plusScore}
                                changeTeamIndex={props.changeTeamIndex}
                              />
                            </div>
                          </>
                        ) : (
                          <AnswerInput
                            myUserName={props.myUserName}
                            session={props.session}
                            answer={props.quizData[props.quizIndex].quizAnswer}
                            plusQuizIndex={props.plusQuizIndex}
                            Team={props.turnPlayerId[2]}
                            plusScore={props.plusScore}
                            changeTeamIndex={props.changeTeamIndex}
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
