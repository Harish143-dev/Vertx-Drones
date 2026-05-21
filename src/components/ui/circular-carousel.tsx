"use client";
import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export interface CarouselItem {
  title: string;
  subtitle?: string;
  description: string;
  src: string;
}

export interface Colors {
  title?: string;
  subtitle?: string;
  description?: string;
  arrowBackground?: string;
  arrowForeground?: string;
  arrowHoverBackground?: string;
}

export interface FontSizes {
  title?: string;
  subtitle?: string;
  description?: string;
}

export interface CircularCarouselProps {
  items: CarouselItem[];
  autoplay?: boolean;
  colors?: Colors;
  fontSizes?: FontSizes;
}

function calculateGap(width: number) {
  const minWidth = 1024;
  const maxWidth = 1456;
  const minGap = 60;
  const maxGap = 86;
  if (width <= minWidth) return minGap;
  if (width >= maxWidth)
    return Math.max(minGap, maxGap + 0.06018 * (width - maxWidth));
  return minGap + (maxGap - minGap) * ((width - minWidth) / (maxWidth - minWidth));
}

export const CircularCarousel = ({
  items,
  autoplay = true,
  colors = {},
  fontSizes = {},
}: CircularCarouselProps) => {
  // Color & font config defaults mapped to Vertx Drones style (Orange/Dark theme)
  const colorTitle = colors.title ?? "#ffffff";
  const colorSubtitle = colors.subtitle ?? "#F97316";
  const colorDescription = colors.description ?? "rgba(255, 255, 255, 0.7)";
  const colorArrowBg = colors.arrowBackground ?? "rgba(255, 255, 255, 0.03)";
  const colorArrowFg = colors.arrowForeground ?? "#ffffff";
  const colorArrowHoverBg = colors.arrowHoverBackground ?? "#F97316";

  const fontSizeTitle = fontSizes.title ?? "2rem";
  const fontSizeSubtitle = fontSizes.subtitle ?? "0.925rem";
  const fontSizeDescription = fontSizes.description ?? "1.125rem";

  // State
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverPrev, setHoverPrev] = useState(false);
  const [hoverNext, setHoverNext] = useState(false);
  const [containerWidth, setContainerWidth] = useState(1200);

  const imageContainerRef = useRef<HTMLDivElement>(null);
  const autoplayIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const itemsLength = useMemo(() => items.length, [items]);
  const activeItem = useMemo(
    () => items[activeIndex],
    [activeIndex, items]
  );

  // Responsive gap calculation
  useEffect(() => {
    function handleResize() {
      if (imageContainerRef.current) {
        setContainerWidth(imageContainerRef.current.offsetWidth);
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Autoplay
  useEffect(() => {
    if (autoplay && itemsLength > 0) {
      autoplayIntervalRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % itemsLength);
      }, 6000);
    }
    return () => {
      if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
    };
  }, [autoplay, itemsLength]);

  // Navigation handlers
  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % itemsLength);
    if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
  }, [itemsLength]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + itemsLength) % itemsLength);
    if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
  }, [itemsLength]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handlePrev, handleNext]);



  // Compute transforms for each image (always show 3: left, center, right)
  function getImageStyle(index: number): React.CSSProperties {
    const gap = calculateGap(containerWidth);
    const maxStickUp = gap * 0.4;
    const isActive = index === activeIndex;
    const isLeft = (activeIndex - 1 + itemsLength) % itemsLength === index;
    const isRight = (activeIndex + 1) % itemsLength === index;

    if (isActive) {
      return {
        zIndex: 3,
        opacity: 1,
        pointerEvents: "auto",
        transform: `translateX(0px) translateY(0px) scale(1) rotateY(0deg)`,
        transition: "all 0.8s cubic-bezier(.4,1.8,.3,1)",
      };
    }
    if (isLeft) {
      return {
        zIndex: 2,
        opacity: 0.6,
        pointerEvents: "auto",
        transform: `translateX(-${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(15deg)`,
        transition: "all 0.8s cubic-bezier(.4,1.8,.3,1)",
      };
    }
    if (isRight) {
      return {
        zIndex: 2,
        opacity: 0.6,
        pointerEvents: "auto",
        transform: `translateX(${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(-15deg)`,
        transition: "all 0.8s cubic-bezier(.4,1.8,.3,1)",
      };
    }
    // Hide all other images
    return {
      zIndex: 1,
      opacity: 0,
      pointerEvents: "none",
      transform: `translateX(0px) translateY(-50px) scale(0.7) rotateY(0deg)`,
      transition: "all 0.8s cubic-bezier(.4,1.8,.3,1)",
    };
  }

  // Framer Motion variants for quote
  const contentVariants = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -15 },
  };

  if (!items || items.length === 0) return null;

  return (
    <div className="carousel-container mx-auto">
      <div className="carousel-grid">
        {/* Images Column */}
        <div className="image-container-wrapper">
          <div className="image-container" ref={imageContainerRef}>
            {items.map((item, index) => (
              <img
                key={item.src}
                src={item.src}
                alt={item.title}
                className={`carousel-image ${index === activeIndex ? "active" : ""}`}
                style={getImageStyle(index)}
                onClick={() => {
                  if (index !== activeIndex) {
                    setActiveIndex(index);
                    if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
                  }
                }}
              />
            ))}
          </div>
        </div>

        {/* Content Column */}
        <div className="carousel-content relative py-4 px-2 flex flex-col justify-between transition-all duration-300">

          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              variants={contentVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="flex flex-col h-full justify-between z-10"
            >
              <div>
                {activeItem.subtitle && (
                  <span
                    className="subtitle uppercase tracking-[0.2em] font-mono block mb-3 font-semibold"
                    style={{ color: colorSubtitle, fontSize: fontSizeSubtitle }}
                  >
                    {activeItem.subtitle}
                  </span>
                )}
                <h3
                  className="title font-lights tracking-tight mb-6"
                  style={{ color: colorTitle, fontSize: fontSizeTitle }}
                >
                  {activeItem.title}
                </h3>
                <div
                  className="description font-light leading-relaxed mb-8"
                  style={{ color: colorDescription, fontSize: fontSizeDescription }}
                >
                  {activeItem.description.split(" ").map((word, i) => (
                    <motion.span
                      key={i}
                      initial={{
                        filter: "blur(8px)",
                        opacity: 0,
                        y: 4,
                      }}
                      animate={{
                        filter: "blur(0px)",
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        duration: 0.2,
                        ease: "easeInOut",
                        delay: 0.015 * i,
                      }}
                      style={{ display: "inline-block" }}
                    >
                      {word}&nbsp;
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls inside card to optimize space */}
          <div className="arrow-buttons z-10">
            <button
              className="arrow-button prev-button border border-white/10 hover:border-[#F97316]/30"
              onClick={handlePrev}
              style={{
                backgroundColor: hoverPrev ? colorArrowHoverBg : colorArrowBg,
              }}
              onMouseEnter={() => setHoverPrev(true)}
              onMouseLeave={() => setHoverPrev(false)}
              aria-label="Previous slide"
            >
              <FaArrowLeft size={16} color={colorArrowFg} />
            </button>
            <button
              className="arrow-button next-button border border-white/10 hover:border-[#F97316]/30"
              onClick={handleNext}
              style={{
                backgroundColor: hoverNext ? colorArrowHoverBg : colorArrowBg,
              }}
              onMouseEnter={() => setHoverNext(true)}
              onMouseLeave={() => setHoverNext(false)}
              aria-label="Next slide"
            >
              <FaArrowRight size={16} color={colorArrowFg} />
            </button>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .carousel-container {
          width: 100%;
          max-width: 68rem;
          padding: 1rem 0;
        }
        .carousel-grid {
          display: grid;
          gap: 3rem;
          grid-template-columns: 1fr;
          align-items: center;
        }
        .image-container-wrapper {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .image-container {
          position: relative;
          width: 100%;
          max-width: 28rem;
          height: 20rem;
          perspective: 1200px;
        }
        .carousel-image {
          position: absolute;
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 1.5rem;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.05);
          cursor: pointer;
        }
        .carousel-content {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 22rem;
        }
        .title {
          font-family: 'NextStep', sans-serif;
        }
        .description {
          line-height: 1.8;
        }
        .arrow-buttons {
          display: flex;
          gap: 1rem;
          margin-top: auto;
        }
        .arrow-button {
          width: 2.8rem;
          height: 2.8rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        @media (min-width: 768px) {
          .image-container {
            height: 26rem;
          }
        }
        @media (min-width: 1024px) {
          .carousel-grid {
            grid-template-columns: 1.1fr 1fr;
            gap: 5rem;
          }
          .image-container {
            max-width: 100%;
            height: 28rem;
          }
          .carousel-content {
            min-height: 28rem;
          }
        }
      `}} />
    </div>
  );
};

export default CircularCarousel;
