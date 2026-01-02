'use client';

import React from 'react';
import { Star, Quote } from 'lucide-react';

// --- Data ---
const TESTIMONIALS = [
  {
    name: 'Rohit Goel',
    role: 'Parent of Aryan (Age 10)',
    text: "I didn't know where to start with robotics for my son. I got on a call with Avishkaar and they guided me perfectly. Now Aryan is building his own bots!",
    rating: 5,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    initials: 'RG'
  },
  {
    name: 'Ankur Bansal',
    role: 'Parent of Riya (Age 12)',
    text: "The Avishkaar Team is just not selling a product, they are creating minds. The curriculum is so well structured that my daughter learns something new every day.",
    rating: 5,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    initials: 'AB'
  },
  {
    name: 'Neha Bindal',
    role: 'Parent of Vihaan (Age 9)',
    text: "My son has grown significantly with Avishkaar. He has become more confident in his logic and problem-solving skills. Highly recommended for every parent.",
    rating: 4,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    initials: 'NB'
  },
];

export default function ParentTestimonials() {
  return (
    <section className="py-16 bg-gray-50 relative overflow-hidden">
      
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-orange-100 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-6 text-sm font-semibold text-orange-600 bg-orange-50 rounded-full border border-orange-100 uppercase tracking-wider">
            Testimonials
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
            Hear From Our <span className="text-orange-500">Happy Parents</span>
          </h2>
          <p className="text-lg text-gray-600">
            Join thousands of parents who have trusted us with their child's future in technology and innovation.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((card, index) => (
            <TestimonialCard key={index} data={card} />
          ))}
        </div>
      </div>
    </section>
  );
}

// --- Sub Component: Individual Card ---
function TestimonialCard({ data }: { data: typeof TESTIMONIALS[0] }) {
  return (
    <div className="group relative flex flex-col h-full bg-white rounded-2xl p-8 shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-orange-100">
      
      {/* Quote Icon Watermark */}
      <div className="absolute top-6 right-8 opacity-10 group-hover:opacity-20 transition-opacity">
        <Quote className="w-12 h-12 text-orange-500 fill-orange-500" />
      </div>

      {/* Stars */}
      <div className="flex gap-1 mb-6">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={`w-5 h-5 ${i < data.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200 fill-gray-200'}`} 
          />
        ))}
      </div>

      {/* Quote Text */}
      <div className="flex-grow mb-8 relative z-10">
        <p className="text-gray-600 leading-relaxed text-lg font-medium">
          "{data.text}"
        </p>
      </div>

      {/* Footer: Avatar & Info */}
      <div className="flex items-center gap-4 pt-6 border-t border-gray-100 mt-auto">
        <div className="relative">
          <img 
            src={data.image} 
            alt={data.name} 
            className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md"
            // Fallback if image fails (using initials)
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.parentElement?.classList.add('bg-orange-100', 'flex', 'items-center', 'justify-center', 'text-orange-600', 'font-bold');
              if (e.currentTarget.parentElement) e.currentTarget.parentElement.innerText = data.initials;
            }}
          />
        </div>
        <div>
          <h4 className="font-bold text-gray-900 text-base">{data.name}</h4>
          <p className="text-sm text-gray-500">{data.role}</p>
        </div>
      </div>
    </div>
  );
}