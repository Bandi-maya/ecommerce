'use client';

import Image from 'next/image';
// Adjust the import path based on where you saved the previous file
import BackgroundGrid from '../home/marqueeBackground/BackgroundGrid';

// --- Data ---
const PARTNER_IMAGES = [
    "https://images.avishkaar.cc/misc/home/partners/partners-aim.webp",
    "https://images.avishkaar.cc/misc/home/partners/partners-amazon.webp",
    "https://images.avishkaar.cc/misc/home/partners/partners-andhra.webp",
    "https://images.avishkaar.cc/misc/home/partners/partners-flipkart.webp",
    "https://images.avishkaar.cc/misc/home/partners/partners-goi.webp",
    "https://images.avishkaar.cc/misc/home/partners/partners-iit.webp",
    "https://images.avishkaar.cc/misc/home/partners/partners-intel.webp",
    "https://images.avishkaar.cc/misc/home/partners/partners-maharashtra.webp",
    "https://images.avishkaar.cc/misc/home/partners/partners-next.webp",
    "https://images.avishkaar.cc/misc/home/partners/partners-plaksha.webp",
    "https://images.avishkaar.cc/misc/home/partners/partners-sikkim.webp",
    "https://images.avishkaar.cc/misc/home/partners/partners-tamil-nadu.webp",
];

export default function PartnersSection() {
    return (
        // Added a custom shadow to the top and bottom of the entire section for separation
        <section className="relative py-24 bg-white overflow-hidden z-10 shadow-[0_-5px_15px_-5px_rgba(0,0,0,0.05),0_5px_15px_-5px_rgba(0,0,0,0.05)]">

            <BackgroundGrid
                color="rgba(29, 28, 28, 0.05)"
                cellSize={40}
                className="z-0"
            />

            {/* Decorative Top/Bottom Borders */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent z-10" />
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent z-10" />

            {/* Content Container */}
            <div className="relative z-10 container mx-auto px-4 mb-16 text-center">
                <span className="inline-block py-1 px-3 rounded-full bg-blue-50 text-blue-600 text-sm font-semibold tracking-wide mb-4">
                    OUR ECOSYSTEM
                </span>
                <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
                    Trusted by Renowned Institutions
                </h2>
                <p className="max-w-2xl mx-auto text-lg text-slate-600">
                    We are proud to power innovation labs and STEM learning initiatives for leading governments, tech giants, and educational bodies.
                </p>
            </div>

            {/* Marquee Wrapper */}
            <div className="relative z-10 w-full">

                {/* Gradient Fade Masks - Made slightly stronger to cover the new card shadows at edges */}
                <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 z-20 bg-gradient-to-r from-white via-white/95 to-transparent pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 z-20 bg-gradient-to-l from-white via-white/95 to-transparent pointer-events-none" />

                {/* Scrolling Container */}
                <div className="marquee-container flex overflow-hidden select-none py-4">
                    <div className="marquee-track flex gap-8 md:gap-12 px-4">

                        {/* 1. First Set of Logos */}
                        {PARTNER_IMAGES.map((src, idx) => (
                            <div
                                key={`p1-${idx}`}
                                // Added `shadow-[0_2px_8px_-2px_rgba(0,0,0,0.08)]` for a subtle base shadow
                                className="group relative flex-shrink-0 flex items-center justify-center w-[160px] md:w-[200px] h-[100px] bg-slate-50/90 backdrop-blur-sm rounded-xl border border-slate-200/60 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.08)] transition-all duration-300 hover:bg-white hover:shadow-xl hover:shadow-blue-900/10 hover:-translate-y-1 hover:border-blue-200"
                            >
                                <div className="relative w-2/3 h-2/3">
                                    <Image
                                        src={src}
                                        alt={`Partner Logo ${idx + 1}`}
                                        fill
                                        sizes="(max-width: 768px) 150px, 200px"
                                        className="object-contain filter grayscale opacity-60 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110"
                                    />
                                </div>
                            </div>
                        ))}

                        {/* 2. Duplicate Set for Infinite Loop */}
                        {PARTNER_IMAGES.map((src, idx) => (
                            <div
                                key={`p2-${idx}`}
                                // Added the same shadow class here
                                className="group relative flex-shrink-0 flex items-center justify-center w-[160px] md:w-[200px] h-[100px] bg-slate-50/90 backdrop-blur-sm rounded-xl border border-slate-200/60 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.08)] transition-all duration-300 hover:bg-white hover:shadow-xl hover:shadow-blue-900/10 hover:-translate-y-1 hover:border-blue-200"
                            >
                                <div className="relative w-2/3 h-2/3">
                                    <Image
                                        src={src}
                                        alt={`Partner Logo ${idx + 1}`}
                                        fill
                                        sizes="(max-width: 768px) 150px, 200px"
                                        className="object-contain filter grayscale opacity-60 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110"
                                    />
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            </div>

            <style jsx>{`
                .marquee-track {
                    width: max-content;
                    animation: scroll 50s linear infinite;
                }

                .marquee-container:hover .marquee-track {
                    animation-play-state: paused;
                }

                @keyframes scroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(calc(-50% - 2rem)); /* 2rem accounts for half the gap */ }
                }
            `}</style>
        </section>
    );
}