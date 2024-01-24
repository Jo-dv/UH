import { useState } from "react";
import FeedbackModal from "../Modal/FeedbackModal";

const FeedbackTab = () => {
  const [feedback, setFeedback] = useState(false);
  return (
    <>
      <h3
        className="bg-mc6 p-2"
        onClick={() => {
          setFeedback(!feedback);
        }}
      >
        피드백
      </h3>
      {feedback === true ? <FeedbackModal feedback={feedback} setFeedback={setFeedback} /> : null}
    </>
  );
};

export default FeedbackTab;
