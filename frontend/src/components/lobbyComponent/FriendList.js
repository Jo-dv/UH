const FriendList = (props) => {
  // // rooms 컴포넌트에 대한 참조를 저장할 배열
  // const roomRefs = useRef([]);

  // // 스크롤 기능 구현
  // useEffect(() => {
  //   // IntersectionObserver 초기화
  //   const observer = new IntersectionObserver((entries) => {
  //     entries.forEach((entry) => {
  //       if (entry.isIntersecting) {
  //         entry.target.style.opacity = 1;
  //       } else {
  //         entry.target.style.opacity = 0;
  //       }
  //     });
  //   });

  //   // 각 Rooms 컴포넌트를 관찰 대상으로 추가
  //   roomRefs.current.forEach((ref) => {
  //     if (ref) observer.observe(ref);
  //   });

  //   // 컴포넌트가 언마운트될 때 observer 해제
  //   return () => {
  //     roomRefs.current.forEach((ref) => {
  //       if (ref) observer.unobserve(ref);
  //     });
  //   };
  // }, [rooms]); // rooms가 변경될 때마다 실행

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
