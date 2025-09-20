import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = ({ isAuth = false }: { isAuth: boolean }) => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="px-5 py-3 sm:px-7 sm:py-4  md:px-10 md:py-5 fixed top-0 left-0 right-0 z-50 bg-white border-b border-purple-300/20 shadow-sm">

      <nav className=" mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="w-28 h-8">
          <img
            src="/fundly.webp"
            alt="Fundly Logo"
            className="size-full object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4">
          {isAuth ? (
            <Button
              onClick={() => navigate("/")}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full font-semibold transition-colors duration-200 cursor-pointer"
            >
              Go to home
            </Button>
          ) : (
            <>
              <Button
                onClick={() => navigate("/login")}
                variant="outline"
                className="border-purple-400 text-purple-700 hover:bg-purple-600 hover:text-white px-6 py-2 rounded-full font-semibold transition-colors duration-200 cursor-pointer"
              >
                Login
              </Button>

              <Button
                onClick={() => navigate("/signup")}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full font-semibold transition-colors duration-200 cursor-pointer"
              >
                Sign Up
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 rounded-full bg-purple-600/20 border border-purple-400/30 text-purple-700"
        >
          <motion.div
            animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.div>
        </motion.button>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={{
            opacity: isMobileMenuOpen ? 1 : 0,
            y: isMobileMenuOpen ? 0 : -10,
          }}
          transition={{ duration: 0.2 }}
          className={`absolute top-full left-0 right-0 bg-purple-900/20 backdrop-blur-lg border-t border-purple-400/30 md:hidden ${
            isMobileMenuOpen ? "block" : "hidden"
          }`}
        >
          <div className="px-5 py-4 space-y-3">
            {isAuth ? (
              <Button
                onClick={() => {
                  navigate("/");
                  setIsMobileMenuOpen(false);
                }}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-full font-semibold"
              >
                Go to home
              </Button>
            ) : (
              <>
                <Button
                  onClick={() => {
                    navigate("/login");
                    setIsMobileMenuOpen(false);
                  }}

                  className="w-full bg-purple-600 hover:bg-purple-600  text-white  py-3 rounded-full font-semibold"
                >
                  Login
                </Button>

                <Button
                  onClick={() => {
                    navigate("/signup");
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full bg-purple-600  hover:bg-purple-600 text-white py-3 rounded-full font-semibold"
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>
        </motion.div>
      </nav>
    </header>
  );
};

export default Navbar;
