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
import { Eye, EyeOff, Loader } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "@/api/userAuth";
import { useUserStore } from "@/store/userStore";
import toast from "react-hot-toast";

// zod schema
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormData = z.infer<typeof loginSchema>;

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

  return (
    <div>
      <Navbar isAuth={true} />

      <main className="container min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md mx-auto  border border-neutral-200 shadow-md rounded-2xl">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-xl">Welcome back</CardTitle>
            <CardDescription className="text-sm text-neutral-500">
              Enter your login credentials to continue
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              {/* password */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    {...register("password")}
                    className="pr-10"
                  />
                  <span className="absolute top-1/2 right-3 -translate-y-1/2">
                    {showPassword ? (
                      <EyeOff
                        className="size-5 text-neutral-500 cursor-pointer"
                        onClick={() => setShowPassword((prev) => !prev)}
                      />
                    ) : (
                      <Eye
                        className="size-5 text-neutral-500 cursor-pointer"
                        onClick={() => setShowPassword((prev) => !prev)}
                      />
                    )}
                  </span>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                disabled={mutation.isPending}
                className="w-full cursor-pointer"
              >
                {mutation.isPending ? (
                  <Loader size={4} className="animate-spin" />
                ) : (
                  "Login"
                )}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="text-sm text-neutral-600 justify-center">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="ml-1 font-semibold text-neutral-800 hover:underline"
            >
              Sign up
            </Link>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
};

export default LoginPage;
