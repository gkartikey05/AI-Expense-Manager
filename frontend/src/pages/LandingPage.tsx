import { getUserData } from "@/api/userApi";
import Navbar from "@/components/Navbar";
import { useUserStore } from "@/store/userStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Feature from "@/components/landingPage/Feature";
import Cta from "@/components/landingPage/Cta";
import Hero from "@/components/landingPage/Hero";
import TestimonialSection from "@/components/landingPage/Testimonials";
import Footer from "@/components/landingPage/Footer";

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
        } else {
          navigate("/");
        }
      } catch (err) {
        console.log("User not logged in:", err);
      }
    };

    restoreUser();
  }, [setUser, navigate]);

  return (
    <section className="hide-scrollbar overflow-auto h-[100dvh]">
      <Navbar isAuth={false} />

      {/* hero section with animation */}
      <Hero />

      {/* features */}
      <Feature />

      {/* CTA */}
      <Cta />

      <TestimonialSection />

      <Footer />
    </section>
  );
};

export default LandingPage;
