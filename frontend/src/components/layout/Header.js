import React, { useState } from "react"
import { BrowserRouter, Router, Route, Switch,Link } from "react-router-dom"


const Header = () => {
  let [isLobbyPage, setIsLobbyPage] = useState(true);

  return(
      <div>
        <nav>
          <ul className="flex flex-row items-end">
            <li>
              <Link to='/lobby'>
                <img src='../../image/logo.png' alt="Logo" className="h-20"/>
              </Link>
            </li>
            {isLobbyPage?
              <>
                <li>
                  <RoomTab />
                </li>
                <li>
                  <FastTrackTab />
                </li>
                <li>
                  <FriendTab />
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
              </>:
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
            }
          </ul>
        </nav>
      </div>

  )
}

const RoomTab = () => {
  return(
    <h3 className="bg-mc1 p-2">방 만들기</h3>
  )
}

const FastTrackTab = () => {
  return(
    <h3 className="bg-mc2 p-2">빠른 입장</h3>
  )
}

const FriendTab = () => {
  return(
    <h3 className="bg-mc3 p-2">친구</h3>
  )
}

const RankingTab = () => {
  return(
    <h3 className="bg-mc4 p-2">랭킹</h3>
  )
}

const SettingTab = () => {
  return(
    <h3 className="bg-mc5 p-2">설정</h3>
  )
}

const FeedbackTab = () => {
  return(
    <h3 className="bg-mc6 p-2">피드백</h3>
  )
}

const LogOutTab = () => {
  return(
    <h3 className="bg-mc7 p-2">로그아웃</h3>
  )
}

const RoomSettingTab = () => {
  return(
    <h3 className="bg-mc1 p-2">방 설정</h3>
  )
}

const InvitingTab = () => {
  return(
    <h3 className="bg-mc2 p-2">친구 초대</h3>
  )
}

const LeavingTab = () => {
  return(
    <h3 className="bg-mc7 p-2">방 나가기</h3>
  )
}
export default Header