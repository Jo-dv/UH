import { useEffect, useRef, useState } from "react";
import chipi from "../../../asset/image/chipi.gif";
import stop from "../../../asset/image/stop.gif";
import talk from "../../../asset/image/talk.gif";

const G101Info = ({ maxTime, maxRound, setGameLoading, session }) => {
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

  // 키보드 인식
  // const [isChipiPressed, setIsChipiPressed] = useState(false);
  // const [isStopPressed, setIsStopPressed] = useState(false);
  // const [isTalkPressed, setIsTalkPressed] = useState(false);

  // useEffect(() => {
  //   const handleKeyPress = (event) => {
  //     if (event.key === ",") {
  //       setIsChipiPressed(true);
  //       setTimeout(() => setIsChipiPressed(false), 200); // 200ms 후에 버튼 색을 원래대로 돌립니다.
  //     } else if (event.key === ".") {
  //       setIsStopPressed(true);
  //       setTimeout(() => setIsStopPressed(false), 200); // 200ms 후에 버튼 색을 원래대로 돌립니다.
  //     }
  //     else if (event.key === "/") {
  //       setIsTalkPressed(true);
  //       setTimeout(() => setIsTalkPressed(false), 200); // 200ms 후에 버튼 색을 원래대로 돌립니다.
  //     }
  //   };

  //   window.addEventListener("keydown", handleKeyPress);

  //   return () => {
  //     window.removeEventListener("keydown", handleKeyPress);
  //   };
  // }, []);

  return (
    <div className="relative ml-3 z-10 text-xl mt-5 leading-7">
      <p className="text-3xl font-[round-extrabold]">고요 속의 외침</p>
      <br/> 팀에서 한명이 발화자로 지정이 되며,
      <span className="text-red-600"> 발화자는 마이크가 꺼지고, 채팅을 칠 수 없습니다.</span>
      <br /> 다른 팀원이 발화자의 <span className="text-red-600">제시어를 맞추면 </span>점수를 획득하고 <span className="text-red-600">발화자가 변경</span> 됩니다.
      <br />
      <br /> 팀당 {maxTime / 1000}초 동안 총 {maxRound}라운드 진행합니다.
      <br />

      <div className="absolute top-52 bg-white p-1 rounded-3xl border-slate-500 inline-block mt-[-15px] flex justify-center mx-auto w-full">
        <div className="text-center text-lg">
          {/* <h1 className="text-2xl font-[round-bold] mt-1 mb-2">아이템</h1> */}
          <div>
            <div className="flex items-center space-x-4">
              <img src={chipi} alt="chipi" className="rounded-full w-11 h-11" />
              <p>상대팀의 화면을 가립니다</p>
              {/* <button
                className={`transition duration-200 ease-in-out text-white font-bold py-2 px-4 rounded ${
                  isChipiPressed ? "bg-green-500" : "bg-mc3"
                }`}
                type="button"
              >
                ,
              </button> */}
            </div>
            <div className="flex items-center space-x-4">
              <img src={stop} alt="stop" className="rounded-full w-11 h-11" />
              <p>상대팀의 채팅창이 사라집니다</p>
              {/* <button
                className={`transition duration-200 ease-in-out text-white font-bold py-2 px-4 rounded ${
                  isStopPressed ? "bg-green-500" : "bg-mc3"
                }`}
                type="button"
              >
                .
              </button> */}
            </div>
            <div className="flex items-center space-x-4">
              <img src={talk} alt="talk" className="rounded-full w-11 h-11" />
              <p>우리팀 발화자의 음성을 인식하여 자막으로 나타냅니다</p>
              {/* <button
                className={`transition duration-200 ease-in-out text-white font-bold py-2 px-4 rounded ${
                  isTalkPressed ? "bg-green-500" : "bg-mc3"
                }`}
                type="button"
              >
                /
              </button> */}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-32 h-20 animate-fade animate-delay-[3000ms] flex justify-center">
        {isLoading ? (
          <p>loading...</p>
        ) : (
          <div className="animate-bounce ">
            <div
              className="bg-orange-800 hover:bg-orange-800 shadow-xl py-2 px-4 rounded-3xl text-3xl font-[round-extrabold] z-11 mt-20"
              style={{ width: "300px", height: "70px" }}
            >
              <button
                onClick={sendGameStart}
                className="bg-tab2 hover:bg-tab7 shadow-inner py-2 px-4 rounded-3xl text-4xl font-[round-extrabold] z-12 -ml-5 -mt-5"
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
export default G101Info;
