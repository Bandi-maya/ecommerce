'use client';

import React from 'react';
import { Clock, BarChart, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

// Define the shape of the Course object for Type Safety
interface CourseProps {
  id: string | number;
  title: string;
  img: string;
  age: string;
  description: string;
  level?: string;   // e.g., "Beginner"
  duration?: string; // e.g., "12 Weeks"
  tags?: string[];
}

export default function CourseCard({ course }: { course: CourseProps }) {
  return (
    <article className="group relative bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">
      
      {/* 1. Image Section */}
      <div className="relative aspect-[16/9] overflow-hidden bg-gray-100">
        <img 
          src={course.img} 
          alt={course.title} 
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
        />
        
        {/* Overlay Gradient (for text readability if needed, usually subtle) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Floating Badge: Age Group */}
        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-900 shadow-sm flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
          {course.age}
        </div>
      </div>

      {/* 2. Content Body */}
      <div className="p-5 flex flex-col flex-grow">
        
        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 line-clamp-1 group-hover:text-orange-600 transition-colors mb-2">
          {course.title}
        </h3>

        {/* Meta Info Row (Duration | Level) */}
        <div className="flex items-center gap-4 text-xs font-medium text-gray-500 mb-3">
          <div className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded">
            <BarChart className="w-3.5 h-3.5 text-orange-500" />
            <span>{course.level || 'Beginner'}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded">
            <Clock className="w-3.5 h-3.5 text-orange-500" />
            <span>{course.duration || '24 Sessions'}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed mb-4 flex-grow">
          {course.description}
        </p>

        {/* Divider */}
        <div className="h-px w-full bg-gray-100 mb-4" />

        {/* 3. Action Area */}
        <div className="space-y-3">
          {/* Primary CTA */}
          <button className="w-full relative overflow-hidden rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-orange-500/20 transition-all hover:shadow-orange-500/40 hover:scale-[1.02] active:scale-[0.98]">
            <div className="flex items-center justify-center gap-2 relative z-10">
              <Sparkles className="w-4 h-4 fill-white/20" />
              <span>Book a Free Trial</span>
            </div>
            {/* Shimmer Effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </button>

          {/* Secondary Link */}
          <a 
            href={`/courses/${course.id}`} // Replace with Link component if using Next.js
            className="flex items-center justify-center gap-1 text-sm font-semibold text-gray-500 hover:text-orange-600 transition-colors group/link"
          >
            View Details
            <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
          </a>
        </div>
      </div>
    </article>
  );
}