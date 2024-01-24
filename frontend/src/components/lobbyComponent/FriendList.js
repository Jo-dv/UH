const FriendList = (props) => {
  return (
    <div className="border-7 border-modalBorder col-start-1 col-end-2 row-start-2 row-end-8 m-2 p-2 divide-gray-500 rounded-md border">
      {props.sortedFriends.map((friend, i) => (
        <p key={i} style={{ color: friend.isOnline ? "black" : "gray" }}>
          {friend.name}
        </p>
      ))}
    </div>
  );
};

export default FriendList;
