import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { useSignup } from "@/features/auth/hooks";
import { signupSchema, type SignupFormData } from "@/features/auth/schemas";
import { Button, Input } from "@/shared/ui";
import { GoogleLoginButton } from "./GoogleLoginButton";

export function SignupPage() {
  const signupMutation = useSignup();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: { fullname: "", email: "", password: "", cnfpassword: "" },
  });

  const onSubmit = (data: SignupFormData) => {
    signupMutation.mutate(data);
  };

  return (
    <>
      <section className="mx-auto my-12 w-full max-w-md px-4">
        <div className="rounded-lg bg-white p-6 shadow-card dark:bg-slate-800 dark:shadow-card-dark">
          <h2 className="mb-6 text-center text-2xl font-bold text-primary dark:text-primary-300">
            Signup
          </h2>
          <GoogleLoginButton />
          <div className="flex items-center gap-3 my-2">
            <div className="flex-1 h-px bg-gray-300 dark:bg-slate-600" />
            <span className="text-sm text-gray-500 dark:text-slate-400">or continue with email</span>
            <div className="flex-1 h-px bg-gray-300 dark:bg-slate-600" />
          </div>
          <form aria-label="Signup form" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <Input
              label="Full name"
              type="text"
              placeholder="Enter your full name"
              id="signup-fullname"
              error={errors.fullname?.message}
              {...register("fullname")}
            />
            <Input
              label="Email address"
              type="email"
              placeholder="Enter your email address"
              id="signup-email"
              error={errors.email?.message}
              {...register("email")}
            />
            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              id="signup-password"
              error={errors.password?.message}
              {...register("password")}
            />
            <Input
              label="Confirm password"
              type="password"
              placeholder="Confirm your password"
              id="signup-cnfpassword"
              error={errors.cnfpassword?.message}
              {...register("cnfpassword")}
            />
            <Button variant="primary" size="full" type="submit">
              {signupMutation.isPending ? "Creating account..." : "Create new account"}
            </Button>
            <p className="text-center text-sm dark:text-slate-300">
              <Link to="/login" className="text-secondary hover:underline dark:text-secondary-300">
                Already have an account?
              </Link>
            </p>
          </form>
        </div>
      </section>
    </>
  );
}
