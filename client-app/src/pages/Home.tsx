import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import Header from "./home/Header";
import Hero from "./home/Hero";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import { Badge } from "../components/ui/badge";
import {
  Activity,
  Calendar,
  Clock,
  Heart,
  Shield,
  Star,
  Stethoscope,
  Users,
} from "lucide-react";
import Footer from "./home/Footer";

const Home = () => {
  const services = [
    {
      icon: <Heart className="h-8 w-8 text-blue-600" />,
      title: "Primary Care",
      description:
        "Comprehensive primary healthcare services for all ages with experienced physicians.",
    },
    {
      icon: <Activity className="h-8 w-8 text-green-600" />,
      title: "Preventive Care",
      description:
        "Regular check-ups, screenings, and vaccinations to keep you healthy.",
    },
    {
      icon: <Stethoscope className="h-8 w-8 text-purple-600" />,
      title: "Urgent Care",
      description:
        "Walk-in urgent care services for non-emergency medical needs.",
    },
    {
      icon: <Users className="h-8 w-8 text-orange-600" />,
      title: "Family Medicine",
      description:
        "Complete healthcare solutions for your entire family under one roof.",
    },
    {
      icon: <Shield className="h-8 w-8 text-red-600" />,
      title: "Health Screenings",
      description: "Comprehensive health screenings and diagnostic services.",
    },
    {
      icon: <Calendar className="h-8 w-8 text-teal-600" />,
      title: "Mobile Outreach",
      description: "Community health programs and mobile clinic services.",
    },
  ];

  // const stats = [
  //   { number: "15,000+", label: "Patients Served" },
  //   { number: "25+", label: "Healthcare Providers" },
  //   { number: "10", label: "Years of Service" },
  //   { number: "98%", label: "Patient Satisfaction" },
  // ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Patient",
      content:
        "The care I received was exceptional. The staff is friendly and the doctors are very knowledgeable.",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Patient",
      content:
        "Quick appointments, professional service, and they really care about their patients' wellbeing.",
      rating: 5,
    },
    {
      name: "Emma Davis",
      role: "Patient",
      content:
        "I've been coming here for years. The mobile outreach program is fantastic for our community.",
      rating: 5,
    },
  ];
  return (
    <div className="min-h-screen">
      <div>
        {/* header */}
        <Header />

        <Hero />
        {/* main body */}
        <main className="">
          <section className="py-20 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32">
              <div id="services" className="text-center space-y-4 mb-16">
                <Badge variant="outline" className="w-fit mx-auto">
                  Our Services
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold">
                  Comprehensive Healthcare Services
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  From preventive care to urgent treatment, we offer a full
                  range of medical services to keep you and your family healthy.
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service, index) => (
                  <Card
                    key={index}
                    className="hover:shadow-lg transition-shadow"
                  >
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        {service.icon}
                        <CardTitle className="text-xl">
                          {service.title}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">
                        {service.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="text-center mt-12">
                <Button size="lg" asChild>
                  <Link to="/landing/services">View All Services</Link>
                </Button>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-8">
                  <div className="space-y-4">
                    <Badge variant="outline" className="w-fit">
                      Why Choose Us
                    </Badge>
                    <h2 className="text-3xl md:text-4xl font-bold">
                      Modern Healthcare, Personal Touch
                    </h2>
                    <p className="text-lg text-muted-foreground">
                      We combine cutting-edge medical technology with
                      compassionate, personalized care to deliver the best
                      possible health outcomes.
                    </p>
                  </div>
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-blue-100 p-2 rounded-lg">
                        <Clock className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">
                          Minimal Wait Times
                        </h3>
                        <p className="text-muted-foreground">
                          Advanced scheduling system ensures you're seen on
                          time, every time.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="bg-green-100 p-2 rounded-lg">
                        <Users className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">
                          Expert Medical Team
                        </h3>
                        <p className="text-muted-foreground">
                          Board-certified physicians and experienced healthcare
                          professionals.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="bg-purple-100 p-2 rounded-lg">
                        <Shield className="h-6 w-6 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">
                          Insurance Friendly
                        </h3>
                        <p className="text-muted-foreground">
                          We accept most major insurance plans and offer
                          flexible payment options.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <div className="bg-white rounded-2xl shadow-xl p-8">
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold">
                        Patient Portal Features
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <span>Online Appointment Booking</span>
                          <Badge variant="default">Available</Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <span>Medical Records Access</span>
                          <Badge variant="default">Available</Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <span>Prescription Refills</span>
                          <Badge variant="default">Available</Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <span>Lab Results</span>
                          <Badge variant="default">Available</Badge>
                        </div>
                      </div>
                      <Button className="w-full" asChild>
                        <Link to="/landing/register">Access Portal</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Testimonials Section */}
          <section className="py-20 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32">
              <div className="text-center space-y-4 mb-16">
                <Badge variant="outline" className="w-fit mx-auto">
                  Patient Reviews
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold">
                  What Our Patients Say
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Don't just take our word for it. Here's what our patients have
                  to say about their experience.
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                  <Card
                    key={index}
                    className="hover:shadow-lg transition-shadow"
                  >
                    <CardHeader>
                      <div className="flex items-center space-x-1 mb-2">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="h-4 w-4 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                      <CardDescription className="text-base italic">
                        "{testimonial.content}"
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div>
                        <div className="font-semibold">{testimonial.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {testimonial.role}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}

          <section className="py-20 bg-[#0D132E]/80 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 text-center">
              <div className="space-y-8">
                <h2 className="text-3xl md:text-4xl font-bold">
                  Ready to Take Control of Your Health?
                </h2>
                <p className="text-xl opacity-90 max-w-2xl mx-auto">
                  Join thousands of satisfied patients who trust us with their
                  healthcare needs. Book your appointment today and experience
                  the difference.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    variant="secondary"
                    asChild
                    className="text-lg px-8 py-6"
                  >
                    <Link to="/landing/register">Book Appointment</Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    asChild
                    className="text-lg px-8 py-6 border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
                  >
                    <a href="/#contact">Contact Us</a>
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </div>
  );
};
export default Home;
