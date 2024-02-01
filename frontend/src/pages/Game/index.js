import { useEffect, useRef, useState } from "react";
import Chat from "../../components/Chat";
import "./Game.css";
import Timer from "./Timer";
import { getRoomInfo } from "../../api/waitRoom";
import UserVideoComponent from "../RoomId/UserVideoComponent";
import AnswerInput from "./AnswerInput";
import G101Info from "./games/G101Info";

const Game = ({ publisher, subscribers, session, myUserName, quiz, sendPlayDone }) => {
  let maxTime = 60000;
  const myConnectionId = session.connection.connectionId;
  const [loading, setLoading] = useState(true);
  const [time, setTime] = useState(0);
  const [myTeam, setMyTeam] = useState(undefined);
  const [ATeamStreamManagers, setATeamStreamManagers] = useState(undefined);
  const [BTeamStreamManagers, setBTeamStreamManagers] = useState([]);
  const [myTeamStreamManagers, setMyTeamStreamManagers] = useState([]);
  const [otherTeamStreamManagers, setOtherTeamStreamManagers] = useState([]);
  const [TeamTurn, setTeamTurn] = useState("A");
  const [TeamIndex, setTeamIndex] = useState(0);
  const changeTeamTurn = () => {
    if (TeamTurn === "A") {
      setTeamTurn("B");
      setTurnPlayerId(BTeamStreamManagers[TeamIndex]);
    } else if (TeamTurn === "B") {
      setTeamTurn("A");
      setTurnPlayerId(ATeamStreamManagers[TeamIndex]);
    }
  };
  const [turnPlayerId, setTurnPlayerId] = useState(undefined);
  const [quizData, setQuizData] = useState([
    { quizId: 62, quizAnswer: "이덕화" },
    { quizId: 180, quizAnswer: "최주봉" },
    { quizId: 12, quizAnswer: "이병헌" },
    { quizId: 296, quizAnswer: "윤계상" },
    { quizId: 73, quizAnswer: "정한용" },
    { quizId: 353, quizAnswer: "최백호" },
    { quizId: 49, quizAnswer: "정태춘" },
    { quizId: 12, quizAnswer: "이병헌" },
    { quizId: 186, quizAnswer: "예지원" },
    { quizId: 321, quizAnswer: "최덕문" },
    { quizId: 363, quizAnswer: "김성겸" },
    { quizId: 107, quizAnswer: "이정길" },
    { quizId: 82, quizAnswer: "김희선" },
  ]);
  const [quizIndex, setQuizIndex] = useState(0);
  const plusQuizIndex = () => {
    setQuizIndex(quizIndex + 1);
  };

  const [ATeamScore, setATeamScore] = useState(0);
  const [BTeamScore, setBTeamScore] = useState(0);
  const plusScore = (team) => {
    console.log(`plusScore: ${team}`);
    if (team === "A") {
      setATeamScore(ATeamScore + 1);
    } else if (team === "B") {
      setBTeamScore(BTeamScore + 1);
    }
  };
  useEffect(() => {
    const callData = async () => {
      const roomData = await getRoomInfo(session.sessionId);
      console.log(
        //   "게임 데이터 : ",
        //   myConnectionId,
        //   roomData,
        //   publisher,
        //   subscribers,
        //   session,
        quiz
        //   myUserName
      );

      const players = roomData.roomStatus.players;
      const myTeamCNT = roomData.roomStatus.players[myConnectionId].team; //A or B

      const ATeamMember = [];
      const BTeamMember = [];
      for (const key in players) {
        if (players[key].team === "A") {
          ATeamMember.push(key);
        } else {
          BTeamMember.push(key);
        }
      }
      // console.log("A팀맴버", ATeamMember);
      // console.log("B팀맴버", BTeamMember);

      const ATeamStreamManagersCNT = [];
      const BTeamStreamManagersCNT = [];
      if (myTeamCNT === "A") {
        ATeamStreamManagersCNT.push([myConnectionId, publisher, "A"]);
        setMyTeam("A");
      } else {
        BTeamStreamManagersCNT.push([myConnectionId, publisher, "B"]);
        setMyTeam("B");
      }

      for (const sub of subscribers) {
        if (ATeamMember.includes(sub.stream.connection.connectionId)) {
          ATeamStreamManagersCNT.push([sub.stream.connection.connectionId, sub, "A"]);
        } else if (BTeamMember.includes(sub.stream.connection.connectionId)) {
          BTeamStreamManagersCNT.push([sub.stream.connection.connectionId, sub, "B"]);
        }
      }

      ATeamStreamManagersCNT.sort();
      BTeamStreamManagersCNT.sort();
      setATeamStreamManagers(ATeamStreamManagersCNT);
      setBTeamStreamManagers(BTeamStreamManagersCNT);
      if (myTeamCNT === "A") {
        setMyTeamStreamManagers(ATeamStreamManagersCNT);
        setOtherTeamStreamManagers(BTeamStreamManagersCNT);
      } else if (myTeamCNT === "B") {
        setMyTeamStreamManagers(BTeamStreamManagersCNT);
        setOtherTeamStreamManagers(ATeamStreamManagersCNT);
      }

      if (quiz !== undefined) {
        setQuizData(quiz);
      }

      setTurnPlayerId(ATeamStreamManagersCNT[0]);
      setLoading(false);
    };

    callData();
  }, [subscribers]);

  return (
    <>
      {loading ? (
        <p>loading</p>
      ) : (
        <main className="bg-neutral-200 p-2 mx-2 mb-2  h-screen-80 border rounded-3xl">
          <div className="flex flex-row justify-center h-full">
            <section className="cam grid grid-rows-4 gap-1">
              {/* <div className="bg-mc6 p-1 overflow-hidden">
            <span>{publisher.id}</span>
            <UserVideoComponent streamManager={publisher} session={session} />
          </div> */}
              {myTeamStreamManagers.map((sub, i) => (
                <>
                  {myConnectionId === sub[0] ? (
                    <div key={sub[0]} className="bg-mc3 p-1 overflow-hidden">
                      <UserVideoComponent
                        streamManager={sub[1]}
                        session={session}
                        gamePlayer={turnPlayerId[0]}
                      />
                    </div>
                  ) : (
                    <div key={sub[0]} className="bg-mc8 p-1 overflow-hidden">
                      <UserVideoComponent
                        streamManager={sub[1]}
                        session={session}
                        gamePlayer={turnPlayerId[0]}
                      />
                    </div>
                  )}
                </>
              ))}
            </section>
            <section className="h-full aspect-[4/5]">
              <div className="flex justify-between">
                <p>A:{ATeamScore}</p>
                <p> B:{BTeamScore}</p>
              </div>
              <div className="gameBox relative flex flex-col justify-end">
                <div className="h-full aspect-[4/3] bg-black text-white absolute flex flex-col">
                  {turnPlayerId !== undefined ? (
                    <UserVideoComponent
                      streamManager={turnPlayerId[1]}
                      session={session}
                      gamePlayer={turnPlayerId[0]}
                    />
                  ) : null}
                  {turnPlayerId !== undefined &&
                  (myConnectionId === turnPlayerId[0] || turnPlayerId[2] !== myTeam) ? (
                    <div className="absolute right-0 w-1/4">
                      <img
                        src={`https://uhproject.s3.ap-northeast-2.amazonaws.com/${quizData[quizIndex].quizId}.jpg`}
                        alt="정답사진"
                      />
                    </div>
                  ) : null}

                  <div className="opacity-90 absolute w-full bottom-0">
                    <div className="relative flex justify-center items-center">
                      <Timer maxT={maxTime} changeTeamTurn={changeTeamTurn} />
                      <div className="absolute flex text-black">
                        {turnPlayerId !== undefined &&
                        (myConnectionId === turnPlayerId[0] || turnPlayerId[2] !== myTeam) ? (
                          <>
                            <p>{quizData[quizIndex].quizAnswer}</p>
                            <div className="hidden">
                              <AnswerInput
                                myUserName={myUserName}
                                session={session}
                                answer={quizData[quizIndex].quizAnswer}
                                plusQuizIndex={plusQuizIndex}
                                myTeam={turnPlayerId[2]}
                                plusScore={plusScore}
                              />
                            </div>
                          </>
                        ) : (
                          <AnswerInput
                            myUserName={myUserName}
                            session={session}
                            answer={quizData[quizIndex].quizAnswer}
                            plusQuizIndex={plusQuizIndex}
                            myTeam={turnPlayerId[2]}
                            plusScore={plusScore}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* <button onClick={sendPlayDone}>playDone</button> */}
              <div className="h-64 w-full">
                {turnPlayerId !== undefined ? (
                  <Chat
                    myUserName={myUserName}
                    session={session}
                    myConnectionId={myConnectionId}
                    gamePlayer={turnPlayerId[0]}
                  />
                ) : null}
              </div>
            </section>
            <section className="cam grid grid-rows-4 gap-1">
              {otherTeamStreamManagers.map((sub, i) => (
                <div key={sub[0]} className="bg-mc1 p-1 overflow-hidden">
                  {turnPlayerId !== undefined ? (
                    <UserVideoComponent
                      streamManager={sub[1]}
                      session={session}
                      gamePlayer={turnPlayerId[0]}
                    />
                  ) : null}
                </div>
              ))}
            </section>
          </div>
        </main>
      )}
    </>
  );
};

export default Game;
