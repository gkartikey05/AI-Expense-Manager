import { motion } from "motion/react";
import { Link } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  ArrowRight,
  Shield,
  Award,
  Users,
  TrendingUp,
} from "lucide-react";

const footerLinks = {
  product: [
    { name: "Features", href: "#features" },
    { name: "Pricing", href: "#pricing" },
    { name: "Security", href: "#security" },
    { name: "Mobile App", href: "#mobile" },
    { name: "API", href: "#api" },
  ],
  company: [
    { name: "About Us", href: "#about" },
    { name: "Careers", href: "#careers" },
    { name: "Press", href: "#press" },
    { name: "News", href: "#news" },
    { name: "Contact", href: "#contact" },
  ],
  resources: [
    { name: "Blog", href: "#blog" },
    { name: "Help Center", href: "#help" },
    { name: "Tutorials", href: "#tutorials" },
    { name: "Webinars", href: "#webinars" },
    { name: "Community", href: "#community" },
  ],
  legal: [
    { name: "Privacy Policy", href: "#privacy" },
    { name: "Terms of Service", href: "#terms" },
    { name: "Cookie Policy", href: "#cookies" },
    { name: "GDPR", href: "#gdpr" },
  ],
};

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "#", color: "hover:text-blue-600" },
  { name: "Twitter", icon: Twitter, href: "#", color: "hover:text-blue-400" },
  {
    name: "Instagram",
    icon: Instagram,
    href: "#",
    color: "hover:text-pink-500",
  },
  { name: "LinkedIn", icon: Linkedin, href: "#", color: "hover:text-blue-700" },
  { name: "YouTube", icon: Youtube, href: "#", color: "hover:text-red-500" },
];

const trustBadges = [
  { icon: Shield, text: "Bank-Level Security" },
  { icon: Award, text: "Award Winning" },
  { icon: Users, text: "12K+ Users" },
  { icon: TrendingUp, text: "Featured in TechCrunch" },
];

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:32px_32px]" />

      {/* Purple Accent */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 via-purple-500 to-purple-600" />

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Brand Section */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* Logo */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold">Fundly</span>
              </div>

              <p className="text-gray-400 text-lg leading-relaxed mb-8 max-w-md">
                Transform your financial future with intelligent budgeting,
                expense tracking, and AI-powered insights that help you save
                more and stress less.
              </p>

              {/* Contact Info */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-gray-400 hover:text-purple-400 transition-colors duration-200">
                  <Mail className="w-5 h-5" />
                  <span>hello@fundly.com</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400 hover:text-purple-400 transition-colors duration-200">
                  <Phone className="w-5 h-5" />
                  <span>9305787991</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400 hover:text-purple-400 transition-colors duration-200">
                  <MapPin className="w-5 h-5" />
                  <span>Lucknow , Uttar Pradesh , India</span>
                </div>
              </div>

              {/* Newsletter Signup */}
              <div>
                <h4 className="text-lg font-semibold mb-4">Stay Updated</h4>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors duration-200"
                  />
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition-colors duration-200 group"
                  >
                    Subscribe
                    <ArrowRight className="w-4 h-4 inline ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* Product Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h4 className="text-lg font-semibold mb-6">Product</h4>
              <ul className="space-y-3">
                {footerLinks.product.map((link) => (
                  <li key={link.name}>
                    <Link
                      to="/"
                      className="text-gray-400 hover:text-purple-400 transition-colors duration-200 flex items-center group"
                    >
                      {link.name}
                      <ArrowRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Company Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h4 className="text-lg font-semibold mb-6">Company</h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      to="/"
                      className="text-gray-400 hover:text-purple-400 transition-colors duration-200 flex items-center group"
                    >
                      {link.name}
                      <ArrowRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Resources */}
              <h4 className="text-lg font-semibold mb-6 mt-8">Resources</h4>
              <ul className="space-y-3">
                {footerLinks.resources.map((link) => (
                  <li key={link.name}>
                    <Link
                      to="/"
                      className="text-gray-400 hover:text-purple-400 transition-colors duration-200 flex items-center group"
                    >
                      {link.name}
                      <ArrowRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Legal & Trust */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h4 className="text-lg font-semibold mb-6">Legal</h4>
              <ul className="space-y-3 mb-8">
                {footerLinks.legal.map((link) => (
                  <li key={link.name}>
                    <Link
                      to="/"
                      className="text-gray-400 hover:text-purple-400 transition-colors duration-200 flex items-center group"
                    >
                      {link.name}
                      <ArrowRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Trust Badges */}
              <div className="space-y-4">
                {trustBadges.map((badge) => (
                  <motion.div
                    key={badge.text}
                    className="flex items-center gap-3 text-gray-400"
                    whileHover={{ x: 5, color: "#a855f7" }}
                    transition={{ duration: 0.2 }}
                  >
                    <badge.icon className="w-4 h-4" />
                    <span className="text-sm">{badge.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              {/* Copyright */}
              <motion.div
                className="text-gray-500 text-center md:text-left"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <p>&copy; 2024 Fundly. All rights reserved.</p>
                <p className="text-sm mt-1">
                  Made with ❤️ for your financial success
                </p>
              </motion.div>

              {/* Social Links */}
              <motion.div
                className="flex items-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {socialLinks.map((social) => (
                  <motion.div
                    key={social.name}
                    className={`p-3 bg-gray-800 hover:bg-gray-700 rounded-lg text-gray-400 ${social.color} transition-all duration-200 cursor-pointer`}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <motion.div
        className="absolute top-20 right-20 w-16 h-16 bg-purple-600/10 rounded-full blur-xl"
        animate={{
          y: [0, -20, 0],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-32 left-20 w-12 h-12 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-lg"
        animate={{
          y: [0, 25, 0],
          x: [0, 15, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
      />
    </footer>
  );
}
