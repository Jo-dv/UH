import { useState } from "react";

const RoomSearchBar = ({ onSearch }) => {
  const [searchRoomTittle, setSearchRoomTitle] = useState("");

  const handleRoomTitleSearch = (event) => {
    const RoomTitleValue = event.target.value;
    setSearchRoomTitle(RoomTitleValue);
    onSearch(RoomTitleValue);
  };
  console.log(searchRoomTittle);
  return (
    <div
      className="flex flex-grow items-center space-x-2 bg-whitem-4 mr-2 border rounded-3xl bg-white"
      onSubmit={handleRoomTitleSearch}
    >
      <input
        className="flex-grow bg-white mr-3 ml-5 rounded-3xl bg-white"
        type="search"
        placeholder="방 제목을 주세요!"
        maxLength="20"
        value={searchRoomTittle}
        onChange={handleRoomTitleSearch}
      />
      <button type="submit" className="pr-4 bg-whitem-4 m-1 rounded-3xl bg-white">
        검색
      </button>
    </div>
  );
};

export default RoomSearchBar;
