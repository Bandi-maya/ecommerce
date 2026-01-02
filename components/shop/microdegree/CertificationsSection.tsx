import React from 'react';

const CertificationsSection = () => {
  const certifications = [
    {
      label: "Curriculum Designed By",
      img: "https://images.avishkaar.cc/misc/shop/microdegree/certifications-1.png",
      alt: "Curriculum Design Partner Logo"
    },
    {
      label: "Accredited By",
      img: "https://images.avishkaar.cc/misc/shop/microdegree/certifications-2.png",
      alt: "Accreditation Partner Logo"
    },
    {
      label: "Trusted By",
      img: "https://images.avishkaar.cc/misc/shop/microdegree/certifications-3.png",
      alt: "Trusted Partner Logo"
    }
  ];

  return (
    <section className="w-full py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
            Course Certifications
          </h2>
          <div className="w-16 h-1 bg-blue-600 mx-auto mt-4 rounded-full opacity-80"></div>
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {certifications.map((item, index) => (
            <div 
              key={index}
              className="
                group flex flex-col items-center justify-between
                bg-white p-8 rounded-2xl
                border border-gray-100 shadow-sm
                transition-all duration-300
                hover:shadow-xl hover:-translate-y-1
              "
            >
              {/* Label (Top) */}
              <span className="mb-6 text-xs font-bold tracking-widest text-gray-400 uppercase">
                {item.label}
              </span>

              {/* Image Container (Bottom) */}
              <div className="w-full flex-1 flex items-center justify-center min-h-[100px]">
                <img
                  loading="lazy"
                  src={item.img}
                  alt={item.alt}
                  className="
                    max-h-20 w-auto object-contain 
                    filter grayscale opacity-80 
                    transition-all duration-300 
                    group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105
                  "
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;