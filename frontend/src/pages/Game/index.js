import { useEffect, useRef, useState } from "react";
import Chat from "../../components/Chat";
import "./Game.css";
import Timer from "./Timer";
import { getRoomInfo } from "../../api/waitRoom";
import UserVideoComponent from "../RoomId/UserVideoComponent";

const Game = ({ publisher, subscribers, session, myUserName }) => {
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
        publisher,
        subscribers,
        session,
        myUserName
      );
      const players = roomData.roomStatus.players;
      const myTeam = roomData.roomStatus.players[myConnectionId].team; //A or B
      // console.log(players);
      // console.log(myTeam);

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
          // console.log("팀멤버 각각", member);
          if (member === sub.stream.connection.connectionId) {
            // console.log("팀맴버 찾음", member);
            myTeamStreamMagersCNT.push(sub);
          } else {
            // console.log("팀맴버 아님", member);
            otherTeamStreamMagersCNT.push(sub);
          }
        }
      }
      // console.log(myTeamStreamMagersCNT);
      // console.log(otherTeamStreamMagersCNT);
      setMyTeamStreamMagers(myTeamStreamMagersCNT);
      setOtherTeamStreamMagers(otherTeamStreamMagersCNT);
    };
    callData();
  }, []);
  // console.log("state myTeamStreamMagers", myTeamStreamMagers);
  // console.log("state myTeamStreamMagers", otherTeamStreamMagers);
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
        <section className="grow" grid grid-rows-2>
          <div className="w-full bg-black">
            게임이미지
            <Timer maxT={maxTime} />
          </div>
          <form className="relative">
            <input type="text" placeholder="정답을 입력해 주세요" className="" />
          </form>
          <Chat myUserName={myUserName} session={session} />
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
