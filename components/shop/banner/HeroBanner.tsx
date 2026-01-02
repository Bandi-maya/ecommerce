import React from 'react';
import HeaderLeadForm from './HeaderLeadForm';

export default function HeroBanner() {
  return (
    <div className="relative w-full min-h-[650px] lg:min-h-[700px] flex items-center overflow-hidden bg-gray-900">
      
      {/* 1. Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <picture>
          <source
            media="(min-width:750px)"
            srcSet="https://images.avishkaar.cc/misc/shop/microdegree-page-banner.png"
          />
          <img
            loading="lazy"
            className="w-full h-full object-cover object-center"
            src="https://images.avishkaar.cc/misc/shop/microdegree-page-banner-mobile.png"
            alt="Microdegrees - Robotics and Coding for Kids"
          />
        </picture>
        {/* Dark Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent lg:via-black/40"></div>
      </div>

      {/* 2. Content Overlay Layer */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-12 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Marketing Text */}
          <div className="text-white space-y-6 max-w-2xl mx-auto lg:mx-0 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              Future Innovators Are <br className="hidden lg:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-300">
                Nurtured Here!
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-200 font-light leading-relaxed">
              Learn <span className="font-bold text-orange-400">Robotics</span> and{' '}
              <span className="font-bold text-orange-400">Coding</span> Online from Experts for{' '}
              <span className="font-bold text-white bg-white/10 px-2 py-0.5 rounded-md border border-white/20">
                Kids Aged 8-15
              </span>
            </p>

            {/* Divider Line */}
            <div className="w-24 h-1.5 bg-orange-500 rounded-full mx-auto lg:mx-0 opacity-90"></div>

            <p className="text-base sm:text-lg text-gray-300 font-medium tracking-wide uppercase">
              Tailored to Your Child's Age and Skill Level
            </p>
          </div>

          {/* Right Column: Lead Form */}
          <div className="flex justify-center lg:justify-end w-full">
             {/* The form has its own internal width/container logic, 
                 so we just place it here. */}
            <HeaderLeadForm />
          </div>

        </div>
      </div>
    </div>
  );
}