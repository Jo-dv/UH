import { useState } from "react";
import FeedbackModal from "../Modal/FeedbackModal";

const FeedbackTab = () => {
  const [feedback, setFeedback] = useState(false);
  return (
    <>
      <button
        className="w-20 text-center rounded-t-lg bg-tab5 p-2 transform origin-bottom transition duration-200 hover:scale-y-125"
        onClick={() => {
          setFeedback(!feedback);
        }}
      >
        피드백
      </button>
      {feedback === true ? <FeedbackModal feedback={feedback} setFeedback={setFeedback} /> : null}
    </>
  );
};

export default FeedbackTab;
