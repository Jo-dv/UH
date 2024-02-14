import UseIsLobbyStore from "../../store/UseIsLobbyStore";
import HomeIcon from "@mui/icons-material/Home";
import useClick from "../../hooks/useClick";
const HomeTab = () => {
  const { setIsLobby } = UseIsLobbyStore();
  const { playClick } = useClick();
  return (
    <button
      className="py-2 px-5 text-xl text-center rounded-t-lg bg-tab13 transform origin-bottom transition duration-200 hover:scale-y-125"
      onClick={() => {
        setIsLobby(null);
        playClick();
      }}
    >
      <HomeIcon color="disabled" />
    </button>
  );
};
export default HomeTab;
