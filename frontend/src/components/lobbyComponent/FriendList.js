const FriendList = (props) => {

  return(
  <div className="m-2 p-2 col-start-1 col-end-3 row-start-1 row-end-8  rounded-md border">  
    <h2>친구 목록</h2>
      {props.sortedFriends.map((friend, i)=>(
      <p key={i} style={{ color: friend.isOnline ? 'black' : 'gray' }}>
        {friend.name}
      </p>
    ))}
  </div>
  )
}

export default FriendList;