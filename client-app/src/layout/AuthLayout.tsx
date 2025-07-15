import { Hospital } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <div className="bg-blue-950 relative h-screen overflow-y-scroll">
        <div className="absolute top-2 left-20 z-2 w-60 h-60 opacity-20">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path
              fill="#FFD6E8"
              d="M47.8,-49.3C58.8,-36.7,62.6,-18.3,61.7,-0.9C60.7,16.4,55,32.9,44,44.6C32.9,56.3,16.4,63.3,-0.5,63.7C-17.4,64.2,-34.9,58.3,-47.9,46.6C-61,34.9,-69.8,17.4,-68.9,0.8C-68.1,-15.7,-57.6,-31.5,-44.6,-44C-31.5,-56.6,-15.7,-66,1.3,-67.3C18.3,-68.6,36.7,-61.8,47.8,-49.3Z"
              transform="translate(100 100)"
            />
          </svg>
        </div>
        <div className="absolute bottom-12 right-20 z-2 w-60 h-60 opacity-20">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path
              fill="#FFD6E8"
              d="M47.8,-49.3C58.8,-36.7,62.6,-18.3,61.7,-0.9C60.7,16.4,55,32.9,44,44.6C32.9,56.3,16.4,63.3,-0.5,63.7C-17.4,64.2,-34.9,58.3,-47.9,46.6C-61,34.9,-69.8,17.4,-68.9,0.8C-68.1,-15.7,-57.6,-31.5,-44.6,-44C-31.5,-56.6,-15.7,-66,1.3,-67.3C18.3,-68.6,36.7,-61.8,47.8,-49.3Z"
              transform="translate(100 100)"
            />
          </svg>
        </div>
        <div className="container mx-auto w-full flex flex-col items-center pt-24 text-white px-4 sm:px-8 md:px-16 xl:px-24 2xl:px-32 min-h-screen py-8 ">
          <div className="">
            <div className="text-2xl font-semibold flex gap-2 items-center justify-center">
              <Hospital size={24} />
              <div>
                C<span className="text-pink-400">H</span>C
              </div>
            </div>
            <p className="text-sm font-semibold md:text-lg">
              Community <span className="text-pink-400">Health</span> Clinic
            </p>
          </div>
          <Card className="mt-24 p-8 bg-blue-900/30 border-gray-400/20 w-full max-w-4xl xl:max-w-2xl">
            <CardContent>{children}</CardContent>
          </Card>
        </div>
      </div>
      <div className="sticky h-screen hidden md:inline-block">
        <img
          src="/10290175.jpg"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
