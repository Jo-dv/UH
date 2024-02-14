import React, { useState } from 'react';
import UseInvitingStore from "../../store/UseInvitingStore";
import InviteList from '../waitingComponent/InviteList'

const InvitingTab = () => {
  const [showInviteList, setShowInviteList] = useState(false);

  return (
    <>
      <button
        className="py-2 px-5 text-xl text-center rounded-t-lg bg-tab3 transform origin-bottom transition duration-200 hover:scale-y-125"
        onClick={() => {
          setShowInviteList(!showInviteList);
        }}
      >
        친구 초대
      </button>
      {showInviteList === true ? <InviteList setShowInviteList={setShowInviteList} /> : null}
    </>
  );
};

export default InvitingTab;
