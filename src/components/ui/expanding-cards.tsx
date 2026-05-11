"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface CardItem {
  id: string | number;
  title: string;
  description: string;
  imgSrc: string;
  linkHref: string;
}

interface ExpandingCardsProps extends React.HTMLAttributes<HTMLUListElement> {
  items: CardItem[];
  defaultActiveIndex?: number;
}

export const ExpandingCards = React.forwardRef<
  HTMLUListElement,
  ExpandingCardsProps
>(({ className, items, defaultActiveIndex = 0, ...props }, ref) => {
  const [activeIndex, setActiveIndex] = React.useState<number | null>(
    defaultActiveIndex,
  );

  const [isDesktop, setIsDesktop] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const gridStyle = React.useMemo(() => {
    if (activeIndex === null) return {};

    if (isDesktop) {
      const columns = items
        .map((_, index) => (index === activeIndex ? "5fr" : "1fr"))
        .join(" ");
      return { gridTemplateColumns: columns };
    }

    const rows = items
      .map((_, index) => (index === activeIndex ? "5fr" : "1fr"))
      .join(" ");
    return { gridTemplateRows: rows };
  }, [activeIndex, items, isDesktop]);

  const handleInteraction = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <ul
      className={cn(
        "grid h-[620px] w-full max-w-6xl gap-2 md:h-[520px]",
        "transition-[grid-template-columns,grid-template-rows] duration-500 ease-out",
        className,
      )}
      style={{
        ...gridStyle,
        ...(isDesktop
          ? { gridTemplateRows: "1fr" }
          : { gridTemplateColumns: "1fr" }),
      }}
      ref={ref}
      {...props}
    >
      {items.map((item, index) => (
        <li
          key={item.id}
          className={cn(
            "group relative min-h-0 min-w-0 cursor-pointer overflow-hidden rounded-lg border border-white/10 bg-card text-card-foreground shadow-sm",
            "outline-none transition-colors duration-300 focus-visible:border-[#F97316] focus-visible:ring-2 focus-visible:ring-[#F97316]/40",
            "md:min-w-[80px]",
          )}
          onMouseEnter={() => handleInteraction(index)}
          onFocus={() => handleInteraction(index)}
          onClick={() => handleInteraction(index)}
          tabIndex={0}
          data-active={activeIndex === index}
        >
          <img
            src={item.imgSrc}
            alt={item.title}
            className="absolute inset-0 h-full w-full scale-110 object-cover grayscale transition-all duration-300 ease-out group-data-[active=true]:scale-100 group-data-[active=true]:grayscale-0"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent" />

          <article className="absolute inset-0 flex flex-col justify-end gap-2 p-4 md:p-5">
            <h3 className="absolute bottom-4 left-4 text-sm font-light uppercase tracking-wider text-white/80 opacity-100 transition-all duration-300 ease-out group-data-[active=true]:opacity-0 md:bottom-5 md:left-5 md:origin-left md:-rotate-90">
              {item.title}
            </h3>

            <h3 className="text-xl font-bold text-[#F97316] opacity-0 transition-all delay-150 duration-300 ease-out group-data-[active=true]:opacity-100 md:text-2xl">
              {item.title}
            </h3>

            <p className="w-full max-w-sm text-sm leading-relaxed text-white/75 opacity-0 transition-all delay-[225ms] duration-300 ease-out group-data-[active=true]:opacity-100">
              {item.description}
            </p>
          </article>
        </li>
      ))}
    </ul>
  );
});
ExpandingCards.displayName = "ExpandingCards";
