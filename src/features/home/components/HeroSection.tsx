import { Link } from "react-router-dom";
import coverImage from "@/assets/images/cover.jpeg";
import { Button } from "@/shared/ui";

export function HeroSection() {
  return (
    <div className="relative mx-2 my-2 overflow-hidden rounded-lg md:mx-4">
      <img
        src={coverImage}
        alt="Book collection cover"
        className="h-[300px] w-full object-cover sm:h-[400px] md:h-[540px]"
      />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-gray-50/80 p-4 text-primary backdrop-blur-sm sm:p-8">
        <p className="text-lg font-bold sm:text-2xl">Welcome to</p>
        <p className="text-2xl font-bold sm:text-5xl">
          Plan it, <span className="text-secondary">Shop it</span>
        </p>
        <p className="mt-2 max-w-lg text-sm text-gray-700 sm:text-xl">
          Are you planning to read a book? We've got your back! The top book
          collections have been hand-picked for you at the best price.
        </p>
        <Link to="/products">
          <Button variant="primary" className="mt-4">
            Shop Now
          </Button>
        </Link>
      </div>
    </div>
  );
}
