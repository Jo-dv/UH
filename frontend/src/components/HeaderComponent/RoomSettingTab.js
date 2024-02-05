import UseRoomSetting from "../../store/UseRoomSetting";

const RoomSettingTab = () => {
  const { setRoomSetting } = UseRoomSetting();

  return (
    <button
      className="w-24 text-center rounded-t-lg bg-mc1 p-2 transform origin-bottom transition duration-200 hover:scale-y-125"
      onClick={() => {
        setRoomSetting(true);
      }}
    >
      방 설정
    </button>
  );
};

export default RoomSettingTab;
