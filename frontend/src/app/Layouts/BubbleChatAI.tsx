import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots, faTimes } from '@fortawesome/free-solid-svg-icons';
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

  const API_URL = 'http://localhost:3005';

  const toggleChat = async () => {
    setIsChatOpen((prev) => !prev);

    if (!isChatOpen) {
      try {
        const response = await axios.post(`${API_URL}/open`, {
          user_id: 'user-123',
        });
        console.log('Session initialized:', response.data);
        setSessionId(response.data.user_id);
      } catch (error) {
        console.error('Error initializing session:', error);
        setIsChatOpen(false);
      }
    } else {
      if (sessionId) {
        try {
          await axios.post(`${API_URL}/close`, { user_id: sessionId });
        } catch (error) {
          console.error('Error closing session:', error);
        }
      }
      setSessionId(null);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || !sessionId) return;

    const message = input;
    setMessages((prev) => [...prev, { sender: 'user', text: message }]);
    setInput('');

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
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Toggle Icon with bounce animation */}
      <button
        onClick={toggleChat}
        className={`bg-green-600 text-white p-4 rounded-full shadow-lg focus:outline-none hover:bg-green-700 transition ${!isChatOpen ? 'animate-bounce' : ''}`}
      >
        <FontAwesomeIcon
          icon={isChatOpen ? faTimes : faCommentDots}
          className="w-12 h-12"
        />
      </button>

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
                          ? '/user-avatar.png'
                          : '/bot-avatar.png'
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
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center mt-4 space-x-3">
            <input
              type="text"
              placeholder="Type your message..."
              className="input input-bordered flex-1"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button
              className="btn btn-primary px-6"
              onClick={handleSend}
              disabled={!input.trim()}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBubble;
