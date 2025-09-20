import { ReceiptText, Wallet, Target, BarChart3 } from "lucide-react";
import { motion } from "motion/react";

const features = [
  {
    name: "Smart Expense Tracking",
    icon: ReceiptText,
    description:
      "Automatically categorize and monitor every transaction with AI-powered insights. Get real-time notifications when you're approaching budget limits and discover spending patterns you never noticed before.",
    color: "from-blue-500 to-cyan-500",
    accent: "text-blue-600",
    illustration: "savings.svg",
  },
  {
    name: "Intelligent Budgeting",
    icon: Wallet,
    description:
      "Create dynamic budgets that adapt to your lifestyle and income changes. Track your progress with visual indicators, and receive smart suggestions to optimize your spending.",
    color: "from-green-500 to-emerald-500",
    accent: "text-green-600",
    illustration: "inflation.svg",
  },
  {
    name: "Goal Achievement System",
    icon: Target,
    description:
      "Transform your financial dreams into achievable milestones. Whether you're saving for a vacation, emergency fund, or major purchase, get timelines and progress visualizations that keep you motivated.",
    color: "from-orange-500 to-red-500",
    accent: "text-orange-600",
    illustration: "goal.svg",
  },
  {
    name: "Advanced Analytics & Reports",
    icon: BarChart3,
    description:
      "Unlock the power of your financial data with interactive dashboards. Discover trends, identify savings opportunities, and make decisions with confidence.",
    color: "from-purple-500 to-pink-500",
    accent: "text-purple-600",
    illustration: "metrics.svg",
  },
];

export default function Feature() {
  return (
    <section className="relative py-20 sm:py-32 overflow-hidden bg-gradient-to-b from-gray-50 to-white">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="mx-auto max-w-4xl text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full mb-8 shadow-sm">
            <div className="w-2 h-2 bg-purple-600 rounded-full animate-ping" />
            <span className="text-sm font-semibold text-purple-700">
              Powerful Features
            </span>
          </div>

          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight">
            Financial tools that{" "}
            <span className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
              actually work
            </span>
          </h2>

          <p className="text-xl sm:text-2xl text-gray-600 leading-relaxed">
            Stop juggling spreadsheets. Gain full control with tools designed
            for real life.
          </p>
        </motion.div>

        {/* Features */}
        <div className="space-y-24 lg:space-y-32">
          {features.map((feature, idx) => (
            <motion.div
              key={feature.name}
              className={`flex flex-col ${
                idx % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              } items-center gap-12 lg:gap-20`}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.8,
                delay: idx * 0.1,
                ease: "easeOut",
              }}
            >
              {/* Content */}
              <div className="flex-1 text-center lg:text-left">
                <motion.div
                  className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${feature.color} rounded-3xl mb-6 shadow-lg backdrop-blur-sm`}
                  whileHover={{ scale: 1.15, rotate: 8 }}
                  transition={{ duration: 0.25 }}
                >
                  <feature.icon className="w-10 h-10 text-white drop-shadow" />
                </motion.div>

                <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                  {feature.name}
                </h3>

                <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  {feature.description}
                </p>

                <motion.div
                  className="mt-8 inline-flex items-center gap-2 text-lg font-semibold"
                  whileHover={{ x: 6 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className={feature.accent}>Learn more</span>
                  <div
                    className={`w-12 h-px bg-gradient-to-r ${feature.color}`}
                  />
                </motion.div>
              </div>

              {/* Illustration */}
              <div className="flex-1 relative">
                <motion.img
                  src={feature.illustration}
                  alt={`${feature.name} illustration`}
                  className="relative mx-auto w-80 h-auto lg:w-96 drop-shadow-md"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
