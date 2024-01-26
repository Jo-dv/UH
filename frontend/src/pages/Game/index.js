import { useEffect, useRef, useState } from "react";
import Chat from "../../components/Chat";
import "./Game.css";
const Game = () => {
  const [time, setTime] = useState(0);
  let maxTime = 30000;

  const [count, setCount] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount === maxTime) {
          clearInterval(intervalRef.current); // 카운트가 1이면 타이머 정지
        }
        return prevCount + 10;
      });
    }, 10);

    return () => clearInterval(intervalRef.current); // 컴포넌트가 언마운트될 때 타이머 정리
  }, []);

  return (
    <main className="bg-neutral-200 p-2 m-2 h-screen-16 border rounded-3xl">
      <div className="grid grid-cols-4 gap-2">
        <section className="col-span-1">같은팀 카메라</section>
        <section className="col-span-2">
          <div className="w-full bg-black">게임이미지</div>
          <form className="relative">
            <meter
              min="0"
              max={maxTime}
              optimum={maxTime / 4}
              low={maxTime / 2}
              high={(maxTime * 3) / 4}
              value={count}
            ></meter>
            <input
              type="text"
              placeholder="정답을 입력해 주세요"
              className=""
            />
          </form>
          {/* <Chat myUserName={myUserName} session={this.state.session} /> */}
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
