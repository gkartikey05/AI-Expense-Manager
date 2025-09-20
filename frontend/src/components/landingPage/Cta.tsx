import { Button } from "../ui/button";
import { motion } from "motion/react";
import { ArrowRight, CheckCircle, Star, Users } from "lucide-react";

const Cta = () => {
  const benefits = [
    "Free 30-day trial",
    "No credit card required", 
    "Cancel anytime"
  ];

  return (
    <section className="relative py-20 sm:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-purple-100/50" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(147,51,234,0.1),transparent_70%)]" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px]" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          {/* Left Content */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Star className="w-4 h-4 text-purple-600 fill-current" />
              <span className="text-sm font-semibold text-purple-700">Start Your Success Story</span>
            </motion.div>

            <motion.h2
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Ready to take{" "}
              <span className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                control?
              </span>
            </motion.h2>

            <motion.p
              className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Join thousands who've transformed their financial lives with Fundly. 
              Smart budgeting, expense tracking, and AI insights—all in one beautiful app.
            </motion.p>

            {/* Benefits List */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 sm:gap-8 mb-8 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {benefits.map((benefit, idx) => (
                <motion.div
                  key={benefit}
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.6 + idx * 0.1 }}
                >
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700 font-medium">{benefit}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-xl font-semibold text-lg group transition-all duration-200">
                  Start Your Journey
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant="outline"
                  className="border-gray-300 hover:border-purple-300 hover:text-purple-700 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200"
                >
                  Watch Demo
                </Button>
              </motion.div>
            </motion.div>

            {/* Social Proof */}
            <motion.div
              className="mt-8 flex items-center gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <div className="flex -space-x-2">
                <img
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face"
                  alt="User"
                  className="w-8 h-8 rounded-full border-2 border-white"
                />
                <img
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=40&h=40&fit=crop&crop=face"
                  alt="User"
                  className="w-8 h-8 rounded-full border-2 border-white"
                />
                <img
                  src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=40&h=40&fit=crop&crop=face"
                  alt="User"
                  className="w-8 h-8 rounded-full border-2 border-white"
                />
              </div>
              <div className="text-sm text-gray-600">
                <span className="font-semibold text-gray-900">2,500+</span> people started this week
              </div>
            </motion.div>
          </div>

          {/* Right Illustration */}
          <motion.div
            className="w-full lg:w-1/2 relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative max-w-lg mx-auto">
              {/* Main Illustration */}
              <img
                src="cta.svg"
                alt="Financial Success Illustration"
                className="w-full h-auto relative z-10"
              />
              
              {/* Floating Elements */}
              <motion.div
                className="absolute -top-8 -left-6 bg-white rounded-2xl p-4 shadow-lg border border-gray-100"
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">Goal Achieved!</div>
                    <div className="text-xs text-gray-600">Emergency fund complete</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="absolute -bottom-6 -right-8 bg-white rounded-2xl p-4 shadow-lg border border-gray-100"
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">$2,450</div>
                    <div className="text-xs text-gray-600">Saved this month</div>
                  </div>
                </div>
              </motion.div>

              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-200/20 via-transparent to-purple-200/20 rounded-full blur-3xl -z-10" />
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Stats Bar */}
        <motion.div
          className="mt-16 pt-8 border-t border-gray-200"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-2xl font-bold text-gray-900">12K+</div>
              <div className="text-sm text-gray-600">Happy Users</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">$5M+</div>
              <div className="text-sm text-gray-600">Money Managed</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">98%</div>
              <div className="text-sm text-gray-600">Satisfaction Rate</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">4.9★</div>
              <div className="text-sm text-gray-600">App Store Rating</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Floating Background Elements */}
      <motion.div
        className="absolute top-32 right-20 w-16 h-16 bg-purple-200/30 rounded-full blur-xl"
        animate={{
          y: [0, -25, 0],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute bottom-40 left-10 w-12 h-12 bg-gradient-to-br from-purple-300/20 to-pink-300/20 rounded-full blur-lg"
        animate={{
          y: [0, 20, 0],
          x: [0, 15, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
      />
    </section>
  );
};

export default Cta;