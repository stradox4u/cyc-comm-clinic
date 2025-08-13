import { Hospital, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#0D132E] text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32">
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
          <div className="space-y-4">
            <Link to={"/"} className="flex items-center space-x-2">
              <Hospital className="h-6 w-6 text-pink-400" />
              <span className="text-xl font-bold">
                C <span className="text-pink-400">H</span> C
              </span>
            </Link>
            <p className="text-gray-400">
              Providing comprehensive, compassionate healthcare services to our
              community since 2014.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <div className="space-y-2">
              <Link
                to="/services"
                className="block text-gray-400 hover:text-white transition-colors"
              >
                Services
              </Link>
              <Link
                to="/contact"
                className="block text-gray-400 hover:text-white transition-colors"
              >
                Contact
              </Link>
              <Link
                to="/login"
                className="block text-gray-400 hover:text-white transition-colors"
              >
                Patient Portal
              </Link>
              <Link
                to="/register"
                className="block text-gray-400 hover:text-white transition-colors"
              >
                Register
              </Link>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Services</h3>
            <div className="space-y-2">
              <div className="text-gray-400">Primary Care</div>
              <div className="text-gray-400">Urgent Care</div>
              <div className="text-gray-400">Preventive Care</div>
              <div className="text-gray-400">Mobile Outreach</div>
            </div>
          </div>
          <div className="space-y-4">
            <h3 id="contact" className="text-lg font-semibold">
              Contact Info
            </h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-gray-400">
                <Phone className="h-4 w-4" />
                <span>(555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <Mail className="h-4 w-4" />
                <span>info@communityhealthclinic.com</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <MapPin className="h-4 w-4" />
                <span>123 Health St, Springfield, IL 62701</span>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Community Health Clinic. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
