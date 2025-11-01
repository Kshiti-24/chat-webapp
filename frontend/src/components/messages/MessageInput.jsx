import { useState } from "react";
import { BsSend, BsEmojiSmile } from "react-icons/bs";
import EmojiPicker from "emoji-picker-react";
import useSendMessage from "../../hooks/useSendMessage";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const { loading, sendMessage } = useSendMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message.trim() === "" || loading) return;
    await sendMessage(message);
    setMessage("");
    setShowEmojiPicker(false);
  };

  const handleEmojiClick = (emojiObject) => {
    setMessage((prev) => prev + emojiObject.emoji);
  };

  return (
    <form className="px-4 my-3" onSubmit={handleSubmit}>
      <div className="w-full relative">
        <div className="flex items-center bg-gray-700 border border-gray-600 rounded-lg p-2.5">
          <button
            type="button"
            onClick={() => setShowEmojiPicker((prev) => !prev)}
            className="text-gray-300 hover:text-white mr-2"
          >
            <BsEmojiSmile size={20} />
          </button>
          <input
            type="text"
            className="flex-1 bg-transparent text-sm text-white outline-none"
            placeholder="Send a message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            type="submit"
            disabled={loading}
            className="ml-2 text-gray-200 hover:text-white"
          >
            {loading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              <BsSend size={18} />
            )}
          </button>
        </div>
        {showEmojiPicker && (
          <div className="absolute bottom-12 left-0 z-50">
            <EmojiPicker
              onEmojiClick={handleEmojiClick}
              theme="dark"
              width={300}
            />
          </div>
        )}
      </div>
    </form>
  );
};

export default MessageInput;
