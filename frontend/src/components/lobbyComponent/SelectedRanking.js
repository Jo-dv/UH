import { useState } from "react";
import GameScrollSelector from "./GameScrollSelector";
import RankingLists from "./RankingLists";

const SelectedRanking = ({ onGameCategoryView }) => {
  const extraOptions = [{ value: "3", label: "개인 랭킹" }];

  // [RankingList] 게임별 랭킹 보기
  const [viewGameCategorRanking, setViewGameCategoryRanking] = useState(0);

  // [GameRoomSearchPanel] 게임별 방 보기
  const handleGameCategoryView = (viewAll) => {
    setViewGameCategoryRanking(viewAll);
  };

  console.log(viewGameCategorRanking);
  return (
    <div className="col-start-2 col-end-7 row-start-1 row-end-13 m-5">
      <div className="col-start-2 col-end-7 row-start-1 row-end-2">
        <GameScrollSelector extraOptions={extraOptions} onGameCategory={handleGameCategoryView} />
      </div>
      <div className="col-start-2 col-end-7 row-start-2 row-end-13">
        <RankingLists viewGameCategorRanking={viewGameCategorRanking} />
      </div>
    </div>
  );
};

export default SelectedRanking;
