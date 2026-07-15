import React, { useState, useEffect, useRef } from "react";
import { Search, ArrowDown, ChevronLeft, ChevronRight, X, Info, Menu } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface SlideData {
  id: string;
  category: "The Beginning" | "Design Philosophy" | "Performance" | "UX" | "Aerodynamics" | "The Legacy";
  headerHighlight: "The Beginning" | "Design Philosophy" | "Performance" | "UX" | "Aerodynamics" | "The Legacy";
  title: string;
  subtitleLine1: string;
  subtitleLine2: string;
  specs: { label: string; value: string }[];
}

const SLIDES: SlideData[] = [
  {
    id: "01",
    category: "The Beginning",
    headerHighlight: "The Beginning",
    title: "Porsche 911 GT3 RS",
    subtitleLine1: "Engineered for the relentless pursuit of speed.",
    subtitleLine2: "Every surface, every vent, and every curve exists for one purpose—performance.",
    specs: [
      { label: "Engine Type", value: "4.0L Naturally Aspirated Flat-Six" },
      { label: "Peak Power", value: "518 hp @ 8,500 RPM" },
      { label: "0 to 60 MPH", value: "3.0 seconds" },
      { label: "Top Speed", value: "184 mph (296 km/h)" }
    ]
  },
  {
    id: "02",
    category: "Design Philosophy",
    headerHighlight: "Design Philosophy",
    title: "Form Driven by Function",
    subtitleLine1: "The GT3 RS is more than an iconic silhouette.",
    subtitleLine2: "Every contour has been sculpted to optimize airflow, maximize downforce, and reduce drag. Nothing is decorative—every detail has a purpose born on the racetrack.",
    specs: [
      { label: "Aerodynamic Downforce", value: "1,895 lbs @ 177 mph" },
      { label: "Drag Coefficient", value: "0.39 Cd" },
      { label: "Active Wings", value: "Continuously adjustable front and rear wings with DRS" },
      { label: "Transmission", value: "7-speed Porsche Doppelkupplung (PDK)" }
    ]
  },
  {
    id: "03",
    category: "Performance",
    headerHighlight: "Performance",
    title: "Naturally Aspirated Excellence",
    subtitleLine1: "At the center of the GT3 RS lies a high-revving naturally aspirated flat-six engine delivering an unforgettable driving experience.",
    subtitleLine2: "Instant throttle response, razor-sharp precision, and a soundtrack that defines Porsche motorsport heritage.",
    specs: [
      { label: "Max Rev Limit", value: "9,000 RPM" },
      { label: "Torque Output", value: "342 lb-ft @ 6,300 RPM" },
      { label: "Displacement", value: "3,996 cc" },
      { label: "Throttle Response", value: "6 individual throttle valves for instant breathing" }
    ]
  },
  {
    id: "04",
    category: "UX",
    headerHighlight: "UX",
    title: "Designed Around the Driver",
    subtitleLine1: "Every interaction is engineered for precision, placing essential controls exactly where instinct expects them.",
    subtitleLine2: "A race-inspired cockpit combines tactile feedback, intelligent technology, and an uncompromising focus on the driving experience.",
    specs: [
      { label: "Steering Dials", value: "Four integrated rotary controls for PASM, PTV+, Traction Control, and Drive Modes." },
      { label: "DRS Trigger", value: "Dedicated steering wheel button for instant Drag Reduction System activation." },
      { label: "Track Apps", value: "Built-in Porsche Track Precision and Lap Trigger for professional performance analysis." },
      { label: "Cockpit Focus", value: "Driver-first layout featuring an analog tachometer with high-resolution digital displays." }
    ]
  },
  {
    id: "05",
    category: "Aerodynamics",
    headerHighlight: "Aerodynamics",
    title: "Aerodynamics Without Compromise",
    subtitleLine1: "From the oversized rear wing to the active front splitter, the GT3 RS generates extraordinary aerodynamic efficiency.",
    subtitleLine2: "Advanced airflow management creates exceptional stability, allowing the car to remain planted at speeds where precision becomes everything.",
    specs: [
      { label: "Rear Wing Profile", value: "Swan-neck attachment, higher than the roofline" },
      { label: "Front Fender Louvers", value: "Carbon fibre arch ventilation ducts" },
      { label: "Air Intake Fins", value: "Roof-mounted carbon blades directing clean air" },
      { label: "Lightweight Parts", value: "CFRP doors, wings, roof, and front lid" }
    ]
  },
  {
    id: "06",
    category: "The Legacy",
    headerHighlight: "The Legacy",
    title: "Built to Dominate Every Corner",
    subtitleLine1: "The Porsche 911 GT3 RS represents decades of engineering refinement transformed into a machine where innovation meets emotion.",
    subtitleLine2: "Designed for those who demand uncompromising performance, it stands as the ultimate expression of precision and speed.",
    specs: [
      { label: "Nordschleife Lap", value: "6:49.300 minutes" },
      { label: "Chassis Joints", value: "Fully spherical bearings on all double wishbones" },
      { label: "Stabilizers", value: "CFRP anti-roll bars front and rear" },
      { label: "Weight (Curb)", value: "3,268 lbs (Lightweight package)" }
    ]
  }
];

