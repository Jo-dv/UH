const Search = (props) => {
  return(
    <div className="m-1 p-2 col-start-3 col-end-9 row-start-1 row-end-2 flex space-x-4 items-center rounded-md border">
      <button>대기방 보기</button>
      <select value={props.selectedGame} onChange={props.handleChangeOfGame}>
        <option value="">전체 게임</option>
        <option value="game1">고요 속의 외침</option>
        <option value="game2">인물 맞추기</option>
      </select>

      <form onSubmit={props.handleSubmit}>
          <input
            type="search"
            value={props.searchRoomTittle}
            onChange={props.handleChangeOfRoomTittle}
            placeholder="방 제목"
          />
          <button type="submit">검색</button>
      </form>

  </div>
  )
}

export default Search;