import { useEffect, useRef } from "react";
import { useAppSelector } from "../hooks/redux";
import { getMessages } from "../store/selectors/chatSelectors";
import Message from "./Message";

function MessageList() {
  const messages = useAppSelector(getMessages);
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (containerRef.current !== null) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  const nbrRendus = useRef(0);

  useEffect(() => {
    nbrRendus.current += 1;
    console.log(nbrRendus.current);
  });

  return (
    <section id="messages" ref={containerRef}>
      {messages.map((m) => (
        <Message key={m.id} {...m} />
      ))}
    </section>
  );
}
export default MessageList;
