import Card from "../components/Card";

import { useState } from "react";

import clsx from "clsx";

import { Menu } from "lucide-react";

const Home = () => {
  const [showNav, setShowNav] = useState(false);

  const handleShowNav = () => {
    setShowNav((showNav) => !showNav);
  };

  return (
    <div className="bg-[#0B0E35] text-white min-h-screen">
      <div className="container mx-auto px-10 py-5">
        {/* header */}
        <header>
          <nav className="flex items-center justify-between">
            <div>
              <span className="text-2xl font-bold">CHC</span>
            </div>
            <span onClick={handleShowNav} className="md:hidden">
              <Menu size={32} />
            </span>
            <div
              className={clsx(
                "absolute bg-[#0B0E35] p-10 right-5 rounded-md duration-300 md:static",
                showNav ? "top-20" : "top-[-100%]"
              )}
            >
              <ul className="grid gap-5 md:flex md:gap-7">
                <li>Home</li>
                <li>Contact</li>
                <li>Sign up</li>
                <li>Login</li>
              </ul>
            </div>
          </nav>
        </header>

        {/* main body */}
        <main>
          <section className="my-20">
            <ul className="grid grid-cols-1 gap-10 text-center sm:grid-cols-2 md:grid-cols-3">
              <Card text={"Community Health Center"} bgColor={"bg-[#7EBDAB]"} />
              <Card bgColor={"bg-[#68CADF]"}>
                <img
                  src="/images/limebox.png"
                  alt=""
                  className="mx-auto h-[200px]"
                />
              </Card>
              <Card
                text={"Book an apppoitment with a consultant today"}
                bgColor={"bg-[#71978D]"}
              />
              <Card bgColor={"bg-[#9B6A3C]"}>
                <img
                  src="/images/orangebox.png"
                  alt=""
                  className="mx-auto h-[200px]"
                />
              </Card>
              <Card
                text={"Heatlth communities start here. See a GP today!"}
                bgColor={"bg-[#A06455]"}
              />
              <Card bgColor={"bg-[#A89176]"}>
                <img
                  src="/images/biegebox.png"
                  alt=""
                  className="mx-auto h-[200px]"
                />
              </Card>
              <Card text={"Services"} bgColor={"bg-[#6A5CA3]"} />
              <Card
                text={"Subscribe to our newsletter"}
                bgColor={"bg-[#C089BA]"}
              />
              <Card
                text={"Affordable or free services"}
                bgColor={"bg-[#4850C2]"}
              />
            </ul>
          </section>
        </main>

        {/* footer */}
        <footer>
          <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 md:justify-items-center">
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

          <p className="text-center pt-10">
            &copy; 2025 xxx community Health clinic. All rights reserved
          </p>
        </footer>
      </div>
    </div>
  );
};
export default Home;
