import { getUserData } from "@/api/userApi";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/store/userStore";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  DollarSign,
  Target,
  BarChart2,
  BanknoteArrowUp,
} from "lucide-react";
import Feature from "@/components/landingPage/Feature";
import Cta from "@/components/landingPage/Cta";
import BentoGrid from "@/components/landingPage/BentoGrid";

const LandingPage = () => {
  const setUser = useUserStore((state) => state.setUser);
  const navigate = useNavigate();

  // auto login if token is present
  useEffect(() => {
    const restoreUser = async () => {
      try {
        const user = await getUserData();
        if (user) {
          setUser(user);
          navigate("/dashboard");
        } else {
          navigate("/");
        }
      } catch (err) {
        console.log("User not logged in:", err);
      }
    };

    restoreUser();
  }, [setUser, navigate]);

  return (
    <section className="hide-scrollbar overflow-auto h-[100dvh]">
      <Navbar isAuth={false} />
      {/* hero section with animation */}
      <main className="min-h-screen flex items-center justify-center relative">
        <section className="max-w-3xl mx-auto text-center px-4 sm:px-6">
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-gray-900 mb-5 leading-tight"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.7 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            Welcome to Fundly
          </motion.h1>
          <motion.p
            className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.7 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
          >
            Track expenses, set budgets, and reach your financial goals with our
            all-in-one personal finance management system powered by{" "}
            <span className="text-gray-800 font-bold">AI analysis</span> and
            suggestions.
          </motion.p>
          <motion.div
            className="max-w-xs mx-auto flex justify-center gap-4 sm:gap-5"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.7 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
          >
            <motion.div
              whileHover={{ scale: 1.08, y: -8 }}
              whileTap={{ scale: 0.96, y: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="flex-1"
            >
              <Button
                onClick={() => navigate("/signup")}
                className="px-10 py-2 text-base cursor-pointer w-full group"
              >
                Get Started{" "}
                <ArrowRight className="group-hover:translate-x-1 transition-all duration-300" />
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.08, y: -8 }}
              whileTap={{ scale: 0.96, y: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="flex-1"
            >
              <Button
                variant="secondary"
                onClick={() => navigate("/login")}
                className="px-10 py-2 text-base cursor-pointer w-full group"
              >
                Login{" "}
                <ArrowRight className="group-hover:translate-x-1 transition-all duration-300" />
              </Button>
            </motion.div>
          </motion.div>
          {/* feature overview */}
          <motion.ul
            className="w-full max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 px-4 mt-5 absolute bottom-10 left-1/2 -translate-x-1/2 text-nowrap"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.12,
                },
              },
            }}
          >
            <motion.li
              className="flex items-center gap-2  px-1 sm:px-5 py-2 border border-black/20 rounded-sm text-gray-700 bg-white"
              initial={{ opacity: 0, y: 40, backgroundColor: "#fff" }}
              whileInView={{ opacity: 1, y: 0 }}
              animate={{ backgroundColor: ["#fff", "#e0e7ff", "#fff"] }}
              viewport={{ once: true, amount: 0.7 }}
              transition={{
                opacity: { duration: 0.5, ease: "easeOut" },
                y: { duration: 0.5, ease: "easeOut" },
                backgroundColor: {
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut",
                },
              }}
            >
              <BanknoteArrowUp className="w-5 h-5 shrink-0 text-blue-500" />
              <span>Track Transactions</span>
            </motion.li>
            <motion.li
              className="flex items-center gap-2 px-1 sm:px-5 py-2 border border-black/20 rounded-sm text-gray-700 bg-white"
              initial={{ opacity: 0, y: 40, backgroundColor: "#fff" }}
              whileInView={{ opacity: 1, y: 0 }}
              animate={{ backgroundColor: ["#fff", "#e0ffe0", "#fff"] }}
              viewport={{ once: true, amount: 0.7 }}
              transition={{
                opacity: { duration: 0.5, ease: "easeOut", delay: 0.1 },
                y: { duration: 0.5, ease: "easeOut", delay: 0.1 },
                backgroundColor: {
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut",
                },
              }}
            >
              <DollarSign className="w-5 h-5 shrink-0 text-green-500" />
              <span>Set Budgets</span>
            </motion.li>
            <motion.li
              className="flex items-center gap-2 px-1 sm:px-5 py-2 border border-black/20 rounded-sm text-gray-700 bg-white"
              initial={{ opacity: 0, y: 40, backgroundColor: "#fff" }}
              whileInView={{ opacity: 1, y: 0 }}
              animate={{ backgroundColor: ["#fff", "#fff7e0", "#fff"] }}
              viewport={{ once: true, amount: 0.7 }}
              transition={{
                opacity: { duration: 0.5, ease: "easeOut", delay: 0.2 },
                y: { duration: 0.5, ease: "easeOut", delay: 0.2 },
                backgroundColor: {
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut",
                },
              }}
            >
              <Target className="w-5 h-5 shrink-0 text-orange-500" />
              <span>Set Goals</span>
            </motion.li>
            <motion.li
              className="flex items-center gap-2 px-1 sm:px-5 py-2 border border-black/20 rounded-sm text-gray-700 bg-white"
              initial={{ opacity: 0, y: 40, backgroundColor: "#fff" }}
              whileInView={{ opacity: 1, y: 0 }}
              animate={{ backgroundColor: ["#fff", "#f3e8ff", "#fff"] }}
              viewport={{ once: true, amount: 0.7 }}
              transition={{
                opacity: { duration: 0.5, ease: "easeOut", delay: 0.3 },
                y: { duration: 0.5, ease: "easeOut", delay: 0.3 },
                backgroundColor: {
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut",
                },
              }}
            >
              <BarChart2 className="w-5 h-5 shrink-0 text-purple-500" />
              <span>Get AI Insight</span>
            </motion.li>
          </motion.ul>
        </section>
      </main>
      {/* features */}
      <Feature />
      {/* CTA */}
      <Cta />
      {/* bento grid */}
      <BentoGrid />
      {/* footer */}
      <footer className="w-full py-6 border-t mt-10">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Fundly. All rights reserved.</p>
          <div className="flex gap-4 mt-2 md:mt-0">
            <a href="#" className="hover:text-gray-700 transition">
              Privacy
            </a>
            <a href="#" className="hover:text-gray-700 transition">
              Terms
            </a>
            <a href="#" className="hover:text-gray-700 transition">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </section>
  );
};

export default LandingPage;
