import React, { useEffect, useState } from "react";
import useLobbyApiCall from "../../api/useLobbyApiCall";
import "../lobbyComponent/RankingLists.css";
import goldmedal from "../../asset/image/goldmedal.png";
import silvermedal from "../../asset/image/silvermedal.png";
import bronzemedal from "../../asset/image/bronzemedal.png";

const RankingLists = ({ viewGameCategoryRanking }) => {
  const { getRankPerson, getRankShout, getRankSolo } = useLobbyApiCall();
  const [rankingData, setRankingData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let data;
        switch (viewGameCategoryRanking) {
          case "101":
            data = await getRankShout(); // "고요 속의 외침" 게임 랭킹
            break;
          case "102":
            data = await getRankPerson(); // "인물 맞추기" 게임 랭킹
            break;
          case "3":
            data = await getRankSolo();
            break;
          default:
            data = await getRankSolo(); // 개인 랭킹 (예시로 사용, 실제 구현에 맞춰 조정)
            break;
        }
        console.log(data);
        setRankingData(data);
      } catch (error) {
        console.error("Error loading ranking data:", error);
      }
    };

    fetchData();
  }, [viewGameCategoryRanking]);

  // // 랭킹 데이터를 정렬하고 상위 3위와 나머지로 분리
  // let reorderedTopThree = [];
  // let rest = [];

  // if (rankingData && rankingData.length >= 3) {
  //   const topThree = rankingData.slice(0, 3);
  //   reorderedTopThree = [topThree[1], topThree[0], topThree[2]]; // 2등, 1등, 3등 순서
  //   rest = rankingData.slice(3);
  // }

  return (
    <>
      <div className="mt-1 max-h-[500px] overflow-y-auto">
        {rankingData.length > 0 &&
          rankingData.map((entry, index) => (
            <div
              key={entry.userSeq}
              className="flex justify-between items-center m-4 p-2 border rounded"
            >
              <span className="w-12 text-center">
                {index === 0 ? (
                  <img src={goldmedal} alt="Gold Medal" className="mx-auto w-6" />
                ) : index === 1 ? (
                  <img src={silvermedal} alt="Silver Medal" className="mx-auto w-6" />
                ) : index === 2 ? (
                  <img src={bronzemedal} alt="Bronze Medal" className="mx-auto w-6" />
                ) : (
                  `${index + 1}위`
                )}
              </span>
              <span className="flex-grow text-center">
                {viewGameCategoryRanking === "101" || viewGameCategoryRanking === "102"
                  ? `${entry.user1}, ${entry.user2}, ${entry.user3}, ${entry.user4}`
                  : `${entry.userNickname}`}
              </span>
              <span className="w-24 text-right pr-2">{entry.score || entry.rating}</span>
            </div>
          ))}
      </div>
    </>
  );
};

export default RankingLists;
