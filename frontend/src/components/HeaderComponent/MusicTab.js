import UseIsMusicPlay from "../../store/UseIsMusicPlay";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import BackgroundMusic from "../BackgroundMusic";

const MusicTab = () => {
  const { isMusicPlay, setIsMusicPlay } = UseIsMusicPlay();

  const handleToggleMusic = () => {
    setIsMusicPlay(!isMusicPlay);
    if (isMusicPlay) {
      <BackgroundMusic />;
    }
  };
  return (
    <button
      className="py-2 px-5 text-xl text-center rounded-t-lg bg-tab8 transform origin-bottom transition duration-200 hover:scale-y-125"
      onClick={handleToggleMusic}
    >
      {isMusicPlay === true ? <PlayArrowIcon color="disabled" /> : <PauseIcon color="disabled" />}
    </button>
  );
};
export default MusicTab;
