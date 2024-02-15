import { useEffect, useRef, useState } from "react";
import useStore from "../../store/UserAuthStore";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import CorrectMusic from "../../components/CorrectMusic";
import JSConfetti from "js-confetti";

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
  disableAttack,
}) => {
  const [chat, setChat] = useState("");
  const ulRef = useRef(null);
  // 닉네임 가져오기
  const nickname = useStore((state) => state.user.userNickname);
  const [messageList, setMessageList] = useState([]);
  const [isAnswer, setIsAnswer] = useState(false);

  //HTML Canvas 요소를 생성하여 페이지에 추가
  const jsConfetti = new JSConfetti();

  //색종이 커스터마이징
  const handleClick = () => {
    jsConfetti.addConfetti({
      confettiColors: ["#EF476F", "#fb7185", "#F78C6B", "#FFD166", "#a8d572", "#95c75a"],
      confettiRadius: 5,
      confettiNumber: 500,
    });
  };
  const [isAttcked, setAttacked] = useState(false);

  useEffect(() => {
    if (disableAttack) {
      setAttacked(true);

      setTimeout(() => {
        setAttacked(false);
      }, 5000);
    }
  }, [disableAttack]);

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
        type: "game-chat", // The type of message (optional)
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

  useEffect(() => {
    session.off("signal:game-chat");
    session.on("signal:game-chat", (event) => {
      const dataObj = JSON.parse(event.data);

      if (gameCategory === 101) {
        if (dataObj.ans === answer && dataObj.team === dataObj.myTeam) {
          handleClick();
          setQuizIndex(dataObj.quizIndex + 1);
          plusScore(dataObj.team);
          changeTeamIndex();
          setIsAnswer(true);
          setTimeout(() => setIsAnswer(false), 1000);
          dataObj.style = "bg-tab10 opacity-70 py-1 px-2 rounded-xl self-center";
        } else if (dataObj.myTeam === "A") {
          dataObj.style = "bg-tab1 opacity-70 py-1 px-2 rounded-xl self-start";
        } else if (dataObj.myTeam === "B") {
          dataObj.style = "bg-tab2 opacity-70 py-1 px-2 rounded-xl self-end";
        }
      } else if (gameCategory === 102) {
        if (dataObj.ans === answer) {
          handleClick();
          setQuizIndex(dataObj.quizIndex + 1);
          plusScore(dataObj.myTeam);
          changeTeamIndex();
          setIsAnswer(true);
          setTimeout(() => setIsAnswer(false), 1000);
          dataObj.style = "bg-tab10 opacity-70 py-1 px-2 rounded-xl self-center";
        } else if (dataObj.myTeam === "A") {
          dataObj.style = "bg-tab1 opacity-70 py-1 px-2 rounded-xl self-start";
        } else if (dataObj.myTeam === "B") {
          dataObj.style = "bg-tab2 opacity-70 py-1 px-2 rounded-xl self-end";
        }
      }

      setMessageList([...messageList, dataObj]);

      // session.off("signal:room-chat");
    });
  }, [quizIndex, Team, messageList])



  useEffect(() => {
    // console.log(session);
    // 컴포넌트가 업데이트 될 때마다 스크롤을 맨 아래로 이동
    if (ulRef.current) {
      ulRef.current.scrollTop = ulRef.current.scrollHeight;
    }
    // console.log(answer, gameCategory);
  }, [messageList]);

  // 입력 필터링 함수
  const handleInputChange = (event) => {
    const { value } = event.target;
    // 특정 키가 입력되었을 때 무시
    if (value.includes(',') || value.includes('.') || value.includes('/')) {
      return;
    }
    setChat(value);
  };

  return (
    <>
      <section className="w-full flex flex-col absolute bottom-0 opacity-70">
        {/* <h2 className="bg-neutral-400 px-8 h-6">채팅</h2> */}

        <ul ref={ulRef} className=" px-2 h-[200px] overflow-y-auto flex flex-col justify-end">
          {messageList.map((item, index) => {
            return (
              <li className="m-2 flex flex-col" key={`chat${index}`}>
                <span className={item.style}>{item.chat}</span>
              </li>
            );
          })}
          {/* <li className="m-2" key={receiveMsg}>
          <span className="bg-black opacity-50 text-white p-1 rounded-xl">{receiveMsg}</span>
        </li> */}
        </ul>
        {(myConnectionId === gamePlayer && gameCategory === 101) || isAttcked ? null : (
          <form
            className="px-3 w-1/2
        rounded-3xl bg-white
        flex flex-row self-center overflow-hidden"
            onSubmit={sendMsg}
          >
            <input
              type="text"
              placeholder="채팅을 입력해 주세요!"
              className="grow focus:outline-none"
              maxLength="20"
              value={chat}
              required
              onChange={handleInputChange}
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
