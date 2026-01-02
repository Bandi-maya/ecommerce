import React, { useState } from 'react';
import { Filter, X, RotateCcw } from 'lucide-react';

// Define the allowed keys for the categories
type FilterCategory = 'age' | 'price' | 'type';

export default function FilterSidebar() {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    
    // Explicitly type the state so TS knows it matches the keys in filterOptions
    const [selectedCategory, setSelectedCategory] = useState<FilterCategory>('age');

    // Type the options object
    const filterOptions: Record<FilterCategory, string[]> = {
        age: ['5-7 Years', '8-10 Years', '11-14 Years', '14+ Years'],
        price: ['Under ₹1000', '₹1000 - ₹5000', '₹5000 - ₹10000', 'Above ₹10000'],
        type: ['Beginner', 'Intermediate', 'Advanced']
    };

    // Create a typed array of keys for the sidebar loop
    const categories = Object.keys(filterOptions) as FilterCategory[];

    return (
        <>
            {/* ==============================================
          1. HEADER
      ============================================== */}
            <div className="sticky top-0 z-40 w-full bg-white border-b border-gray-200 shadow-sm py-3 px-4 md:px-6">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <h1 className="text-xl font-bold text-gray-800">Marketplace</h1>
                    <button
                        onClick={() => setIsFilterOpen(true)}
                        className={`
                             top-23 right-4 z-[999] 
                          flex items-center gap-2 px-4 py-2 
                          bg-gray-900 text-white rounded-full 
                          shadow-xl hover:bg-gray-800 hover:scale-105 
                          transition-all duration-300 ease-out
                          border border-gray-700
                        `}
                    >
                        <Filter className="w-4 h-4" />
                        <span className="font-medium text-sm">Filter</span>
                    </button>
                </div>
            </div>

            {/* ==============================================
          2. FILTER DRAWER
      ============================================== */}
            {/* Backdrop */}
            <div
                className={`
          fixed inset-0 z-[1000] bg-black/50 backdrop-blur-sm transition-opacity duration-300
          ${isFilterOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        `}
                onClick={() => setIsFilterOpen(false)}
            />

            {/* Drawer Content */}
            <div
                className={`
          fixed inset-y-0 right-0 z-[1001] w-full max-w-md bg-white shadow-2xl transform transition-transform duration-300 ease-in-out
          ${isFilterOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
            >
                {/* Header with X Icon */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900">Filters</h2>

                    <div className="flex items-center gap-4">
                        <button className="text-sm text-red-500 font-medium hover:underline flex items-center gap-1">
                            <RotateCcw className="w-3 h-3" /> Reset
                        </button>

                        {/* The X Close Button */}
                        <button
                            onClick={() => setIsFilterOpen(false)}
                            className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                        >
                            <X className="w-5 h-5 text-gray-600" />
                        </button>
                    </div>
                </div>

                {/* Body: Dual Pane Layout */}
                <div className="flex h-[calc(100vh-140px)]">
                    {/* Left: Category Sidebar */}
                    <div className="w-1/3 bg-gray-50 border-r border-gray-100 overflow-y-auto">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`
                  w-full text-left px-4 py-4 text-sm font-medium border-l-4 transition-all
                  ${selectedCategory === cat
                                        ? 'bg-white border-blue-600 text-blue-600'
                                        : 'border-transparent text-gray-600 hover:bg-gray-100'}
                `}
                            >
                                {cat.charAt(0).toUpperCase() + cat.slice(1)}
                            </button>
                        ))}
                    </div>

                    {/* Right: Options List */}
                    <div className="w-2/3 p-6 overflow-y-auto bg-white">
                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">
                            Select {selectedCategory}
                        </h3>
                        <div className="space-y-3">
                            {filterOptions[selectedCategory].map((option, idx) => (
                                <label key={idx} className="flex items-center gap-3 cursor-pointer group">
                                    <div className="relative flex items-center">
                                        <input
                                            type="checkbox"
                                            className="
                        peer appearance-none w-5 h-5 border-2 border-gray-300 rounded 
                        checked:bg-blue-600 checked:border-blue-600 transition-all
                      "
                                        />
                                        <svg className="absolute w-3.5 h-3.5 text-white pointer-events-none opacity-0 peer-checked:opacity-100 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" viewBox="0 0 14 14" fill="none">
                                            <path d="M3 8L6 11L11 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                    <span className="text-gray-700 group-hover:text-blue-600 transition-colors">
                                        {option}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="absolute bottom-0 left-0 w-full p-4 bg-white border-t border-gray-100 flex gap-4">
                    <button
                        onClick={() => setIsFilterOpen(false)}
                        className="flex-1 px-4 py-3 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
                    >
                        Close
                    </button>
                    <button
                        onClick={() => setIsFilterOpen(false)}
                        className="flex-1 px-4 py-3 rounded-xl bg-orange-500 text-white font-semibold hover:bg-orange-600 shadow-lg shadow-orange-200 transition-all transform hover:-translate-y-1"
                    >
                        Apply Filters
                    </button>
                </div>
            </div>
        </>
    );
}