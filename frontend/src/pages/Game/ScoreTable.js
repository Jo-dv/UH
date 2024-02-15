const ScoreTable = ({ ATeamScore, BTeamScore, round, gameCategory }) => {
  return (
    <div className="w-full flex justify-around items-center h-10 bg-tab10 rounded-t-[17px]">
      <div className="w-full h-[50px] flex items-center bg-tab10 rounded-t-[17px]">
        <div className="flex-1 flex justify-center">
          <p
            className={
              ATeamScore > BTeamScore ? "text-4xl text-tab1 font-bold" : "text-2xl font-semibold"
            }
          >
            A : {ATeamScore}
          </p>
        </div>
        {/* 중앙 텍스트는 flex 아이템으로 분리되어 항상 가운데에 위치합니다. */}
        <p className="text-4xl font-[round-extrabold] flex-shrink-0">Round {round}</p>
        <div className="flex-1 flex justify-center">
          <p
            className={
              ATeamScore < BTeamScore ? "text-4xl text-tab12 font-bold" : "text-2xl font-semibold"
            }
          >
            B : {BTeamScore}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ScoreTable;
