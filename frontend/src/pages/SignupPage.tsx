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
import { registerUser } from "@/api/userAuth";
import { useUserStore } from "@/store/userStore";
import toast from "react-hot-toast";

// zod schema
const signupSchema = z.object({
  fullName: z.string().nonempty("Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password of minimum 6 characters is required"),
});

type FormData = z.infer<typeof signupSchema>;

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
    mutation.mutate(data);   // to pass data to mutationFn
  };

  return (
    <div>
      <Navbar isAuth={true} />

      <main className="container min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md  border border-neutral-200 shadow-md rounded-2xl">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-xl">Create an account</CardTitle>
            <CardDescription className="text-sm text-neutral-500">
              Enter your details to get started
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* full name */}
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="John Doe"
                  {...register("fullName")}
                />
                {errors.fullName && (
                  <p className="text-sm text-red-500">
                    {errors.fullName.message}
                  </p>
                )}
              </div>

              {/* email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john50@gmail.com"
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
                    type={togglePassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    {...register("password")}
                    className="pr-10"
                  />
                  <span className="absolute top-1/2 right-3 -translate-y-1/2">
                    {togglePassword ? (
                      <EyeOff
                        className="size-5 text-neutral-500 cursor-pointer"
                        onClick={() => setTogglePassword((prev) => !prev)}
                      />
                    ) : (
                      <Eye
                        className="size-5 text-neutral-500 cursor-pointer"
                        onClick={() => setTogglePassword((prev) => !prev)}
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
                  "Register Your Account"
                )}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="text-sm text-neutral-600 justify-center">
            Already have an account?{" "}
            <Link
              to="/login"
              className="ml-1 font-semibold text-neutral-800 hover:underline"
            >
              Log in
            </Link>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
};

export default SignupPage;