const NAV_ITEMS = ["The Beginning", "Design Philosophy", "Performance", "UX", "Aerodynamics", "The Legacy"] as const;

export default function App() {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [isExploreOpen, setIsExploreOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isChaptersOpen, setIsChaptersOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [direction, setDirection] = useState<number>(0);

  const activeSlide = SLIDES[currentIdx];
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [scrollFraction, setScrollFraction] = useState(0);

  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    const frameCount = 300;
    const currentFrame = (index: number) =>
      `/frames/ezgif-frame-${(index + 1).toString().padStart(3, "0")}.jpg`;
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      loadedImages.push(img);
    }
    setImages(loadedImages);
    if (loadedImages[0]) {
      loadedImages[0].onload = () =>
        setScrollFraction((prev) => (prev === 0 ? 0.0001 : prev));
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop;
      const maxScrollTop = document.documentElement.scrollHeight - window.innerHeight;
      const fraction = maxScrollTop > 0 ? scrollTop / maxScrollTop : 0;
      requestAnimationFrame(() => {
        setScrollFraction(fraction);
        const newIdx = Math.min(SLIDES.length - 1, Math.floor(fraction * SLIDES.length));
        if (newIdx !== currentIdx) {
          setDirection(newIdx > currentIdx ? 1 : -1);
          setCurrentIdx(newIdx);
        }
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsExploreOpen(false);
        setIsSearchOpen(false);
        setIsMobileMenuOpen(false);
        setIsChaptersOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentIdx]);

  useEffect(() => {
    if (images.length === 0 || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) return;
    if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    const frameCount = 300;
    const frameIndex = Math.min(frameCount - 1, Math.floor(scrollFraction * frameCount));
    const img = images[frameIndex];
    if (img && img.complete && img.naturalWidth !== 0) {
      const canvasRatio = canvas.width / canvas.height;
      const imgRatio = img.width / img.height;
      let renderWidth, renderHeight, xOffset, yOffset;
      if (canvasRatio > imgRatio) {
        renderWidth = canvas.width;
        renderHeight = canvas.width / imgRatio;
        xOffset = 0;
        yOffset = (canvas.height - renderHeight) / 2;
      } else {
        renderWidth = canvas.height * imgRatio;
        renderHeight = canvas.height;
        xOffset = (canvas.width - renderWidth) / 2;
        yOffset = 0;
      }
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(img, xOffset, yOffset, renderWidth, renderHeight);
    }
  }, [scrollFraction, images]);

  const scrollToSlide = (index: number) => {
    const targetFraction = index / SLIDES.length;
    const maxScrollTop = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: targetFraction * maxScrollTop, behavior: "smooth" });
  };

  const setSlide = (index: number) => scrollToSlide(index);
  const nextSlide = () => scrollToSlide((currentIdx + 1) % SLIDES.length);
  const prevSlide = () => scrollToSlide((currentIdx - 1 + SLIDES.length) % SLIDES.length);

  const handleHeaderNavClick = (navItem: typeof NAV_ITEMS[number]) => {
    const foundIdx = SLIDES.findIndex((slide) => slide.headerHighlight === navItem);
    if (foundIdx !== -1) { setSlide(foundIdx); setIsMobileMenuOpen(false); setIsChaptersOpen(false); }
  };

  const handleCategoryClick = (cat: typeof NAV_ITEMS[number]) => {
    const foundIdx = SLIDES.findIndex((slide) => slide.category === cat);
    if (foundIdx !== -1) setSlide(foundIdx);
  };

  const filteredSlides = searchQuery
    ? SLIDES.filter(
        (s) =>
          s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.subtitleLine1.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : SLIDES;

  return (
    <>
      <div style={{ height: "600vh" }} />
      <div
        id="main-container"
        className="fixed top-0 left-0 w-full h-screen bg-black text-white font-sans overflow-hidden flex flex-col justify-between selection:bg-white selection:text-black"
      >
        {/* Canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover pointer-events-none" />
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />

        {/* ══════════════════════════════════════════════════════
            TOP HEADER
            — Desktop (lg+): original 3-column layout + timeline
            — Mobile/Tablet (<lg): brand + dots + search + burger
        ══════════════════════════════════════════════════════ */}
        <header className="relative z-30 w-full px-4 sm:px-8 lg:px-16 pt-5 sm:pt-7 lg:pt-12">

          {/* ── DESKTOP ROW (lg+) ── */}
          <div className="hidden lg:flex w-full items-center justify-between">
            {/* Left spacer */}
            <div className="w-1/5" />

            {/* Central 6-column nav */}
            <nav className="w-3/5 grid grid-cols-6 gap-1 text-center" aria-label="Chapter navigation">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSlide.headerHighlight === item;
                return (
                  <button
                    key={item}
                    id={`nav-link-${item.replace(/\s+/g, "-").toLowerCase()}`}
                    onClick={() => handleHeaderNavClick(item)}
                    className="relative py-2 text-[9px] xl:text-[10.5px] tracking-[0.12em] xl:tracking-[0.15em] uppercase font-light cursor-pointer transition-all duration-300 w-full flex items-center justify-center whitespace-nowrap"
                  >
                    <span className={`transition-all duration-300 ${isActive ? "text-white font-medium" : "text-white/40 hover:text-white/80"}`}>
                      {item}
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId="activeHeaderUnderline"
                        className="absolute bottom-0 left-1 right-1 h-[1.5px] bg-white"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Right: Search */}
            <div className="w-1/5 flex justify-end">
              <button
                id="search-toggle-btn"
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center space-x-2 text-white/40 hover:text-white transition-colors duration-300 py-2 cursor-pointer"
              >
                <Search className="w-4 h-4" />
                <span className="text-[10px] tracking-[0.2em] uppercase font-light hidden xl:inline">Search</span>
              </button>
            </div>
          </div>

          {/* ── DESKTOP TIMELINE TRACK (lg+) ── */}
          <div className="hidden lg:block w-full h-[1px] bg-white/10 mt-10 relative">
            <div className="absolute left-0 right-0 h-full flex justify-between">
              <div className="w-1/5 h-full bg-white/5 border-r border-white/5" />
              <div className="w-3/5 h-full relative">
                <div className="absolute inset-0 grid grid-cols-6">
                  <div className="border-r border-white/5 h-full" />
                  <div className="border-r border-white/5 h-full" />
                  <div className="border-r border-white/5 h-full" />
                  <div className="border-r border-white/5 h-full" />
                  <div className="border-r border-white/5 h-full" />
                  <div className="h-full" />
                </div>
                <motion.div
                  className="absolute h-[1.5px] bg-white"
                  initial={false}
                  animate={{
                    left:
                      activeSlide.headerHighlight === "The Beginning" ? "0%" :
                      activeSlide.headerHighlight === "Design Philosophy" ? "16.666%" :
                      activeSlide.headerHighlight === "Performance" ? "33.333%" :
                      activeSlide.headerHighlight === "UX" ? "50%" :
                      activeSlide.headerHighlight === "Aerodynamics" ? "66.666%" : "83.333%",
                    width: "16.666%"
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 28 }}
                />
              </div>
              <div className="w-1/5 h-full bg-white/5 border-l border-white/5" />
            </div>
          </div>

          {/* ── MOBILE / TABLET ROW (<lg) ── */}
          <div className="flex lg:hidden w-full items-center justify-between">
            {/* Brand */}
            <div className="flex items-center gap-2 select-none">
              <div className="flex flex-col leading-none">
                <span className="text-[7px] tracking-[0.4em] text-white/30 uppercase font-light">Porsche</span>
                <span className="text-[11px] tracking-[0.18em] text-white font-semibold uppercase leading-tight mt-[2px]">
                  GT3 RS
                </span>
              </div>
              <div className="w-px h-5 bg-white/15 ml-1 hidden sm:block" />
            </div>

            {/* Centered progress dots */}
            <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-[6px] pointer-events-none">
              {SLIDES.map((_, i) => (
                <div
                  key={i}
                  className={`rounded-full transition-all duration-500 ${
                    i === currentIdx
                      ? "w-4 h-[2px] bg-white"
                      : "w-[3px] h-[3px] bg-white/22"
                  }`}
                />
              ))}
            </div>

            {/* Search + Burger */}
            <div className="flex items-center gap-1">
              <button
                id="search-toggle-btn-mobile"
                onClick={() => setIsSearchOpen(true)}
                className="w-9 h-9 flex items-center justify-center text-white/40 hover:text-white transition-colors cursor-pointer"
                title="Search"
              >
                <Search className="w-[15px] h-[15px]" />
              </button>
              <button
                id="mobile-menu-btn"
                onClick={() => setIsMobileMenuOpen(true)}
                className="flex flex-col items-end justify-center gap-[5px] w-9 h-9 cursor-pointer group"
                title="Menu"
                aria-label="Open navigation"
              >
                <span className="block w-5 h-px bg-white/50 group-hover:bg-white transition-colors duration-300" />
                <span className="block w-3 h-px bg-white/50 group-hover:bg-white transition-colors duration-300" />
              </button>
            </div>
          </div>

          {/* ── MOBILE PROGRESS BAR (<lg) ── */}
          <div className="lg:hidden w-full h-px bg-white/10 mt-4 relative overflow-hidden">
            <motion.div
              className="absolute left-0 top-0 h-full bg-white/70"
              animate={{ width: `${((currentIdx + 1) / SLIDES.length) * 100}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
            />
          </div>
        </header>

        {/* ══════════════════════════════════════════════════════
            MIDDLE SECTION
            — Desktop (lg+): original sidebars + diamond buttons
            — Mobile/Tablet (<lg): center content + mobile controls
        ══════════════════════════════════════════════════════ */}
        <main className="relative z-20 flex-1 flex items-start justify-between px-4 sm:px-8 lg:px-16 w-full pt-1 pb-4">

          {/* ── DESKTOP: Left vertical label (lg+) ── */}
          <div className="absolute left-6 lg:left-16 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col items-center">
            <div className="select-none [writing-mode:vertical-lr] text-base tracking-[1.5em] uppercase font-light text-white/50 font-sans text-center whitespace-nowrap">
              9 1 1 &nbsp; G T 3 &nbsp; R S
            </div>
          </div>

          {/* ── DESKTOP: Left diamond nav (lg+) ── */}
          <button
            id="prev-slide-btn"
            onClick={prevSlide}
            className="absolute left-[10%] xl:left-[15%] top-1/2 -translate-y-1/2 hidden lg:flex items-center group cursor-pointer"
            style={{ width: "120px" }}
            title="Previous Chapter"
          >
            <div className="relative w-full flex items-center">
              <div className="w-full h-[1px] bg-white/20 group-hover:bg-white/60 transition-all duration-300" />
              <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center">
                <div className="w-3 h-3 border border-white/40 rotate-45 bg-black flex items-center justify-center group-hover:border-white group-hover:scale-125 transition-all duration-300">
                  <ChevronLeft className="w-2 h-2 text-white/0 group-hover:text-white -rotate-45 transition-all duration-300" />
                </div>
              </div>
            </div>
          </button>

          {/* ── DESKTOP: Right diamond nav (lg+) ── */}
          <button
            id="next-slide-btn"
            onClick={nextSlide}
            className="absolute right-[10%] xl:right-[15%] top-1/2 -translate-y-1/2 hidden lg:flex items-center group cursor-pointer"
            style={{ width: "120px" }}
            title="Next Chapter"
          >
            <div className="relative w-full flex items-center">
              <div className="w-full h-[1px] bg-white/20 group-hover:bg-white/60 transition-all duration-300" />
              <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center">
                <div className="w-3 h-3 border border-white/40 rotate-45 bg-black flex items-center justify-center group-hover:border-white group-hover:scale-125 transition-all duration-300">
                  <ChevronRight className="w-2 h-2 text-white/0 group-hover:text-white -rotate-45 transition-all duration-300" />
                </div>
              </div>
            </div>
          </button>

          {/* ── CENTER HERO TEXT ── */}
          <div className="flex-1 max-w-xs sm:max-w-md lg:max-w-xl xl:max-w-3xl mx-auto text-center flex flex-col items-center justify-start pt-3 lg:pt-6 relative">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIdx}
                custom={direction}
                initial={{ opacity: 0, y: direction * 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -direction * 25 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center"
              >
                {/* Subtitle */}
                <div className="space-y-1 mb-1.5 lg:mb-2 max-w-xs sm:max-w-sm lg:max-w-lg px-2">
                  <p className="text-[8.5px] sm:text-[9px] lg:text-[9px] tracking-[0.15em] text-white/60 font-normal leading-relaxed">
                    {activeSlide.subtitleLine1}
                  </p>
                  <p className="text-[8.5px] sm:text-[9px] lg:text-[9px] tracking-[0.15em] text-white/60 font-normal leading-relaxed hidden sm:block">
                    {activeSlide.subtitleLine2}
                  </p>
                </div>

                {/* Main Title — fluid scaling for mobile, original size for desktop */}
                <h1
                  id="main-display-title"
                  className="hidden lg:block text-[32px] font-medium tracking-[0.25em] text-white uppercase select-none leading-none font-sans"
                >
                  {activeSlide.title}
                </h1>
                {/* Mobile/tablet title with fluid clamp scaling */}
                <h1
                  id="main-display-title-mobile"
                  className="lg:hidden font-medium tracking-[0.2em] sm:tracking-[0.25em] text-white uppercase select-none leading-tight font-sans"
                  style={{ fontSize: "clamp(1rem, 5vw + 0.25rem, 1.75rem)" }}
                >
                  {activeSlide.title}
                </h1>

                {/* Mobile/tablet prev/next controls (<lg) */}
                <div className="flex items-center gap-5 lg:hidden mt-3">
                  <button
                    id="prev-slide-btn-mobile"
                    onClick={prevSlide}
                    className="w-8 h-8 border border-white/20 flex items-center justify-center hover:border-white/60 hover:bg-white/5 transition-all duration-300 cursor-pointer"
                    title="Previous"
                  >
                    <ChevronLeft className="w-4 h-4 text-white/60" />
                  </button>
                  <span className="text-[9px] tracking-[0.35em] text-white/25 font-light">
                    {activeSlide.id} / 06
                  </span>
                  <button
                    id="next-slide-btn-mobile"
                    onClick={nextSlide}
                    className="w-8 h-8 border border-white/20 flex items-center justify-center hover:border-white/60 hover:bg-white/5 transition-all duration-300 cursor-pointer"
                    title="Next"
                  >
                    <ChevronRight className="w-4 h-4 text-white/60" />
                  </button>
                </div>

                {/* Mobile: Chapters button link (<lg) */}
                <button
                  id="chapters-open-btn-mobile"
                  onClick={() => setIsChaptersOpen(true)}
                  className="lg:hidden mt-4 flex items-center gap-2 text-white/25 hover:text-white/60 transition-colors duration-300 cursor-pointer"
                >
                  <span className="text-[7px] tracking-[0.4em] uppercase font-light">Chapters</span>
                  <div className="flex items-center gap-1">
                    {SLIDES.map((_, i) => (
                      <div
                        key={i}
                        className={`rounded-full transition-all duration-300 ${
                          i === currentIdx ? "w-3 h-[1.5px] bg-white/60" : "w-[3px] h-[3px] bg-white/20"
                        }`}
                      />
                    ))}
                  </div>
                </button>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── DESKTOP: Right sidebar — Chapters + Dots (lg+) ── */}
          <div className="absolute right-6 lg:right-16 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col items-end space-y-12">
            <div className="flex flex-col items-end space-y-4">
              <span className="text-[10px] tracking-[0.25em] text-white/30 uppercase mb-2">CHAPTERS</span>
              {NAV_ITEMS.map((key) => {
                const isActive = activeSlide.category === key;
                return (
                  <button
                    key={key}
                    id={`cat-btn-${key.replace(/\s+/g, "-").toLowerCase()}`}
                    onClick={() => handleCategoryClick(key)}
                    className="group flex items-center space-x-3 cursor-pointer"
                  >
                    <span className={`text-[10px] xl:text-xs tracking-[0.2em] uppercase transition-all duration-300 ${
                      isActive ? "text-white font-medium" : "text-white/30 group-hover:text-white/70"
                    }`}>
                      {key}
                    </span>
                    <div className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                      isActive ? "bg-white scale-125" : "bg-white/10 group-hover:bg-white/40"
                    }`} />
                  </button>
                );
              })}
            </div>

            {/* Counter + dots */}
            <div className="flex flex-col items-end space-y-2">
              <div className="text-sm tracking-[0.3em] font-light text-white/80 flex items-center">
                <span className="font-semibold text-white">{activeSlide.id}</span>
                <span className="text-white/30 mx-1.5">/</span>
                <span className="text-white/40 text-xs">06</span>
              </div>
              <div className="flex flex-col items-center space-y-3 pt-2">
                {SLIDES.map((_, idx) => {
                  const isActive = idx === currentIdx;
                  return (
                    <button
                      key={idx}
                      id={`dot-btn-${idx}`}
                      onClick={() => setSlide(idx)}
                      className="relative p-1 group cursor-pointer focus:outline-none"
                      title={`Go to slide ${idx + 1}`}
                    >
                      <div className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                        isActive ? "bg-white scale-125" : "bg-white/20 group-hover:bg-white/50"
                      }`} />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </main>

        {/* ══════════════════════════════════════════════════════
            BOTTOM FOOTER
        ══════════════════════════════════════════════════════ */}
        <footer className="relative z-30 w-full flex flex-col items-center px-6 pb-6 sm:pb-8 lg:pb-12 pt-4 gap-4 sm:gap-5">
          {/* Explore trigger */}
          <button
            id="explore-trigger-btn"
            onClick={() => setIsExploreOpen(true)}
            className="group flex flex-col items-center gap-5 sm:gap-8 cursor-pointer focus:outline-none"
          >
            <span className="text-[9px] sm:text-xs tracking-[0.4em] uppercase text-white/60 group-hover:text-white transition-colors duration-300 font-light">
              EXPLORE
            </span>
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white group-hover:bg-white/5 transition-all duration-500">
              <motion.div animate={{ y: [0, 4, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}>
                <ArrowDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
              </motion.div>
            </div>
          </button>

          {/* Diamond pagination */}
          <div className="flex items-center gap-4 sm:gap-6">
            {SLIDES.map((_, idx) => {
              const isActive = idx === currentIdx;
              return (
                <button
                  key={idx}
                  id={`diamond-btn-${idx}`}
                  onClick={() => setSlide(idx)}
                  className="relative flex items-center justify-center p-1.5 sm:p-2 group cursor-pointer focus:outline-none"
                  title={`Section ${idx + 1}`}
                >
                  <div className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rotate-45 border transition-all duration-300 ${
                    isActive ? "bg-white border-white scale-110" : "border-white/30 group-hover:border-white/80 group-hover:scale-105"
                  }`} />
                </button>
              );
            })}
          </div>
        </footer>

        {/* ══════════════════════════════════════════════════════
            MOBILE MENU DRAWER  (<lg only)
        ══════════════════════════════════════════════════════ */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              id="mobile-menu-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", stiffness: 320, damping: 34 }}
                className="absolute right-0 top-0 bottom-0 w-72 max-w-[85vw] bg-black border-l border-white/8 flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="flex items-center justify-between px-7 py-7 border-b border-white/8">
                  <div className="flex flex-col leading-none select-none">
                    <span className="text-[7px] tracking-[0.4em] text-white/25 uppercase font-light">Porsche</span>
                    <span className="text-[11px] tracking-[0.18em] text-white font-semibold uppercase mt-[3px]">GT3 RS</span>
                  </div>
                  <button
                    id="close-mobile-menu-btn"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-8 h-8 flex items-center justify-center text-white/35 hover:text-white transition-colors cursor-pointer"
                    aria-label="Close"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Nav links */}
                <nav className="flex-1 flex flex-col px-7 pt-8 pb-4 overflow-y-auto" aria-label="Chapter navigation">
                  <span className="text-[7px] tracking-[0.4em] text-white/20 uppercase mb-6 font-light">Chapters</span>
                  {NAV_ITEMS.map((item, idx) => {
                    const isActive = activeSlide.headerHighlight === item;
                    return (
                      <button
                        key={item}
                        id={`mobile-nav-${item.replace(/\s+/g, "-").toLowerCase()}`}
                        onClick={() => handleHeaderNavClick(item)}
                        className={`flex items-center justify-between w-full py-4 border-b border-white/[0.06] cursor-pointer transition-all duration-200 group ${
                          isActive ? "text-white" : "text-white/30 hover:text-white/75"
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <span className="text-[8px] text-white/18 w-4 font-light tabular-nums">0{idx + 1}</span>
                          <span className="text-[10px] uppercase font-light tracking-[0.2em]">{item}</span>
                        </div>
                        {isActive ? (
                          <div className="w-1.5 h-1.5 rounded-full bg-white flex-shrink-0" />
                        ) : (
                          <ChevronRight className="w-3 h-3 text-white/15 group-hover:text-white/40 transition-colors" />
                        )}
                      </button>
                    );
                  })}
                </nav>

                {/* Footer */}
                <div className="px-7 py-6 border-t border-white/8">
                  <button
                    onClick={() => { setIsSearchOpen(true); setIsMobileMenuOpen(false); }}
                    className="flex items-center gap-3 text-white/30 hover:text-white/75 transition-colors duration-300 cursor-pointer py-2"
                  >
                    <Search className="w-[14px] h-[14px]" />
                    <span className="text-[9px] tracking-[0.25em] uppercase font-light">Search</span>
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ══════════════════════════════════════════════════════
            CHAPTERS OVERLAY  (<lg only, triggered from mobile)
        ══════════════════════════════════════════════════════ */}
        <AnimatePresence>
          {isChaptersOpen && (
            <motion.div
              id="chapters-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center lg:hidden"
              onClick={() => setIsChaptersOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.96, opacity: 0, y: 12 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.96, opacity: 0, y: 12 }}
                transition={{ type: "spring", stiffness: 340, damping: 32 }}
                className="relative w-full max-w-sm mx-5 border border-white/10 bg-black/95 backdrop-blur-xl"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setIsChaptersOpen(false)}
                  className="absolute top-4 right-4 text-white/35 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="px-7 pt-7 pb-2">
                  <span className="text-[7px] tracking-[0.45em] text-white/25 uppercase font-light block mb-0.5">Select</span>
                  <h2 className="text-[10px] tracking-[0.3em] text-white uppercase font-light">Chapter</h2>
                </div>

                <div className="px-5 pb-7 pt-3 flex flex-col gap-0.5">
                  {NAV_ITEMS.map((item, idx) => {
                    const isActive = activeSlide.headerHighlight === item;
                    return (
                      <button
                        key={item}
                        id={`chapter-select-${item.replace(/\s+/g, "-").toLowerCase()}`}
                        onClick={() => { handleHeaderNavClick(item); setIsChaptersOpen(false); }}
                        className={`flex items-center justify-between w-full px-3 py-3.5 transition-all duration-200 cursor-pointer group border border-transparent ${
                          isActive ? "bg-white/8 border-white/10" : "hover:bg-white/4"
                        }`}
                      >
                        <div className="flex items-center gap-3.5">
                          <span className="text-[8px] text-white/20 w-4 tabular-nums font-light">0{idx + 1}</span>
                          <span className={`text-[10px] uppercase tracking-[0.18em] font-light transition-colors ${
                            isActive ? "text-white" : "text-white/45 group-hover:text-white/80"
                          }`}>
                            {item}
                          </span>
                        </div>
                        <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all duration-300 ${
                          isActive ? "bg-white" : "bg-white/10 group-hover:bg-white/35"
                        }`} />
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ══════════════════════════════════════════════════════
            EXPLORE MODAL — FULL SCREEN (all devices)
        ══════════════════════════════════════════════════════ */}
        <AnimatePresence>
          {isExploreOpen && (
            <motion.div
              id="explore-modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28 }}
              className="fixed inset-0 z-[60] bg-black/97 backdrop-blur-md flex flex-col"
            >
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col h-full"
              >
                {/* Top bar */}
                <div className="flex items-start justify-between px-5 sm:px-10 lg:px-16 py-5 sm:py-7 lg:py-8 border-b border-white/8 flex-shrink-0">
                  <div>
                    <span className="text-[8px] tracking-[0.4em] text-white/30 uppercase block font-light mb-1">
                      Specifications Panel
                    </span>
                    <h2
                      className="font-extralight tracking-widest text-white uppercase font-sans leading-none"
                      style={{ fontSize: "clamp(1.25rem, 3vw + 0.5rem, 3rem)" }}
                    >
                      {activeSlide.title}
                    </h2>
                  </div>
                  <button
                    id="close-explore-btn"
                    onClick={() => setIsExploreOpen(false)}
                    className="w-10 h-10 flex items-center justify-center text-white/40 hover:text-white transition-colors cursor-pointer flex-shrink-0 ml-4 mt-1"
                    title="Close"
                    aria-label="Close"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Scrollable body */}
                <div className="flex-1 overflow-y-auto px-5 sm:px-10 lg:px-16 py-6 sm:py-8">
                  <div className="max-w-5xl mx-auto flex flex-col gap-6 sm:gap-8">
                    {/* Narrative */}
                    <p className="text-white/60 font-light leading-relaxed max-w-3xl text-xs sm:text-sm lg:text-base">
                      {activeSlide.subtitleLine1} {activeSlide.subtitleLine2}
                    </p>

                    <div className="h-px w-12 bg-white/15" />

                    {/* Specs grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 border-t border-white/8">
                      {activeSlide.specs.map((spec, index) => (
                        <div
                          key={index}
                          className={`py-5 sm:py-6 border-b border-white/8 ${
                            index % 2 === 0 ? "sm:pr-10 sm:border-r" : "sm:pl-10"
                          }`}
                        >
                          <span className="text-[8px] sm:text-[9px] tracking-[0.3em] text-white/30 uppercase block mb-2 font-light">
                            {spec.label}
                          </span>
                          <span className="text-white font-light leading-snug text-sm sm:text-base lg:text-lg">
                            {spec.value}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Info box */}
                    <div className="border border-white/8 bg-white/[0.03] p-4 sm:p-5 flex items-start gap-3">
                      <Info className="w-4 h-4 text-white/45 shrink-0 mt-0.5" />
                      <p className="text-[10px] sm:text-xs text-white/45 font-light leading-relaxed">
                        The Porsche 911 GT3 RS is a high-performance sports car designed for uncompromising aerodynamic
                        efficiency and racetrack dominance. Features include a naturally aspirated flat-six engine, an
                        active swan-neck rear wing with DRS, and advanced motorsport-tuned chassis systems.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bottom bar */}
                <div className="flex-shrink-0 border-t border-white/8 px-5 sm:px-10 lg:px-16 py-4 sm:py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-[8px] tracking-[0.3em] text-white/22 uppercase font-light">Current Selection</span>
                    <span className="text-[9px] tracking-[0.15em] font-medium text-white px-2.5 py-1 border border-white/18">
                      Chapter {activeSlide.id} · {activeSlide.category}
                    </span>
                  </div>
                  <button
                    id="dismiss-spec-btn"
                    onClick={() => setIsExploreOpen(false)}
                    className="w-full sm:w-auto px-8 lg:px-10 py-3 bg-white text-black font-light text-[10px] tracking-[0.25em] uppercase hover:bg-white/85 transition-all duration-300 cursor-pointer"
                  >
                    Dismiss Panel
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ══════════════════════════════════════════════════════
            SEARCH MODAL (all devices)
        ══════════════════════════════════════════════════════ */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              id="search-modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-black/98 backdrop-blur-md flex items-center justify-center p-5 sm:p-8"
            >
              <div className="w-full max-w-xl relative">
                <button
                  id="close-search-btn"
                  onClick={() => { setIsSearchOpen(false); setSearchQuery(""); }}
                  className="absolute -top-10 sm:-top-12 right-0 text-white/40 hover:text-white p-2 cursor-pointer transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="space-y-5 sm:space-y-6">
                  <div className="flex items-center border-b border-white/15 pb-3">
                    <Search className="w-4 h-4 text-white/35 mr-3 flex-shrink-0" />
                    <input
                      id="search-input-field"
                      type="text"
                      placeholder="Search Concepts (e.g. UX, Cabin, Tech, Chassis...)"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-transparent text-white border-none outline-none focus:ring-0 text-base sm:text-lg lg:text-xl font-light tracking-wide placeholder-white/20"
                      autoFocus
                    />
                  </div>

                  <div className="space-y-1 max-h-64 sm:max-h-80 overflow-y-auto">
                    {filteredSlides.length > 0 ? (
                      filteredSlides.map((slide) => {
                        const origIdx = SLIDES.findIndex((s) => s.id === slide.id);
                        return (
                          <button
                            key={slide.id}
                            id={`search-result-${slide.id}`}
                            onClick={() => { setSlide(origIdx); setIsSearchOpen(false); setSearchQuery(""); }}
                            className="w-full text-left p-3 sm:p-4 hover:bg-white/5 transition-all duration-300 flex items-center justify-between group rounded-sm border border-transparent hover:border-white/5"
                          >
                            <div>
                              <div className="text-[9px] tracking-[0.2em] text-white/40 uppercase mb-1">
                                Chapter {slide.id} — {slide.category}
                              </div>
                              <h3 className="text-sm sm:text-base tracking-widest text-white uppercase font-light">
                                {slide.title}
                              </h3>
                            </div>
                            <ChevronRight className="w-4 h-4 text-white/30 group-hover:text-white/80 transition-all duration-300 flex-shrink-0 ml-2" />
                          </button>
                        );
                      })
                    ) : (
                      <div className="text-center py-8 text-white/30 text-xs tracking-wider font-light">
                        No matching concepts found for "{searchQuery}"
                      </div>
                    )}
                  </div>

                  <div className="text-[9px] tracking-widest text-white/25 uppercase text-center pt-2">
                    Press ESC to cancel · or tap close
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
