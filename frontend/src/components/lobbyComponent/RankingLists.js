import React, { useEffect, useState } from "react";
import useLobbyApiCall from "../../api/useLobbyApiCall";
import "../lobbyComponent/RankingLists.css";

const RankingLists = ({ viewGameCategoryRanking }) => {
  const { getRankPerson, getRankShout, getRankSolo } = useLobbyApiCall();
  const [rankingData, setRankingData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let data;
        switch (viewGameCategoryRanking) {
          case "1":
            data = await getRankShout(); // "고요 속의 외침" 게임 랭킹
            break;
          case "2":
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

  // 랭킹 데이터를 정렬하고 상위 3위와 나머지로 분리
  let reorderedTopThree = [];
  let rest = [];

  if (rankingData && rankingData.length >= 3) {
    const topThree = rankingData.slice(0, 3);
    reorderedTopThree = [topThree[1], topThree[0], topThree[2]]; // 2등, 1등, 3등 순서
    rest = rankingData.slice(3);
  }

  return (
    <>
      <div className="ranking-container relative flex-col mt-3">
        <div className="flex justify-center items-end relative">
          {/* 2등 포디움 */}
          {reorderedTopThree[0] && (
            <div>
              <div className="text-center mt-2">
                {viewGameCategoryRanking === "1" || viewGameCategoryRanking === "2" ? (
                  <>
                    <p>{reorderedTopThree[0].user1}</p>
                    <p>{reorderedTopThree[0].user2}</p>
                    <p>{reorderedTopThree[0].user3}</p>
                    <p>{reorderedTopThree[0].user4}</p>
                  </>
                ) : (
                  <p>{reorderedTopThree[0].userNickname}</p>
                )}
                <div>{reorderedTopThree[0].score || reorderedTopThree[0].rating}</div>
              </div>
              <div className="m-4 w-32 border rounded-3xl h-24 bg-formButton flex flex-col items-center justify-center">
                <div className="text-white text-2xl">2</div>
              </div>
            </div>
          )}

          {/* 1등 포디움 */}
          {reorderedTopThree[1] && (
            <div>
              <div className="text-center mt-2">
                {viewGameCategoryRanking === "1" || viewGameCategoryRanking === "2" ? (
                  <>
                    <p>{reorderedTopThree[1].user1}</p>
                    <p>{reorderedTopThree[1].user2}</p>
                    <p>{reorderedTopThree[1].user3}</p>
                    <p>{reorderedTopThree[1].user4}</p>
                  </>
                ) : (
                  <p>{reorderedTopThree[1].userNickname}</p>
                )}
                <div>{reorderedTopThree[1].score || reorderedTopThree[1].rating}</div>
              </div>
              <div className="m-4 w-32 border rounded-3xl h-32 bg-formButton flex flex-col items-center justify-center">
                <div className="text-white text-2xl">1</div>
              </div>
            </div>
          )}

          {/* 3등 포디움 */}
          {reorderedTopThree[2] && (
            <div>
              <div className="text-center mt-2">
                {viewGameCategoryRanking === "1" || viewGameCategoryRanking === "2" ? (
                  <>
                    <p>{reorderedTopThree[2].user1}</p>
                    <p>{reorderedTopThree[2].user2}</p>
                    <p>{reorderedTopThree[2].user3}</p>
                    <p>{reorderedTopThree[2].user4}</p>
                  </>
                ) : (
                  <p>{reorderedTopThree[2].userNickname}</p>
                )}
                <div>{reorderedTopThree[2].score || reorderedTopThree[2].rating}</div>
              </div>
              <div className="m-4 w-32 border rounded-3xl h-16 bg-formButton flex flex-col items-center justify-center">
                <div className="text-white text-2xl">3</div>
              </div>
            </div>
          )}
        </div>
        {/* 나머지 랭킹 리스트 구역 */}
        <div className="ranking-list-container mt-1">
          {rest.length > 0 &&
            rest.map((entry, index) => (
              <div
                key={entry.userSeq}
                className="flex justify-between items-center m-1 p-2 border rounded-md"
              >
                <span className="flex-2 text-center mx-4">{index + 4} 위</span>
                <span className="flex-2 text-center mx-4">
                  {viewGameCategoryRanking === "1" || viewGameCategoryRanking === "2"
                    ? `${entry.user1}, ${entry.user2}, ${entry.user3}, ${entry.user4}`
                    : `${entry.userNickname}`}
                </span>
                <span className="flex-1 text-center mx-4">{entry.score || entry.rating}</span>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default RankingLists;
