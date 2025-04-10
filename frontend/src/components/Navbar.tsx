import { DollarSign } from "lucide-react";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ isAuth = false }: { isAuth: boolean }) => {
  const navigate = useNavigate();

  return (
    <header className="py-4 px-5 md:px-8 lg:px-10  fixed top-0 left-0 right-0 bg-gray-50 backdrop-blur-sm z-50">
      <nav className="max-w-7xl mx-auto flex items-center justify-between">
        {/* logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="border border-black rounded-full">
            <DollarSign className="" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 ">
            Fundly
          </h1>
        </Link>
        {/* buttons */}
        {isAuth ? (
          <Button onClick={() => navigate("/")} className="cursor-pointer">Go back to Home</Button>
        ) : (
          <div className="flex items-center gap-4">
            <Button
              onClick={() => navigate("/login")}
              variant="outline"
              className="cursor-pointer"
            >
              Login
            </Button>
            <Button
              onClick={() => navigate("/signup")}
              className="cursor-pointer"
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
