import React from 'react';

const AwardsCarousel = () => {
  const awards = [
    "awards-4.webp", "awards-5.webp", "awards-6.webp", 
    "awards-7.webp", "awards-8.webp", "awards-9.webp", 
    "awards-1.webp", "awards-2.webp", "awards-3.webp"
  ];

  // Create a double list for the seamless loop
  const loopingAwards = [...awards, ...awards];

  return (
    <>
      {/* 1. Standard CSS Style Block (Works in all React environments) */}
      <style>{`
        @keyframes infinite-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-infinite-scroll {
          animation: infinite-scroll 30s linear infinite;
        }
        /* Pause animation on hover */
        .animate-infinite-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>

      <section className="w-full py-12 bg-white overflow-hidden">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
            Shining Globally
          </h2>
          <p className="text-gray-500 mt-2 text-sm uppercase tracking-wider font-semibold">
            Recognition & Awards
          </p>
        </div>

        {/* Carousel Window */}
        <div className="relative w-full max-w-7xl mx-auto">
          
          {/* Left Fade Mask */}
          <div className="absolute top-0 left-0 z-10 h-full w-20 bg-gradient-to-r from-white to-transparent pointer-events-none" />
          
          {/* Right Fade Mask */}
          <div className="absolute top-0 right-0 z-10 h-full w-20 bg-gradient-to-l from-white to-transparent pointer-events-none" />

          {/* Scrolling Container */}
          {/* We use flex and w-max to ensure all items sit in a single long row */}
          <div className="flex w-max animate-infinite-scroll">
            {loopingAwards.map((img, index) => (
              <div 
                key={index} 
                className="mx-8 w-[200px] flex items-center justify-center select-none"
              >
                <img
                  loading="lazy"
                  src={`https://images.avishkaar.cc/misc/home/awards/${img}`}
                  alt="Award Recognition"
                  // Added min-h to prevent collapse if image loads slowly
                  className="
                    min-h-[60px] max-h-24 w-auto object-contain 
                    filter grayscale opacity-60 
                    transition-all duration-300 
                    hover:grayscale-0 hover:opacity-100 hover:scale-110
                  "
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default AwardsCarousel;