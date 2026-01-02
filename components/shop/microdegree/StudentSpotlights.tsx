'use client';

import React from 'react';
import { Play, ArrowRight, Trophy } from 'lucide-react';

// --- Mock Data ---
const PROJECTS = [
  {
    id: 1,
    student: 'Aarav S.',
    title: 'Smart Home Automation',
    img: 'https://images.unsplash.com/photo-1555677284-6a6f971635e0?auto=format&fit=crop&q=80&w=400',
    views: '1.2k'
  },
  {
    id: 2,
    student: 'Zara K.',
    title: 'Obstacle Avoiding Bot',
    img: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=400',
    views: '850'
  },
  {
    id: 3,
    student: 'Vihaan M.',
    title: 'Solar Tracker System',
    img: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=400',
    views: '2.1k'
  },
  {
    id: 4,
    student: 'Ishita R.',
    title: 'Gesture Control Car',
    img: 'https://images.unsplash.com/photo-1531297461136-82lw8e8d8d8d?auto=format&fit=crop&q=80&w=400', // Broken link placeholder fix: replaced with generic tech image
    views: '900'
  },
  {
    id: 5,
    student: 'Rohan G.',
    title: 'Automatic Plant Waterer',
    img: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80&w=400',
    views: '3.4k'
  },
  {
    id: 6,
    student: 'Meera P.',
    title: 'Line Follower Robot',
    img: 'https://images.unsplash.com/photo-1535378437327-b71280637041?auto=format&fit=crop&q=80&w=400',
    views: '1.5k'
  },
  {
    id: 7,
    student: 'Kabir J.',
    title: 'Voice Controlled Arm',
    img: 'https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?auto=format&fit=crop&q=80&w=400',
    views: '1.1k'
  },
  {
    id: 8,
    student: 'Ananya B.',
    title: 'Weather Station App',
    img: 'https://images.unsplash.com/photo-1592478411213-61535fdd861d?auto=format&fit=crop&q=80&w=400',
    views: '2.8k'
  }
];

export default function StudentSpotlights() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-end mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-50 text-orange-600 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
              <Trophy className="w-3 h-3" />
              <span>Wall of Fame</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Student Spotlights</h2>
            <p className="text-gray-500 mt-2 max-w-xl">
              Watch what our young innovators are building with code and robotics.
            </p>
          </div>
          
          <a href="#" className="hidden sm:flex items-center gap-1 text-sm font-semibold text-orange-600 hover:text-orange-700 transition-colors group">
            View All Projects
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="mt-8 text-center sm:hidden">
          <a href="#" className="inline-flex items-center justify-center w-full py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-100 transition-colors">
            View All Projects
          </a>
        </div>
      </div>
    </section>
  );
}

// --- Sub Component: Project Card ---
function ProjectCard({ project }: { project: typeof PROJECTS[0] }) {
  return (
    <a href="#" className="group block relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 hover:-translate-y-1">
      
      {/* 1. Thumbnail Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-900">
        <img 
          src={project.img} 
          alt={project.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100" 
        />
        
        {/* Dark Overlay on Hover */}
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />

        {/* Play Button (Centered) */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/40 transition-all duration-300 group-hover:scale-110 group-hover:bg-orange-600 group-hover:border-orange-600 group-hover:shadow-lg">
            <Play className="w-4 h-4 sm:w-5 sm:h-5 text-white fill-white translate-x-0.5" />
          </div>
        </div>

        {/* Views Badge (Bottom Left) */}
        <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/60 backdrop-blur-md rounded text-[10px] font-medium text-white flex items-center gap-1">
          <Play className="w-2.5 h-2.5" />
          {project.views}
        </div>
      </div>

      {/* 2. Info Content */}
      <div className="p-3 sm:p-4">
        <h3 className="text-sm sm:text-base font-bold text-gray-900 line-clamp-1 group-hover:text-orange-600 transition-colors">
          {project.title}
        </h3>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          By <span className="font-medium text-gray-700">{project.student}</span>
        </p>
      </div>
    </a>
  );
}