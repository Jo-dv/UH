// Manual.js
import React from "react";

const Manual = ({ viewGameCategoryManual }) => {
  //   const gameDescriptions = {
  //     "101": "제한 시간 동안 많은 문제를 맞춘 팀이 승리합니다. 팀에서 한명이 발화자로 지정이 되며, 발화자는 마이크가 꺼지고, 채팅을 칠 수 없습니다. 다른 팀원이 발화자의 제시어를 맞추면 점수를 획득하고 발화자가 변경 됩니다.",
  //     "102": "인물 맞추기 게임에 대한 설명입니다...",
  //   };

  //   // 선택된 게임 ID에 따라 게임 설명을 가져옵니다.
  //   const description = gameDescriptions[viewGameCategoryManual] || "게임을 선택해 주세요.";

  return (
    <div className="ml-3 mt-3">
      {viewGameCategoryManual === "101" ? (
        <div>
          <h1>고요 속의 외침</h1>
          <p>제한 시간 동안 많은 문제를 맞춘 팀이 승리합니다.</p>
          <p>
            팀에서 한명이 발화자로 지정이 되며, 발화자는 마이크가 꺼지고, 채팅을 칠 수 없습니다.
          </p>
          <p>다른 팀원이 발화자의 제시어를 맞추면 점수를 획득하고 발화자가 변경 됩니다.</p>
          <p>팀당 ?초 동안 진행합니다.</p>
          <p>총 ?라운드 진행합니다.</p>
        </div>
      ) : (
        <div>
          <h1>인물 맞추기</h1>
          <p>제한 시간 동안 많은 문제를 맞춘 팀이 승리합니다.</p>
          <p>사진을 보고 인물을 맞추면 됩니다.</p>
          <p>팀당 ?초 동안 진행합니다</p>
          <p>총 ?라운드 진행합니다.</p>
        </div>
      )}
    </div>
  );
};

export default Manual;
