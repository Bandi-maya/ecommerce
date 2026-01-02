import React from 'react';

const BenefitsSection = () => {
  // Storing content as JSX to preserve the <span> styling naturally
  const benefits = [
    {
      img: "https://images.avishkaar.cc/misc/shop/microdegree/power-1.svg",
      text: (
        <>
          Early age exposure to tech helps kids become <span className="text-blue-600 font-bold">future-ready</span>.
        </>
      ),
      alt: "Future Ready Kids Icon"
    },
    {
      img: "https://images.avishkaar.cc/misc/shop/microdegree/power-2.svg",
      text: (
        <>
          Fosters innovative ideas and encourages <span className="text-blue-600 font-bold">creative problem-solving</span>.
        </>
      ),
      alt: "Creative Problem Solving Icon"
    },
    {
      img: "https://images.avishkaar.cc/misc/shop/microdegree/power-3.svg",
      text: (
        <>
          Help build <span className="text-blue-600 font-bold">logical</span> and <span className="text-blue-600 font-bold">critical thinking abilities</span> in kids.
        </>
      ),
      alt: "Critical Thinking Icon"
    },
    {
      img: "https://images.avishkaar.cc/misc/shop/microdegree/power-4.svg",
      text: (
        <>
          Boosts kid's <span className="text-blue-600 font-bold">self-esteem</span> and encourages <span className="text-blue-600 font-bold">independent learning</span>.
        </>
      ),
      alt: "Self Esteem Icon"
    }
  ];

  return (
    <section className="w-full py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
            The Power Of <span className="text-blue-600">Robotics & Coding</span> for Kids
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Empowering the next generation with the skills to build the future.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((item, index) => (
            <div 
              key={index}
              className="
                group flex flex-col items-center text-center p-6
                bg-white rounded-2xl
                border border-gray-100 shadow-sm
                transition-all duration-300 ease-in-out
                hover:shadow-xl hover:-translate-y-2 hover:border-blue-100
              "
            >
              {/* Image Container with Hover Effect */}
              <div className="mb-6 relative w-24 h-24 flex items-center justify-center">
                {/* Decorative blob background behind the image */}
                <div className="absolute inset-0 bg-blue-50 rounded-full opacity-0 scale-50 transition-all duration-300 group-hover:opacity-100 group-hover:scale-110"></div>
                
                <img
                  loading="lazy"
                  src={item.img}
                  alt={item.alt}
                  className="relative z-10 w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              {/* Text Content */}
              <p className="text-gray-700 text-lg leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;