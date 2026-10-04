import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { apiPost } from '../api';
import { MessageSquare, X, Send, Bot, User } from 'lucide-react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi there! I am the VigiThink AI Assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsTyping(true);

    try {
      // Pass recent context so the AI remembers the conversation (server also caps/sanitises it)
      const conversationHistory = messages.slice(-10).map(m => ({ role: m.role, content: m.content }));
      const data = await apiPost('/api/chat', { message: userMsg, conversationHistory });
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply || 'Sorry, I could not generate a reply. Please try again.' }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I am unable to respond right now. Please try again in a moment or email info@vigithink.com.' }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-24 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="absolute bottom-16 right-0 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col"
            style={{ height: '500px', maxHeight: '80vh' }}
          >
            {/* Header */}
            <div className="bg-primary text-white p-4 flex justify-between items-center shadow-md z-10">
              <div className="flex items-center space-x-2">
                <Bot className="w-6 h-6" />
                <h3 className="font-bold font-heading">VigiThink AI</h3>
              </div>
              <button onClick={() => setIsOpen(false)} aria-label="Close chatbot" className="text-white/80 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat History */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50" aria-live="polite">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${msg.role === 'user' ? 'bg-slate-200 ml-2' : 'bg-accent mr-2'}`}>
                      {msg.role === 'user' ? <User className="w-4 h-4 text-slate-600" aria-label="User" /> : <Bot className="w-4 h-4 text-white" aria-label="Bot" />}
                    </div>
                    <div className={`p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.role === 'user' ? 'bg-primary text-white rounded-tr-none' : 'bg-white border border-slate-100 text-[#000080] rounded-tl-none font-medium'}`}>
                      {msg.content}
                    </div>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex max-w-[80%] flex-row">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center bg-accent mr-2">
                      <Bot className="w-4 h-4 text-white" aria-label="Bot typing" />
                    </div>
                    <div className="p-4 rounded-2xl bg-white border border-slate-100 text-slate-400 rounded-tl-none flex space-x-1 items-center shadow-sm">
                      <span className="sr-only">Bot is typing...</span>
                      <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-100 flex items-center">
              <label htmlFor="chat-input" className="sr-only">Type your message</label>
              <input 
                id="chat-input"
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about our services..." 
                className="flex-1 bg-slate-50 border border-slate-200 rounded-full px-4 py-2.5 text-slate-900 text-sm font-medium focus:outline-none focus:border-primary transition-colors"
                disabled={isTyping}
              />
              <button 
                type="submit" 
                disabled={!input.trim() || isTyping}
                aria-label="Send message"
                className="ml-2 bg-primary text-white p-2.5 rounded-full hover:bg-blue-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close chatbot" : "Open chatbot"}
        aria-expanded={isOpen}
        className="bg-primary text-white p-4 rounded-full shadow-xl hover:shadow-glow hover:bg-blue-800 transition-all flex items-center justify-center"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </motion.button>
    </div>
  );
};

export default Chatbot;
