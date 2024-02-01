// const RankingList = () => {
//   return (
//     <div className="mx-auto flex justify-center items-center flex-wrap w-3/5 m-4 p-7 border rounded-3xl bg-formButton">
//       <p className="flex-1 text-center">등수</p>
//       <p className="flex-1 text-center">닉네임</p>
//       <p className="flex-1 text-center">점수</p>
//     </div>
//   );
// };
const RankingList = ({ rankingList, viewGameCategoryRanking }) => {
  console.log("리스트: ", rankingList);

  return (
    <div>
      {rankingList.map((entry, index) => (
        <div key={entry.userSeq} className="flex justify-between items-center m-1 p-2 border rounded-md">
          <span className="flex-1 text-center">{index + 4} 위</span> {/* 등수 */}
          <span className="flex-2 text-center">{entry.userSeq}</span> {/* 닉네임 */}
          <span className="flex-1 text-center">{entry.score !== undefined ? entry.score : entry.rating}</span> {/* 레이팅 */}
        </div>
      ))}
    </div>
  );
};

export default RankingList;
