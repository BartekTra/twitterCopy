import React, { useState } from "react";
import { createPortal } from "react-dom"; // Import Portalu
import { X, Play } from "lucide-react";

interface ImagePreviewProps {
  images: string[];
  onRemove: (index: number) => void;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ images, onRemove }) => {
  const [selectedMedia, setSelectedMedia] = useState<string | null>(null);

  const isVideo = (url: string | null) => {
    if (!url) return false;
    const hasVideoExtension = /\.(mp4|webm|ogg|mov|qt)(\?|$|#)/i.test(url);
    const hasHashTagVideo = url.includes("#video");
    
    return hasVideoExtension || hasHashTagVideo;
  };

  const openModal = (url: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedMedia(url);
  };

  const closeModal = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSelectedMedia(null);
  };

  if (!images || images.length === 0) return null;

  const count = images.length;
  let gridClass = "";
  const mediaClass = "h-full w-full object-cover bg-black cursor-pointer hover:opacity-90 transition-opacity";

  switch (count) {
    case 1: gridClass = "grid-cols-1"; break;
    case 2: gridClass = "grid-cols-2"; break;
    case 3: gridClass = "grid-cols-2 grid-rows-2"; break;
    case 4: gridClass = "grid-cols-2 grid-rows-2"; break;
    default: gridClass = "grid-cols-2";
  }

  return (
    <>
      <div
        className={`mt-3 grid h-72 gap-0.5 overflow-hidden rounded-2xl ${gridClass} border border-twitterOutliner/30`}
        onClick={(e) => e.stopPropagation()}
      >
        {images.map((url, index) => {
          let spanClass = "";
          if (count === 3 && index === 0) spanClass = "row-span-2";

          const isFileVideo = isVideo(url);

          return (
            <div key={`${url}-${index}`} className={`relative ${spanClass} group`}>
              {isFileVideo ? (
                <div 
                  className="relative h-full w-full bg-black"
                  onClick={(e) => openModal(url, e)}
                >
                  <video
                    src={url.includes('#') ? url : `${url}#t=0.001`}
                    preload="metadata"
                    className={mediaClass}
                    muted
                    playsInline
                  />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="bg-black/40 rounded-full p-2 backdrop-blur-sm group-hover:bg-black/50 transition">
                        <Play size={24} className="text-white fill-white" />
                    </div>
                  </div>
                </div>
              ) : (
                <img
                  src={url}
                  alt={`preview-${index}`}
                  className={mediaClass}
                  onClick={(e) => openModal(url, e)}
                  onError={(e) => {
                     e.currentTarget.style.display = 'none'; 
                  }}
                />
              )}

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove(index);
                }}
                type="button"
                className="absolute top-2 right-2 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-black/60 p-1 text-white hover:bg-black/80 transition-colors backdrop-blur-md"
              >
                <X size={16} />
              </button>
            </div>
          );
        })}
      </div>

      {/* MODAL W PORTALU - To naprawia wyświetlanie nad innymi elementami (z-index) */}
      {selectedMedia && createPortal(
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={(e) => closeModal(e)}
        >
          <button
            onClick={(e) => closeModal(e)}
            className="absolute top-4 left-4 z-50 rounded-full bg-black/50 p-2 text-white transition hover:bg-black/70"
          >
            <X size={24} />
          </button>

          <div className="relative flex items-center justify-center w-full h-full pointer-events-none">
            {isVideo(selectedMedia) ? (
              <video
                src={selectedMedia}
                controls
                autoPlay
                className="pointer-events-auto max-h-[90vh] max-w-[90vw] object-contain shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <img
                src={selectedMedia}
                alt="Full view"
                className="pointer-events-auto max-h-[90vh] max-w-[90vw] object-contain shadow-2xl select-none"
                onClick={(e) => e.stopPropagation()}
              />
            )}
          </div>
        </div>,
        document.body 
      )}
    </>
  );
};

export default ImagePreview;