import UseRoomSetting from "../../store/UseRoomSetting";
import useClick from "../../hooks/useClick";
const RoomSettingTab = () => {
  const { setRoomSetting } = UseRoomSetting();
  const { playClick } = useClick();
  return (
    <button
      className="py-2 px-5 text-xl text-center rounded-t-lg bg-tab1 transform origin-bottom transition duration-200 hover:scale-y-125"
      onClick={() => {
        setRoomSetting(true);
        playClick();
      }}
    >
      방 설정
    </button>
  );
};

export default RoomSettingTab;
