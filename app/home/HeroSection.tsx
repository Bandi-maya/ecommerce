'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// --- Types ---
interface CustomContent {
  category: string;
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
}

interface Slide {
  id: number;
  image: string;
  alt: string;
  videoUrl: string;
  content: CustomContent;
}

interface HeroSectionProps {
  getCSSVar?: (varName: string, fallback?: string) => string;
  handleWatchVideo?: () => void;
}

// --- Data ---
const SLIDES: Slide[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2940&auto=format&fit=crop", 
    alt: "Smart Home Interface",
    videoUrl: "/videos/smart-home-demo.mp4", 
    content: {
      category: "Innovation",
      title: "The Connected Future",
      description: "Seamlessly integrate your lifestyle with next-gen IoT solutions designed for the modern era.",
      ctaText: "Read the Article",
      ctaLink: "https://www.mediatek.com/tek-talk-blogs/heres-why-wi-fi-6-is-better-for-iot"
    }
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2970&auto=format&fit=crop", 
    alt: "Advanced Circuitry",
    videoUrl: "/videos/ai-processing.mp4",
    content: {
      category: "Technology",
      title: "Neural Processing",
      description: "Discover how AI is bridging the gap between raw silicon power and daily human interaction.",
      ctaText: "View Insights",
      ctaLink: "https://medium.com/horizon-hub"
    }
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2940&auto=format&fit=crop", 
    alt: "Smart Living Space",
    videoUrl: "/videos/living-space.mp4",
    content: {
      category: "Lifestyle",
      title: "Intelligent Living",
      description: "Transform your physical space into a responsive environment that anticipates your needs.",
      ctaText: "Explore Solutions",
      ctaLink: "https://builtin.com/articles/what-is-a-smart-home"
    }
  }
];

const AUTO_PLAY_DURATION = 6000;

