import { useState } from "react";
import FeedbackModal from "../Modal/FeedbackModal";
const FeedbackTab = () => {
  const [modal, setModal] = useState(false);
  return (
    <>
      <h3
        className="bg-mc6 p-2"
        onClick={() => {
          setModal(!modal);
        }}
      >
        피드백
      </h3>
      {modal && <FeedbackModal modal={modal} setModal={setModal} />}
    </>
  );
};

export default FeedbackTab;
