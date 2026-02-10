import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "@/features/auth/hooks";
import { loginSchema, type LoginFormData } from "@/features/auth/schemas";
import { Link } from "react-router-dom";
import { Button, Input } from "@/shared/ui";
import { GoogleLoginButton } from "./GoogleLoginButton";

export function LoginPage() {
  const loginMutation = useLogin();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data);
  };

  const testCredentialsLogin = () => {
    setValue("email", "srishtimaurya@gmail.com");
    setValue("password", "srishtimaurya");
  };

  const adminCredentialsLogin = () => {
    setValue("email", "admin@planitshopit.com");
    setValue("password", "admin123");
  };

  return (
    <>
      <section className="mx-auto my-12 w-full max-w-md px-4">
        <div className="rounded-lg bg-white p-6 shadow-card dark:bg-slate-800 dark:shadow-card-dark">
          <h2 className="mb-6 text-center text-2xl font-bold text-primary dark:text-primary-300">
            Login
          </h2>
          <GoogleLoginButton />
          <div className="flex items-center gap-3 my-2">
            <div className="flex-1 h-px bg-gray-300 dark:bg-slate-600" />
            <span className="text-sm text-gray-500 dark:text-slate-400">or continue with email</span>
            <div className="flex-1 h-px bg-gray-300 dark:bg-slate-600" />
          </div>
          <form aria-label="Login form" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <Input
              label="Email address"
              type="text"
              placeholder="Enter your email address"
              id="login-email"
              error={errors.email?.message}
              {...register("email")}
            />
            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              id="login-password"
              error={errors.password?.message}
              {...register("password")}
            />
            <Button
              variant="outline"
              size="full"
              type="button"
              onClick={testCredentialsLogin}
            >
              Login with test credentials
            </Button>
            <Button
              variant="outline"
              size="full"
              type="button"
              onClick={adminCredentialsLogin}
            >
              Login as admin
            </Button>
            <Button variant="primary" size="full" type="submit">
              {loginMutation.isPending ? "Logging in..." : "Login"}
            </Button>
            <p className="text-center text-sm dark:text-slate-300">
              <Link to="/signup" className="text-secondary hover:underline dark:text-secondary-300">
                Create new account
              </Link>
            </p>
          </form>
        </div>
      </section>
    </>
  );
}
