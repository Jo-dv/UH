import UseRoomSetting from "../../store/UseRoomSetting";

const RoomSettingTab = () => {
  const { setRoomSetting } = UseRoomSetting();

  return (
    <h3
      className="w-24 text-center rounded-t-lg bg-mc1 p-2"
      onClick={() => {
        setRoomSetting(true);
      }}
    >
      방 설정
    </h3>
  );
};

export default RoomSettingTab;
