// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "../../../api/axios.js";
// import UseFriendsStore from "../../../store/UseFriendsStore";

// const FriendRequestModal = (props) => {

//   const { friends } = UseFriendsStore();
//   const [ request, setRequest ] = useState([]);
//   console.log("친구칭구",friends)

//     useEffect(() => {
//       const result = friends
//         .filter(item => item.friendsState === false)
//         .map(item => item.userNickname);
//       setRequest(result);
//       console.log(result);
//     }, [friends]);


//   const acceptHandler = async (friendsId) => {
//     try {
//       const response = await axios.put(`friends/${friendsId}`,{});
//       // const res = response.data
//       console.log(response);
//       console.log("친구칭구",friends)
//     }
//     catch (error) {
//       console.log("친구 신청 받기 에러", error);
//     } 
//   }

//   const rejectHandler = async (friendsId) => {
//     try{
//       const response = await axios.delete(`friends/${friendsId}`,{});
//       // const res = response.data
//       console.log(response);
//     }
//     catch (error) {
//       console.log("친구 요청 거절 에러", error)
//     }
//   }


//   return (
//     <>
//       <div className="bg-white rounded-3xl border-gray-200 border shadow-lg p-5 md:p-6 mx-2" style={{ width: '300px', height: '350px', zIndex: 9999 }}>
//         <p className="text-xl text-center">받은 친구요청</p>
//         <hr className="border border-gray-300 my-3"/>
//           <div style={{ maxHeight: '250px', overflowY: 'auto' }}>
//           {request && request.map((nickname, index) => (
//             <div key={index}>
//               <div className="flex items-center justify-between">
//                 <div className="flex-grow">{nickname}</div>
//                 <div className="flex">
//                   <button onClick={() => acceptHandler(friends[index].friendsId)} className="bg-tab10 hover:bg-[#95c75a] py-1 px-2 rounded-xl mr-1">수락</button>
//                   <button onClick={() => rejectHandler(friends[index].friendsId)} className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-1 px-2 rounded-xl">거절</button>
//                 </div>
//               </div>
//               {index !== request.length - 1 && <hr className="border-1 border-gray-300 my-1 w-full" />}
//             </div>
//           ))}
//           </div>
          
//           {request.length === 0 && (
//             <div>
//               <p>받은 요청이 없습니다</p>  
//             </div>
//           )}
//       </div>
//     </>
//   );
// };

// export default FriendRequestModal;
