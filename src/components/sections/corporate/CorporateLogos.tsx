import airtelLogo from "@/assets/images/brandLogo/Airtel.svg";
import bmwLogo from "@/assets/images/brandLogo/BMW.svg";
import holidayInnLogo from "@/assets/images/brandLogo/Holiday Inn.svg";
import metaLogo from "@/assets/images/brandLogo/Meta.svg";
import swiggyLogo from "@/assets/images/brandLogo/Swiggy.svg";
import zohoLogo from "@/assets/images/brandLogo/Zoho.svg";

const logos = [
  { name: "Airtel", src: airtelLogo },
  { name: "BMW", src: bmwLogo },
  { name: "Holiday Inn", src: holidayInnLogo },
  { name: "Meta", src: metaLogo },
  { name: "Swiggy", src: swiggyLogo },
  { name: "Zoho", src: zohoLogo },
];

export function CorporateLogos() {
  return (
    <section className="bg-[#050505] py-16 border-b border-white/5 relative overflow-hidden">
      {/* Background ambient glow */}


      <div className="container mx-auto px-6 md:px-12 mb-10 text-center relative z-10">
        <h3 className="text-base font-medium uppercase  tracking-[0.24em] text-white/50">
          Imagine your brand in the sky
        </h3>
      </div>

      <div className="relative w-full flex overflow-x-hidden group select-none">
        {/* Left & Right gradient fades for smooth visual edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />

        <div className="flex shrink-0 min-w-full justify-around items-center gap-16 animate-marquee py-4">
          {logos.map((logo, idx) => (
            <div
              key={`logo-1-${idx}`}
              className="flex items-center justify-center h-32 md:h-48 w-64 md:w-96 shrink-0 transition-transform duration-500 hover:scale-105"
            >
              <img
                src={logo.src}
                alt={`${logo.name} logo`}
                className="max-h-28 md:max-h-40 max-w-full object-contain transition-all duration-500"
              />
            </div>
          ))}
        </div>

        <div
          className="flex shrink-0 min-w-full justify-around items-center gap-16 animate-marquee py-4"
          aria-hidden="true"
        >
          {logos.map((logo, idx) => (
            <div
              key={`logo-2-${idx}`}
              className="flex items-center justify-center h-32 md:h-48 w-64 md:w-96 shrink-0 transition-transform duration-500 hover:scale-105"
            >
              <img
                src={logo.src}
                alt={`${logo.name} logo`}
                className="max-h-28 md:max-h-40 max-w-full object-contain transition-all duration-500"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
