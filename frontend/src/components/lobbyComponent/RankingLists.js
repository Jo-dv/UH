import { useEffect, useState } from "react";
import RankingList from "./RankingList";
import useLobbyApiCall from "../../api/useLobbyApiCall";

const RankingLists = () => {
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

  return (
    <>
      <div className="">
        <div className="flex flex-wrap-reverse justify-center mt-20">
          <div className="h-28 m-4 w-38 p-14 border rounded-3xl bg-formButton">2</div>
          <div className="h-44 m-4 w-38 p-14 border rounded-3xl bg-formButton">1</div>
          <div className="h-16 m-4 w-38 p-14 border rounded-3xl bg-formButton">3</div>
        </div>
        <div>
          <RankingList
            allRank={allRank}
            personRank={personRank}
            shoutRank={shoutRank}
            soloRank={soloRank}
          />
        </div>
      </div>
    </>
  );
};
export default RankingLists;
