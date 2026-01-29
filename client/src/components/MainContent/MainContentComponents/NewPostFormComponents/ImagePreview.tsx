import React, { useRef } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface ImagePreviewProps {
  images: string[];
  onRemove: (index: number) => void;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ images, onRemove }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef;
      const scrollAmount = 260;
      current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (images.length === 0) return null;

  return (
    <div className="group relative mt-2 w-full">
      <button
        onClick={() => scroll("left")}
        className="absolute top-1/2 left-0 z-10 -translate-y-1/2 rounded-full bg-black/50 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100 hover:bg-black/70 disabled:opacity-0"
        aria-label="Przewiń w lewo"
        type="button"
      >
        <ChevronLeft size={20} />
      </button>

      <div
        ref={scrollContainerRef}
        className="no-scrollbar flex flex-row gap-2 overflow-x-auto scroll-smooth"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {images.map((src, index) => (
          <div key={index} className="relative flex-shrink-0">
            <img
              src={src}
              alt={`preview-${index}`}
              className="h-72.25 w-62.25 rounded-xl object-cover"
            />
            <button
              onClick={() => onRemove(index)}
              type="button"
              className="absolute top-1 right-1 h-8 w-8 rounded-full bg-black/60 p-1 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={() => scroll("right")}
        className="absolute top-1/2 right-0 z-10 -translate-y-1/2 rounded-full bg-black/50 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100 hover:bg-black/70"
        aria-label="Przewiń w prawo"
        type="button"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default ImagePreview;