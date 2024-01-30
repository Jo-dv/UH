import { useEffect, useRef, useState } from "react";
import Chat from "../../components/Chat";
import "./Game.css";
import Timer from "./Timer";
import { getRoomInfo } from "../../api/waitRoom";
import UserVideoComponent from "../RoomId/UserVideoComponent";

const Game = ({ publisher, subscribers, session, myUserName, quiz }) => {
  let maxTime = 10000;
  const myConnectionId = session.connection.connectionId;
  const [myTeamStreamMagers, setMyTeamStreamMagers] = useState([]);
  const [otherTeamStreamMagers, setOtherTeamStreamMagers] = useState([]);

  useEffect(() => {
    const callData = async () => {
      const roomData = await getRoomInfo(session.sessionId);
      console.log(
        "게임 데이터 : ",
        myConnectionId,
        roomData,
        // publisher,
        // subscribers,
        session,
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
    <main className="bg-neutral-200 p-2 mx-2 h-screen-80 border rounded-3xl">
      <div className="flex flex-row justify-center">
        <section className="cam grid grid-rows-4">
          <div className="bg-teal-500 p-1 relative">
            <span>{publisher.id}</span>
            <UserVideoComponent streamManager={publisher} session={session} />
          </div>
          {myTeamStreamMagers.map((sub, i) => (
            <div key={sub.id} className="bg-teal-500 p-1 relative">
              <span>{sub.id}</span>
              <UserVideoComponent streamManager={sub} session={session} />
            </div>
          ))}
        </section>
        <section className="grow">
          <div className="w-full bg-black">게임이미지</div>
          <Timer maxT={maxTime} />
          <form className="relative">
            <input type="text" placeholder="정답을 입력해 주세요" className="" />
          </form>
          <div className="h-64">
            <Chat myUserName={myUserName} session={session} />
          </div>
        </section>
        <section className="cam grid grid-rows-4">
          {otherTeamStreamMagers.map((sub, i) => (
            <div key={sub.id} className="bg-teal-500 p-1">
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

/*
meter {
    appearance: auto;
    box-sizing: border-box;
    display: inline-block;
    block-size: 1em;
    inline-size: 5em;
    vertical-align: -0.2em;
    -webkit-user-modify: read-only !important;
}
*/
