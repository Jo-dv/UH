import { useEffect, useState } from "react";
import RankingList from "./RankingList";
import useLobbyApiCall from "../../api/useLobbyApiCall";
import '../lobbyComponent/RankingLists.css';

const RankingLists = ({ viewGameCategorRanking }) => {
  const { getRankAllList, getRankPerson, getRankShout, getRankSolo } = useLobbyApiCall();
  const [allRank, setAllRank] = useState([]);
  const [personRank, setPersonRank] = useState([]);
  const [shoutRank, setShoutRank] = useState([]);
  const [soloRank, setSoloRank] = useState([]);

  // api data 비동기로 받아오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getRankAllList();
        setAllRank(data);
      } catch (error) {
        console.error("Error AllRank data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getRankPerson();
        setPersonRank(data);
      } catch (error) {
        console.error("Error AllRank data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getRankShout();
        setShoutRank(data);
      } catch (error) {
        console.error("Error AllRank data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getRankSolo();
        setSoloRank(data);
      } catch (error) {
        console.error("Error AllRank data:", error);
      }
    };
    fetchData();
  }, []);
  let rankingData;
  switch (viewGameCategorRanking) {
    case "1":
      rankingData = shoutRank;
      break;
    case "2":
      rankingData = personRank;
      break;
    case "3":
      rankingData = soloRank;
      break;
    default:
      rankingData = allRank;
  }
  let reorderedTopThree = [];
  let rest = [];

  if (rankingData.length >= 3) {
    const topThree = rankingData.slice(0, 3);
    reorderedTopThree = [topThree[1], topThree[0], topThree[2]];
    rest = rankingData.slice(3);
  }

  return (
    <>
      <div className="ranking-container relative">
        {/* 포디움들을 포함하는 div */}
        <div className="flex justify-center mt-20">
          {reorderedTopThree.map((user, index) => (
            <div key={user.userSeq} className={`podium absolute bottom-0 m-4 w-38 border rounded-3xl ${index === 1 ? 'h-44 top-0' : (index === 0 ? 'h-36 top-8' : 'h-28 top-16')}`}>
              <div className="user-info">
                <div>{user.userNickname || '익명'}</div>
                <div>{user.rating}</div>
              </div>
              <div className={`position bg-formButton p-14`}>{index === 1 ? 1 : (index === 0 ? 2 : 3)}</div>
            </div>
          ))}
        </div>
        {/* 나머지 랭킹 리스트 */}
        {rest.length > 0 && <div className="mt-48"><RankingList rankingList={rest} /></div>}
      </div>
    </>
  );
};

export default RankingLists;
