import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar isAuth={false} />
      {/* hero section */}
      <main className="min-h-screen bg-gray-50 dotted-bg flex items-center justify-center ">
        <section className="max-w-3xl mx-auto text-center px-4 sm:px-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-900 mb-5 leading-tight">
            Welcome to Fundly
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 mb-8 leading-relaxed">
            Track expenses, set budgets, and reach your financial goals with our
            all-in-one personal finance management system powered by{" "}
            <span className="text-gray-800 font-bold">AI analysis</span> and
            suggestions.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-5">
            <Button
              onClick={() => navigate("/signup")}
              className="px-10 py-2 text-base cursor-pointer"
            >
              Get Started
            </Button>
            <Button
              variant="secondary"
              onClick={() => navigate("/login")}
              className="px-10 py-2 text-base cursor-pointer"
            >
              Login
            </Button>
          </div>
        </section>
      </main>
    </>
  );
};

export default LandingPage;
