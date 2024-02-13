import { useEffect, useRef, useState } from "react";
import useStore from "../../store/UserAuthStore";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
const Chat = ({
  session,
  myConnectionId,
  gamePlayer,
  gameCategory,
  Team,
  myTeam,
  quizIndex,
  setQuizIndex,
  changeTeamIndex,
  answer,
  plusScore,
}) => {
  const [chat, setChat] = useState("");
  const ulRef = useRef(null);
  // 닉네임 가져오기
  const nickname = useStore((state) => state.user.userNickname);
  const [messageList, setMessageList] = useState([]);
  const [isAnswer, setIsAnswer] = useState(false);
  // const [receiveMsg, setReceiveMsg] = useState(`${nickname}님 환영합니다`);
  const sendMsg = (e) => {
    e.preventDefault();
    // console.log(session);
    const data = JSON.stringify({
      chat: `${nickname} : ${chat}`,
      ans: chat,
      team: Team,
      myTeam: myTeam,
      quizIndex: quizIndex,
      myUserName: nickname,
    });

    session
      .signal({
        data: data, // Any string (optional)
        to: [], // Array of Connection objects (optional. Broadcast to everyone if empty)
        type: "room-chat", // The type of message (optional)
      })
      .then(() => {
        // console.log("보냄 :", chat);
        setChat("");
        // setMessageList([...messageList, receiveMsg]);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  session.on("signal:room-chat", (event) => {
    const dataObj = JSON.parse(event.data);
    if (dataObj.ans === answer && dataObj.team === dataObj.myTeam) {
      // plusQuizIndex();
      setQuizIndex(dataObj.quizIndex + 1);
      plusScore(dataObj.team);
      changeTeamIndex();
      setIsAnswer(true);
      setTimeout(() => setIsAnswer(false), 1000);
      dataObj.style = "bg-tab10 opacity-70 py-1 px-2 rounded-xl self-start";
    } else if (dataObj.team === dataObj.myTeam) {
      dataObj.style = "bg-tab1 opacity-70 py-1 px-2 rounded-xl self-start";
    } else {
      dataObj.style = "bg-tab2 opacity-70 py-1 px-2 rounded-xl self-end";
    }
    // console.log(dataObj);
    setMessageList([...messageList, dataObj]);
    // console.log(messageList)
    // console.log('폼',event.from); // Connection object of the sender
    // console.log('타입',event.type); // The type of message ("my-chat")
  });

  useEffect(() => {
    const data = JSON.stringify({
      chat: `${nickname}님 환영합니다`,
      team: Team,
      quizIndex: quizIndex,
      myUserName: nickname,
    });
    session
      .signal({
        data: data, // Any string (optional)
        to: [], // Array of Connection objects (optional. Broadcast to everyone if empty)
        type: "room-chat", // The type of message (optional)
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    // 컴포넌트가 업데이트 될 때마다 스크롤을 맨 아래로 이동
    if (ulRef.current) {
      ulRef.current.scrollTop = ulRef.current.scrollHeight;
    }
  }, [messageList]);

  return (
    <>
      {isAnswer ? (
        <TaskAltIcon
          className="absolute bottom-20 m-auto animate-jump-in"
          color="success"
          sx={{ fontSize: 400 }}
        />
      ) : null}

      <section className="w-full flex flex-col absolute bottom-9 opacity-70">
        {/* <h2 className="bg-neutral-400 px-8 h-6">채팅</h2> */}

        <ul ref={ulRef} className=" px-2 h-[200px] overflow-y-auto flex flex-col justify-end">
          {messageList.map((item, index) => {
            return (
              <li className="m-2 flex flex-col" key={index}>
                <span className={item.style}>{item.chat}</span>
              </li>
            );
          })}
          {/* <li className="m-2" key={receiveMsg}>
          <span className="bg-black opacity-50 text-white p-1 rounded-xl">{receiveMsg}</span>
        </li> */}
        </ul>
        {myConnectionId === gamePlayer && gameCategory === 101 ? null : (
          <form
            className="px-3
        rounded-3xl bg-white
        flex flex-row overflow-hidden"
            onSubmit={sendMsg}
          >
            <input
              type="text"
              placeholder="채팅을 입력해 주세요!"
              className="grow focus:outline-none"
              maxLength="50"
              value={chat}
              required
              onChange={(e) => setChat(e.target.value)}
            />
            <button className="w-12 m-1 pl-3 border-l-2 border-solid" type="submit">
              채팅
            </button>
          </form>
        )}
      </section>
    </>
  );
};

export default Chat;
