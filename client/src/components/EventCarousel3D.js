"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
// import 'swiper/css/pagination'; // No longer needed
import 'swiper/css/navigation';

// import required modules
import { EffectCoverflow, Navigation } from 'swiper/modules'; // Pagination removed

export default function EventCarousel3D({ events }) {
  if (!events || events.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-zinc-600">No past events to display.</p>
      </div>
    );
  }

  return (
    <div className="relative w-full py-8 event-carousel-container">
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={3}
        spaceBetween={25} // Slightly increased space
        loop={events.length > 3}
        coverflowEffect={{
          rotate: 20, // Reduced rotation
          stretch: 0,
          depth: 80,  // Reduced depth
          modifier: 1,
          slideShadows: false,
        }}
        // pagination={{
        //   clickable: true,
        //   el: '.swiper-pagination-custom',
        // }} // Pagination removed
        navigation={{
          nextEl: '.swiper-button-next-custom',
          prevEl: '.swiper-button-prev-custom',
        }}
        modules={[EffectCoverflow, Navigation]} // Pagination module removed
        className="mySwiper" // Removed pb-12/pb-16 as no pagination dots below
      >
        {events.map((event) => (
          <SwiperSlide 
            key={event.id} 
            className="overflow-visible"
          >
            <Link href={`/events/${event.slug}`} className="group flex flex-col items-center text-center no-underline h-full">
              <div className="relative w-full aspect-[4/5] overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                <Image
                  src={event.imageUrl}
                  alt={event.imageAlt}
                  fill
                  sizes="(max-width: 640px) 80vw, (max-width: 1024px) 45vw, 370px"
                  className="object-cover"
                />
              </div>
              <h3 className="mt-4 text-md sm:text-lg font-normal text-zinc-800 group-hover:text-black transition-colors duration-300 px-2">
                {event.title}
              </h3>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
      
      {/* Custom Navigation Arrows - Plain Chevrons */}
      <button 
        className="swiper-button-prev-custom absolute left-[-10px] sm:left-[-30px] top-1/2 transform -translate-y-1/2 z-10 transition-opacity hover:opacity-70 focus:outline-none"
        aria-label="Scroll left"
      >
        <FiChevronLeft className="text-zinc-800 hover:text-black" size={30} />
      </button>
      <button 
        className="swiper-button-next-custom absolute right-[-10px] sm:right-[-30px] top-1/2 transform -translate-y-1/2 z-10 transition-opacity hover:opacity-70 focus:outline-none"
        aria-label="Scroll right"
      >
        <FiChevronRight className="text-zinc-800 hover:text-black" size={30} />
      </button>

      {/* Custom Pagination Container - Removed */}
      {/* <div className="swiper-pagination-custom text-center mt-6"></div> */}
    </div>
  );
}
