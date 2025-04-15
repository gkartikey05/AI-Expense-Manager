import { getUserData } from "@/api/userApi";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/store/userStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Feature from "@/components/landingPage/Feature";
import Cta from "@/components/landingPage/Cta";
import BentoGrid from "@/components/landingPage/BentoGrid";
// import { assets } from "@/assets/assets";

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
        }
      } catch (err) {
        console.log("User not logged in:", err);
      }
    };

    restoreUser();
  }, [setUser, navigate]);

  return (
    <section className="hide-scrollbar overflow-auto h-screen">
      <Navbar isAuth={false} />
      {/* hero section */}
      <main className="min-h-screen flex items-center justify-center">
        <section className="max-w-3xl mx-auto text-center px-4 sm:px-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-gray-900 mb-5 leading-tight">
            Welcome to Fundly
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 mb-8 leading-relaxed">
            Track expenses, set budgets, and reach your financial goals with our
            all-in-one personal finance management system powered by{" "}
            <span className="text-gray-800 font-bold">AI analysis</span> and
            suggestions.
          </p>
          <div className=" max-w-xs mx-auto flex  justify-center gap-4 sm:gap-5">
            <Button
              onClick={() => navigate("/signup")}
              className="px-10 py-2 text-base cursor-pointer flex-1 group"
            >
              Get Started{" "}
              <ArrowRight className="group-hover:translate-x-1 transition-all duration-300" />
            </Button>
            <Button
              variant="secondary"
              onClick={() => navigate("/login")}
              className="px-10 py-2 text-base cursor-pointer flex-1 group"
            >
              Login{" "}
              <ArrowRight className="group-hover:translate-x-1 transition-all duration-300" />
            </Button>
          </div>
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
