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
        <label>
          4명
          <input type="radio" value={4} name="num"/>
        </label>
        <label>
          6명
          <input type="radio" value={6} name="num"/>
        </label>
        <label>
          8명
          <input type="radio" value={8} name="num"/>
        </label>
      </div>
      <div>게임선택: 
        <input type="radio" value={'고요속의 침묵'} name="game"/>
        <input type="radio" value={'인물 맞추기'} name="game"/>
      </div>
    </form>
  )
}

export default CreateRoomModal