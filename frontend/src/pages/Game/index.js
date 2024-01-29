import { useEffect, useRef, useState } from "react";
import Chat from "../../components/Chat";
import "./Game.css";
import Timer from "./Timer";
import { useLocation } from "react-router-dom";

const Game = () => {
  let maxTime = 10000;
  const location = useLocation();
  const RoomInfo = { ...location.state };

  return (
    <main className="bg-neutral-200 p-2 m-2 h-screen-16 border rounded-3xl">
      <div className="grid grid-cols-4 gap-2">
        <section className="col-span-1">같은팀 카메라</section>
        <section className="col-span-2">
          <div className="w-full bg-black">게임이미지</div>
          <Timer maxT={maxTime} />
          <form className="relative">
            <input type="text" placeholder="정답을 입력해 주세요" className="" />
          </form>
          <Chat myUserName={RoomInfo.myUserName} session={RoomInfo.session} />
        </section>
        <section className="col-span-1">적팀 카메라</section>
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
