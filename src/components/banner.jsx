
'use client'; 

import Image from 'next/image';
import { useState } from 'react';

const carouselItems = [
  {
    id: 1,
    image: '/image/banner.jpg', // Path to your image in the public folder
    alt: 'Modern living room with comfortable seating',
    title: 'Discover Your Dream Home',
    description: 'Explore our curated collection of stunning properties.',
    buttonText: 'View Properties',
    link: '/properties',
  },
  {
    id: 2,
    image: '/image/banner2.jpg', // Path to another image
    alt: 'Luxury kitchen with island and modern appliances',
    title: 'Exceptional Quality & Design',
    description: 'Experience unparalleled craftsmanship and elegant interiors.',
    buttonText: 'Learn More',
    link: '/about',
  },
  // Add more items as needed
];

export default function Banner() {
  const [activeIndex, setActiveIndex] = useState(0);

  const goToNext = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === carouselItems.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? carouselItems.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative w-full overflow-hidden bg-gray-900">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {carouselItems.map((item, index) => (
          <div
            key={item.id}
            className="relative flex-shrink-0 w-full h-[600px] md:h-[700px] lg:h-[800px]" // Adjust height as needed
          >
            <Image
              src={item.image}
              alt={item.alt}
              fill // Makes the image fill the parent container
              style={{ objectFit: 'cover' }} // Ensures the image covers the area without distortion
              priority={index === 0} // Prioritize loading the first image
              className="brightness-50" // Darken image for better text readability
            />
            <div className="absolute inset-0 flex items-center justify-center p-4 text-center text-white z-10">
              <div className="max-w-2xl">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                  {item.title}
                </h1>
                <p className="text-lg md:text-xl mb-8 opacity-90">
                  {item.description}
                </p>
                <a
                  href={item.link}
                  className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full shadow-lg transition-colors duration-300"
                >
                  {item.buttonText}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrev}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-colors duration-300 z-20"
        aria-label="Previous slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5 8.25 12l7.5-7.5"
          />
        </svg>
      </button>
      <button
        onClick={goToNext}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-colors duration-300 z-20"
        aria-label="Next slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5 15.75 12l-7.5 7.5"
          />
        </svg>
      </button>

      {/* Indicators (Dots) */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
        {carouselItems.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              index === activeIndex ? 'bg-white' : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}