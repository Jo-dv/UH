import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CreateRoomTab from "../HeaderComponent/CreateRoomTab";
import FastTrackTab from "../HeaderComponent/FastTrackTab";
import RankingTab from "../HeaderComponent/RankingTab";
import SettingTab from "../HeaderComponent/MyPageTab";
import FeedbackTab from "../HeaderComponent/FeedbackTab";
import LogOutTab from "../HeaderComponent/LogOutTab";
import RoomSettingTab from "../HeaderComponent/RoomSettingTab";
import InvitingTab from "../HeaderComponent/InvitingTab";
import LeavingTab from "../HeaderComponent/LeavingTab";
import HomeTab from "../HeaderComponent/HomeTab";
import ManualTab from "../HeaderComponent/ManualTab";
import UseIsLobbyStore from "../../store/UseIsLobbyStore";
import logoImg from "../../asset/image/LOGO.png";

const Header = () => {
  const location = useLocation();
  const [isLobbyPage, setIsLobbyPage] = useState(true);
  const { isLobby, setIsLobby } = UseIsLobbyStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/lobby") {
      setIsLobbyPage(true);
    } else if (location.pathname.startsWith("/room")) {
      setIsLobbyPage(false);
    }
  }, [location]);

  const handleLogoClick = () => {
    if (location.pathname.startsWith("/room")) {
      // 현재 '/room' 경로일 때는 아무 동작도 하지 않음
      // console.log("Room 페이지에서 로비로 이동할 수 없습니다.");
    } else {
      // 그 외의 경우에는 로비 페이지로 이동
      setIsLobby(null);
      navigate("/lobby");
    }
  };

  return (
    <header className="w-[1280px] mx-auto">
      <nav>
        <ul className="flex flex-row items-end pt-5">
          {isLobbyPage ? (
            <>
              <li className="">
                <button onClick={handleLogoClick}>
                  <img src={logoImg} alt="Logo" className="h-[80px]" />
                </button>
              </li>
              <li>
                <HomeTab />
              </li>
              <li>
                <ManualTab />
              </li>
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
              <li className="">
                <img src={logoImg} alt="Logo" className="h-[80px]" />
              </li>
              <li>
                <RoomSettingTab />
              </li>
              <li>
                <InvitingTab />
              </li>
              <li>
                <LeavingTab />
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
