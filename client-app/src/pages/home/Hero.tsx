import { Calendar, Clock, Phone, Shield } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Link } from "react-router-dom";
import { Badge } from "../../components/ui/badge";

const stats = [
  { value: "70+", role: "Doctors" },
  { value: "500+", role: "Patients" },
  { value: "100+", role: "Vaccinations" },
  { value: "250+", role: "Lab Tests" },
];
const Hero = () => {
  return (
    <div className="bg-[#6A5CA3]">
      <div className="w-full h-[calc(64vh-5rem)] md:h-[calc(80vh-5rem)] lg:h-[calc(90vh-5rem)] flex md:grid md:items-center py-16 grid-cols-1 md:grid-cols-2 px-4 md:px-16 lg:px-24 gap-8 relative container mx-auto">
        <div className="space-y-4 relative w-1/2 md:w-full">
          <Badge
            variant="secondary"
            className="w-fit bg-transparent border text-white border-gray-900/10 font-medium"
          >
            Trusted Community Healthcare
          </Badge>
          <h1 className="font-bold text-3xl md:text-5xl xl:text-6xl text-white">
            Your Health, <span className="text-purple-300 ">Our</span> Priority
          </h1>
          <p className="text-gray-100 md:text-xl md:leading-8 text-sm">
            Providing comprehensive, compassionate healthcare services to our
            community. From routine check-ups to urgent care, we're here for you
            and your family.
          </p>
          <div className="flex gap-4">
            <Button size="lg" className="md:text-lg px-8 md:py-6">
              <Calendar />
              <Link to={"/signup"}>Book Appointment</Link>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="md:text-lg px-8 md:py-6 bg-transparent text-white"
            >
              <Link to="/services">Our Services</Link>
            </Button>
          </div>
          <div className="flex flex-row items-center space-x-6 text-sm text-white pt-4">
            <div className="flex items-center space-x-2 text-xs md:text-sm text-nowrap">
              <Clock className="h-4 w-4" />
              <span>Open 7 Days</span>
            </div>
            <div className="flex items-center space-x-2 text-xs md:text-sm text-nowrap">
              {" "}
              <Phone className="h-4 w-4" />
              <span>24/7 Support</span>
            </div>
            <div className="flex items-center space-x-2 text-xs md:text-sm text-nowrap">
              {" "}
              <Shield className="h-4 w-4" />
              <span>Insurance Accepted</span>
            </div>
          </div>
        </div>
        <div className="lg:place-self-end">
          <img src="/beigebox.png" alt="" className="hidden md:flex" />
          <img src="/beigebox(1).png" alt="" className="md:hidden flex" />
        </div>
        <div className="absolute bg-white w-[420px] md:w-1/2 lg:w-1/2 left-1.5 xl:left-[800px] bottom-6 lg:h-24 rounded-xl lg:px-8 py-4 shadow-md">
          <div className="grid grid-cols-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <h2 className="text-purple-900 font-bold text-xl md:text-2xl">
                  {stat.value}
                </h2>
                <p className="md:text-base text-sm text-gray-600">
                  {stat.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Hero;
