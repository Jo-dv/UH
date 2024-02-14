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
    <div className="z-10">
      인물 맞추기
      <br />
      <br /> 제한 시간 동안 많은 문제를 맞춘 팀이 승리합니다.
      <br />
      <br /> 사진을 보고 인물을 맞추면 됩니다
      <br />
      <br />
      <br /> 팀당 {maxTime / 1000}초 동안 진행합니다.
      <br /> 총 {maxRound}라운드 진행합니다.
      <br />
      <div className="animate-fade animate-delay-[3000ms] ">
        {isLoading ? (
          <p>loading...</p>
        ) : (
          <button
            onClick={sendGameStart}
            className="animate-bounce
          p-4 m-4 text-3xl"
          >
            - Game Start -
          </button>
        )}
      </div>
    </div>
  );
};
export default G102Info;
