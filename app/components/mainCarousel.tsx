"use client";

import Image from "next/image";
import { Carousel, CarouselSlide } from "@mantine/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Box,Button } from "@mantine/core";
import { useRef } from "react";

const slides = [
  {
    id: 1,
    image: "/images/carousel/carousel-design-1.png",
    alt: "Background",
    button:<Button
    pos="absolute"
    top="90%"
    left="80%"
    component="a"
    href="#"
    size="lg"
    variant="filled"
    color="#a2bd42"
    >
      Click here for details
    </Button> 
  },
  {
    id: 2,
    image: "/images/carousel/carousel-design-2.png",
    alt: "Background",
    button:<Button
      pos="absolute"
      top="90%"
      right="80%"
      component="a"
      href="#"
      size="lg"
      variant="filled"
      color="#03d2ff"
      >
        Our Vision
      </Button> 
  },
  {
    id: 3,
    image: "/images/carousel/carousel-design-3.png",
    alt: "Background",
    button:<Button
      pos="absolute"
      top="90%"
      right="80%"
      component="a"
      href="#"
      size="lg"
      variant="filled"
      color="#03d2ff"
      >
        Donate Now
      </Button> 
  },
  {
    id: 4,
    image: "/images/carousel/carousel-design-4.png",
    alt: "Background",
  },
];

export function MainCarousel() {
  const autoplay = useRef(Autoplay({ delay: 2500 }));

  return (
    <Carousel w={"100%"} h={"90%"} pos={"absolute"} top={0} left={0} loop plugins={[autoplay.current]} onMouseEnter={autoplay.current.stop} onMouseLeave={autoplay.current.reset}>
      {slides.map((slide) => (
        <CarouselSlide key={slide.id} w={"100%"} h={"90%"} pos={"relative"} top={0} left={0}>
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
          <Box>
            {slide.button}
          </Box>
        </CarouselSlide>
      ))}
    </Carousel>
  );
}
