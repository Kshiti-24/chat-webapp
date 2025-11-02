import { create } from "zustand";

const useConversation = create((set, get) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) =>
    set({ selectedConversation }),
  messages: [],
  setMessages: (messages) => set({ messages }),
  updateConversation: (data) => {
    const { selectedConversation } = get();
    if (!selectedConversation) return;
    set({
      selectedConversation: { ...selectedConversation, ...data },
    });
  },
}));

export default useConversation;
