import { useState } from "react";
import useClick from "../../hooks/useClick";

const RoomSearchBar = ({ onSearch }) => {
  const [searchRoomTittle, setSearchRoomTitle] = useState("");
  const { playClick } = useClick();

  const handleRoomTitleSearch = (event) => {
    const RoomTitleValue = event.target.value;
    setSearchRoomTitle(RoomTitleValue);
    onSearch(RoomTitleValue);
  };

  return (
    <div
      className="flex flex-grow items-center border rounded-3xl m-2  bg-white basis-4/6"
      onSubmit={handleRoomTitleSearch}
    >
      <input
        className="flex-grow bg-white ml-5 rounded-3xl"
        type="search"
        placeholder="방 제목을 주세요!"
        maxLength="20"
        value={searchRoomTittle}
        onChange={handleRoomTitleSearch}
      />
      <button type="submit" className="hover:bg-tab9 rounded-3xl mr-4" onClick={() => playClick()}>
        검색
      </button>
    </div>
  );
};

export default RoomSearchBar;
