import useSound from "use-sound";
import clickSound from "../asset/music/ClickSound.mp3";

const useClick = () => {
  const [play] = useSound(clickSound);

  const playClickSound = () => {
    play();
  };
  return playClickSound;
};

export default useClick;
