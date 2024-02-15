const ScoreTable = ({ ATeamScore, BTeamScore, round, gameCategory }) => {
  return (
    <div className="w-full flex justify-around items-center h-10 bg-tab10 rounded-t-[17px]">
      <p
        className={
          ATeamScore > BTeamScore ? "text-4xl text-tab1 font-bold" : "text-2xl font-semibold"
        }
      >
        A : {ATeamScore}
      </p>
      {gameCategory === 101 ? <p className="text-4xl">Round {round}</p> : null}

      <p
        className={
          ATeamScore < BTeamScore ? "text-4xl text-tab12 font-bold" : "text-2xl font-semibold"
        }
      >
        B : {BTeamScore}
      </p>
    </div>
  );
};

export default ScoreTable;
