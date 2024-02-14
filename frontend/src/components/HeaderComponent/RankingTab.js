import UseIsLobbyStore from "../../store/UseIsLobbyStore";
import useClick from "../../hooks/useClick";
const RankingTab = () => {
  const { setIsLobby } = UseIsLobbyStore();
  const { playClick } = useClick();
  return (
    <button
      className="py-2 px-5 text-xl text-center rounded-t-lg bg-tab3 transform origin-bottom transition duration-200 hover:scale-y-125"
      onClick={() => {
        setIsLobby("SelectedRanking");
        playClick();
      }}
    >
      랭킹
    </button>
  );
};
export default RankingTab;
