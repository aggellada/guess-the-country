import { forwardRef } from "react";

const WrongModal = forwardRef(function RightModal({ startProgress }, ref) {
  return (
    <dialog ref={ref}>
      <h1>You are wrong!</h1>
      <button onClick={() => startProgress(ref)}>Next question</button>
    </dialog>
  );
});

export default WrongModal;
