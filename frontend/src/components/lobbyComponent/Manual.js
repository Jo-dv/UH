// Manual.js
import React, { useEffect, useRef, useState } from "react";
import chipi from "../../asset/image/chipi.gif";
import stop from "../../asset/image/stop.gif";
import talk from "../../asset/image/talk.gif";
import hint from "../../asset/image/hint.gif";

const Manual = ({ viewGameCategoryManual }) => {
  //   const gameDescriptions = {
  //     "101": "제한 시간 동안 많은 문제를 맞춘 팀이 승리합니다. 팀에서 한명이 발화자로 지정이 되며, 발화자는 마이크가 꺼지고, 채팅을 칠 수 없습니다. 다른 팀원이 발화자의 제시어를 맞추면 점수를 획득하고 발화자가 변경 됩니다.",
  //     "102": "인물 맞추기 게임에 대한 설명입니다...",
  //   };

  //   // 선택된 게임 ID에 따라 게임 설명을 가져옵니다.
  //   const description = gameDescriptions[viewGameCategoryManual] || "게임을 선택해 주세요.";

  // 키보드 인식
  const [isChipiPressed, setIsChipiPressed] = useState(false);
  const [isStopPressed, setIsStopPressed] = useState(false);
  const [isTalkPressed, setIsTalkPressed] = useState(false);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === ",") {
        setIsChipiPressed(true);
        setTimeout(() => setIsChipiPressed(false), 200); // 200ms 후에 버튼 색을 원래대로 돌립니다.
      } else if (event.key === ".") {
        setIsStopPressed(true);
        setTimeout(() => setIsStopPressed(false), 200); // 200ms 후에 버튼 색을 원래대로 돌립니다.
      } else if (event.key === "/") {
        setIsTalkPressed(true);
        setTimeout(() => setIsTalkPressed(false), 200); // 200ms 후에 버튼 색을 원래대로 돌립니다.
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <div className="ml-3 mt-3">
      {viewGameCategoryManual === "101" ? (
        <div className="relative ml-3 z-10 text-xl mt-5 leading-6">
          <p className="text-3xl font-[round-extrabold]">고요 속의 외침</p>
          <br /> <p>입모양만 보고, 제시어를 맞춰보세요!</p>
          <br />
          팀에서 한명이 발화자로 지정이 되며,
          <span className="text-red-600"> 발화자는 마이크가 꺼지고, 채팅을 칠 수 없습니다.</span>
          <br /> 다른 팀원이 발화자의 <span className="text-red-600">제시어를 맞추면 </span>점수를
          획득하고 <span className="text-red-600">발화자가 변경</span> 됩니다.
          <br />
          <br /> 팀당 30초 동안, 총 4라운드 진행합니다.
          <br />
          <div className="absolute top-56 bg-white p-1 rounded-3xl border-slate-500 inline-block w-full">
            <div className="text-center text-lg">
              <div className="flex justify-between items-center mx-auto p-2 rounded-3xl border-slate-500">
                <div className="flex flex-col justify-center items-start space-y-3 w-full">
                  <h1 className="text-2xl font-bold ml-52">아이템</h1>
                  <hr className="border-gray-300 w-full" />
                  <div className="flex items-center space-x-4 ml-20">
                    <img src={chipi} alt="chipi" className="rounded-full w-11 h-11" />
                    <p className="whitespace-nowrap">상대팀의 화면을 가립니다</p>
                  </div>
                  <div className="flex items-center space-x-4 ml-20">
                    <img src={stop} alt="stop" className="rounded-full w-11 h-11" />
                    <p className="whitespace-nowrap">상대팀의 채팅창이 사라집니다</p>
                  </div>
                  <div className="flex items-center space-x-4 ml-20">
                    <img src={talk} alt="talk" className="rounded-full w-11 h-11" />
                    <p className="whitespace-nowrap">
                      우리팀 발화자의 음성을 인식하여 자막으로 나타냅니다
                    </p>
                  </div>
                </div>
                <div className="flex flex-col justify-center items-end space-y-4 w-full">
                  <h1 className="text-2xl font-bold mr-40">단축키</h1>
                  <hr className="border-gray-300 w-full mx-auto" />
                  <button
                    className={`transition duration-200 ease-in-out text-white font-bold py-2 mr-44 px-4 rounded-2xl w-10 h-10 ${
                      isChipiPressed ? "bg-tab6" : "bg-mc3"
                    }`}
                  >
                    ,
                  </button>
                  <button
                    className={`transition duration-200 ease-in-out text-white font-bold py-2 mr-44 px-4 rounded-2xl w-10 h-10 ${
                      isStopPressed ? "bg-tab6" : "bg-mc3"
                    }`}
                  >
                    .
                  </button>
                  <button
                    className={`transition duration-200 ease-in-out text-white font-bold py-2 mr-44 px-4 rounded-2xl w-10 h-11 ${
                      isTalkPressed ? "bg-tab6" : "bg-mc3"
                    }`}
                  >
                    /
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative ml-3 z-10 text-xl mt-5 leading-8">
          <p className="text-3xl font-[round-extrabold]">인물 맞추기</p>
          {/* <br /> 제한 시간 동안 많은 문제를 맞춘 팀이 승리합니다. */}
          <br /> <span className="text-red-600">사진을 보고 인물을 맞추세요!</span>
          <br /> 인물을 많이 맞추는 팀이 승리합니다.
          <br />
          <br /> 총 60초 동안 진행합니다.
          <br />
          <div className="absolute top-56 bg-white p-1 rounded-3xl border-slate-500 inline-block w-full">
            <div className="text-center text-lg">
              <div className="flex justify-between items-center mx-auto p-2 rounded-3xl border-slate-500">
                <div className="flex flex-col justify-center items-start space-y-3 w-full">
                  <h1 className="text-2xl font-bold ml-52">아이템</h1>
                  <hr className="border-gray-300 w-full" />
                  <div className="flex items-center space-x-4 ml-20">
                    <img src={chipi} alt="chipi" className="rounded-full w-11 h-11" />
                    <p className="whitespace-nowrap">상대팀의 화면을 가립니다</p>
                  </div>
                  <div className="flex items-center space-x-4 ml-20">
                    <img src={stop} alt="stop" className="rounded-full w-11 h-11" />
                    <p className="whitespace-nowrap">상대팀의 채팅창이 사라집니다</p>
                  </div>
                  <div className="flex items-center space-x-4 ml-20">
                    <img src={hint} alt="hint" className="rounded-full w-11 h-11" />
                    <p className="whitespace-nowrap">
                    우리팀에게 인물의 초성을 보여줍니다
                    </p>
                  </div>
                </div>
                <div className="flex flex-col justify-center items-end space-y-4 w-full">
                  <h1 className="text-2xl font-bold mr-40">단축키</h1>
                  <hr className="border-gray-300 w-full mx-auto" />
                  <button
                    className={`transition duration-200 ease-in-out text-white font-bold py-2 mr-44 px-4 rounded-2xl w-10 h-10 ${
                      isChipiPressed ? "bg-tab6" : "bg-mc3"
                    }`}
                  >
                    ,
                  </button>
                  <button
                    className={`transition duration-200 ease-in-out text-white font-bold py-2 mr-44 px-4 rounded-2xl w-10 h-10 ${
                      isStopPressed ? "bg-tab6" : "bg-mc3"
                    }`}
                  >
                    .
                  </button>
                  <button
                    className={`transition duration-200 ease-in-out text-white font-bold py-2 mr-44 px-4 rounded-2xl w-10 h-11 ${
                      isTalkPressed ? "bg-tab6" : "bg-mc3"
                    }`}
                  >
                    /
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Manual;
