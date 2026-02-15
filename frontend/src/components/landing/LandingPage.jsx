/* eslint-disable no-unused-vars */
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { useEffect, useRef, useState, useMemo } from "react"

export default function LandingPage() {
  const navigate = useNavigate()
  const containerRef = useRef(null)

  // Viewport size (safe for SSR)
  const [viewport, setViewport] = useState({ width: 1000, height: 1000 })

  useEffect(() => {
    if (typeof window !== "undefined") {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }
  }, [])

  // Mouse spotlight position
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 25, stiffness: 150 }
  const x = useSpring(mouseX, springConfig)
  const y = useSpring(mouseY, springConfig)

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      mouseX.set((e.clientX - centerX) / 25)
      mouseY.set((e.clientY - centerY) / 25)

      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY])

  // Button hover physics
  const handleMouseMoveButton = (ref, setPosition) => (e) => {
    if (!ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    setPosition({
      x: (e.clientX - centerX) * 0.3,
      y: (e.clientY - centerY) * 0.3,
    })
  }

  const buttonRef1 = useRef(null)
  const buttonRef2 = useRef(null)

  const [buttonPos1, setButtonPos1] = useState({ x: 0, y: 0 })
  const [buttonPos2, setButtonPos2] = useState({ x: 0, y: 0 })

  // ✅ Generate particles ONCE (no impure render calls)

  const [particles, setParticles] = useState([])

useEffect(() => {
  const generated = Array.from({ length: 20 }).map(() => ({
    initialX: Math.random() * window.innerWidth,
    initialY: Math.random() * window.innerHeight,
    animateX: Math.random() * window.innerWidth,
    animateY: Math.random() * window.innerHeight,
    duration: Math.random() * 20 + 10,
    opacity: Math.random() * 0.5 + 0.2,
  }))

  setParticles(generated)
}, [])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Premium Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@200;300&family=JetBrains+Mono:wght@300&family=Libre+Baskerville:wght@400&display=swap');
      `}</style>

      {/* Animated gradient orbs */}
      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full opacity-20 blur-3xl"
        style={{
          background: "radial-gradient(circle, #00ff88 0%, transparent 70%)",
          x: useTransform(x, (value) => value * 0.5),
          y: useTransform(y, (value) => value * 0.5),
        }}
      />

      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full opacity-20 blur-3xl"
        style={{
          background: "radial-gradient(circle, #00d4ff 0%, transparent 70%)",
          x: useTransform(x, (value) => value * -0.3),
          y: useTransform(y, (value) => value * -0.3),
          right: 0,
          bottom: 0,
        }}
      />

      {/* Grid */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0,255,136,0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,255,136,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
          x: useTransform(x, (value) => value * -0.2),
          y: useTransform(y, (value) => value * -0.2),
        }}
      />

      {/* Floating particles */}
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-green-400 rounded-full"
          initial={{
            x: p.initialX,
            y: p.initialY,
            opacity: p.opacity,
          }}
          animate={{
            x: p.animateX,
            y: p.animateY,
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
          }}
        />
      ))}

      {/* Spotlight */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(0,255,136,0.15) 0%, transparent 70%)",
          left: mousePosition.x - 300,
          top: mousePosition.y - 300,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-5xl"
        style={{ x, y }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="text-5xl md:text-7xl lg:text-8xl font-semibold leading-tight tracking-tight text-white"
          style={{ fontFamily: "'Crimson Pro', serif" }}
        >
          CI/CD automation
          <br />
          <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-cyan-400 text-transparent bg-clip-text">
            for developers
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 text-lg md:text-xl text-green-200/70 max-w-2xl mx-auto"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          Push2Prod generates Docker and GitHub Actions so every git push deploys
          your app to production — automatically.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.div
            ref={buttonRef1}
            onMouseMove={handleMouseMoveButton(buttonRef1, setButtonPos1)}
            onMouseLeave={() => setButtonPos1({ x: 0, y: 0 })}
            animate={{ x: buttonPos1.x, y: buttonPos1.y }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Button
              size="lg"
              className="bg-green-500 text-black hover:bg-green-400 px-10 rounded-full shadow-[0_0_40px_rgba(34,197,94,0.3)] hover:shadow-[0_0_60px_rgba(34,197,94,0.5)] transition-all duration-300"
              onClick={() => navigate("/try")}
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              Try it out
            </Button>
          </motion.div>

          <motion.div
            ref={buttonRef2}
            onMouseMove={handleMouseMoveButton(buttonRef2, setButtonPos2)}
            onMouseLeave={() => setButtonPos2({ x: 0, y: 0 })}
            animate={{ x: buttonPos2.x, y: buttonPos2.y }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-green-400 text-green-300 hover:bg-green-400/10 px-10 rounded-full backdrop-blur-sm bg-black/20 hover:border-green-300 transition-all duration-300"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              Read the docs
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}