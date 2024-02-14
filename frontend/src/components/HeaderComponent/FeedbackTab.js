import { useState } from "react";
import FeedbackModal from "../Modal/FeedbackModal";
import useClick from "../../hooks/useClick";
const FeedbackTab = () => {
  const [feedback, setFeedback] = useState(false);
  const { playClick } = useClick();
  return (
    <>
      <button
        className="text-center rounded-t-lg bg-tab5 py-2 px-5 text-xl transform origin-bottom transition duration-200 hover:scale-y-125"
        onClick={() => {
          setFeedback(!feedback);
          playClick();
        }}
      >
        피드백
      </button>
      {feedback === true ? <FeedbackModal feedback={feedback} setFeedback={setFeedback} /> : null}
    </>
  );
};

export default FeedbackTab;
