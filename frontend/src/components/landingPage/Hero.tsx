import { Button } from "../ui/button";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Sparkles, TrendingUp, Shield, Zap } from "lucide-react";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen mt-15 relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-purple-50 pt-10">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]" />

      {/* Purple Gradient Masks */}
      <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-purple-600/10 via-purple-400/5 to-transparent pointer-events-none" />
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-purple-600/10 via-purple-400/5 to-transparent pointer-events-none" />

      {/* Floating Elements */}
      <div className="absolute top-20 left-20 w-20 h-20 bg-purple-200/30 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-32 right-32 w-16 h-16 bg-purple-300/20 rounded-full blur-lg animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-10 w-8 h-8 bg-purple-400/20 rounded-full blur-md animate-pulse delay-500" />

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="px-5 sm:px-10 mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-2 mb-6"
            >
              <div className="flex items-center gap-1 px-3 py-1 bg-purple-100 rounded-full">
                <Sparkles className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-medium text-purple-700">
                  AI-Powered Finance
                </span>
              </div>
            </motion.div>

            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Take Control of Your{" "}
              <span className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                Financial Future
              </span>
            </motion.h1>

            <motion.p
              className="text-lg text-gray-600 mb-8 leading-relaxed max-w-lg"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Smart expense tracking, intelligent budgeting, and AI-driven
              insights to help you achieve your financial goals faster than
              ever.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  onClick={() => navigate("/signup")}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-xl font-semibold text-lg group transition-all duration-200"
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant="outline"
                  onClick={() => navigate("/login")}
                  className="w-full border-gray-300 hover:border-purple-300 hover:text-purple-700 px-8 py-3 rounded-xl font-semibold text-lg transition-all duration-200"
                >
                  Sign In
                </Button>
              </motion.div>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">10K+</div>
                <div className="text-sm text-gray-600">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">$2M+</div>
                <div className="text-sm text-gray-600">Money Saved</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">4.9★</div>
                <div className="text-sm text-gray-600">User Rating</div>
              </div>
            </motion.div>
          </div>

          {/* Right Illustration */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative">
              <img
                src="/heroImage.svg"
                alt="Personal Finance Management"
                className="w-full max-w-lg mx-auto"
              />

              {/* Floating Feature Cards */}
              <motion.div
                className="absolute -top-6 -left-6 bg-white rounded-lg p-3 shadow-lg border border-gray-100"
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                  <div>
                    <div className="text-xs font-semibold text-gray-900">
                      +12.5%
                    </div>
                    <div className="text-xs text-gray-600">This month</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -right-4 bg-white rounded-lg p-3 shadow-lg border border-gray-100"
                animate={{ y: [0, 10, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.5,
                }}
              >
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-purple-500" />
                  <div>
                    <div className="text-xs font-semibold text-gray-900">
                      Secure
                    </div>
                    <div className="text-xs text-gray-600">Bank-level</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="absolute top-1/2 -left-8 bg-white rounded-lg p-3 shadow-lg border border-gray-100"
                animate={{ x: [-5, 5, -5] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Zap className="w-6 h-6 text-yellow-500" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Feature Pills at Bottom */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full max-w-4xl px-4"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <div className="flex flex-wrap justify-center gap-3">
          <motion.div
            className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-gray-200"
            whileHover={{
              scale: 1.05,
              backgroundColor: "rgba(147, 51, 234, 0.1)",
            }}
            transition={{ duration: 0.2 }}
          >
            <div className="w-2 h-2 bg-blue-500 rounded-full" />
            <span className="text-sm font-medium text-gray-700">
              Smart Tracking
            </span>
          </motion.div>

          <motion.div
            className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-gray-200"
            whileHover={{
              scale: 1.05,
              backgroundColor: "rgba(147, 51, 234, 0.1)",
            }}
            transition={{ duration: 0.2 }}
          >
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            <span className="text-sm font-medium text-gray-700">
              Goal Setting
            </span>
          </motion.div>

          <motion.div
            className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-gray-200"
            whileHover={{
              scale: 1.05,
              backgroundColor: "rgba(147, 51, 234, 0.1)",
            }}
            transition={{ duration: 0.2 }}
          >
            <div className="w-2 h-2 bg-purple-500 rounded-full" />
            <span className="text-sm font-medium text-gray-700">
              AI Insights
            </span>
          </motion.div>

          <motion.div
            className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-gray-200"
            whileHover={{
              scale: 1.05,
              backgroundColor: "rgba(147, 51, 234, 0.1)",
            }}
            transition={{ duration: 0.2 }}
          >
            <div className="w-2 h-2 bg-orange-500 rounded-full" />
            <span className="text-sm font-medium text-gray-700">
              Budget Management
            </span>
          </motion.div>
        </div>
      </motion.div>
    </main>
  );
};

export default Hero;
