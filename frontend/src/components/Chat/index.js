import { useEffect, useRef, useState } from "react";
import "./chat.css";
import useStore from "../../store/UserAuthStore";

const Chat = ({ session, myConnectionId, gamePlayer }) => {
  const [chat, setChat] = useState("");

  const [messageList, setMessageList] = useState([]);
  const ulRef = useRef(null);
  // 닉네임 가져오기
  const nickname = useStore((state) => state.user.userNickname);
  const [receiveMsg, setReceiveMsg] = useState();
  const sendMsg = (e) => {
    e.preventDefault();
    // console.log(session);
    session
      .signal({
        data: `${nickname}: ${chat}`, 
        to: [], 
        type: "room-chat", 
      })
      .then(() => {
        setChat("");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  session.on("signal:room-chat", (event) => {
    // console.log('받음')
    if (receiveMsg !== event.data) {
      // console.log("받음d :", event.data); // Message
    }
    setReceiveMsg(event.data);
    setMessageList([...messageList, receiveMsg]);
    // console.log(messageList)
    // console.log('폼',event.from); // Connection object of the sender
    // console.log('타입',event.type); // The type of message ("my-chat")
  });

  useEffect(() => {
    // 컴포넌트가 업데이트 될 때마다 스크롤을 맨 아래로 이동
    if (ulRef.current) {
      ulRef.current.scrollTop = ulRef.current.scrollHeight;
    }
  }, [messageList]);

  //들어올 때 알림
  useEffect(() => {
    if (session.sessionConnected()) {
      session
        .signal({
          data: `[알림] ${nickname}님 환영합니다`, // Any string (optional)
          to: [], // Array of Connection objects (optional. Broadcast to everyone if empty)
          type: "room-chat", // The type of message (optional)
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [session.sessionConnected()]);

  return (
    <section
      className="bg-neutral-200 
    border rounded-3xl overflow-hidden h-full w-full flex flex-col"
    >
      <h2 className="bg-neutral-400 px-8 h-6">채팅</h2>
      <div className="p-4 h-screen-16">
        <ul
          ref={ulRef}
          className="mb-2 px-2 border rounded-3xl bg-white h-screen-40 max-h-44 overflow-auto"
        >
          {messageList.map((item, index) => {
            return <li key={index}>{item}</li>;
          })}
          <li className="">{receiveMsg}</li>
        </ul>
        {myConnectionId !== gamePlayer ? (
          <form
            className="px-2 h-8 
          border rounded-3xl bg-white
          flex flex-row overflow-hidden"
            onSubmit={sendMsg}
          >
            <input
              type="text"
              placeholder="채팅을 입력해 주세요!"
              className="grow"
              maxLength="50"
              value={chat}
              required
              onChange={(e) => setChat(e.target.value)}
            />
            <button className="w-11 m-1 pl-2 border-l-2 border-solid" type="submit">
              채팅
            </button>
          </form>
        ) : null}
      </div>
    </section>
  );
};

export default Chat;
