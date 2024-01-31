import { useEffect, useRef, useState } from "react";
import Chat from "../../components/Chat";
import "./Game.css";
import Timer from "./Timer";
import { getRoomInfo } from "../../api/waitRoom";
import UserVideoComponent from "../RoomId/UserVideoComponent";
import AnswerInput from "./AnswerInput";

const Game = ({ publisher, subscribers, session, myUserName, quiz, sendPlayDone }) => {
  let maxTime = 60000;
  const myConnectionId = session.connection.connectionId;
  const [myTeamStreamMagers, setMyTeamStreamMagers] = useState([]);
  const [otherTeamStreamMagers, setOtherTeamStreamMagers] = useState([]);
  const [thisTeamTurn, setThisTeamTurn] = useState("");
  const [thisPlayerTurn, setThisPlayerTurn] = useState(undefined);

  useEffect(() => {
    const callData = async () => {
      const roomData = await getRoomInfo(session.sessionId);
      console.log(
        "게임 데이터 : ",
        myConnectionId,
        roomData,
        // publisher,
        // subscribers,
        // session,
        quiz
        // myUserName
      );

      const players = roomData.roomStatus.players;
      const myTeam = roomData.roomStatus.players[myConnectionId].team; //A or B

      const myTeamMember = [];
      for (const key in players) {
        if (players[key].team === myTeam && key !== myConnectionId) {
          myTeamMember.push(key);
        }
      }
      console.log("팀맴버", myTeamMember);

      const myTeamStreamMagersCNT = [];
      const otherTeamStreamMagersCNT = [];
      for (const sub of subscribers) {
        for (const member of myTeamMember) {
          if (member === sub.stream.connection.connectionId) {
            myTeamStreamMagersCNT.push(sub);
          } else {
            otherTeamStreamMagersCNT.push(sub);
          }
        }
      }
      setMyTeamStreamMagers(myTeamStreamMagersCNT);
      setOtherTeamStreamMagers(otherTeamStreamMagersCNT);
    };
    callData();
  }, []);

  const answer = "정답임";

  return (
    <main className="bg-neutral-200 p-2 mx-2 mb-2  h-screen-80 border rounded-3xl">
      <div className="flex flex-row justify-center h-full">
        <section className="cam grid grid-rows-4 gap-1">
          <div className="bg-mc6 p-1 overflow-hidden">
            <span>{publisher.id}</span>
            <UserVideoComponent streamManager={publisher} session={session} />
          </div>
          {myTeamStreamMagers.map((sub, i) => (
            <div key={sub.id} className="bg-mc8 p-1 overflow-hidden">
              <span>{sub.id}</span>
              <UserVideoComponent streamManager={sub} session={session} />
            </div>
          ))}
        </section>
        <section className="grow h-full">
          <div className="gameBox relative flex flex-col justify-end">
            <div className="w-full h-full bg-black text-white absolute">
              고요 속의 외침
              <br />
              <br /> 제한 시간 동안 많은 문제를 맞춘 팀이 승리합니다.
              <br />
              <br /> 팀에서 한명이 발화자로 지정이 되며, 발화자는 마이크가 꺼지고, 채팅을 칠 수
              없습니다.
              <br /> 다른 팀원이 발화자의 제시어를 맞추면 점수를 획득하고 발화자가 변경 됩니다.
              <br /> 팀당 {maxTime / 1000}초 동안 진행합니다.
              <br />
            </div>
            <div className=" opacity-90">
              <div className="relative flex justify-center items-center">
                <Timer maxT={maxTime} />
                <div className="absolute">
                  {/* <input type="text" placeholder="정답을 입력해 주세요" className="" /> */}
                  <AnswerInput myUserName={myUserName} session={session} answer={answer} />
                  {/* <button onClick={sendPlayDone}>playDone</button> */}
                </div>
              </div>
            </div>
          </div>

          <div className="h-64">
            <Chat myUserName={myUserName} session={session} />
          </div>
        </section>
        <section className="cam grid grid-rows-4 gap-1">
          {otherTeamStreamMagers.map((sub, i) => (
            <div key={sub.id} className="bg-mc1 p-1 overflow-hidden">
              <span>{sub.id}</span>
              <UserVideoComponent streamManager={sub} session={session} />
            </div>
          ))}
        </section>
      </div>
    </main>
  );
};

export default Game;
