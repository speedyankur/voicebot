import "./ChatItem.css";
const ChatItem = ({ msg }) => {
  const isBOT = msg.author === "BOT";
  return (
    <div className="chat-item">
      <span className={isBOT ? "bot" : "me"}>{msg.text}</span>
    </div>
  );
};

export default ChatItem;
