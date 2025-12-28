"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";
import { products } from "@/data/products";

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! 👋 Welcome to DotScent! I'm here to help you discover your perfect fragrance. How can I assist you today?",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickReplies = [
    "Show products",
    "Prices",
    "Contact info",
    "Business hours",
  ];

  // Helper function for fuzzy matching product names
  const findProductByName = (searchTerm: string) => {
    const search = searchTerm.toLowerCase().trim();

    // Exact match first
    let product = products.find((p) => p.name.toLowerCase() === search);
    if (product) return product;

    // Partial match - if product name contains search or search contains product name
    product = products.find((p) => {
      const name = p.name.toLowerCase();
      return name.includes(search) || search.includes(name);
    });
    if (product) return product;

    // Fuzzy match - check if most letters match
    for (const p of products) {
      const name = p.name.toLowerCase();
      let matchCount = 0;
      for (const char of search) {
        if (name.includes(char)) matchCount++;
      }
      // If 70% of letters match, consider it a match
      if (matchCount / search.length >= 0.7) {
        return p;
      }
    }

    return null;
  };

  // Format price correctly
  const formatPrice = (price: number) => {
    return `Rs${price.toLocaleString()}`;
  };

  // Knowledge base for bot responses
  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();

    // Check for specific product name in the query first
    const words = message.split(/\s+/);
    for (const word of words) {
      if (word.length > 2) {
        // Ignore very short words
        const product = findProductByName(word);
        if (product) {
          // Check what user is asking about this product
          if (
            message.includes("price") ||
            message.includes("cost") ||
            message.includes("how much")
          ) {
            return `${product.name} is priced at ${formatPrice(
              product.price
            )} for 50ml. 💰\n\nIt's a ${
              product.category
            } fragrance with this beautiful description:\n"${
              product.description
            }"\n\nWould you like to add it to your cart or know more?`;
          } else {
            return `${product.name} ✨\n\nCategory: ${
              product.category.charAt(0).toUpperCase() +
              product.category.slice(1)
            }\nPrice: ${formatPrice(product.price)} (50ml)\n\nDescription:\n${
              product.description
            }\n\nInterested? I can help you add it to your cart! 🛒`;
          }
        }
      }
    }

    // General product queries
    if (
      message.includes("product") ||
      message.includes("perfume") ||
      message.includes("fragrance") ||
      message.includes("show") ||
      message.includes("what do you have") ||
      message.includes("collection")
    ) {
      const featuredProducts = products.filter((p) => p.featured);
      return `We have ${
        products.length
      } luxury perfumes! Here are our bestsellers:\n\n${featuredProducts
        .map((p) => `✨ ${p.name} - ${formatPrice(p.price)} (${p.category})`)
        .join(
          "\n"
        )}\n\nWant to know more about any specific fragrance? Just ask! 😊`;
    }

    // General price queries
    if (
      message.includes("price range") ||
      (message.includes("price") && !message.includes("what"))
    ) {
      const prices = products.map((p) => p.price);
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);
      return `Our perfumes range from Rs${minPrice.toLocaleString()} to Rs${maxPrice.toLocaleString()} for 50ml bottles. 💎\n\nAll our fragrances are premium quality luxury perfumes crafted with the finest ingredients.\n\nWould you like to know the price of a specific perfume? Just name it!`;
    }

    // Contact info
    if (
      message.includes("contact") ||
      message.includes("phone") ||
      message.includes("email") ||
      message.includes("reach") ||
      message.includes("call")
    ) {
      return `You can reach us through:\n\n📞 Phone: +92 319 463 5913\n📧 Email: dotscent2025@gmail.com\n📍 Location: Karachi, Sindh, Pakistan\n💬 WhatsApp: Available 24/7\n\nFeel free to contact us anytime! We're here to help. 😊`;
    }

    // Business hours
    if (
      message.includes("hour") ||
      message.includes("open") ||
      message.includes("timing") ||
      message.includes("available") ||
      message.includes("when")
    ) {
      return `We're available 24/7 to serve you! 🕐\n\nBusiness days: Monday - Saturday\nCustomer support: Round the clock\n\nYou can reach us anytime through WhatsApp, email, or phone. How can I help you today?`;
    }

    // Shipping/delivery
    if (
      message.includes("ship") ||
      message.includes("delivery") ||
      message.includes("deliver") ||
      message.includes("free")
    ) {
      return `We offer FREE delivery on all orders! 🚚✨\n\nDelivery is available across Pakistan. Orders are typically processed within 24-48 hours.\n\nFor international shipping, please contact us directly at +92 319 463 5913.`;
    }

    // About DotScent
    if (
      message.includes("about") ||
      message.includes("who are you") ||
      message.includes("company") ||
      message.includes("dotscent")
    ) {
      return `DotScent is a luxury fragrance brand founded in 2025 in Karachi, Pakistan. 🌟\n\nCEO: Mr. Rizwan Khalil\n\nWe specialize in premium, authentic perfumes crafted with the finest ingredients from around the world. Each bottle is a masterpiece of craftsmanship and passion!\n\nVisit our About page to learn more about our journey! 📖`;
    }

    // Greetings
    if (
      message.includes("hello") ||
      message.includes("hi") ||
      message.includes("hey") ||
      message.includes("good morning") ||
      message.includes("good evening")
    ) {
      return `Hello! 👋 Welcome to DotScent! I'm here to help you find the perfect luxury fragrance.\n\nYou can ask me about:\n• Our perfume collection\n• Specific product details\n• Prices and offers\n• Contact information\n• Shipping & delivery\n\nWhat would you like to know?`;
    }

    // Thanks
    if (message.includes("thank") || message.includes("thanks")) {
      return `You're very welcome! 😊 I'm always here to help.\n\nIs there anything else you'd like to know about our fragrances or services?`;
    }

    // Help or confused
    if (message.includes("help") || message.includes("?")) {
      return `I'm here to help! 🤗 I can assist you with:\n\n✨ Browsing our perfume collection\n💰 Pricing and product details\n📞 Contact information\n🕐 Business hours\n🚚 Shipping & delivery info\n📖 About DotScent\n\nJust ask me anything! For example:\n• "Show products"\n• "What's the price of Jamaal?"\n• "Tell me about K.Soul"\n• "How can I contact you?"`;
    }

    // Default response
    return `I'd love to help you! 😊\n\nI can assist you with:\n✨ Our luxury perfume collection\n💰 Product prices and details\n📞 Contact information\n🕐 Business hours\n🚚 Shipping & delivery\n\nTry asking me:\n• "Show me your products"\n• "What's the price of [perfume name]?"\n• "Tell me about [perfume name]"\n• "How can I contact you?"\n\nWhat would you like to know?`;
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse = getBotResponse(inputMessage);
      const botMessage: Message = {
        id: messages.length + 2,
        text: botResponse,
        isBot: true,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleQuickReply = (reply: string) => {
    setInputMessage(reply);
    setTimeout(() => handleSendMessage(), 100);
  };

  return (
    <>
      {/* Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-16 h-16 gradient-gold rounded-full shadow-2xl flex items-center justify-center group"
          >
            <MessageCircle className="w-7 h-7 text-black group-hover:scale-110 transition-transform" />

            {/* Notification Dot */}
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-black animate-pulse" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-2rem)] h-[600px] max-h-[calc(100vh-2rem)] glass-premium rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gold-500/30"
          >
            {/* Header */}
            <div className="gradient-gold p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-gold-500" />
                </div>
                <div>
                  <h3 className="font-bold text-black">DotScent Assistant</h3>
                  <p className="text-xs text-black/70">
                    Online • Replies instantly
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-black hover:bg-black/10 rounded-full p-2 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gradient-to-b from-gray-900/50 to-black/50">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${
                    message.isBot ? "justify-start" : "justify-end"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl p-3 ${
                      message.isBot
                        ? "bg-gray-800 text-white"
                        : "gradient-gold text-black"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">
                      {message.text}
                    </p>
                    <p className="text-xs mt-1 opacity-60">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-gray-800 rounded-2xl p-3">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            {messages.length === 1 && (
              <div className="px-4 py-2 flex flex-wrap gap-2 bg-gray-900/30">
                {quickReplies.map((reply, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickReply(reply)}
                    className="px-3 py-1.5 text-xs bg-gold-500/20 text-gold-500 rounded-full hover:bg-gold-500/30 transition-colors border border-gold-500/30"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="p-4 bg-gray-900/50 border-t border-gray-800">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 glass rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold-500"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim()}
                  className="w-10 h-10 gradient-gold rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4 text-black" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
