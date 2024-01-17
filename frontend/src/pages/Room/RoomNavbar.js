import { Link } from "react-router-dom"
import CreateRoomModal from "../../components/CreateRoomModal"

const RoomNavbar = () => {
  return(
<nav>
  <ul className="flex flex-row items-end">
    <li>
      <Link to='/lobby'>
        <img src='img/logo.png' alt="Logo" 
        className="h-20"/>
      </Link>
    </li>
    <li className="bg-mc1 p-2">방 설정</li>
    <li className="bg-mc2 p-2">친구 초대</li>
    <li className="bg-mc3 p-2">설정</li>
    <li className="bg-mc4 p-2"><Link to='/lobby'>방나가기</Link></li>
  </ul>
  <CreateRoomModal/>
</nav>
  )
}

export default RoomNavbar