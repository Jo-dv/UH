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
  const [ATeamStreamManagers, setATeamStreamManagers] = useState(undefined);
  const [BTeamStreamManagers, setBTeamStreamManagers] = useState([]);
  const [myTeamStreamManagers, setMyTeamStreamManagers] = useState([]);
  const [otherTeamStreamManagers, setOtherTeamStreamManagers] = useState([]);
  const [TeamTurn, setTeamTurn] = useState("A");
  const [TeamIndex, setTeamIndex] = useState(0);
  const [turnPlayerId, setTurnPlayerId] = useState(undefined);
  const [quizData, setQuizData] = useState([
    { quizId: 180, quizAnswer: "최주봉" },
    { quizId: 62, quizAnswer: "이덕화" },
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

  useEffect(() => {
    const callData = async () => {
      const roomData = await getRoomInfo(session.sessionId);
      console.log(
        "게임 데이터 : ",
        myConnectionId,
        roomData,
        // publisher,
        subscribers
        // session,
        // quiz
        // myUserName
      );

      const players = roomData.roomStatus.players;
      const myTeam = roomData.roomStatus.players[myConnectionId].team; //A or B

      const ATeamMember = [];
      const BTeamMember = [];
      for (const key in players) {
        if (players[key].team === "A") {
          ATeamMember.push(key);
        } else {
          BTeamMember.push(key);
        }
      }
      console.log("A팀맴버", ATeamMember);
      console.log("B팀맴버", BTeamMember);

      const ATeamStreamManagersCNT = [];
      const BTeamStreamManagersCNT = [];
      if (myTeam === "A") {
        ATeamStreamManagersCNT.push([myConnectionId, publisher]);
      } else {
        BTeamStreamManagersCNT.push([myConnectionId, publisher]);
      }

      for (const sub of subscribers) {
        if (ATeamMember.includes(sub.stream.connection.connectionId)) {
          ATeamStreamManagersCNT.push([sub.stream.connection.connectionId, sub]);
        } else if (BTeamMember.includes(sub.stream.connection.connectionId)) {
          BTeamStreamManagersCNT.push([sub.stream.connection.connectionId, sub]);
        }
      }

      ATeamStreamManagersCNT.sort();
      BTeamStreamManagersCNT.sort();
      setATeamStreamManagers(ATeamStreamManagersCNT);
      setBTeamStreamManagers(BTeamStreamManagersCNT);
      if (myTeam === "A") {
        setMyTeamStreamManagers(ATeamStreamManagersCNT);
        setOtherTeamStreamManagers(BTeamStreamManagersCNT);
      } else {
        setMyTeamStreamManagers(BTeamStreamManagersCNT);
        setOtherTeamStreamManagers(ATeamStreamManagersCNT);
      }

      if (quiz !== undefined) {
        setQuizData(quiz);
      }

      setTurnPlayerId(ATeamStreamManagersCNT[0]);
    };

    callData();
  }, []);

  const answer = "정답임";

  return (
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
                <div key={sub[0]} className="bg-mc10 p-1 overflow-hidden">
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
        <section className="grow h-full">
          <div className="gameBox relative flex flex-col justify-end">
            <div className="w-full h-full bg-black text-white absolute">
              {turnPlayerId !== undefined ? (
                <UserVideoComponent
                  streamManager={turnPlayerId[1]}
                  session={session}
                  gamePlayer={turnPlayerId[0]}
                />
              ) : null}
            </div>
            <div className="opacity-90">
              <div className="relative flex justify-center items-center">
                <Timer maxT={maxTime} />
                <div className="absolute flex">
                  {turnPlayerId !== undefined && myConnectionId === turnPlayerId[0] ? (
                    <p>{answer}</p>
                  ) : (
                    <AnswerInput myUserName={myUserName} session={session} answer={answer} />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* <button onClick={sendPlayDone}>playDone</button> */}
          <div className="h-64">
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
  );
};

export default Game;
