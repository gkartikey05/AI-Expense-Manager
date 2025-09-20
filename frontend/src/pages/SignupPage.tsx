import Navbar from "@/components/Navbar";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Eye,
  EyeOff,
  Loader,
  Shield,
  CheckCircle,
  Users,
  Sparkles,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "@/api/userAuth";
import { useUserStore } from "@/store/userStore";
import toast from "react-hot-toast";
import { motion } from "motion/react";

// zod schema
const signupSchema = z.object({
  fullName: z.string().nonempty("Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password of minimum 6 characters is required"),
});

type FormData = z.infer<typeof signupSchema>;

const inputStyling =
  "h-12 rounded-xl border-purple-200  focus-visible:ring-1 focus-visible:ring-purple-400 bg-white/50 backdrop-blur-sm";

const SignupPage = () => {
  const [togglePassword, setTogglePassword] = useState(false);

  const setUser = useUserStore((state) => state.setUser);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(signupSchema),
  });

  //mutation query
  const mutation = useMutation({
    mutationFn: (data: FormData) => registerUser(data),
    onSuccess: (data) => {
      setUser(data.user);
      toast.success(data.message);
      navigate("/dashboard");
    },
    onError: (error) => {
      toast.error(error.message || "Registration failed");
    },
  });

  const onSubmit = (data: FormData) => {
    console.log("form data:", data);
    mutation.mutate(data);
  };

  const benefits = [
    { icon: Shield, text: "Bank-level security" },
    { icon: CheckCircle, text: "Free 30-day trial" },
    { icon: Users, text: "Join 12,000+ users" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100/50 relative overflow-hidden pt-15">
      <Navbar isAuth={true} />

      {/* Background Elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px]" />
      <div className="absolute top-0 left-1/4 w-px h-32 bg-gradient-to-b from-purple-500/20 to-transparent" />
      <div className="absolute bottom-0 right-1/3 w-px h-24 bg-gradient-to-t from-purple-500/20 to-transparent" />

      {/* Floating Elements */}
      <motion.div
        className="absolute top-32 left-20 w-16 h-16 bg-purple-200/30 rounded-full blur-xl"
        animate={{
          y: [0, -20, 0],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-40 right-20 w-12 h-12 bg-gradient-to-br from-purple-300/20 to-pink-300/20 rounded-full blur-lg"
        animate={{
          y: [0, 25, 0],
          x: [0, -15, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      <main className="container min-h-screen flex items-center justify-center py-8 relative z-10">
        <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Illustration & Benefits */}
          <motion.div
            className="hidden lg:block text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-8">
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full mb-6"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Sparkles className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-semibold text-purple-700">
                  Start Your Journey
                </span>
              </motion.div>

              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Join the{" "}
                <span className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                  financial revolution
                </span>
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                Take control of your money with intelligent budgeting, smart
                expense tracking, and AI-powered insights designed for your
                success.
              </p>

              {/* Benefits */}
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit.text}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  >
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <benefit.icon className="w-5 h-5 text-purple-600" />
                    </div>
                    <span className="text-gray-700 font-medium">
                      {benefit.text}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Illustration */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <img
                src="signup.svg"
                alt="Join Fundly"
                className="w-full max-w-lg mx-auto"
              />

              {/* Floating Stats */}
              <motion.div
                className="absolute -top-4 -right-4 bg-white rounded-xl p-3 shadow-lg border border-gray-100"
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="text-sm font-semibold text-gray-900">12K+</div>
                <div className="text-xs text-gray-600">Happy Users</div>
              </motion.div>

              <motion.div
                className="absolute -bottom-6 -left-6 bg-white rounded-xl p-3 shadow-lg border border-gray-100"
                animate={{ y: [0, 12, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.5,
                }}
              >
                <div className="text-sm font-semibold text-purple-600">
                  $5M+
                </div>
                <div className="text-xs text-gray-600">Managed</div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Side - Signup Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="w-full max-w-md mx-auto border-0 shadow-2xl shadow-purple-500/10 rounded-3xl bg-white/80 backdrop-blur-sm">
              <CardHeader className="space-y-1 text-center pb-8">
                <CardTitle className="text-2xl font-bold text-gray-900">
                  Create your account
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Enter your details to get started with Fundly
                </CardDescription>
              </CardHeader>

              <CardContent className="px-8">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Full Name */}
                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <Label
                      htmlFor="fullName"
                      className="text-gray-700 font-medium"
                    >
                      Full Name
                    </Label>
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="John Doe"
                      className={inputStyling}
                      {...register("fullName")}
                    />
                    {errors.fullName && (
                      <motion.p
                        className="text-sm text-red-500"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        {errors.fullName.message}
                      </motion.p>
                    )}
                  </motion.div>

                  {/* Email */}
                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <Label
                      htmlFor="email"
                      className="text-gray-700 font-medium"
                    >
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john50@gmail.com"
                      className={inputStyling}
                      {...register("email")}
                    />
                    {errors.email && (
                      <motion.p
                        className="text-sm text-red-500"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        {errors.email.message}
                      </motion.p>
                    )}
                  </motion.div>

                  {/* Password */}
                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    <Label
                      htmlFor="password"
                      className="text-gray-700 font-medium"
                    >
                      Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={togglePassword ? "text" : "password"}
                        placeholder="Create a strong password"
                        className={inputStyling}
                        {...register("password")}
                      />
                      <motion.span
                        className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setTogglePassword((prev) => !prev)}
                      >
                        {togglePassword ? (
                          <EyeOff className="w-5 h-5 text-gray-500 hover:text-purple-600 transition-colors duration-200" />
                        ) : (
                          <Eye className="w-5 h-5 text-gray-500 hover:text-purple-600 transition-colors duration-200" />
                        )}
                      </motion.span>
                    </div>
                    {errors.password && (
                      <motion.p
                        className="text-sm text-red-500"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        {errors.password.message}
                      </motion.p>
                    )}
                  </motion.div>

                  {/* Submit Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  >
                    <Button
                      type="submit"
                      disabled={mutation.isPending}
                      className="w-full h-12 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold rounded-xl transition-all duration-200 disabled:opacity-70 cursor-pointer"
                    >
                      {mutation.isPending ? (
                        <div className="flex items-center gap-2">
                          <Loader className="w-4 h-4 animate-spin" />
                          <span>Creating Account...</span>
                        </div>
                      ) : (
                        "Create Your Account"
                      )}
                    </Button>
                  </motion.div>
                </form>
              </CardContent>

              <CardFooter className="text-center pb-8">
                <motion.p
                  className="text-gray-600"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="font-semibold text-purple-600 hover:text-purple-700 hover:underline transition-all duration-200"
                  >
                    Sign in here
                  </Link>
                </motion.p>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default SignupPage;
