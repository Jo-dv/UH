const Chat = () => {
  return (
    <section className="bg-neutral-300 font-['pixel'] 
    border rounded-3xl overflow-hidden">
      <h2 className="bg-neutral-400 px-8">채팅</h2>
      <div>
        <ul className='mx-4 my-4 px-2 border rounded-3xl h-32 bg-white'>
          <li>일단 넣음: ㅇㅇ</li>
          <li>일단 넣음: 22</li>
        </ul>
        <form className='mx-4 my-4 px-2 
          border rounded-3xl bg-white
          flex'>
          <input type="text" placeholder='채팅을 입력해 주세요!'
            className="flex-auto"/>
          <button className="flex-none m-1 px-2 border-l-2 border-solid">채팅</button>
        </form>
      </div>
    </section>
    )
}

export default Chat;