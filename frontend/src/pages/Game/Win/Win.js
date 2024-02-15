import JSConfetti from "js-confetti";
import "./Win.css";
import { useEffect } from "react";

const Win = ({ ATeamScore, BTeamScore, goWaitRoom, rand01 }) => {
  //HTML Canvas 요소를 생성하여 페이지에 추가
  const jsConfetti = new JSConfetti();

  //색종이 커스터마이징
  const handleClick = () => {
    jsConfetti.addConfetti({
      confettiColors: ["#EF476F", "#fb7185", "#F78C6B", "#FFD166", "#a8d572", "#95c75a"],
      confettiRadius: 5,
      confettiNumber: 500,
    });
  };
  useEffect(() => {
    handleClick();
  }, []);
  return (
    <div onClick={handleClick} className="w-full h-full z-30 banselect">
      {ATeamScore > BTeamScore ? (
        <div className="w-full h-full flex flex-col justify-center items-center">
          <div>
                  <p className="text-center text-9xl font-['round-extrabold'] animate-wiggle animate-infinite">
                    <span className="text-tab1">A</span>팀 승리!
                  </p>
                  <div className="mt-12 flex justify-center items-center mx-auto bg-white rounded-3xl md:p-5 w-[350px]">
                    <div className=" text-center text-tab1 font-[round-extrabold] text-3xl">
                      <p className="mb-3">A팀</p>
                      <p>{ATeamScore}</p>
                    </div>
                    <div className="w-1 mx-16 z-40 border-3 bg-gray-300 mx-4 h-24"></div>
                    <div className="text-center text-tab12 font-[round-extrabold] text-3xl">
                      <p className="mb-3">B팀</p>
                      <p>{BTeamScore}</p>
                    </div>
                  </div>
                </div>
          <button
            onClick={goWaitRoom}
            className="z-30 text-xl font-[round-bold] bg-tab10 p-3 rounded-3xl animate-bounce"
          >
            대기방으로 돌아가기
          </button>
        </div>
      ) : (
        <>
          {ATeamScore === BTeamScore ? (
            <div className="w-full h-full flex flex-col justify-center items-center">
              {/* <p className="text-gray-500">무승부 시, 랜덤으로 승리팀이 결정됩니다</p> */}
              {/* <p className="text-3xl animate-jump-out animate-delay-500">무승부</p> */}

              {rand01 > 0 ? (
                <div>
                  <p className="text-center text-9xl font-['round-extrabold'] animate-wiggle animate-infinite">
                    <span className="text-tab1">A</span>팀 승리!
                  </p>
                  <div className="mt-12 flex justify-center items-center mx-auto bg-white rounded-3xl md:p-5 w-[350px]">
                    <div className=" text-center text-tab1 font-[round-extrabold] text-3xl">
                      <p className="mb-3">A팀</p>
                      <p>{ATeamScore}</p>
                    </div>
                    <div className="w-1 mx-16 z-40 border-3 bg-gray-300 mx-4 h-24"></div>
                    <div className="text-center text-tab12 font-[round-extrabold] text-3xl">
                      <p className="mb-3">B팀</p>
                      <p>{BTeamScore}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-center text-9xl font-['round-extrabold'] animate-wiggle animate-infinite">
                    <span className="text-tab12">B</span>팀 승리!
                  </p>
                  <div className="mt-12 flex justify-center items-center mx-auto bg-white rounded-3xl md:p-5 w-[350px]">
                    <div className=" text-center text-tab1 font-[round-extrabold] text-3xl">
                      <p className="mb-3">A팀</p>
                      <p>{ATeamScore}</p>
                    </div>
                    <div className="w-1 mx-16 z-40 border-3 bg-gray-300 mx-4 h-24"></div>
                    <div className="text-center text-tab12 font-[round-extrabold] text-3xl">
                      <p className="mb-3">B팀</p>
                      <p>{BTeamScore}</p>
                    </div>
                  </div>
                </div>
              )}

              <button
                onClick={goWaitRoom}
                className="z-30 mt-16 text-xl font-[round-bold] bg-tab10 p-3 rounded-3xl animate-bounce"
              >
                대기방으로 돌아가기
              </button>
            </div>
          ) : (
            <div className="w-full h-full flex flex-col justify-center items-center">
              <div>
                <p className="text-center text-9xl font-['round-extrabold'] animate-wiggle animate-infinite">
                  <span className="text-tab12">B</span>팀 승리!
                </p>
                <div className="mt-12 flex justify-center items-center mx-auto bg-white rounded-3xl md:p-5 w-[350px]">
                  <div className=" text-center text-tab1 font-[round-extrabold] text-3xl">
                    <p className="mb-3">A팀</p>
                    <p>{ATeamScore}</p>
                  </div>
                  <div className="w-1 mx-16 z-40 border-3 bg-gray-300 mx-4 h-24"></div>
                  <div className="text-center text-tab12 font-[round-extrabold] text-3xl">
                    <p className="mb-3">B팀</p>
                    <p>{BTeamScore}</p>
                  </div>
                </div>
              </div>
              <button
                onClick={goWaitRoom}
                className="z-30 text-xl font-[round-bold] bg-tab10 p-3 rounded-3xl animate-bounce"
              >
                대기방으로 돌아가기
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Win;
