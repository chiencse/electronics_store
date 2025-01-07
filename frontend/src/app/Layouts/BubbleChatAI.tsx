import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

interface Message {
  sender: 'user' | 'bot';
  text: string;
}

const ChatBubble = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [sending, setSending] = useState<boolean>(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const API_URL = 'http://localhost:3005';

 
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const openSession = async () => {
      try {
        const response = await axios.post(`${API_URL}/open`, {
          user_id: 'user-123',
        });
        console.log('Session initialized:', response.data);
        setSessionId(response.data.user_id);
        setIsChatOpen(true);
      } catch (error) {
        console.error('Error initializing session:', error);
      }
    };

    const closeSession = async () => {
      if (sessionId) {
        try {
          await axios.post(`${API_URL}/close`, { user_id: sessionId });
          console.log('Session closed');
        } catch (error) {
          console.error('Error closing session:', error);
        }
      }
    };

    openSession();

    return () => {
      closeSession();
    };
  }, [sessionId]);

  // Autoscroll to the bottom whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || !sessionId) return;

    const message = input;
    setMessages((prev) => [...prev, { sender: 'user', text: message }]);
    setInput('');
    setIsTyping(true);
    setSending(true);

    try {
      const response = await axios.post(`${API_URL}/query`, {
        user_id: sessionId,
        user_query: message,
      });
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: response.data.response },
      ]);
    } catch (error) {
      console.error('Error fetching bot response:', error);
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: 'Oops! Something went wrong.' },
      ]);
    } finally {
      setIsTyping(false);
      setSending(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Toggle Icon */}
      <div className="relative">
        {isChatOpen ? (
          <button
            onClick={() => setIsChatOpen((prev) => !prev)}
            className="text-white p-4 rounded-full shadow-lg focus:outline-none hover:bg-red-500 transition bg-red-500 absolute top-[-0.5rem] right-3"
          >
            X
          </button>
        ) : (
          <button
            onClick={() => setIsChatOpen((prev) => !prev)}
            className="text-white relative p-4 rounded-full shadow-lg focus:outline-none hover:bg-red-500 transition animate-bounce"
          >
            <img
              src="/terminator-skull-head-grim-sticker.png"
              className="w-24 h-24"
              alt=""
            />
            <div className="absolute top-[-1.5rem] right-20 chat chat-end w-40">
              <div className="chat-bubble animate-bounce">Ask me something!</div>
            </div>
          </button>
        )}
      </div>

      {/* Chat Interface */}
      {isChatOpen && (
        <div className="w-[90vw] lg:w-[35vw] h-[70vh] bg-white shadow-2xl rounded-lg flex flex-col p-6 mt-4">
          <div className="flex-1 overflow-y-auto space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`chat ${
                  message.sender === 'user' ? 'chat-end' : 'chat-start'
                }`}
              >
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img
                      src={
                        message.sender === 'user'
                          ? '/frog.png'
                          : '/terminator-skull-head-grim-sticker.png'
                      }
                      alt={`${message.sender} avatar`}
                    />
                  </div>
                </div>
                <div
                  className={`chat-bubble ${
                    message.sender === 'user'
                      ? 'chat-bubble-primary bg-blue-600 text-white'
                      : 'chat-bubble-secondary bg-gray-200 text-black'
                  }`}
                  style={{ whiteSpace: 'pre-line' }} // Preserve line breaks
                >
                  {message.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="chat chat-start">
                <div className="chat-bubble chat-bubble-secondary bg-gray-200 text-black">
                  Typing...
                </div>
              </div>
            )}
            <div ref={chatEndRef} /> {/* Empty div to scroll into view */}
          </div>
          <div className="flex items-center mt-4 space-x-3">
            <input
              type="text"
              placeholder="Type your message..."
              className="input input-bordered flex-1"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              disabled={sending} // Disable input while sending
            />
            <button
              className="btn btn-primary px-6"
              onClick={handleSend}
              disabled={!input.trim() || sending} // Disable button while sending
            >
              {sending ? 'Sending...' : 'Send'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBubble;
