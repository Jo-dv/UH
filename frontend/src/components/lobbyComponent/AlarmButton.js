import React, { useState } from "react";
import RequestModal from "../Modal/Lobby/FriendRequest";
import FriendRequestList from "../lobbyComponent/FriendRequestList";

const AlarmButton = () => {
    const [request, setRequest] = useState(false);

    return (
        <>
            <button
            className="py-2 px-5 text-center rounded-t-lg bg-tab11 transform origin-bottom transition duration-200 hover:scale-y-125"
            onClick={() => {
                setRequest(!request);
            }}
            >
            +
            </button>
            {request === true ? <FriendRequestList request={request} setRequest={setRequest} /> : null}
        </>
        );
    };


export default AlarmButton