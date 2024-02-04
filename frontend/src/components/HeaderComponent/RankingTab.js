import UseIsLobbyStore from "../../store/UseIsLobbyStore";

const RankingTab = () => {
  const { setIsLobby } = UseIsLobbyStore();

  return (
    <h3
      className="w-16 text-center rounded-t-lg bg-tab3 p-2 transform origin-bottom transition duration-200 hover:scale-y-125"
      onClick={() => {
        setIsLobby("SelectedRanking");
      }}
    >
      랭킹
    </h3>
  );
};
export default RankingTab;
