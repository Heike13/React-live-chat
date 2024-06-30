import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { addMessage, changeInput } from "../store/reducers/chatReducer";
import useSound from "../hooks/useSound";
import sound from "../assets/messageSound.mp3";

function SendMessage() {
  const dispatch = useAppDispatch();
  const input = useAppSelector((store) => store.chat.input);
  const playSound = useSound(sound);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addMessage(input));
    playSound();
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current !== null) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        className="form__input"
        type="text"
        value={input}
        onChange={(event) => dispatch(changeInput(event.target.value))}
        placeholder="nouveau message..."
      />

      <button className="form__button" type="submit">
        ➡️
      </button>
    </form>
  );
}
export default SendMessage;
