const Win = ({ ATeamScore, BTeamScore, goWaitRoom, rand01 }) => {
  // const random
  return (
    <>
      {ATeamScore > BTeamScore ? (
        <div className="w-full h-full flex flex-col justify-center items-center bg-tab1">
          {/* <p className="absolute text-9xl font-['Beatster'] animate-jump-out animate-delay-500">
            {ATeamScore} : {BTeamScore}
          </p> */}
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
                <p className="text-9xl font-['Beatster'] animate-wiggle animate-infinite">
                  A Team Win
                </p>
              ) : (
                <p className="text-9xl font-['Beatster'] animate-wiggle animate-infinite">
                  B Team Win
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
            <div className="w-full h-full flex flex-col justify-center items-center bg-tab2 animate-fade-left">
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
    </>
  );
};

export default Win;
