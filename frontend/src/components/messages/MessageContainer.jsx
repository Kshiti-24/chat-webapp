import { useEffect } from "react";
import useConversation from "../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";
import { BiXCircle } from "react-icons/bi";
import { useAuthContext } from "../../context/AuthContext";
import { useState } from "react";
import { formatLastSeen } from "../../utils/formatLastSeen";
import { useSocketContext } from "../../context/SocketContext";

const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation, updateConversation } =
    useConversation();
  const { onlineUsers } = useSocketContext();

  useEffect(() => {
    return () => {
      setSelectedConversation(null);
    };
  }, [setSelectedConversation]);

  useEffect(() => {
    if (!selectedConversation) return;

    const isOnline = onlineUsers.includes(selectedConversation._id);

    if (isOnline) {
      updateConversation({
        currentStatus: "online",
      });
    } else {
      updateConversation({
        currentStatus: "offline",
      });
    }
  }, [onlineUsers, selectedConversation?._id]);

  return (
    <div className="md:min-w-[450px] flex flex-col">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          <div className="bg-slate-500 px-4 py-2 mb-2 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <img
                className="w-12 h-12 rounded-full object-cover"
                src={selectedConversation?.profilePicture}
                alt="user avatar"
              />
              <div className="flex flex-col leading-tight">
                <span className="text-gray-900 font-bold text-lg">
                  {selectedConversation?.fullName}
                </span>

                {/* <StatusWithDelay conversation={selectedConversation} /> */}
              </div>
            </div>

            <BiXCircle
              className="w-6 h-6 text-gray-300 cursor-pointer hover:text-white"
              onClick={() => setSelectedConversation(null)}
            />
          </div>
          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};

export default MessageContainer;

const StatusWithDelay = ({ conversation }) => {
  const [showStatus, setShowStatus] = useState(false);
  const [statusText, setStatusText] = useState("");

  useEffect(() => {
    setShowStatus(false);

    const timer = setTimeout(() => {
      if (conversation?.currentStatus === "online") {
        setStatusText("online");
      } else {
        setStatusText(formatLastSeen(conversation?.lastActive));
      }
      setShowStatus(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, [conversation?.currentStatus, conversation?.lastActive]);

  return (
    <div className="relative h-5">
      {showStatus && (
        <span
          key={statusText}
          className={`text-sm ${
            conversation?.currentStatus === "online"
              ? "text-green-400"
              : "text-gray-200"
          } animate-slideUp`}
        >
          {statusText}
        </span>
      )}
    </div>
  );
};

const NoChatSelected = () => {
  const { authUser } = useAuthContext();

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>Welcome 👋 {authUser?.fullName} ❄</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};
