import { Link } from "react-router-dom";
import { Button } from "../../ui/button";

interface WelcomeStepProps {
  onNext: () => void;
}

const WelcomeStep = ({ onNext }: WelcomeStepProps) => {
  return (
    <div className="text-center space-y-6 relative z-20 text-black">
      <h2 className="text-2xl font-semibold">
        Welcome to CHC Patient Platform
      </h2>
      <p className="text-sm text-gray-800">
        Let's get you set up. Click below to begin filling out your details.
      </p>
      <img
        src="/chc-banner.png"
        className="w-full h-fit md:object-cover rounded-lg object-contain aspect-[16/9] md:aspect-[3/2]"
        alt="CHC Banner"
      />
      <Button
        onClick={onNext}
        type="button"
        size="lg"
        className="bg-[#6A5CA3] font-semibold w-1/2 md:w-1/2 md:text-lg"
      >
        Get Started
      </Button>
      <p className="mt-6 text-sm">
        Already have an account?{" "}
        <Link
          to="/auth/patient/login"
          className="text-purple-400 hover:underline"
        >
          Login
        </Link>
      </p>
    </div>
  );
};

export default WelcomeStep;
