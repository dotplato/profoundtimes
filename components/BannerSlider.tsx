
"use client"

import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination } from "swiper/modules"
import "swiper/css"
import "swiper/css/pagination"
import Image from "next/image"
import Link from "next/link"

const banners = [
  {
    image: "/banner1.jpg",
    title: "Explore Fresh Ideas",
    href: "/library",
  },
  {
    image: "/banner2.jpg",
    title: "Learn Something New Today",
    href: "/library",
  },
  {
    image: "/banner3.jpg",
    title: "Your Curated Reading Spot",
    href: "/library",
  },
]

export function BannerSlider() {
  return (
    <>
      <div className="mb-16 rounded-xl overflow-hidden">
        <Swiper
          modules={[Autoplay, Pagination]}
          loop
          autoplay={{ delay: 4000 }}
          pagination={{ clickable: true }}
          slidesPerView={1}
        >
          {banners.map((banner, idx) => (
            <SwiperSlide key={idx}>
              <Link href={banner.href}>
                <div className="relative w-full h-[300px] md:h-[400px] group">
                  <Image
                    src={banner.image}
                    alt={banner.title}
                    fill
                    className="object-cover transition duration-500"
                    priority={idx === 0}
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition duration-300 z-10" />

                  {/* Read Text */}
                  <div className="absolute inset-0 flex items-center justify-center z-20">
                    <span className="text-white text-8xl font-bold opacity-0 group-hover:opacity-100 transition duration-300">
                      Read
                    </span>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style jsx global>{`
        .swiper-pagination-bullet {
          background: #ccc;
          opacity: 1;
        }
        .swiper-pagination-bullet-active {
          background: #a67c52;
        }
      `}</style>
    </>
  )
}

