import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ChatMessage {
  id: string;
  user: string;
  text: string;
  timestamp: number;
  isMe: boolean;
}

const MOCK_MESSAGES: ChatMessage[] = [
  { id: '1', user: 'Jayesh Yadav', text: 'Hey team, are we still meeting at 2?', timestamp: Date.now() - 3600000, isMe: false },
  { id: '2', user: 'Kalpesh Roundhal', text: 'Yes, I will bring the updated designs.', timestamp: Date.now() - 3500000, isMe: false },
];

export const GroupChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(MOCK_MESSAGES);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [isOpen, messages]);

  const handleSend = () => {
    if (!inputText.trim()) return;
    const newMsg: ChatMessage = {
      id: crypto.randomUUID(),
      user: 'You',
      text: inputText,
      timestamp: Date.now(),
      isMe: true
    };
    setMessages([...messages, newMsg]);
    setInputText('');
    
    // Simulate a reply for demo purposes
    setTimeout(() => {
      const replierName = 'Jayesh Yadav';
      const reply = 'Hello how can I help today?';
      
      setMessages(prev => [...prev, {
        id: crypto.randomUUID(),
        user: replierName,
        text: reply,
        timestamp: Date.now(),
        isMe: false
      }]);
    }, 2000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-20 right-4 sm:bottom-24 sm:right-8 w-12 h-12 bg-blue-600 text-white rounded-full shadow-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all z-40 group ${isOpen ? 'hidden' : 'flex'}`}
      >
        <MessageSquare size={20} />
        <span className="absolute right-14 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none hidden sm:block">
          Team Chat
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 w-[calc(100vw-32px)] sm:w-96 h-[500px] max-h-[85vh] bg-white rounded-2xl shadow-xl border border-gray-100 flex flex-col z-50 overflow-hidden"
          >
            <div className="p-4 bg-gray-900 text-white flex justify-between items-center shrink-0">
              <div className="flex items-center gap-2">
                <MessageSquare size={18} />
                <h3 className="font-bold">Team Chat</h3>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white hover:bg-white/10 p-1 rounded transition-colors">
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map(msg => (
                <div key={msg.id} className={`flex flex-col ${msg.isMe ? 'items-end' : 'items-start'}`}>
                  <span className="text-[10px] text-gray-400 mb-1 px-1">{msg.user}</span>
                  <div className={`px-4 py-2 rounded-2xl max-w-[85%] text-sm ${msg.isMe ? 'bg-gray-900 text-white rounded-tr-sm' : 'bg-white border border-gray-100 text-gray-800 rounded-tl-sm shadow-sm'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-3 bg-white border-t border-gray-100 shrink-0">
              <div className="flex items-end gap-2 bg-gray-50 rounded-xl p-1 border border-gray-200 focus-within:border-gray-400 focus-within:ring-1 focus-within:ring-gray-400 transition-all">
                <textarea
                  value={inputText}
                  onChange={e => setInputText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type a message..."
                  className="w-full bg-transparent border-none focus:ring-0 resize-none max-h-32 min-h-[40px] px-3 py-2 text-sm outline-none"
                  rows={1}
                />
                <button
                  onClick={handleSend}
                  disabled={!inputText.trim()}
                  className="p-2 mb-1 mr-1 bg-gray-900 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800 transition-colors shrink-0"
                >
                  <Send size={16} className={inputText.trim() ? "translate-x-0.5" : ""} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
