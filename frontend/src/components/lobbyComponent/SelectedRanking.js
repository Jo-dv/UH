import { useState } from "react";
import GameScrollSelector from "./GameScrollSelector";
import RankingLists from "./RankingLists";

const SelectedRanking = ({ onGameCategoryView }) => {
  // 컴포넌트 로비에서 사용 시, 개인랭킹이 뜨지 않도록 따로 관리
  const extraOptions = [{ value: "3", label: "개인 랭킹" }];

  // [RankingList] 게임별 랭킹 보기
  const [viewGameCategoryRanking, setViewGameCategoryRanking] = useState(3);

  // [GameRoomSearchPanel] 게임별 방 보기
  const handleGameCategoryView = (viewAll) => {
    setViewGameCategoryRanking(viewAll);
  };

  console.log(viewGameCategoryRanking);
  return (
    <div className="col-start-4 col-end-13 row-start-1 row-end-13 m-5">
      <div className="col-start-2 col-end-7 row-start-1 row-end-2">
        <GameScrollSelector
          extraOptions={extraOptions}
          onGameCategory={handleGameCategoryView}
          showAllOption={false}
        />
      </div>
      <div className="col-start-2 col-end-7 row-start-2 row-end-13 z-40">
        <RankingLists viewGameCategoryRanking={viewGameCategoryRanking} />
      </div>
    </div>
  );
};

export default SelectedRanking;
