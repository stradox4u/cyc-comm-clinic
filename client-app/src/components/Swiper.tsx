import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function SwiperCard() {
  return (
    <div>
      <h2 className="text-center md:text-3xl mb-6 text-2xl">
        What our users have to say
      </h2>
      <Swiper
        modules={[Navigation, Pagination]}
        slidesPerView={1}
        navigation
        className="w-full max-w-md mx-auto flex items-center justify-center"
      >
        <SwiperSlide>
          <div className="flex flex-col items-center text-center space-y-4">
            <img
              src="/images/user1.jpeg"
              alt="user 1"
              className="w-24 h-24 rounded-full object-cover"
            />
            <p className="px-4">
              The staff at the community clinic are incredibly kind and
              professional.
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex flex-col items-center text-center space-y-4">
            <img
              src="/images/user2.jpeg"
              alt="user 2"
              className="w-24 h-24 rounded-full object-cover"
            />
            <p className="px-4">
              I always feel heard and cared for whenever I visit.
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex flex-col items-center text-center space-y-4">
            <img
              src="/images/user3.jpeg"
              alt="user 3"
              className="w-24 h-24 rounded-full object-cover"
            />
            <p className="px-4">
              It's a relief to have access to affordable healthcare so close to
              home.
            </p>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
