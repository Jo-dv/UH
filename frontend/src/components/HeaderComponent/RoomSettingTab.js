import UseRoomSetting from "../../store/UseRoomSetting";

const RoomSettingTab = () => {
  const { setRoomSetting } = UseRoomSetting();

  return (
    <button
      className="py-2 px-5 text-xl text-center rounded-t-lg bg-tab1 transform origin-bottom transition duration-200 hover:scale-y-125"
      onClick={() => {
        alert("오류 수정 중이에용 ㅠ");
        // setRoomSetting(true);
      }}
    >
      방 설정
    </button>
  );
};

export default RoomSettingTab;