// --- INTERNAL COMPONENT: Sketch Cover Art (Transparent Grey/Glass Style) ---
const SketchCoverArt = ({ onPlay }: { onPlay: () => void }) => {
  return (
    <div className="sketch-container glass-blur">
      {/* Background Random Elements */}
      <div className="bg-doodle beaker">H₂O</div>
      <div className="bg-doodle formula">Fe₂O₃</div>
      <div className="bg-doodle math">a²+b²=c²</div>

      <div className="sketch-scene">
        {/* --- Left Column: Designer --- */}
        <div className="scene-col">
          <div className="doodle-icon lightbulb">
             <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="4">
                <path d="M30,40 C30,20 70,20 70,40 C70,55 55,60 55,70 L45,70 C45,60 30,55 30,40" strokeLinecap="round"/>
                <path d="M45,75 L55,75 M46,80 L54,80 M48,85 L52,85" />
                <path d="M20,30 L10,20 M80,30 L90,20 M50,10 L50,0" strokeDasharray="4 4"/>
                <text x="50" y="55" fontSize="16" textAnchor="middle" fontFamily="cursive" stroke="none" fill="currentColor">idea</text>
             </svg>
          </div>
          <div className="hand-text">Tomorrow's<br/>Designer</div>
          <div className="kid-placeholder girl-1">
             <Image src="https://images.unsplash.com/photo-1596464716127-f9a829be9efc?auto=format&fit=crop&q=80&w=300" alt="Designer" width={150} height={180} className="kid-img" />
             <div className="doodle-overlay paint-palette">🎨</div>
          </div>
        </div>

        {/* --- Center Column: Innovator --- */}
        <div className="scene-col center-col">
          <div className="doodle-group-top">
            <div className="hand-text">Tomorrow's<br/>Innovator</div>
            <div className="doodle-icon atom">
               <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="4">
                  <ellipse cx="50" cy="50" rx="15" ry="40" transform="rotate(45 50 50)"/>
                  <ellipse cx="50" cy="50" rx="15" ry="40" transform="rotate(-45 50 50)"/>
                  <circle cx="50" cy="50" r="8" fill="currentColor"/>
               </svg>
            </div>
          </div>

          <div className="kid-placeholder girl-center">
             <Image src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=300" alt="Innovator" width={180} height={220} className="kid-img" />
             {/* Lab Coat Doodle Line */}
             <svg className="coat-doodle" viewBox="0 0 200 300">
                <path d="M50,100 Q40,250 30,300 M150,100 Q160,250 170,300 M50,100 L150,100" fill="none" stroke="white" strokeWidth="3" />
             </svg>
          </div>

          {/* CENTER PLAY BUTTON */}
          <div className="play-cta-container">
            <button className="big-play-btn" onClick={onPlay}>
              <div className="play-triangle"></div>
            </button>
            <div className="play-text-box glass-blur">
              <span className="red-tag">Hit Play</span> if You Don't<br/>
              Turn a Blind Eye to a Problem
            </div>
          </div>
        </div>

        {/* --- Right Column: Coder --- */}
        <div className="scene-col">
           <div className="hand-text">Tomorrow's<br/>Coder</div>
           <div className="doodle-icon code-brackets">
              <svg viewBox="0 0 100 60" fill="none" stroke="currentColor" strokeWidth="4">
                 <path d="M30,10 L10,30 L30,50 M70,10 L90,30 L70,50" />
                 <path d="M40,50 L60,10" />
              </svg>
              <div className="binary">011<br/>10100</div>
           </div>
           <div className="kid-placeholder boy-1">
             <Image src="https://images.unsplash.com/photo-1519456264917-42d0aa2e0625?auto=format&fit=crop&q=80&w=300" alt="Coder" width={150} height={180} className="kid-img" />
             <div className="doodle-overlay headphones">🎧</div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .sketch-container {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 16px;
          padding: 20px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.2);
          color: white; 
          font-family: "Comic Sans MS", "Chalkboard SE", sans-serif;
          overflow: hidden;
          animation: slideInRight 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* --- Glassmorphism Style with Grey Tint --- */
        .glass-blur {
            /* Changed from pure white to a grey tint */
            background: rgba(150, 150, 150, 0.25);
            backdrop-filter: blur(15px);
            -webkit-backdrop-filter: blur(15px);
            border: 1px solid rgba(255, 255, 255, 0.2);
        }

        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(40px); }
          to { opacity: 1; transform: translateX(0); }
        }

        .sketch-scene {
          display: flex;
          justify-content: space-between;
          height: 100%;
          align-items: flex-end;
          position: relative;
          z-index: 2;
        }

        .scene-col {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          z-index: 2;
          height: 100%;
        }
        
        .center-col {
          flex: 1.4;
          z-index: 3;
        }

        .hand-text {
          font-size: 1rem;
          font-weight: bold;
          text-align: center;
          line-height: 1.2;
          margin-bottom: 5px;
          transform: rotate(-2deg);
          text-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }

        .doodle-icon {
          width: 50px;
          height: 50px;
          margin-bottom: 5px;
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
        }

        .doodle-group-top {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: 10px;
        }

        .kid-placeholder {
          position: relative;
          margin-top: auto;
          transition: transform 0.3s ease;
          display: flex;
          justify-content: center;
        }
        .kid-placeholder:hover { transform: scale(1.05); }

        .kid-img {
          object-fit: cover;
          border-radius: 8px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.3);
        }

        .girl-center .kid-img { border: 2px dashed rgba(255,255,255,0.7); padding: 4px; border-radius: 12px; }
        
        .coat-doodle {
            position: absolute;
            top: 20px; left: -10px; right: -10px; bottom: 0;
            opacity: 0.8;
            pointer-events: none;
        }

        /* Play Button (Center) */
        .play-cta-container {
            position: absolute;
            top: 55%;
            left: 50%;
            transform: translate(-50%, -50%);
            display: flex;
            flex-direction: column;
            align-items: center;
            z-index: 10;
            text-align: center;
            width: 100%;
        }

        .big-play-btn {
            width: 70px;
            height: 70px;
            background: #ea580c;
            border-radius: 50%;
            border: 4px solid #fff;
            box-shadow: 0 4px 15px rgba(234, 88, 12, 0.4);
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: transform 0.2s, background 0.2s;
            margin-bottom: 10px;
        }

        .big-play-btn:hover {
            transform: scale(1.1);
            background: #c2410c;
        }

        .play-triangle {
            width: 0; 
            height: 0; 
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            border-left: 18px solid white;
            margin-left: 4px;
        }

        .play-text-box {
            /* Uses the same grey glass blur class */
            padding: 8px 12px;
            border-radius: 8px;
            font-size: 0.75rem;
            font-weight: 700;
            white-space: nowrap;
        }

        .red-tag {
            color: white;
            background: #ea580c;
            padding: 2px 5px;
            border-radius: 4px;
            font-size: 0.7rem;
            vertical-align: middle;
        }

        .bg-doodle {
            position: absolute;
            font-family: monospace;
            opacity: 0.2;
            pointer-events: none;
            font-weight: bold;
            color: white;
        }
        .beaker { top: 10%; left: 10%; font-size: 1.2rem; transform: rotate(15deg); }
        .formula { top: 15%; right: 10%; font-size: 1rem; }
        .math { top: 40%; right: 5%; font-size: 0.9rem; transform: rotate(-5deg); }

        .doodle-overlay {
            position: absolute;
            font-size: 1.5rem;
            top: -10px;
            right: -10px;
            transform: rotate(15deg);
            text-shadow: 0 2px 5px rgba(0,0,0,0.5);
        }

        @media (max-width: 768px) {
            .hand-text { font-size: 0.8rem; }
            .doodle-icon { width: 30px; height: 30px; }
            .kid-img { width: 80px !important; height: 100px !important; }
            .sketch-container { padding: 10px; }
        }
      `}</style>
    </div>
  );
};

// --- HERO SECTION ---
const HeroSection = ({ getCSSVar, handleWatchVideo }: HeroSectionProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  
  // --- Video Modal State ---
  const [showModal, setShowModal] = useState(false);
  const [activeVideo, setActiveVideo] = useState<string>("");

  const resolvedGetCSSVar = getCSSVar ? getCSSVar : (varName: string, fallback = "") => {
    if (typeof window === 'undefined') return fallback;
    return (getComputedStyle(document.documentElement).getPropertyValue(varName).trim() || fallback);
  };

  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // --- Logic ---

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));
  }, []);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const resetAutoplay = () => {
    setIsAutoPlaying(false);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  // Handle opening the video modal
  const openVideoModal = (videoUrl: string) => {
    setIsAutoPlaying(false); 
    if (timeoutRef.current) clearTimeout(timeoutRef.current); 
    setActiveVideo(videoUrl);
    setShowModal(true);
  };

  const closeVideoModal = () => {
    setShowModal(false);
    setActiveVideo("");
    resetAutoplay(); 
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(handleNext, AUTO_PLAY_DURATION);
    return () => clearInterval(interval);
  }, [isAutoPlaying, handleNext]);

  // Touch & Keyboard Logic
  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.targetTouches[0].clientX);
  const handleTouchMove = (e: React.TouchEvent) => setTouchEnd(e.targetTouches[0].clientX);
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 50) { handleNext(); resetAutoplay(); }
    if (distance < -50) { handlePrev(); resetAutoplay(); }
    setTouchStart(0);
    setTouchEnd(0);
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (showModal) return; 
      if (e.key === 'ArrowRight') { handleNext(); resetAutoplay(); }
      if (e.key === 'ArrowLeft') { handlePrev(); resetAutoplay(); }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleNext, handlePrev, showModal]);

  const nextSlideIndex = (currentIndex + 1) % SLIDES.length;

  return (
    <section 
      className="hero-wrapper"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      aria-label="Featured Highlights"
    >
      {/* 1. Background Layer */}
      <div className="bg-layer">
        {SLIDES.map((slide, index) => {
          const isActive = index === currentIndex;
          return (
            <div
              key={slide.id}
              className={`bg-slide ${isActive ? 'active' : ''}`}
              aria-hidden={!isActive}
            >
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                priority={index === 0}
                className={`bg-image ${isActive ? 'ken-burns' : ''}`}
                quality={90}
                sizes="100vw"
                style={{ objectFit: 'cover' }}
              />
              <div className="overlay-gradient" />
            </div>
          );
        })}
      </div>

      {/* 2. Main Content Grid */}
      <div className="content-grid">
        
        {/* Left: Text Content */}
        <div className="text-zone">
          {SLIDES.map((slide, index) => {
            // Text is now rendered for ALL slides, including slide 3
            return (
              <div 
                key={slide.id} 
                className={`text-content ${index === currentIndex ? 'active' : ''}`}
              >
                <div className="category-tag">
                  <span className="line" />
                  {slide.content.category}
                </div>
                
                <h1 className="main-title">
                  {slide.content.title.split(' ').map((word, i) => (
                    <span key={i} className="title-word" style={{ transitionDelay: `${i * 100}ms` }}>
                      {word}&nbsp;
                    </span>
                  ))}
                </h1>
                
                <p className="description">{slide.content.description}</p>
                
                <div className="button-group">
                  <Link 
                    href={slide.content.ctaLink} 
                    className="glass-button"
                    onClick={resetAutoplay}
                  >
                    {slide.content.ctaText}
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>

                  {/* REMOVED: "Watch Video" button for standard slides. 
                      Video is only triggered by the sketch component on slide 3. */}
                </div>
              </div>
            );
          })}
        </div>

        {/* --- DYNAMIC CONTENT AREA (Right Side) --- */}
        <div className="feature-zone">
          {/* Only Show Sketch Art on Slide 3 */}
          <div className={`feature-item ${currentIndex === 2 ? 'active' : ''}`}>
             <SketchCoverArt onPlay={() => openVideoModal(SLIDES[2].videoUrl)} />
          </div>
        </div>

        {/* Right: Navigation Controls */}
        <div className="controls-zone">
          
          {/* Progress Indicators */}
          <div className="progress-list">
            {SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => { goToSlide(idx); resetAutoplay(); }}
                className={`progress-item ${idx === currentIndex ? 'active' : ''}`}
                aria-label={`Go to slide ${idx + 1}`}
              >
                <span className="progress-number">0{idx + 1}</span>
                <span className="progress-bar">
                  <span className="progress-fill" />
                </span>
              </button>
            ))}
          </div>

          {/* Combined "Next Up" & Controls Card */}
          <div 
            className="preview-card" 
            onClick={() => { handleNext(); resetAutoplay(); }}
            role="button"
            tabIndex={0}
          >
            <div className="preview-label">Next Up</div>
            
            <div className="preview-image-wrapper">
              <Image 
                src={SLIDES[nextSlideIndex].image} 
                alt="Next slide preview" 
                fill 
                className="preview-image"
                sizes="200px"
                style={{ objectFit: 'cover' }}
              />
            </div>

            {/* Controls Container inside the card */}
            <div className="card-controls">
              <button 
                className="control-fab" 
                onClick={(e) => { 
                  e.stopPropagation(); 
                  handlePrev(); 
                  resetAutoplay(); 
                }}
                aria-label="Previous Slide"
              >
                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>

              <button 
                className="control-fab" 
                aria-label="Next Slide"
              >
                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* --- Standard Video Modal (triggered by Play Button in sketch) --- */}
      {showModal && (
          <div className="modal-backdrop" onClick={closeVideoModal}>
            <div className="modal-container" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn" onClick={closeVideoModal}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
                <div className="video-wrapper">
                    <video src={activeVideo} controls autoPlay className="video-player" />
                </div>
            </div>
          </div>
      )}

      <style jsx>{`
        /* --- Layout --- */
        .hero-wrapper {
          position: relative;
          width: 100%;
          height: 100vh;
          min-height: 600px;
          overflow: hidden;
          background: #050505;
          color: white;
          font-family: system-ui, -apple-system, sans-serif;
        }

        .bg-layer {
          position: absolute;
          inset: 0;
          z-index: 0;
        }

        .bg-slide {
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .bg-slide.active {
          opacity: 1;
          z-index: 1;
        }

        .bg-image {
          transform: scale(1.1);
          transition: transform 10s ease-out;
        }
        
        .bg-slide.active .ken-burns {
          transform: scale(1);
        }

        .overlay-gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to right, 
            rgba(0,0,0,0.8) 0%, 
            rgba(0,0,0,0.4) 50%, 
            rgba(0,0,0,0.1) 100%
          );
          z-index: 2;
        }

        /* --- Content Grid --- */
        .content-grid {
          position: relative;
          z-index: 10;
          display: grid;
          /* Modified 3-column layout: Text (2fr) | Feature (500px) | Controls (300px) */
          grid-template-columns: 2fr 500px 300px;
          height: 100%;
          max-width: 1800px;
          margin: 0 auto;
          padding: 0 40px;
          gap: 30px;
        }

        /* --- Text Zone --- */
        .text-zone {
          display: flex;
          align-items: center;
          position: relative;
        }

        .text-content {
          position: absolute;
          left: 0;
          width: 100%;
          max-width: 800px;
          opacity: 0;
          pointer-events: none;
          transform: translateY(20px);
          transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .text-content.active {
          opacity: 1;
          pointer-events: all;
          transform: translateY(0);
        }

        .category-tag {
          display: flex;
          align-items: center;
          gap: 12px;
          text-transform: uppercase;
          letter-spacing: 2px;
          font-size: 14px;
          color: #bbb;
          margin-bottom: 24px;
        }

        .line {
          width: 40px;
          height: 2px;
          background: #fff;
        }

        .main-title {
          font-size: clamp(3rem, 6vw, 5.5rem);
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 24px;
          display: flex;
          flex-wrap: wrap;
        }

        .title-word {
          display: inline-block;
          transform: translateY(100%);
          opacity: 0;
          transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s;
        }

        .text-content.active .title-word {
          transform: translateY(0);
          opacity: 1;
        }

        .description {
          font-size: 18px;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.9);
          max-width: 500px;
          margin-bottom: 40px;
          text-shadow: 0 2px 10px rgba(0,0,0,0.5);
        }

        /* Button Group */
        .button-group {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }

        .glass-button {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 16px 32px;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: white;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .glass-button:hover {
          background: white;
          color: black;
          transform: translateX(10px);
        }

        /* --- Feature Zone (The New Sketch Area) --- */
        .feature-zone {
            display: flex;
            align-items: center;
            /* Align to the end (right) of its grid cell */
            justify-content: flex-end; 
            position: relative;
        }
        .feature-item {
            position: absolute;
            width: 100%;
            height: 400px;
            opacity: 0;
            transform: scale(0.95) translateX(20px);
            transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
            pointer-events: none;
            visibility: hidden;
        }
        .feature-item.active {
            opacity: 1;
            transform: scale(1) translateX(0);
            pointer-events: all;
            visibility: visible;
        }

        /* --- Controls Zone --- */
        .controls-zone {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 80px 0;
          align-items: flex-end;
        }

        .progress-list {
          display: flex;
          flex-direction: column;
          gap: 24px;
          margin-top: auto;
        }

        .progress-item {
          display: flex;
          align-items: center;
          gap: 16px;
          background: none;
          border: none;
          cursor: pointer;
          color: rgba(255, 255, 255, 0.4);
          transition: color 0.3s;
        }

        .progress-item.active {
          color: white;
        }

        .progress-number {
          font-family: monospace;
          font-size: 14px;
        }

        .progress-bar {
          width: 40px;
          height: 2px;
          background: rgba(255, 255, 255, 0.2);
          position: relative;
          overflow: hidden;
          transition: width 0.3s;
        }

        .progress-item.active .progress-bar {
          width: 60px;
        }

        .progress-fill {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 0%;
          background: white;
        }

        .progress-item.active .progress-fill {
          width: 100%;
          transition: width ${AUTO_PLAY_DURATION}ms linear;
        }

        /* --- Preview Card --- */
        .preview-card {
          position: relative;
          width: 240px; 
          height: 140px;
          background: rgba(0,0,0,0.4);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 2px;
          cursor: pointer;
          overflow: hidden;
          margin-top: 40px;
          transition: transform 0.3s ease, border-color 0.3s ease;
        }
        
        .preview-card:hover {
          transform: translateY(-5px);
          border-color: rgba(255,255,255,0.4);
        }

        .preview-label {
          position: absolute;
          top: 12px;
          left: 12px;
          z-index: 2;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 1px;
          background: black;
          padding: 4px 8px;
        }

        .preview-image-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .preview-image {
          opacity: 0.6;
          transition: opacity 0.3s;
        }

        .preview-card:hover .preview-image {
          opacity: 0.8;
        }

        .card-controls {
          position: absolute;
          bottom: 12px;
          right: 12px;
          display: flex;
          gap: 8px;
          z-index: 3;
        }

        .control-fab {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(4px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .control-fab:hover {
          background: white;
          color: black;
          transform: scale(1.1);
          border-color: white;
        }

        /* --- Modal Styles --- */
        .modal-backdrop {
          position: fixed;
          inset: 0;
          z-index: 10000;
          background: rgba(0,0,0,0.85);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          animation: fadeIn 0.3s ease;
        }

        .modal-container {
          background: #000;
          width: 100%;
          max-width: 900px;
          aspect-ratio: 16/9;
          border-radius: 20px;
          position: relative;
          overflow: hidden;
          box-shadow: 0 20px 50px rgba(0,0,0,0.5);
          display: flex;
          flex-direction: column;
        }

        .close-btn {
          position: absolute;
          top: 15px;
          right: 15px;
          z-index: 20;
          background: rgba(255,255,255,0.1);
          border: none;
          border-radius: 50%;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #fff;
          transition: background 0.2s;
        }
        .close-btn:hover { background: rgba(255,255,255,0.3); }
        .video-wrapper { width: 100%; height: 100%; background: black; }
        .video-player { width: 100%; height: 100%; object-fit: contain; }

        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }

        /* --- Responsive --- */
        @media (max-width: 1440px) {
            /* Adjust grid for smaller desktops */
             .content-grid { grid-template-columns: 1.5fr 450px 250px; gap: 20px; }
        }

        @media (max-width: 1024px) {
          .content-grid {
            grid-template-columns: 1fr;
            padding: 0 24px;
          }

          .feature-zone { display: none; } /* Hide complex sketch on tablet portrait/mobile */

          .controls-zone {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            flex-direction: row;
            padding: 24px;
            width: 100%;
            height: auto;
            align-items: flex-end;
          }
          
          .preview-card {
            display: none;
          }
          
          .progress-list {
            flex-direction: row;
            margin-top: 0;
          }
          
          .progress-bar {
            width: 20px;
          }
        }

        @media (max-width: 768px) {
          .main-title {
            font-size: 2.5rem;
          }
          
          .overlay-gradient {
            background: linear-gradient(
              to bottom, 
              rgba(0,0,0,0.3) 0%, 
              rgba(0,0,0,0.8) 100%
            );
          }
          
          .text-zone {
            align-items: flex-end;
            padding-bottom: 120px;
          }

          .glass-button {
            width: 100%;
            justify-content: center;
          }
          
          .button-group {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;