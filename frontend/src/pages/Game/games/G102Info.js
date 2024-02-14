import { useEffect, useRef, useState } from "react";

const G102Info = ({ maxTime, maxRound, setGameLoading, session }) => {
  const sendGameStart = (e) => {
    e.preventDefault();
    session
      .signal({
        data: "Game Start", // Any string (optional)
        to: [], // Array of Connection objects (optional. Broadcast to everyone if empty)
        type: "game-GameStart", // The type of message (optional)
      })
      .then(() => {
        // console.log("정답제출 보냄 :", answerMsg);
        // setAnswerMsg("");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  session.on("signal:game-GameStart", (event) => {
    setGameLoading(false);
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let timer = setTimeout(() => {
      setIsLoading(false);
    }, 2999);

    return () => {
      clearTimeout(timer);
    };
  }, []);
  return (
    <div className="z-10 text-xl">
      <br />
      <p className="text-3xl font-[round-extrabold]">인물 맞추기</p>
      <br />
      <br /> 제한 시간 동안 많은 문제를 맞춘 팀이 승리합니다.
      <br />
      <br /> 사진을 보고 인물을 맞추면 됩니다
      <br />
      <br />
      <br /> 팀당 {maxTime / 1000}초 동안 진행합니다.
      <br /> 총 {maxRound}라운드 진행합니다.
      <br />
      <div className="animate-fade animate-delay-[3000ms] flex justify-center">
        {isLoading ? (
          <p>loading...</p>
        ) : (
          <div className="animate-bounce ">
            <div
              className="bg-orange-800 hover:bg-orange-800 shadow-xl py-2 px-4 rounded-3xl text-3xl font-[round-extrabold] z-30 mt-20"
              style={{ width: "300px", height: "70px" }}
            >
              <button
                onClick={sendGameStart}
                className="bg-tab2 hover:bg-tab7 shadow-inner py-2 px-4 rounded-3xl text-4xl font-[round-extrabold] z-31 -ml-5 -mt-5"
                style={{ width: "300px", height: "70px" }}
              >
                <p className="text-white font-[button]">Game Start</p>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default G102Info;
