'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle } from 'lucide-react';

// --- Data ---
const FAQ_DATA = [
  {
    question: 'Why is it important for kids to learn Robotics?',
    answer: 'Robotics fosters creativity and problem-solving skills. It allows children to apply math and science concepts in real-world scenarios, turning abstract theories into tangible machines. This hands-on approach builds confidence and engineering logic early on.'
  },
  {
    question: 'Why is it important for kids to learn Coding?',
    answer: 'Coding is the literacy of the digital age. It teaches logical thinking, algorithmic planning, and persistence. Learning to code empowers kids not just to consume technology, but to create it—opening doors to future careers in every industry.'
  },
  {
    question: 'What is the best age to introduce Coding & Robotics to children?',
    answer: 'We recommend starting as early as age 6–8 using block-based coding and simple mechanical kits. This age group is naturally curious and adapts quickly to visual logic. As they grow (10+), they can transition to text-based coding (Python) and complex electronics.'
  },
  {
    question: 'What is the scope of Robotics & Coding as a career?',
    answer: 'The demand for skills in AI, automation, and software development is skyrocketing. Careers in Robotics Engineering, Data Science, and Full Stack Development are among the highest-paid and most secure jobs globally.'
  },
  {
    question: 'Why is Avishkaar the best place to learn Robotics and Coding?',
    answer: 'Avishkaar offers a unique blend of hardware (proprietary kits) and software (expert curriculum). Unlike purely screen-based learning, our students build physical robots while writing the code that controls them, ensuring a deep, 360-degree understanding of STEM.'
  },
  {
    question: 'What is the importance of community to becoming an innovator?',
    answer: 'Innovation rarely happens in isolation. Our community allows students to showcase projects, compete in hackathons, and learn from peers. This collaborative environment mimics real-world engineering labs and keeps motivation high.'
  }
];

export default function FaqSection() {
  // Track which item is open (null = all closed)
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const toggleIndex = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-white relative overflow-hidden">
      {/* Background Decor (Optional) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-30">
        <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-orange-100 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-72 h-72 bg-indigo-50 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 text-orange-600 text-sm font-semibold uppercase tracking-wide">
            <HelpCircle className="w-4 h-4" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Everything you need to know about our courses, kits, and curriculum.
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {FAQ_DATA.map((item, index) => (
            <FaqItem 
              key={index} 
              item={item} 
              isOpen={activeIndex === index} 
              onClick={() => toggleIndex(index)} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// --- Sub Component: Individual FAQ Item ---
function FaqItem({ item, isOpen, onClick }: { item: any, isOpen: boolean, onClick: () => void }) {
  return (
    <div 
      className={`border rounded-xl transition-all duration-300 overflow-hidden
      ${isOpen 
        ? "border-orange-200 bg-orange-50/30 shadow-lg shadow-orange-500/5" 
        : "border-gray-200 bg-white hover:border-orange-200 hover:shadow-md"
      }`}
    >
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
      >
        <span className={`text-lg font-semibold pr-8 transition-colors ${isOpen ? 'text-orange-900' : 'text-gray-800'}`}>
          {item.question}
        </span>
        
        {/* Animated Icon Container */}
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 
          ${isOpen ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-500 group-hover:bg-orange-100 group-hover:text-orange-600'}`}>
          {isOpen ? (
            <Minus className="w-4 h-4" />
          ) : (
            <Plus className="w-4 h-4" />
          )}
        </div>
      </button>

      {/* Accordion Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-5 pb-5 pt-0">
              <p className="text-gray-600 leading-relaxed">
                {item.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}