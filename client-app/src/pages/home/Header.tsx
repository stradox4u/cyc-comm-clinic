import { ArrowLeft, Hospital, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "../../components/ui/button";
import { useState } from "react";
import useGoBack from "../../hooks/useGoback";

const Header = () => {
  const pathname = window.location.pathname;
  const goBack = useGoBack();
  const authRoutes = ["/login", "/signup", "/forgot-password"];
  const active = authRoutes.includes(pathname);
  const [showMobileNav, setShowMobileNav] = useState(false);
  return (
    <nav className="shadow-md bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-[#6A5CA3] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32">
        <div className="flex justify-between items-center h-16">
          <Link to={"/"} className="flex items-center space-x-2">
            {!active && (
              <>
                {" "}
                <Hospital className="h-8 w-8 text-pink-400" />
                <span className="text-xl font-bold text-white/90">
                  Care <span className="text-pink-400">Hub</span> Central
                </span>
              </>
            )}
          </Link>
          {active ? (
            <Button
              onClick={goBack}
              variant={"outline"}
              className="bg-transparent border-gray-200/20 text-white"
            >
              <ArrowLeft />
              Back
            </Button>
          ) : (
            <div className="relative">
              <div className="hidden md:flex items-center space-x-8 text-white">
                <Link
                  to="/"
                  className=" hover:text-purple-300 transition-colors"
                >
                  Home
                </Link>
                <a
                  href="/#services"
                  className=" hover:text-purple-300 transition-colors"
                >
                  Services
                </a>
                <a
                  href="/about"
                  className=" hover:text-purple-300 transition-colors"
                >
                  About Us
                </a>
                <div className="flex items-center space-x-2">
                  <Button asChild variant="secondary">
                    <Link to="/login">Login</Link>
                  </Button>
                  <Button asChild>
                    <Link to="/signup">Get Started</Link>
                  </Button>
                </div>
              </div>
              <div
                className="md:hidden text-white transform transition-transform duration-300 ease-in-out"
                onClick={() => setShowMobileNav(!showMobileNav)}
              >
                <div className="relative w-6 h-6">
                  <div
                    className={`absolute inset-0 transition-transform duration-300 ease-in-out ${
                      showMobileNav
                        ? "scale-0 rotate-90 opacity-0"
                        : "scale-100 opacity-100"
                    }`}
                  >
                    <Menu className="w-6 h-6" />
                  </div>
                  <div
                    className={`absolute inset-0 transition-transform duration-300 ease-in-out ${
                      showMobileNav
                        ? "scale-100 opacity-100"
                        : "scale-0 -rotate-90 opacity-0"
                    }`}
                  >
                    <X className="w-6 h-6" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div
        className={`top-16 right-0 h-[100vh] w-3/4 max-w-sm bg-[#6A5CA3] text-white shadow-lg transform transition-transform duration-300 ease-in-out md:hidden fixed border border-gray-900/20 ${
          !showMobileNav ? "translate-x-[-200%]" : "-translate-x-0"
        }`}
      >
        <ul className="flex flex-col  p-6 pt-20 items-center gap-8">
          <li>
            <a href="/" className="hover:text-pink-300">
              Home
            </a>
          </li>
          <li>
            <a href="/services" className="hover:text-pink-300">
              Services
            </a>
          </li>
          <li>
            <a href="/about" className="hover:text-pink-300">
              About Us
            </a>
          </li>
          <li>
            <a href="/login" className="hover:text-pink-300">
              Login
            </a>
          </li>
          <li>
            <a href="/signup" className="hover:text-pink-300">
              Get Started
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};
export default Header;
