import UserVideo from "../../pages/RoomId/UserVideo";
import personImage from "../../asset/image/character.jpg";
import React, { useState, useEffect } from "react";
import InviteList from "./InviteList";

const Person = (props) => {
  const [players, setPlayers] = useState();
  const [hoverIndex, setHoverIndex] = useState(null);
  const [showInviteList, setShowInviteList] = useState(false);

  useEffect(() => {
    setPlayers(props.playersInfo);
  }, [props.playersInfo]);

  const streamManagers = props.publisher
    ? [props.publisher, ...props.subscribers]
    : props.subscribers;

  const handleInviteClick = (event, index) => {
    event.stopPropagation(); // 이벤트 버블링 방지
    setShowInviteList(!showInviteList);
    if (showInviteList) {
      setHoverIndex(null); // InviteList가 이미 표시된 경우 호버 인덱스 초기화
    } else {
      setHoverIndex(index); // InviteList를 표시하지 않는 경우 현재 인덱스로 설정
    }
  };

  const gridItems = Array(8)
    .fill(null)
    .map((_, index) => {
      const streamManager = streamManagers && streamManagers[index];

      if (streamManager) {
        const connectionId = streamManager.stream.connection.connectionId;
        const isTeamA = props.teamA && props.teamA.includes(connectionId);
        const isTeamB = props.teamB && props.teamB.includes(connectionId);
        const backgroundClass = isTeamA ? "bg-tab1" : isTeamB ? "bg-tab12" : "formBG";
        return (
          <div key={connectionId}>
            <div className={`${backgroundClass} relative grid rounded-3xl m-1 pb-2`}>
              <UserVideo
                streamManager={streamManager}
                session={props.session}
                isHost={props.isHost}
                isReady={props.isReady}
                deleteSubscriber={props.deleteSubscriber}
                subscribers={props.subscribers}
                kickOutUser={props.kickOutUser}
                connectionId={connectionId}
                hostId={props.hostId}
                playerReady={
                  players && players[connectionId] && players[connectionId].ready
                    ? players[connectionId].ready
                    : undefined
                }
              />
            </div>
          </div>
        );
      } else {
        return (
          <div
            key={index}
            className="m-1 relative"
            onMouseEnter={() => setHoverIndex(index)}
            onMouseLeave={() => setHoverIndex(null)}
          >
            <img src={personImage} alt="대기중" className="rounded-3xl h-40 w-72" />
            {hoverIndex === index && (
              <div className="absolute inset-0 bg-black bg-opacity-50 rounded-3xl flex justify-center items-center">
                <button
                  onClick={(e) => handleInviteClick(e, index)}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-tab3 py-2 px-4 rounded-xl"
                >
                  친구 초대
                </button>
              </div>
            )}
            {showInviteList === true && hoverIndex === index ? <InviteList setShowInviteList={setShowInviteList} /> : null}
          </div>
        );
      }
    });

  return <div className="grid grid-rows-2 grid-cols-4 w-full h-full">{gridItems}</div>;
};

export default Person;