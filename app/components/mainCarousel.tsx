"use client";

import Image from "next/image";
import { Carousel, CarouselSlide } from "@mantine/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Box } from "@mantine/core";
import { useRef } from "react";

const slides = [
  {
    id: 1,
    image: "/images/carousel/carousel-design-1.png",
    alt: "Background",
  },
  {
    id: 2,
    image: "/images/carousel/carousel-design-2.png",
    alt: "Background",
  },
  {
    id: 3,
    image: "/images/carousel/carousel-design-3.png",
    alt: "Background",
  },
  {
    id: 4,
    image: "/images/carousel/carousel-design-4.png",
    alt: "Background",
  },
];

export function MainCarousel() {
  const autoplay = useRef(Autoplay({ delay: 5000 }));

  return (
    <Carousel w={"100%"} h={"100%"} pos={"absolute"} top={0} left={0} loop plugins={[autoplay.current]} onMouseEnter={autoplay.current.stop} onMouseLeave={autoplay.current.reset}>
      {slides.map((slide) => (
        <CarouselSlide key={slide.id} w={"100%"} h={"100%"} pos={"relative"} top={0} left={0}>
          <Box w={"100vw"} h={"100vh"} pos={"relative"}>
            <Image
              src={slide.image}
              alt="Background"
              fill
              style={{
                objectFit: "cover", // Ensure the image covers the entire slide
                objectPosition: "center", // Center the image
                filter: "brightness(80%)", // Darkens the image
                zIndex: -1, // Ensure the image is behind other content
              }}
            />
          </Box>
        </CarouselSlide>
      ))}
    </Carousel>
  );
}
