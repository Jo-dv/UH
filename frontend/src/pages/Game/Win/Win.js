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
        <div className="w-full h-full flex flex-col justify-center items-center bg-tab1">
          <p className="text-9xl font-['Beatster'] animate-wiggle animate-infinite">A Team Win</p>
          <button
            onClick={goWaitRoom}
            className="z-30 text-xl bg-tab10 p-3 rounded-3xl animate-bounce"
          >
            대기방으로 돌아가기
          </button>
        </div>
      ) : (
        <>
          {ATeamScore === BTeamScore ? (
            <div className="w-full h-full flex flex-col justify-center items-center">
              {/* <p className="text-3xl animate-jump-out animate-delay-500">무승부</p> */}

              {rand01 > 0 ? (
                <div>
                  <p className="text-center text-9xl font-['round-extrabold'] animate-wiggle animate-infinite">
                    A팀 승리!
                    </p>
                    {ATeamScore}
                    {BTeamScore}
                </div>
              ) : (
                <p className="text-center text-9xl font-['round-extrabold'] animate-wiggle animate-infinite">
                  B팀 승리!
                </p>
              )}

              <button
                onClick={goWaitRoom}
                className="z-30 text-xl bg-tab10 p-3 rounded-3xl animate-bounce"
              >
                대기방으로 돌아가기
              </button>
            </div>
          ) : (
            <div className="w-full h-full flex flex-col justify-center items-center bg-tab2">
              <p className="text-9xl font-['Beatster'] animate-wiggle animate-infinite">
                B Team Win
              </p>
              <button
                onClick={goWaitRoom}
                className="z-30 text-xl bg-tab10 p-3 rounded-3xl animate-bounce"
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
