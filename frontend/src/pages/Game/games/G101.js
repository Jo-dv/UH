import { useEffect, useState } from "react";
import UserVideoComponent from "../Cam/UserVideoComponent";
import AnswerInput from "../AnswerInput";
import Timer from "../Timer/Timer";
import G101Info from "./G101Info";
import Win from "../Win/Win";
import Chipi from "../../../asset/items/Chipi.mp4"
import Tooth from "../../../asset/items/Tooth.mp4"
import Josh from "../../../asset/items/Josh.mp4"

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
  setQuizIndex,
  plusQuizIndex,
  plusScore,
  changeTeamIndex,
  changeTeamTurn,
  setIsGameEnd,
  rand01,
  memeAttack,
  disableAttack,
  hintUse,
}) => {
  useEffect(() => {
    // isEnded 상태가 true일 때 Chipi 영상을 재생
    if (memeAttack) {
      setIsEnded(true); // 영상을 재생하는 것을 알리는 상태 변경
    }
  }, [memeAttack]); // isEnded 상태가 변경될 때마다 실행되도록 useEffect 의존성 배열에 추가

  // 비디오 파일 경로 배열
  const videoFiles = [
    Chipi,
    Tooth,
    Josh
  ];
  const [selectedVideo, setSelectedVideo] = useState("");
  const [maxTurnTime, setMaxTurnTime] = useState(5000);
  const [turnTime, setTurnTime] = useState(0);
  const [isEnded, setIsEnded] = useState(false);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * videoFiles.length);
    setSelectedVideo(videoFiles[randomIndex]);
  }, []);

  return (
    <div className="w-full aspect-[4/3] relative flex flex-col ">
      {gameLoading ? (
        <G101Info
          maxTime={maxTime}
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
                {isEnded ?
                  <video
                    autoPlay
                    onEnded={() => setIsEnded(false)}
                    style={{ width: '100%', height: '100%', objectFit: 'fill' }}
                  >
                    <source src={selectedVideo} type="video/mp4" />
                  </video> :
                  <UserVideoComponent
                    streamManager={turnPlayerId[1]}
                    session={session}
                    gamePlayer={turnPlayerId[0]}
                    gameCategory={101}
                  />}

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
                      <p className="animate-fade-right animate-duration-1000">
                        <p className="animate-fade-right animate-duration-1000 animate-delay-1000 animate-reverse text-mc1 text-8xl font-[button]">
                          A팀 차례
                        </p>
                      </p>
                    ) : (
                      <p className="animate-fade-left animate-duration-1000">
                        <p className="animate-fade-left animate-duration-1000 animate-delay-1000 animate-reverse text-mc9 text-8xl font-[button]">
                          B팀 차례
                        </p>
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="opacity-90 absolute w-full top-0">
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
                      <div className="absolute flex">
                        {myConnectionId === turnPlayerId[0] || turnPlayerId[2] !== myTeam ? (
                          <>
                            <p className="text-3xl font-[round-extrabold]">{quizData[quizIndex].quizAnswer}</p>

                            {/* <AnswerInput
                              myUserName={myUserName}
                              session={session}
                              answer={quizData[quizIndex].quizAnswer}
                              quizIndex={quizIndex}
                              setQuizIndex={setQuizIndex}
                              plusQuizIndex={plusQuizIndex}
                              Team={turnPlayerId[2]}
                              plusScore={plusScore}
                              changeTeamIndex={changeTeamIndex}
                              setTurnTime={setTurnTime}
                              G101form={true}
                            /> */}
                          </>
                        ) : // <AnswerInput
                          //   myUserName={myUserName}
                          //   session={session}
                          //   answer={quizData[quizIndex].quizAnswer}
                          //   quizIndex={quizIndex}
                          //   setQuizIndex={setQuizIndex}
                          //   plusQuizIndex={plusQuizIndex}
                          //   Team={turnPlayerId[2]}
                          //   plusScore={plusScore}
                          //   changeTeamIndex={changeTeamIndex}
                          //   setTurnTime={setTurnTime}
                          // />
                          null}
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
