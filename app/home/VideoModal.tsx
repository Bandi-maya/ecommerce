"use client"

import { motion } from "framer-motion"

interface VideoModalProps {
  show: boolean
  onClose: () => void
  getCSSVar: (varName: string, fallback?: string) => string
  src?: string
}

const toEmbedUrl = (url: string) => {
  try {
    if (url.includes('youtu.be/')) {
      return url.replace('youtu.be/', 'www.youtube.com/embed/');
    }
    if (url.includes('watch?v=')) {
      return url.replace('watch?v=', 'embed/');
    }
    return url;
  } catch (e) {
    return url;
  }
}

const VideoModal = ({ show, onClose, getCSSVar, src }: VideoModalProps) => {
  if (!show) return null

  const cssVars = {
    foreground: () => getCSSVar('--foreground', '#020817'),
  }

  const renderMedia = () => {
    if (src) {
      const trimmed = src.trim();
      // MP4 / local file
      if (/\.mp4(\?.*)?$/.test(trimmed)) {
        return (
          <video className="w-full h-full object-cover" controls autoPlay src={trimmed} />
        );
      }

      // Remote URL (YouTube or other)
      if (/^https?:\/\//.test(trimmed) || trimmed.includes('youtube') || trimmed.includes('youtu.be')) {
        const embed = toEmbedUrl(trimmed);
        return (
          <iframe
            width="100%"
            height="100%"
            src={embed}
            title="Video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-lg sm:rounded-xl"
          />
        );
      }

      // Fallback: try as iframe
      return (
        <iframe
          width="100%"
          height="100%"
          src={trimmed}
          title="Video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="rounded-lg sm:rounded-xl"
        />
      );
    }

    // Default embedded YouTube
    return (
      <iframe
        width="100%"
        height="100%"
        src="https://www.youtube.com/embed/OXHTlMPbX7o"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="rounded-lg sm:rounded-xl"
      />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 25 }}
        className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 max-w-4xl w-full shadow-2xl border border-gray-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4 sm:mb-6 md:mb-8">
          <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold" style={{ color: cssVars.foreground() }}>
            Watch Our Story
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors p-2 sm:p-3 rounded-full hover:bg-gray-100"
          >
            <span className="text-xl sm:text-2xl">✕</span>
          </button>
        </div>
        <div className="aspect-video w-full rounded-xl sm:rounded-2xl overflow-hidden border border-gray-300">
          {renderMedia()}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default VideoModal