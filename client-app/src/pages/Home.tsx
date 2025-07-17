import { useState } from "react";
import clsx from "clsx";
import { Menu } from "lucide-react";
import { Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { SmilePlus } from "lucide-react";
import { Bone } from "lucide-react";
import { Soup } from "lucide-react";
import SwiperCard from "../components/Swiper";

const Home = () => {
  const [showNav, setShowNav] = useState(false);

  const handleShowNav = () => {
    setShowNav((showNav) => !showNav);
  };

  return (
    <div className="bg-blue-950  px-10 py-5 md:py-0 text-white">
      <div className="container mx-auto">
        {/* header */}
        <header>
          <nav className="flex items-center justify-between">
            <div>
              <span className="text-2xl font-bold">
                C<span className="text-pink-400">H</span>C
              </span>
            </div>
            <span onClick={handleShowNav} className="md:hidden">
              <Menu size={32} />
            </span>
            <div
              className={clsx(
                "absolute bg-blue-950 p-10 right-5 rounded-md duration-300 md:static",
                showNav ? "top-20" : "top-[-100%]"
              )}
            >
              <ul className="grid gap-5 md:flex md:gap-7">
                <li>
                  <Link to={"/"}> Home</Link>
                </li>
                <li>
                  <Link to={"/signup"}>Sign up</Link>
                </li>
                <li>
                  <Link to={"/signin"}>Login</Link>
                </li>
                <li>
                  <Link to={"/"}>Provider login</Link>
                </li>
                <li>
                  <Link to={"/"}>Services</Link>
                </li>
              </ul>
            </div>
          </nav>
        </header>

        {/* main body */}
        <main>
          <section className="my-10 flex flex-col gap-10 justify-between items-center md:flex-row">
            <div className="bg-blue-950">
              <div className="mb-3">
                <h1 className="text-3xl font-medium md:text-6xl md:w-[70%]">
                  Healthy Communities Start here.
                </h1>
                <p className="md:text-2xl">protect your health!</p>
              </div>
              <div className="bg-white flex gap-5 items-center justify-center rounded-md p-5 cursor-pointer my-5 md:w-[60%]">
                <span>
                  <Calendar color="#172554" />
                </span>
                <span>
                  <p className="text-blue-950">Book Appointment</p>
                </span>
              </div>
              <div className="bg-white p-5 rounded-md text-blue-950 md:w-[60%]">
                <ul className="flex gap-3 text-center justify-between">
                  <li>
                    <span>
                      70+ <br /> Doctors
                    </span>
                  </li>
                  <li>
                    <span>
                      500+ <br /> Patients
                    </span>
                  </li>
                  <li>
                    <span>
                      100+ <br /> Vaccinations
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <img
                src="/images/biegebox.png"
                alt="hero image"
                className="w-[300px]"
              />
            </div>
          </section>

          <section className="my-10">
            <h2 className="text-center text-2xl md:text-3xl md:w-[70%] md:mx-auto pb-10">
              Receive insights from experienced professionals.
            </h2>
            <div className="grid grid-cols-1 gap-20 md:grid-cols-3 text-center">
              <div className="border p-5 rounded-md">
                <div className="cursor-pointer">
                  <h3 className="flex items-center gap-2 justify-center text-[20px] pb-2">
                    <span>
                      <SmilePlus />
                    </span>
                    Dentist
                  </h3>
                  <p>
                    Prioritize your oral health by scheduling a dental checkup
                    with an experienced professional who can provide
                    personalized care, prevent issues like cavities and gum
                    disease, and help you maintain a healthy, confident smile.
                  </p>
                </div>
              </div>

              <div className="border p-5 rounded-md">
                <div className="cursor-pointer">
                  <h3 className="flex items-center gap-2 justify-center text-[20px] pb-2">
                    <span>
                      <Bone />
                    </span>
                    Physiotherapist
                  </h3>
                  <p>
                    Improve your strength, mobility, and overall well-being by
                    getting trained by a professional physiotherapist who can
                    guide you with personalized exercises and expert care
                    tailored to your needs.
                  </p>
                </div>
              </div>

              <div className="border p-5 rounded-md">
                <div className="cursor-pointer">
                  <h3 className="flex items-center gap-2 justify-center text-[20px] text-nowrap pb-2">
                    <span>
                      <Soup />
                    </span>
                    Dietrician & Nutritionist
                  </h3>
                  <p>
                    Achieve your health goals with a personalized meal plan
                    created by a certified dietician and nutritionist, designed
                    to meet your nutritional needs and support a balanced,
                    healthy lifestyle.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="my-20">
            <SwiperCard />
          </section>
        </main>

        {/* footer */}
        <footer>
          <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 md:justify-items-center border-t pt-10">
            <div>
              <h3 className="text-[20px] pb-2">Visit us</h3>
              <ul className="grid gap-y-2">
                <li>123 Placeholder Lane</li>
                <li>Open : Mon - Fri</li>
                <li>8am - 5am</li>
                <li>Phone : (+234) xxx xxx xxx</li>
                <li>Email : info@xxxcommunityclinic</li>
              </ul>
            </div>

            <div>
              <h3 className="text-[20px] pb-2">Connect with us</h3>
              <ul className="grid gap-y-2">
                <li>Facebook</li>
                <li>instagram</li>
                <li>8am - 5am</li>
                <li>Twitter</li>
                <li>Linkdln</li>
              </ul>
            </div>

            <div>
              <h3 className="text-[20px] pb-2">Quixk links</h3>
              <ul className="grid gap-y-2">
                <li>FAQs</li>
                <li>Provider login</li>
                <li>Our services</li>
                <li>Terms of us</li>
              </ul>
            </div>
          </div>

          <p className="text-center py-10">
            &copy; 2025 xxx community Health clinic. All rights reserved
          </p>
        </footer>
      </div>
    </div>
  );
};
export default Home;
