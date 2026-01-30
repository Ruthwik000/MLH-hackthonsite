import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export function HeroSectionSimple() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="py-12 w-full flex justify-center items-center px-4 md:px-6">
      <div
        className="w-full max-w-7xl relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative overflow-hidden rounded-[48px] border border-gray-700 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 shadow-2xl min-h-[600px] md:min-h-[600px] flex flex-col items-center justify-center duration-500">
          {/* Animated Background Gradient */}
          <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
            <div
              className={`absolute inset-0 bg-gradient-to-br from-orange-500/40 via-orange-600/30 to-orange-500/40 transition-all duration-1000 ${
                isHovered ? "scale-110 rotate-6" : "scale-100 rotate-0"
              }`}
              style={{
                filter: "blur(80px)",
              }}
            />
          </div>

          {/* Grid Pattern Overlay */}
          <div
            className="absolute inset-0 z-0 opacity-10"
            style={{
              backgroundImage: `linear-gradient(rgba(249, 115, 22, 0.1) 1px, transparent 1px),
                               linear-gradient(90deg, rgba(249, 115, 22, 0.1) 1px, transparent 1px)`,
              backgroundSize: "50px 50px",
            }}
          />

          <div className="relative z-10 px-6 max-w-4xl mx-auto text-center flex flex-col items-center">
            {/* Badge */}
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              MLH Member Event
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-8 leading-[1.05]">
              Build. Innovate.{" "}
              <br />
              <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                Win Big.
              </span>
            </h1>

            {/* Description */}
            <p className="text-gray-300 text-lg md:text-xl max-w-2xl mb-12 leading-relaxed">
              Join 200+ teams in a 24-hour coding marathon. Free registration,
              amazing prizes, and unforgettable memories await.
            </p>

            {/* Button */}
            <Link
              to="/apply"
              className="group relative inline-flex h-14 items-center justify-center gap-3 overflow-hidden rounded-full bg-primary px-12 text-base font-medium text-white transition-all duration-300 hover:bg-primary/90 hover:scale-105 active:scale-95 hover:ring-4 hover:ring-primary/20"
            >
              <span className="relative z-10">Register Now - It's Free!</span>
              <ArrowRight className="h-5 w-5 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
