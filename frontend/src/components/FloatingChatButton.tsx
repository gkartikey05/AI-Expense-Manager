import { motion } from "motion/react";
import { MessageSquare } from "lucide-react";

const FloatingChatButton = ({ open, handleToggle, ROBOT_IMG_URL }: any) => {
  return (
    <motion.button
      onClick={handleToggle}
      className={`fixed right-6 bottom-6 z-50 flex items-center justify-center w-[72px] h-[72px] rounded-full shadow-xl cursor-pointer ${
        open ? "hidden" : "block"
      }`}
      style={{
        background: "linear-gradient(135deg,#7c3aed,#6d28d9)",
        boxShadow: "0 10px 30px rgba(124,58,237,0.35)",
        zIndex: 60,
      }}
      whileHover={{ scale: 1.1 }}
      animate={{ y: [0, 6, 0] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      aria-label="Open Fundly chat"
    >
      <div className="relative w-full h-full flex items-center justify-center">
        <img
          src={ROBOT_IMG_URL}
          alt="fundly bot"
          className="w-11 h-11 rounded-full"
          style={{ filter: "drop-shadow(0 6px 12px rgba(0,0,0,0.15))" }}
        />
        {/* Floating shadow */}
        <motion.span
          className="absolute -bottom-1 w-12 h-3 rounded-full opacity-70"
          style={{
            background: "radial-gradient(closest-side,#b693ff,transparent)",
          }}
          animate={{ scaleX: [1, 0.96, 1], opacity: [0.7, 0.55, 0.7] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Notification badge */}
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center text-purple-600 text-xs font-semibold">
          <MessageSquare className="w-3 h-3" />
        </div>
      </div>
    </motion.button>
  );
};

export default FloatingChatButton;
