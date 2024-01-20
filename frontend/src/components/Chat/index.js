import { useState } from "react";

const Chat = ({session, myUserName}) => {
  const [chat,setChat] = useState('')
  const [receiveMsg,setReceiveMsg] = useState(`${myUserName}님 환영합니다`)
  const [messgaeList, setMessgaes] = useState([])
  const sendMsg = (e) => {
    e.preventDefault();
    console.log(session)
    session.signal({
      data: `${myUserName}: ${chat}`,  // Any string (optional)
      to: [],                     // Array of Connection objects (optional. Broadcast to everyone if empty)
      type: 'room-chat'             // The type of message (optional)
    })
    .then(() => {
        console.log('보냄 :', chat);
        setChat('')
        setMessgaes([...messgaeList, receiveMsg])
    })
    .catch(error => {
        console.error(error);
    });
  }
  session.on('signal:room-chat', (event) => {
    // console.log('받음')
    if (receiveMsg !== event.data){
      console.log('받음d :',event.data); // Message
    }
    setReceiveMsg(event.data)
    setMessgaes([...messgaeList, receiveMsg])
    // console.log(messgaeList)
    // console.log('폼',event.from); // Connection object of the sender
    // console.log('타입',event.type); // The type of message ("my-chat")
  });

  return (
    <section className="bg-neutral-300 
    border rounded-3xl overflow-hidden">
      <h2 className="bg-neutral-400 px-8">채팅</h2>
      <div>
        <ul className='mx-4 my-4 px-2 border rounded-3xl bg-white'>
          {messgaeList.map((item, index) => {
            return <li key={index}>{item}</li>
          })}
          <li>{receiveMsg}</li>
        </ul>
        <form className='mx-4 my-4 px-2 
          border rounded-3xl bg-white
          flex'
          onSubmit={sendMsg}>
          <input type="text" placeholder='채팅을 입력해 주세요!'
            className="flex-auto" value={chat} onChange={e => setChat(e.target.value)} />
          <button className="flex-none m-1 px-2 border-l-2 border-solid" 
            type="submit">채팅</button>
        </form>
      </div>
    </section>
    )
}

export default Chat;