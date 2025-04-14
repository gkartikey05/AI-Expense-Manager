import { getUserData } from "@/api/userApi";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/store/userStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ReceiptText, Wallet, Target, BarChart3 } from "lucide-react";

const features = [
  {
    title: "Expense Tracking",
    icon: ReceiptText,
    description:
      "Monitor where your money goes with categorized expense logging and real-time updates.",
  },
  {
    title: "Budgeting",
    icon: Wallet,
    description:
      "Set monthly or category-based budgets to control overspending and stay financially disciplined.",
  },
  {
    title: "Goal Tracking",
    icon: Target,
    description:
      "Create and track financial goals like saving for a trip or emergency fund with progress visualization.",
  },
  {
    title: "Reports",
    icon: BarChart3,
    description:
      "Gain insights with detailed reports and visual summaries to understand spending habits and trends.",
  },
];

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
          <div className=" max-w-xs mx-auto flex  justify-center gap-4 sm:gap-5">
            <Button
              onClick={() => navigate("/signup")}
              className="px-10 py-2 text-base cursor-pointer flex-1"
            >
              Get Started
            </Button>
            <Button
              variant="secondary"
              onClick={() => navigate("/login")}
              className="px-10 py-2 text-base cursor-pointer flex-1"
            >
              Login
            </Button>
          </div>
        </section>
      </main>
      {/* featues */}
      <main className="container py-15 bg-gray-50">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-neutral-900 text-center mb-5">
          Manage Your Money <span className="underline underline-offset-5">Smarter</span>
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
          {features.map(({ title, icon: Icon, description }, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 p-5 border border-gray-100"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-neutarl-800 mb-4">
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {title}
              </h3>
              <p className="text-sm text-gray-600">{description}</p>
            </div>
          ))}
        </div>
      </main>
    </section>
  );
};

export default LandingPage;
