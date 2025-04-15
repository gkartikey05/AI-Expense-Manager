
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "@/assets/assets";

const Navbar = ({ isAuth = false }: { isAuth: boolean }) => {
  const navigate = useNavigate();

  return (
    <header className="py-2 px-5 md:px-8 lg:px-10  fixed top-0 left-0 right-0 backdrop-blur-sm z-50">
      <nav className="max-w-7xl mx-auto flex items-center justify-between">
        {/* logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="size-16 rounded-full">
            <img src={assets.logo} alt="logo" className="size-full object-cover" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 ">
            Fundly
          </h1>
        </Link>
        {/* buttons */}
        {isAuth ? (
          <Button onClick={() => navigate("/")} className="cursor-pointer">
            Go back to Home
          </Button>
        ) : (
          <div className="flex items-center gap-4">
            <Button
              onClick={() => navigate("/login")}
              variant="outline"
              className="cursor-pointer shadow-none sm:px-8"
            >
              Login
            </Button>
            <Button
              onClick={() => navigate("/signup")}
              className="cursor-pointer sm:px-8"
            >
              Sign Up
            </Button>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
