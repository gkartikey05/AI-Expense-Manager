import { useState, useEffect, useRef, KeyboardEvent, ChangeEvent } from "react";
import { X, Send} from "lucide-react";
import axiosInstance from "@/api/axiosInstance";
import FloatingChatButton from "./FloatingChatButton";

const ROBOT_IMG_URL = "/robo.webp";

// message structure
interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

// response structure from API
interface AIResponse {
  reply?: string;
}

export default function FundlyChat() {
  const [open, setOpen] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  // Initial welcome message when opened
  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([
        {
          role: "assistant",
          content:
            "Hi, I am Fundly, your financial buddy 😊 Ask me about budgeting, saving, or investing!",
        },
      ]);
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [open, messages.length]);

  // Scroll to bottom on new messages
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleToggle = () => {
    setOpen((v) => !v);
  };

  //handle send messages
  const sendMessage = async () => {
    setError(null);
    const trimmed = input.trim();
    if (!trimmed) {
      setError("Please provide some text!");
      return;
    }

    const newMessages: ChatMessage[] = [
      ...messages,
      { role: "user", content: trimmed },
    ];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await axiosInstance.post<AIResponse>(
        "/ai/handle-prompt",
        { message: trimmed },
        { timeout: 120000 }
      );

      const replyText =
        res.data?.reply ?? "Sorry, I couldn't generate a response.";
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: replyText },
      ]);
    } catch (err) {
      console.error("AI Error:", err);
      setError("Something went wrong. Please try again.");
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I am having trouble reaching my brain right now. Try again in a moment!",
        },
      ]);
    } finally {
      setLoading(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  return (
    <>
      {/* Chat Window */}
      <div
        className={`fixed inset-x-0 bottom-0 z-50 transition-all duration-300 flex justify-end ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
        style={{ paddingBottom: "env(safe-area-inset-bottom, 16px)" }}
      >
        <div
          className={`w-[92vw] max-w-[380px] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl transform transition-all duration-300 flex flex-col ${
            open
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6 scale-95"
          }`}
          style={{ boxShadow: "0 20px 40px rgba(96, 24, 255, 0.12)" }}
          aria-hidden={!open}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-4 py-3 border-b dark:border-gray-800 rounded-t-2xl"
            style={{ background: "linear-gradient(90deg,#6d28d9, #7c3aed)" }}
          >
            <div className="flex items-center gap-3">
              <img
                src={ROBOT_IMG_URL}
                alt="fundly"
                className="w-10 h-10 rounded-full ring-2 ring-white"
              />
              <div>
                <div className="text-white font-semibold">Fundly</div>
                <div className="text-sm text-purple-100">
                  Your friendly finance buddy
                </div>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="p-2 rounded-lg hover:bg-white/10 transition"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>

          {/* Messages */}
          <div
            ref={containerRef}
            className="flex-1 overflow-y-auto px-4 py-4 space-y-3 hide-scrollbar"
            style={{ maxHeight: "80vh" }}
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${
                  m.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[78%] break-words px-4 py-2 rounded-xl ${
                    m.role === "user"
                      ? "bg-purple-600 text-white rounded-br-2xl rounded-tl-xl"
                      : "bg-gray-100 text-gray-900 rounded-bl-2xl rounded-tr-xl"
                  }`}
                >
                  <div className="text-sm whitespace-pre-wrap">{m.content}</div>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-900 px-3 py-2 rounded-xl rounded-tr-xl animate-pulse">
                  <TypingDots />
                </div>
              </div>
            )}

            {error && (
              <div className="text-xs text-red-600 text-center mt-2">
                {error}
              </div>
            )}
          </div>

          {/* Input area */}
          <div className="px-3 py-3 border-t dark:border-gray-800 rounded-b-2xl bg-white dark:bg-gray-900">
            <div className="flex gap-2 items-center">
              <textarea
                ref={inputRef}
                value={input}
                onChange={onChange}
                onKeyDown={onKeyDown}
                placeholder="Ask me about budgeting, saving, or investing..."
                className="flex-1 resize-none min-h-[42px] max-h-28 rounded-xl px-3 py-2 text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              <button
                onClick={sendMessage}
                disabled={loading}
                className="bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-full disabled:opacity-60 transition"
                aria-label="Send"
              >
                {!loading ? <Send className="w-4 h-4" /> : <LoaderSmall />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Button */}
      <FloatingChatButton
        open={open}
        handleToggle={handleToggle}
        ROBOT_IMG_URL={ROBOT_IMG_URL}
      />
    </>
  );
}

/* Typing dots */
function TypingDots() {
  return (
    <div className="flex items-center gap-1">
      <span
        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
        style={{ animationDelay: "0s" }}
      />
      <span
        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
        style={{ animationDelay: "0.12s" }}
      />
      <span
        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
        style={{ animationDelay: "0.24s" }}
      />
      <style>{`
        @keyframes bounce {
          0% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
          100% { transform: translateY(0); }
        }
        .animate-bounce { animation: bounce 0.6s infinite; }
      `}</style>
    </div>
  );
}

/* Small loader */
function LoaderSmall() {
  return (
    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24">
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="white"
        strokeWidth="2"
        fill="none"
      />
      <path
        className="opacity-75"
        fill="white"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  );
}
