import { useEffect, useRef, useState } from "react";
import Chat from "./Chat";
import "./Game.css";

import { endPlay, getGameData, getRoomInfo } from "../../api/waitRoom";
import UserVideoComponent from "./Cam/UserVideoComponent";

import G101 from "./games/G101";
import G102 from "./games/G102";

const Game = ({ publisher, subscribers, session, myUserName, sendPlayDone,itemUse,isMeme }) => {
  let maxTime = 60000;
  let maxRound = 4;
  const myConnectionId = session.connection.connectionId;
  const [loading, setLoading] = useState(true);
  const [gameLoading, setGameLoading] = useState(true);
  const [time, setTime] = useState(0);
  const [round, setRound] = useState(1);
  const [isGameEnd, setIsGameEnd] = useState(false);
  const [myTeam, setMyTeam] = useState(undefined);
  const [ATeamStreamManagers, setATeamStreamManagers] = useState(undefined);
  const [BTeamStreamManagers, setBTeamStreamManagers] = useState(undefined);
  const [TeamTurn, setTeamTurn] = useState("A");
  const [TeamIndex, setTeamIndex] = useState(0);
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
  const [ATeamScore, setATeamScore] = useState(0);
  const [BTeamScore, setBTeamScore] = useState(0);
  const [teamChangeLoading, setTeamChangeLoading] = useState(false);
  const [gameCategory, setGameCategory] = useState(undefined);
  const [isEnded, setIsEnded] = useState(false); // 하위 컴포넌트에게 영상 재생 상태를 전달할 상태

  const plusQuizIndex = () => {
    setQuizIndex(quizIndex + 1);
  };

  const plusScore = (Team) => {
    // console.log(`plusScore: ${Team}`);
    if (Team === "A") {
      setATeamScore(ATeamScore + 1);
    } else if (Team === "B") {
      setBTeamScore(BTeamScore + 1);
    }
  };

  const changeTeamIndex = () => {
    if (TeamTurn === "A") {
      const long = ATeamStreamManagers.length;
      if (TeamIndex + 1 < long) {
        setTurnPlayerId(ATeamStreamManagers[TeamIndex + 1]);
        setTeamIndex(TeamIndex + 1);
      } else {
        setTurnPlayerId(ATeamStreamManagers[0]);
        setTeamIndex(0);
      }
    } else if (TeamTurn === "B") {
      const long = BTeamStreamManagers.length;
      if (TeamIndex + 1 < long) {
        setTurnPlayerId(BTeamStreamManagers[TeamIndex + 1]);
        setTeamIndex(TeamIndex + 1);
      } else {
        setTurnPlayerId(BTeamStreamManagers[0]);
        setTeamIndex(0);
      }
    }
  };

  const changeTeamTurn = () => {
    // console.log(TeamTurn);
    if (TeamTurn === "A") {
      setTeamTurn("B");
      setTeamIndex(0);
      setTurnPlayerId(BTeamStreamManagers[TeamIndex]);
      plusQuizIndex();

      if (round < maxRound) {
        setTeamChangeLoading(true);
        setTimeout(() => {
          setTeamChangeLoading(false);
        }, 2000);
      }
    } else if (TeamTurn === "B") {
      setTeamTurn("A");
      setTeamIndex(0);
      setTurnPlayerId(ATeamStreamManagers[TeamIndex]);
      plusQuizIndex();

      if (round < maxRound) {
        setTeamChangeLoading(true);
        setTimeout(() => {
          setTeamChangeLoading(false);
        }, 2000);
      }
    }
  };

  useEffect(() => {
    const callData = async () => {
      const roomData = await getRoomInfo(session.sessionId);
      // console.log(
      //   "게임 데이터 : ",
      //   myConnectionId,
      //   roomData,
      //   `게임카테고리 : ${roomData.roomData.gameCategory}`,
      //   publisher,
      //   subscribers,
      //   session,
      //   quiz,
      //   myUserName
      // );
      setGameCategory(roomData.roomData.gameCategory);
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

      const quiz = await getGameData(session.sessionId);
      // console.log("quiz data axios result :", quiz);
      if (quiz !== undefined && quiz.length !== 0) {
        setQuizData(quiz);
      }

      setTurnPlayerId(ATeamStreamManagersCNT[0]);
      setLoading(false);
    };

    callData();
  }, []);

  const goWaitRoom = () => {
    sendPlayDone();
    if (ATeamScore > BTeamScore) {
      endPlay(session.sessionId, "A", ATeamScore, BTeamScore);
    } else if (ATeamScore < BTeamScore) {
      endPlay(session.sessionId, "B", BTeamScore, ATeamScore);
    }
  };
  // console.log(quizData);
  return (
    <>
      {loading ? (
        <p>loading</p>
      ) : (
        <main className="container-box bg-stone-100 p-4 border rounded-3xl">
          <div className="flex flex-row justify-around h-full">
            <section className="grid grid-rows-4 gap-2 mr-2">
              {ATeamStreamManagers.map((sub, i) => (
                <>
                  {myConnectionId === sub[0] ? (
                    <div key={sub[0]} className="cam bg-tab10">
                      <UserVideoComponent
                        streamManager={sub[1]}
                        session={session}
                        gamePlayer={turnPlayerId[0]}
                        gameCategory={gameCategory}
                      />
                    </div>
                  ) : (
                    <div key={sub[0]} className="cam bg-tab1">
                      <UserVideoComponent
                        streamManager={sub[1]}
                        session={session}
                        gamePlayer={turnPlayerId[0]}
                        gameCategory={gameCategory}
                      />
                    </div>
                  )}
                </>
              ))}
            </section>
            <article className="h-full aspect-[12/10] relative flex flex-col">
              <div className="w-full flex justify-around items-end bg-tab10 text-xl rounded-t-[17px]">
                <p className={ATeamScore > BTeamScore ? "text-2xl" : "text-xl"}>A: {ATeamScore}</p>
                {/* <p> Team: {TeamTurn}</p> */}
                <p className="text-3xl">round: {round}</p>
                {/* <p>{time}</p> */}
                <p className={ATeamScore < BTeamScore ? "text-2xl" : "text-xl"}> B: {BTeamScore}</p>
              </div>
              <section className="relative rounded-b-[17px] overflow-hidden">
                {gameCategory === 101 ? (
                  <G101
                    gameLoading={gameLoading}
                    maxTime={maxTime}
                    setTime={setTime}
                    time={time}
                    maxRound={maxRound}
                    setRound={setRound}
                    round={round}
                    session={session}
                    setGameLoading={setGameLoading}
                    ATeamScore={ATeamScore}
                    BTeamScore={BTeamScore}
                    isGameEnd={isGameEnd}
                    goWaitRoom={goWaitRoom}
                    turnPlayerId={turnPlayerId}
                    myConnectionId={myConnectionId}
                    myUserName={myUserName}
                    myTeam={myTeam}
                    quizData={quizData}
                    quizIndex={quizIndex}
                    setQuizIndex={setQuizIndex}
                    teamChangeLoading={teamChangeLoading}
                    changeTeamTurn={changeTeamTurn}
                    setIsGameEnd={setIsGameEnd}
                    plusScore={plusScore}
                    changeTeamIndex={changeTeamIndex}
                    plusQuizIndex={plusQuizIndex}
                  />
                ) : null}
                {gameCategory === 102 ? (
                  <G102
                    gameLoading={gameLoading}
                    maxTime={maxTime}
                    setTime={setTime}
                    time={time}
                    maxRound={maxRound}
                    setRound={setRound}
                    round={round}
                    session={session}
                    setGameLoading={setGameLoading}
                    ATeamScore={ATeamScore}
                    BTeamScore={BTeamScore}
                    isGameEnd={isGameEnd}
                    goWaitRoom={goWaitRoom}
                    turnPlayerId={turnPlayerId}
                    myConnectionId={myConnectionId}
                    myUserName={myUserName}
                    myTeam={myTeam}
                    quizData={quizData}
                    quizIndex={quizIndex}
                    setQuizIndex={setQuizIndex}
                    teamChangeLoading={teamChangeLoading}
                    changeTeamTurn={changeTeamTurn}
                    setIsGameEnd={setIsGameEnd}
                    plusScore={plusScore}
                    changeTeamIndex={changeTeamIndex}
                    plusQuizIndex={plusQuizIndex}
                    isItem={isMeme}
                  />
                ) : null}
                {/* <button onClick={sendPlayDone}>playDone</button> */}

                {turnPlayerId !== undefined ? (
                  <Chat
                    myUserName={myUserName}
                    session={session}
                    myConnectionId={myConnectionId}
                    gamePlayer={turnPlayerId[0]}
                    gameCategory={gameCategory}
                    quizIndex={quizIndex}
                    myTeam={myTeam}
                    Team={turnPlayerId[2]}
                    setQuizIndex={setQuizIndex}
                    changeTeamIndex={changeTeamIndex}
                    answer={quizData[quizIndex].quizAnswer}
                    plusScore={plusScore}
                  />
                ) : null}
              </section>
            </article>
            <section className="grid grid-rows-4 gap-2 ml-2">
              {BTeamStreamManagers.map((sub, i) => (
                <>
                  {myConnectionId === sub[0] ? (
                    <div key={sub[0]} className="cam bg-tab10">
                      <UserVideoComponent
                        streamManager={sub[1]}
                        session={session}
                        gamePlayer={turnPlayerId[0]}
                        gameCategory={gameCategory}
                      />
                    </div>
                  ) : (
                    <div key={sub[0]} className="cam bg-tab12">
                      <UserVideoComponent
                        streamManager={sub[1]}
                        session={session}
                        gamePlayer={turnPlayerId[0]}
                        gameCategory={gameCategory}
                      />
                    </div>
                  )}
                </>
              ))}
            </section>
          </div>
          {!isEnded?<button onClick={()=>itemUse(myTeam)}>bombs</button>:null}
        </main>
      )}
    </>
  );
};

export default Game;
