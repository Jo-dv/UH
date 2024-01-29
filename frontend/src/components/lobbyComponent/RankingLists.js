import { useEffect, useState } from "react";
import RankingList from "./RankingList";
import useLobbyApiCall from "../../api/useLobbyApiCall";

const RankingLists = () => {
  const [rankingList, setRankingList] = useState([]);
  const { getRankAllList, getRankPerson, getRankShout, getRankSolo } = useLobbyApiCall();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const data = await getRankAllList();
  //     setRankingList(data);
  //   };
  //   fetchData();
  // }, [getRankAllList]);

  return (
    <>
      <div className="">
        <div className="flex flex-wrap-reverse justify-center mt-20">
          <div className="h-28 m-4 w-38 p-14 border rounded-3xl bg-formButton">2</div>
          <div className="h-44 m-4 w-38 p-14 border rounded-3xl bg-formButton">1</div>
          <div className="h-16 m-4 w-38 p-14 border rounded-3xl bg-formButton">3</div>
        </div>
        <div>
          <RankingList />
        </div>
      </div>
    </>
  );
};
export default RankingLists;
