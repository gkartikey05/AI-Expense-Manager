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
  TrendingUp,
  Shield,
  Users,
  Zap,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "@/api/userAuth";
import { useUserStore } from "@/store/userStore";
import toast from "react-hot-toast";
import { motion } from "motion/react";

// zod schema
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormData = z.infer<typeof loginSchema>;

const inputStyling =
  "h-12 rounded-xl border-purple-200  focus-visible:ring-1 focus-visible:ring-purple-400 bg-white/50 backdrop-blur-sm";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const setUser = useUserStore((state) => state.setUser);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
  });

  const mutation = useMutation({
    mutationFn: (data: FormData) => loginUser(data),
    onSuccess: (data) => {
      setUser(data.user);
      toast.success(data.message);
      navigate("/dashboard");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (data: FormData) => {
    console.log("login data:", data);
    mutation.mutate(data);
  };

  const features = [
    { icon: TrendingUp, text: "Track expenses effortlessly" },
    { icon: Shield, text: "Your data is secure" },
    { icon: Users, text: "Trusted by 12,000+ users" },
    { icon: Zap, text: "AI-powered insights" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100/50 relative overflow-hidden pt-15">
      <Navbar isAuth={true} />

      {/* Background Elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px]" />
      <div className="absolute top-0 right-1/4 w-px h-32 bg-gradient-to-b from-purple-500/20 to-transparent" />
      <div className="absolute bottom-0 left-1/3 w-px h-24 bg-gradient-to-t from-purple-500/20 to-transparent" />

      {/* Floating Elements */}
      <motion.div
        className="absolute top-40 right-20 w-16 h-16 bg-purple-200/30 rounded-full blur-xl"
        animate={{
          y: [0, -20, 0],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-32 left-16 w-12 h-12 bg-gradient-to-br from-purple-300/20 to-pink-300/20 rounded-full blur-lg"
        animate={{
          y: [0, 25, 0],
          x: [0, 15, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      <main className="container min-h-screen flex items-center justify-center py-8 relative z-10">
        <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Welcome Back Content */}
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
                <TrendingUp className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-semibold text-purple-700">
                  Welcome Back
                </span>
              </motion.div>

              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Continue your{" "}
                <span className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                  financial journey
                </span>
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                Sign in to access your personalized dashboard, track your
                progress, and continue building your financial success with
                Fundly.
              </p>

              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.text}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  >
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <feature.icon className="w-5 h-5 text-purple-600" />
                    </div>
                    <span className="text-gray-700 font-medium">
                      {feature.text}
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
                src="login.svg"
                alt="Secure Login"
                className="w-full max-w-xs mx-auto" 
              />

              {/* Floating Achievement Cards */}
              <motion.div
                className="absolute -top-4 -left-3 bg-white rounded-lg p-2 shadow-lg border border-gray-100" 
                animate={{ y: [0, -6, 0] }} 
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="flex items-center gap-1.5">
                  {" "}
                  {/* Reduced gap */}
                  <div className="w-6 h-6 bg-green-100 rounded-md flex items-center justify-center">
                    {" "}
                    {/* Smaller icon container */}
                    <TrendingUp className="w-3 h-3 text-green-600" />{" "}
                    {/* Smaller icon */}
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-gray-900">
                      {" "}
                      {/* Smaller text */}
                      +15%
                    </div>
                    <div className="text-xs text-gray-600">This month</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="absolute -bottom-3 -right-4 bg-white rounded-lg p-2 shadow-lg border border-gray-100" 
                animate={{ y: [0, 8, 0] }} 
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.5,
                }}
              >
                <div className="flex items-center gap-1.5">
                  {" "}
                  {/* Reduced gap */}
                  <div className="w-6 h-6 bg-purple-100 rounded-md flex items-center justify-center">
                    {" "}
                    {/* Smaller icon container */}
                    <Shield className="w-3 h-3 text-purple-600" />{" "}
                    {/* Smaller icon */}
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-gray-900">
                      {" "}
                      {/* Smaller text */}
                      Secure
                    </div>
                    <div className="text-xs text-gray-600">Protected</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Side - Login Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="w-full max-w-md mx-auto border-0 shadow-2xl shadow-purple-500/10 rounded-3xl bg-white/80 backdrop-blur-sm">
              <CardHeader className="space-y-1 text-center pb-8">
                <CardTitle className="text-2xl font-bold text-gray-900">
                  Welcome back!
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Sign in to your account to continue
                </CardDescription>
              </CardHeader>

              <CardContent className="px-8">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Email */}
                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
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
                      placeholder="you@example.com"
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
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <div className="flex items-center justify-between">
                      <Label
                        htmlFor="password"
                        className="text-gray-700 font-medium"
                      >
                        Password
                      </Label>
                      <Link
                        to="/forgot-password"
                        className="text-sm text-purple-600 hover:text-purple-700 hover:underline font-medium"
                      >
                        Forgot?
                      </Link>
                    </div>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className={inputStyling}
                        {...register("password")}
                      />
                      <motion.span
                        className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        {showPassword ? (
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
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    <Button
                      type="submit"
                      disabled={mutation.isPending}
                      className="w-full h-12 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold rounded-xl transition-all duration-200 disabled:opacity-70 cursor-pointer"
                    >
                      {mutation.isPending ? (
                        <div className="flex items-center gap-2">
                          x
                          <Loader className="w-4 h-4 animate-spin" />
                          <span>Signing in...</span>
                        </div>
                      ) : (
                        "Sign In"
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
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  Don't have an account?{" "}
                  <Link
                    to="/signup"
                    className="font-semibold text-purple-600 hover:text-purple-700 hover:underline transition-all duration-200"
                  >
                    Create one here
                  </Link>
                </motion.p>
              </CardFooter>
            </Card>

            {/* Quick Stats */}
            <motion.div
              className="mt-8 flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <div className="flex items-center gap-6 px-6 py-3 bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-100">
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-900">12K+</div>
                  <div className="text-xs text-gray-600">Active Users</div>
                </div>
                <div className="w-px h-8 bg-gray-300" />
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-900">4.9★</div>
                  <div className="text-xs text-gray-600">Rating</div>
                </div>
                <div className="w-px h-8 bg-gray-300" />
                <div className="text-center">
                  <div className="text-lg font-bold text-purple-600">$5M+</div>
                  <div className="text-xs text-gray-600">Managed</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
