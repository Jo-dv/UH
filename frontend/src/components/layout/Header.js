import React, { useState } from "react";
import { Link } from "react-router-dom";
import CreateRoomTab from "../HeaderComponent/CreateRoomTab";
import FastTrackTab from "../HeaderComponent/FastTrackTab";
import RankingTab from "../HeaderComponent/RankingTab";
import SettingTab from "../HeaderComponent/SettingTab";
import FeedbackTab from "../HeaderComponent/FeedbackTab";
import LogOutTab from "../HeaderComponent/LogOutTab";
import RoomSettingTab from "../HeaderComponent/RoomSettingTab";
import InvitingTab from "../HeaderComponent/InvitingTab";
import LeavingTab from "../HeaderComponent/LeavingTab";

const Header = () => {
  let [isLobbyPage, setIsLobbyPage] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const modalOnOff = () => {
    setModalOpen(!modalOpen);
  };
  return (
    <div>
      <nav>
        <ul className="flex flex-row items-end">
          <li>
            <Link to="/lobby">
              <img src="../../image/logo.png" alt="Logo" className="h-20" />
            </Link>
          </li>
          {isLobbyPage ? (
            <>
              <li>
                <CreateRoomTab />
              </li>
              <li>
                <FastTrackTab />
              </li>
              <li>
                <RankingTab />
              </li>
              <li>
                <SettingTab />
              </li>
              <li>
                <FeedbackTab />
              </li>
              <li>
                <LogOutTab />
              </li>
            </>
          ) : (
            <>
              <li>
                <RoomSettingTab />
              </li>
              <li>
                <InvitingTab />
              </li>
              <li>
                <SettingTab />
              </li>
              <li>
                <LeavingTab />
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Header;
