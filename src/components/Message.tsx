function Message({ id, author, content }: IMessage) {
  const isMine = (author: string) => author === "moi";

  return (
    <article
      className={`message message-${id} message--${
        isMine(author) ? "self" : "notself"
      }`}
    >
      <p className="message__author">{author}</p>
      <p className="message__content">{content}</p>
    </article>
  );
}
export default Message;
