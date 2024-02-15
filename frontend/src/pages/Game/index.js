import { useEffect, useRef, useState } from "react";
import Chat from "./Chat";
import "./Game.css";
import { endPlay, getGameData, getRoomInfo } from "../../api/waitRoom";
import UserVideoComponent from "./Cam/UserVideoComponent";
import Tooltip from "@mui/material/Tooltip";
import Badge from "@mui/material/Badge";
import chipi from "../../asset/image/chipi.gif";
import stop from "../../asset/image/stop.gif";
import talk from "../../asset/image/talk.gif";
import gethint from "../../asset/image/hint.gif";
import BlockIcon from "@mui/icons-material/Block";

import G101 from "./games/G101";
import G102 from "./games/G102";
import UseIsMusicPlay from "../../store/UseIsMusicPlay";
import ScoreTable from "./ScoreTable";

/**
 *
 * @param {string} src 한글
 * @returns 한글 초성
 */
const getInitials = (src) => {
  let string = "";
  for (var i = 0; i < src.length; i++) {
    let index = (src.charCodeAt(i) - 44032) / 28 / 21;
    if (index >= 0) {
      string += String.fromCharCode(index + 4352);
    }
  }
  return string;
};

const Game = ({
  publisher,
  subscribers,
  session,
  myUserName,
  sendPlayDone,
  itemUse,
  meme,
  disable,
  hint,
  stt,
  memeAttack,
  disableAttack,
  hintUse,
  setHintUse,
  sttUse,
  setSttUse,
  sttMsg,
  setSttMsg,
  sendNotice,
}) => {
  let maxTime = 30000;
  let maxRound = 4;
  const myConnectionId = session.connection.connectionId;
  const [loading, setLoading] = useState(true);
  const [gameLoading, setGameLoading] = useState(true);
  const [time, setTime] = useState(0);
  const [round, setRound] = useState(1);
  const [isGameEnd, setIsGameEnd] = useState(false);
  const [myTeam, setMyTeam] = useState(undefined);
  const [ATeamStreamManagers, setATeamStreamManagers] = useState(undefined);
  const [BTeamStreamManagers, setBTeamStreamManagers] = useState(undefined);
  const [TeamTurn, setTeamTurn] = useState("A");
  const [TeamIndex, setTeamIndex] = useState(0);
  const [turnPlayerId, setTurnPlayerId] = useState(undefined);
  const [quizData, setQuizData] = useState([]);
  const [quizIndex, setQuizIndex] = useState(0);
  const [ATeamScore, setATeamScore] = useState(0);
  const [BTeamScore, setBTeamScore] = useState(0);
  const [teamChangeLoading, setTeamChangeLoading] = useState(false);
  const [gameCategory, setGameCategory] = useState(undefined);
  const [rand01, setRand01] = useState(Math.floor(Math.random() * 2));

  //stt
  const startRecording = () => {
    setSttMsg('');
    // 녹음 시작 및 2초 후에 녹음 종료
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const mediaRecorder = new MediaRecorder(stream);
        let chunks = [];
        mediaRecorder.start();

        mediaRecorder.ondataavailable = (e) => {
          chunks.push(e.data);
        };

        mediaRecorder.onstop = () => {
          const blob = new Blob(chunks, { type: "audio/wav" });
          const formData = new FormData();
          formData.append("audio", blob);

          fetch("https://i10e201.p.ssafy.io/stt", {
            method: "POST",
            body: formData,
          })
            .then((response) => response.json())
            .then((data) => {
              const transcript = data.results[0].transcript
              console.log(transcript);
              if (transcript.trim() != ""){
                session
                .signal({
                  data: JSON.stringify({
                    result: data.results[0].transcript,
                  }),
                  to: [],
                  type: "stt",
                })
                .catch((error) => {
                  console.error(error);
                });
              } else {
                setSttMsg("앗! 다음 기회에 ㅋㅋ;;ㅎㅎ;;ㅈㅅ;;")
              }
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        };

        setTimeout(() => {
          mediaRecorder.stop();
        }, 2000);
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  };

  //아이템 사용
  useEffect(() => {
    if (hintUse) {
      const extractedInitials = getInitials(quizData[quizIndex].quizAnswer);
      console.log(quizData[quizIndex].quizAnswer);
      console.log(extractedInitials);
    }

    setTimeout(() => {
      setHintUse(false);
    }, 5000);
  }, [hintUse, quizIndex]);

  useEffect(() => {
    if (turnPlayerId) {
      // console.log("들어옴");
      // console.log("idcheck" + myConnectionId, turnPlayerId);
      if (sttUse) {
        if (myConnectionId == turnPlayerId[0]) {
          startRecording();
        }
      }
    }
  }, [sttUse]);

  // 음악 정지
  const { pause } = UseIsMusicPlay();

  useEffect(() => {
    pause();
  }, []);

  const plusQuizIndex = () => {
    setQuizIndex(quizIndex + 1);
  };

  const plusScore = (Team) => {
    if (Team === "A") {
      setATeamScore(ATeamScore + 1);
    } else if (Team === "B") {
      setBTeamScore(BTeamScore + 1);
    }
  };

  const changeTeamIndex = () => {
    if (TeamTurn === "A") {
      const long = ATeamStreamManagers.length;
      if (TeamIndex + 1 < long) {
        setTurnPlayerId(ATeamStreamManagers[TeamIndex + 1]);
        setTeamIndex(TeamIndex + 1);
      } else {
        setTurnPlayerId(ATeamStreamManagers[0]);
        setTeamIndex(0);
      }
    } else if (TeamTurn === "B") {
      const long = BTeamStreamManagers.length;
      if (TeamIndex + 1 < long) {
        setTurnPlayerId(BTeamStreamManagers[TeamIndex + 1]);
        setTeamIndex(TeamIndex + 1);
      } else {
        setTurnPlayerId(BTeamStreamManagers[0]);
        setTeamIndex(0);
      }
    }
  };

  const changeTeamTurn = () => {
    if (TeamTurn === "A") {
      setTeamTurn("B");
      setTeamIndex(0);
      setShowSttAnimation(false);
      setSttMsg("");
      setTurnPlayerId(BTeamStreamManagers[0]);
      plusQuizIndex();
    } else if (TeamTurn === "B") {
      setTeamTurn("A");
      setTeamIndex(0);
      setShowSttAnimation(false);
      setSttMsg("");
      setTurnPlayerId(ATeamStreamManagers[0]);
      plusQuizIndex();
    }
    if (round < maxRound) {
      setTeamChangeLoading(true);
      setTimeout(() => {
        setTeamChangeLoading(false);
      }, 2000);
    }
  };

  useEffect(() => {
    const callData = async () => {
      const roomData = await getRoomInfo(session.sessionId);
      setGameCategory(roomData.roomData.gameCategory);
      const players = roomData.roomStatus.players;
      const myTeamCNT = roomData.roomStatus.players[myConnectionId].team; //A or B

      const ATeamMember = [];
      const BTeamMember = [];
      for (const key in players) {
        if (players[key].team === "A") {
          ATeamMember.push(key);
        } else {
          BTeamMember.push(key);
        }
      }
      const ATeamStreamManagersCNT = [];
      const BTeamStreamManagersCNT = [];
      if (myTeamCNT === "A") {
        ATeamStreamManagersCNT.push([myConnectionId, publisher, "A"]);
        setMyTeam("A");
      } else {
        BTeamStreamManagersCNT.push([myConnectionId, publisher, "B"]);
        setMyTeam("B");
      }

      for (const sub of subscribers) {
        if (ATeamMember.includes(sub.stream.connection.connectionId)) {
          ATeamStreamManagersCNT.push([sub.stream.connection.connectionId, sub, "A"]);
        } else if (BTeamMember.includes(sub.stream.connection.connectionId)) {
          BTeamStreamManagersCNT.push([sub.stream.connection.connectionId, sub, "B"]);
        }
      }

      ATeamStreamManagersCNT.sort();
      BTeamStreamManagersCNT.sort();
      setATeamStreamManagers(ATeamStreamManagersCNT);
      setBTeamStreamManagers(BTeamStreamManagersCNT);

      const quiz = await getGameData(session.sessionId);
      if (quiz !== undefined && quiz.length !== 0) {
        setQuizData(quiz);
      }

      setTurnPlayerId(ATeamStreamManagersCNT[0]);
      setLoading(false);
    };

    callData();
  }, []);

  const goWaitRoom = () => {
    sendPlayDone();
    if (ATeamScore > BTeamScore) {
      endPlay(session.sessionId, "A", ATeamScore, BTeamScore);
    } else if (ATeamScore < BTeamScore) {
      endPlay(session.sessionId, "B", BTeamScore, ATeamScore);
    } else {
      if (rand01 > 0) {
        endPlay(session.sessionId, "A", ATeamScore, BTeamScore);
      } else {
        endPlay(session.sessionId, "B", BTeamScore, ATeamScore);
      }
    }
  };
  useEffect(() => {
    // 키보드 입력에 반응하여 특정 액션 실행
    const handleKeyPress = (event) => {
      switch (event.key) {
        case "[": // 화면 가리기
          itemUse(myTeam, "meme");
          sendNotice(myTeam, "meme");
          break;
        case "]": // 채팅 막기
          itemUse(myTeam, "disable");
          sendNotice(myTeam, "disable");
          break;
        case "\\":
          if (gameCategory === 102) {
            // gameCategory가 102일 때 hint
            itemUse(myTeam, "hint");
            sendNotice(myTeam, "hint");
          } else if (gameCategory === 101) {
            // gameCategory가 101일 때 talk
            if (myTeam === turnPlayerId[2]) {
              itemUse(myTeam, "stt")
              sendNotice(myTeam, "stt");
            }
            else { alert("우리 팀의 차례에만 사용 가능합니다.") }
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [myTeam, itemUse,turnPlayerId]);

  const [showHintAnimation, setShowHintAnimation] = useState(false);
  const [showSttAnimation, setShowSttAnimation] = useState(false);

  useEffect(() => {
    if (hintUse) {
      setShowHintAnimation(true); // 애니메이션 시작
      setTimeout(() => {
        setShowHintAnimation(false); // 애니메이션 숨김
      }, 5000); // 애니메이션 지속 시간과 일치해야 함
    }
  }, [hintUse]);

  // useEffect(() => {
  //   if (sttUse) {
  //     setTimeout(() => {
  //       setShowSttAnimation(true); // 변환된 텍스트를 화면에 표시

  //       setTimeout(() => {
  //         setShowSttAnimation(false);
  //       }, 5000);
  //     }, 3000);
  //   }
  // }, [sttUse]);
  useEffect(() => {
    if (sttMsg) {
      // sttMsg에 값이 있을 때 실행할 로직
      // 예: 메시지 표시 애니메이션 활성화
      setShowSttAnimation(true);
      // 일정 시간(예: 5초) 후에 메시지를 화면에서 숨기기
      setTimeout(() => {
        setShowSttAnimation(false);
      }, 5000);
    }
  }, [sttMsg]);

  return (
    <>
      {loading ? (
        <p>loading</p>
      ) : (
        <main className="game-container bg-stone-100 p-4 border rounded-3xl">
          <div className="flex flex-row justify-around h-full">
            <section className="grid grid-rows-4 gap-2 mr-2">
              {ATeamStreamManagers.map((sub, i) => (
                <>
                  {myConnectionId === sub[0] ? (
                    <div key={`A${i}`} className="cam bg-tab10">
                      <UserVideoComponent
                        streamManager={sub[1]}
                        session={session}
                        gamePlayer={turnPlayerId[0]}
                        gameCategory={gameCategory}
                      />
                    </div>
                  ) : (
                    <div key={`A${i}`} className="cam bg-tab1">
                      <UserVideoComponent
                        streamManager={sub[1]}
                        session={session}
                        gamePlayer={turnPlayerId[0]}
                        gameCategory={gameCategory}
                      />
                    </div>
                  )}
                </>
              ))}
            </section>
            <article className="h-full aspect-[12/10] relative flex flex-col">
              <div className="w-full flex justify-around items-end bg-tab10 rounded-t-[17px]">
                <p className={ATeamScore > BTeamScore ? "text-2xl" : "text-lg"}>A : {ATeamScore}</p>
                {/* <p> Team: {TeamTurn}</p> */}
                <p className="text-3xl">Round {round}</p>
                {/* <p>{time}</p> */}
                <p className={ATeamScore < BTeamScore ? "text-2xl" : "text-lg"}>B : {BTeamScore}</p>
              </div>
              <section className="relative rounded-b-[17px] overflow-hidden">
                {gameCategory === 101 ? (
                  <G101
                    gameLoading={gameLoading}
                    maxTime={maxTime}
                    setTime={setTime}
                    time={time}
                    maxRound={maxRound}
                    setRound={setRound}
                    round={round}
                    session={session}
                    setGameLoading={setGameLoading}
                    ATeamScore={ATeamScore}
                    BTeamScore={BTeamScore}
                    isGameEnd={isGameEnd}
                    goWaitRoom={goWaitRoom}
                    turnPlayerId={turnPlayerId}
                    myConnectionId={myConnectionId}
                    myUserName={myUserName}
                    myTeam={myTeam}
                    quizData={quizData}
                    quizIndex={quizIndex}
                    setQuizIndex={setQuizIndex}
                    teamChangeLoading={teamChangeLoading}
                    changeTeamTurn={changeTeamTurn}
                    setIsGameEnd={setIsGameEnd}
                    plusScore={plusScore}
                    changeTeamIndex={changeTeamIndex}
                    plusQuizIndex={plusQuizIndex}
                    rand01={rand01}
                    memeAttack={memeAttack}
                    hintUse={hintUse}
                  />
                ) : null}
                {gameCategory === 102 ? (
                  <G102
                    gameLoading={gameLoading}
                    maxTime={maxTime}
                    setTime={setTime}
                    time={time}
                    maxRound={maxRound}
                    setRound={setRound}
                    round={round}
                    session={session}
                    setGameLoading={setGameLoading}
                    ATeamScore={ATeamScore}
                    BTeamScore={BTeamScore}
                    isGameEnd={isGameEnd}
                    goWaitRoom={goWaitRoom}
                    turnPlayerId={turnPlayerId}
                    myConnectionId={myConnectionId}
                    myUserName={myUserName}
                    myTeam={myTeam}
                    quizData={quizData}
                    quizIndex={quizIndex}
                    setQuizIndex={setQuizIndex}
                    teamChangeLoading={teamChangeLoading}
                    changeTeamTurn={changeTeamTurn}
                    setIsGameEnd={setIsGameEnd}
                    plusScore={plusScore}
                    changeTeamIndex={changeTeamIndex}
                    plusQuizIndex={plusQuizIndex}
                    rand01={rand01}
                    memeAttack={memeAttack}
                    hintUse={hintUse}
                  />
                ) : null}
                {/* <button onClick={sendPlayDone}>playDone</button> */}
                <div>
                  {gameCategory === 101 && showSttAnimation ? (
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 z-10 border-2 border-slate-500 bg-white p-2 rounded-md shadow-lg">
                      <span className="text-lg">{sttMsg}</span> {/* STT 메시지 표시 */}
                    </div>
                  ) : gameCategory === 102 && showHintAnimation ? (
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 z-10 border-2 border-slate-500 bg-white p-2 rounded-md shadow-lg">
                      <span className="text-lg">{getInitials(quizData[quizIndex].quizAnswer)}</span>
                      {/* 초성 힌트 표시 */}
                    </div>
                  ) : null}
                </div>
                {turnPlayerId !== undefined ? (
                  <Chat
                    myUserName={myUserName}
                    session={session}
                    myConnectionId={myConnectionId}
                    gamePlayer={turnPlayerId[0]}
                    gameCategory={gameCategory}
                    quizIndex={quizIndex}
                    myTeam={myTeam}
                    Team={turnPlayerId[2]}
                    setQuizIndex={setQuizIndex}
                    changeTeamIndex={changeTeamIndex}
                    answer={quizData[quizIndex].quizAnswer}
                    plusScore={plusScore}
                    disableAttack={disableAttack}
                  />
                ) : null}
              </section>
            </article>
            <section className="grid grid-rows-4 gap-2 ml-2">
              {BTeamStreamManagers.map((sub, i) => (
                <>
                  {myConnectionId === sub[0] ? (
                    <div key={`B${i}`} className="cam bg-tab10">
                      <UserVideoComponent
                        streamManager={sub[1]}
                        session={session}
                        gamePlayer={turnPlayerId[0]}
                        gameCategory={gameCategory}
                      />
                    </div>
                  ) : (
                    <div key={`B${i}`} className="cam bg-tab12">
                      <UserVideoComponent
                        streamManager={sub[1]}
                        session={session}
                        gamePlayer={turnPlayerId[0]}
                        gameCategory={gameCategory}
                      />
                    </div>
                  )}
                </>
              ))}
            </section>
          </div>

          <div className="bg-white p-1 rounded-3xl border-2 border-slate-500 mt-[-15px] flex justify-center mx-auto max-w-60">
            <div className="text-center">
              <h1 className="text-2xl mt-1 mb-2">아이템</h1>
              <div className="flex">
                <div className="relative">
                  <Tooltip title="화면 가리기" arrow>
                    <Badge
                      badgeContent={
                        <span style={{ fontSize: "1.5em" }} className="mb-1">
                          [
                        </span>
                      }
                      color="primary"
                      overlap="circular"
                      sx={{
                        "& .MuiBadge-badge": {
                          height: "30px", // 뱃지 높이 조정
                          minWidth: "30px", // 뱃지 최소 너비 조정
                        },
                      }}
                    >
                      <button
                        onClick={() => {
                          itemUse(myTeam, "meme");
                          sendNotice(myTeam, "meme");
                        }}
                        className={`rounded-full w-16 h-16 m-1 ${meme === 0 ? "grayscale" : ""}`}
                        disabled={meme === 0} // 선택적으로 버튼을 비활성화
                      >
                        <img src={chipi} alt="chipi" className="rounded-full w-16 h-16" />
                      </button>
                    </Badge>
                  </Tooltip>
                  {/* 조건부로 BlockIcon 렌더링 */}
                  {meme === 0 && (
                    <div className="absolute top-0 right-0">
                      <BlockIcon style={{ color: "red", fontSize: "4.5rem" }} />
                    </div>
                  )}
                </div>
                <div className="relative">
                  <Tooltip title="채팅 막기" arrow>
                    <Badge
                      badgeContent={
                        <span style={{ fontSize: "1.5em" }} className="mb-1">
                          ]
                        </span>
                      }
                      color="primary"
                      overlap="circular"
                      sx={{
                        "& .MuiBadge-badge": {
                          height: "30px", // 뱃지 높이 조정
                          minWidth: "30px", // 뱃지 최소 너비 조정
                        },
                      }}
                    >
                      <button
                        onClick={() => {
                          itemUse(myTeam, "disable");
                          sendNotice(myTeam, "disable");
                        }}
                        className={`rounded-full w-16 h-16 m-1 ${disable === 0 ? "grayscale" : ""}`}
                        disabled={disable === 0} // 선택적으로 버튼을 비활성화
                      >
                        <img src={stop} alt="stop" className="rounded-full w-16 h-16" />
                      </button>
                    </Badge>
                  </Tooltip>
                  {/* 조건부로 BlockIcon 렌더링 */}
                  {disable === 0 && (
                    <div className="absolute top-0 right-0">
                      <BlockIcon style={{ color: "red", fontSize: "4.5rem" }} />
                    </div>
                  )}
                </div>
                <div className="relative">
                  {gameCategory === 102 ? (
                    <>
                      <Tooltip title="초성 힌트" arrow>
                        <Badge
                          badgeContent={<span style={{ fontSize: "2em" }}>\</span>}
                          color="primary"
                          overlap="circular"
                          sx={{
                            "& .MuiBadge-badge": {
                              height: "30px", // 뱃지 높이 조정
                              minWidth: "30px", // 뱃지 최소 너비 조정
                            },
                          }}
                        >
                          <button
                            onClick={() => {
                              itemUse(myTeam, "hint");
                              sendNotice(myTeam, "hint");
                            }}
                            className={`rounded-full w-16 h-16 m-1 ${hint === 0 ? "grayscale" : ""
                              }`}
                            disabled={hint === 0} // 선택적으로 버튼을 비활성화
                          >
                            <img src={gethint} alt="hint" className="rounded-full w-16 h-16" />
                          </button>
                        </Badge>
                      </Tooltip>
                      {hint === 0 && (
                        <div className="absolute top-0 right-0">
                          <BlockIcon style={{ color: "red", fontSize: "4.5rem" }} />
                        </div>
                      )}
                    </>
                  ) : (
                    //stt
                    <>
                      <Tooltip title="말풍선" arrow>
                        <Badge
                          badgeContent={<span style={{ fontSize: "2em" }}>\</span>}
                          color="primary"
                          overlap="circular"
                          sx={{
                            "& .MuiBadge-badge": {
                              height: "30px", // 뱃지 높이 조정
                              minWidth: "30px", // 뱃지 최소 너비 조정
                            },
                          }}
                        >
                          <button
                            onClick={() => {
                              if (myTeam === turnPlayerId[2]) {
                                itemUse(myTeam, "stt");
                                sendNotice(myTeam, "stt");
                              }
                              else alert("우리 팀의 차례에만 사용 가능합니다.");
                            }}
                            className={`rounded-full w-16 h-16 m-1 ${stt === 0 ? "grayscale" : ""}`}
                            disabled={stt === 0} // 선택적으로 버튼을 비활성화
                          >
                            <img src={talk} alt="talk" className="rounded-full w-16 h-16" />
                          </button>
                        </Badge>
                      </Tooltip>
                      {stt === 0 && (
                        <div className="absolute top-0 right-0">
                          <BlockIcon style={{ color: "red", fontSize: "4.5rem" }} />
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      )}
    </>
  );
};

export default Game;
