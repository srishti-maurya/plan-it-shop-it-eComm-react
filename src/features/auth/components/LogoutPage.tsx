import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import logoutImg from "@/assets/svg/logout.svg";

export function LogoutPage() {
  return (
    <>
      <section className="mx-auto flex max-w-lg flex-col items-center gap-6 px-4 py-16">
        <img src={logoutImg} alt="logout" className="h-64" />
        <div className="flex items-center gap-2 rounded bg-green-100 px-4 py-3 text-green-800">
          <FaCheckCircle />
          <span>You have successfully logged out</span>
        </div>
        <Link
          to="/"
          className="font-bold uppercase text-primary hover:text-secondary"
        >
          Go Back to Home
        </Link>
      </section>
    </>
  );
}
