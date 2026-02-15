import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"

export default function Header() {
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      {/* Premium Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@200;300&family=JetBrains+Mono:wght@300&family=Libre+Baskerville:wght@400&display=swap');
      `}</style>

      <header className="fixed top-0 w-full z-50 backdrop-blur-xl bg-slate-950/40 border-b border-green-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6 flex items-center justify-between">
          {/* Logo */}
          <div className="text-lg sm:text-xl md:text-2xl font-light tracking-[0.2em] text-green-400 uppercase" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            Push2Prod
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
            <Button
              className="bg-green-500 text-slate-950 hover:bg-green-400 transition-all duration-300 font-medium px-3 py-2 sm:px-4 sm:py-2 md:px-6 md:py-2.5 rounded-md text-xs sm:text-sm md:text-base"
              onClick={() => navigate("/try")}
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              Try it out
            </Button>

            {/* Hamburger Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex flex-col gap-[5px] sm:gap-[6px] w-8 h-8 sm:w-9 sm:h-9 justify-center items-center group relative ml-1 sm:ml-2"
              aria-label="Menu"
            >
              <span
                className={`h-[1.5px] bg-green-400 transition-all duration-500 ease-out ${
                  menuOpen ? "w-5 sm:w-6 rotate-45 translate-y-[6.5px] sm:translate-y-[7.5px]" : "w-5 sm:w-6"
                }`}
              />
              <span
                className={`h-[1.5px] bg-green-400 transition-all duration-500 ease-out ${
                  menuOpen ? "opacity-0 w-5 sm:w-6" : "opacity-100 w-5 sm:w-6"
                }`}
              />
              <span
                className={`h-[1.5px] bg-green-400 transition-all duration-500 ease-out ${
                  menuOpen ? "w-5 sm:w-6 -rotate-45 -translate-y-[6.5px] sm:-translate-y-[7.5px]" : "w-5 sm:w-6"
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Full Screen Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-700 ease-out ${
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Background - Black glass polymorphed */}
        <div
          className="absolute inset-0 backdrop-blur-3xl bg-gradient-to-br from-black/95 via-slate-950/90 to-black/95"
          onClick={() => setMenuOpen(false)}
        />

        {/* Menu Content */}
        <div className="relative h-full flex items-center justify-center px-4 sm:px-6">
          <nav className="flex flex-col items-center gap-3 sm:gap-4 md:gap-6 w-full max-w-2xl">
            {[
              { label: "Docs", path: "/docs" },
              { label: "Pricing", path: "/pricing" },
              { label: "GitHub", path: "/github" },
              { label: "Blog", path: "/blog" },
              { label: "Contact", path: "/contact" },
            ].map((item, index) => (
              <div
                key={item.label}
                className={`transition-all duration-700 ease-out w-full text-center ${
                  menuOpen
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-12"
                }`}
                style={{ transitionDelay: `${index * 80 + 200}ms` }}
              >
                <ScrambleText
                  text={item.label}
                  className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-green-400/30 hover:text-green-300 transition-colors duration-500 tracking-tighter cursor-pointer inline-block"
                  onClick={() => setMenuOpen(false)}
                  style={{ fontFamily: "'Crimson Pro', serif" }}
                />
              </div>
            ))}
          </nav>

          {/* Bottom Info */}
          <div
            className={`absolute bottom-6 sm:bottom-8 left-0 right-0 flex flex-col md:flex-row gap-4 sm:gap-6 md:gap-8 items-center justify-center transition-all duration-700 px-4 ${
              menuOpen
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "600ms", fontFamily: "'JetBrains Mono', monospace" }}
          >
            <div className="text-green-400/40 text-xs sm:text-sm font-light tracking-wide text-center">
              hello@push2prod.com
            </div>
            <div className="hidden md:block w-px h-4 bg-green-400/20" />
            <div className="flex gap-4 sm:gap-6 text-green-400/40 text-xs sm:text-sm font-light justify-center">
              <span className="hover:text-green-300 transition-colors cursor-pointer">Twitter</span>
              <span className="hover:text-green-300 transition-colors cursor-pointer">LinkedIn</span>
              <span className="hover:text-green-300 transition-colors cursor-pointer">GitHub</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

// Scramble Text Component
function ScrambleText({ text, className, onClick, style }) {
  const [displayText, setDisplayText] = useState(text)
  const [isScrambling, setIsScrambling] = useState(false)

  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

  const scramble = () => {
    if (isScrambling) return
    setIsScrambling(true)

    let iteration = 0
    const interval = setInterval(() => {
      setDisplayText((prev) =>
        text
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return text[index]
            }
            if (letter === " ") return " "
            return letters[Math.floor(Math.random() * letters.length)]
          })
          .join("")
      )

      if (iteration >= text.length) {
        clearInterval(interval)
        setIsScrambling(false)
      }

      iteration += 1 / 3
    }, 30)
  }

  return (
    <span
      className={className}
      onMouseEnter={scramble}
      onClick={onClick}
      style={style}
    >
      {displayText}
    </span>
  )
}