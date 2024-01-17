import { useState } from 'react';

const CreateRoomModal = () => {
  const [ModalOpen, setModalOpen] = useState(false)
    const modalOnOff = () =>{
        setModalOpen(!ModalOpen);
    }
  return(
    <form className="bg-formBG p-2 flex flex-col">
      <label>방제목: <input type="text" /></label>
      <label>비밀번호: <input type="text" /></label>
      <div>참가인원: 
        <input type="radio" value={4} name="num"/>
        <input type="radio" value={6} name="num"/>
        <input type="radio" value={8} name="num"/>
      </div>
      <div>게임선택: 
        <input type="radio" value={'game1'} name="game"/>
        <input type="radio" value={'game2'} name="game"/>
      </div>
    </form>
  )
}

export default CreateRoomModal