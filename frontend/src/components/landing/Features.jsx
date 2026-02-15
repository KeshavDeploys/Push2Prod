/* eslint-disable no-unused-vars */

import { motion } from "framer-motion"
import { useState, useEffect } from "react"

const features = [
  {
    title: "Zero Config",
    desc: "No Dockerfiles or YAML. Push2Prod do it.",
    command: "$ push2prod init"
  },
  {
    title: "Opinionated",
    desc: "Production-grade CI/CD with sane defaults.",
    command: "$ push2prod deploy"
  },
  {
    title: "Developer First",
    desc: "No dashboards. No lock-in. Just ship.",
    command: "$ git push origin main"
  },
]

export default function Features() {
  return (
    <section className="relative py-32 bg-black border-t border-green-500/10">
      {/* Premium Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@200;300&family=JetBrains+Mono:wght@300;400&family=Libre+Baskerville:wght@400&display=swap');
      `}</style>

      <div className="max-w-7xl mx-auto px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-6xl md:text-7xl font-light text-green-400 tracking-tight mb-6" style={{ fontFamily: "'Crimson Pro', serif" }}>
            Built for speed
          </h2>
          <p className="text-green-200/50 text-xl font-light tracking-wide max-w-2xl" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            Everything you need to ship faster, nothing you don't.
          </p>
        </motion.div>

        {/* Terminal-style Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <FeatureCard key={f.title} feature={f} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function FeatureCard({ feature, index }) {
  const [isHovered, setIsHovered] = useState(false)
  const [showCursor, setShowCursor] = useState(true)

  // Blinking cursor effect
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 530)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.6 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative"
    >
      {/* Terminal Window */}
      <div className="relative bg-black border border-green-500/30 hover:border-green-400/70 transition-all duration-500 overflow-hidden">
        
        {/* Terminal Header Bar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-green-500/20 bg-green-500/5">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/30 group-hover:bg-red-500/60 transition-colors" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/30 group-hover:bg-yellow-500/60 transition-colors" />
            <div className="w-3 h-3 rounded-full bg-green-500/30 group-hover:bg-green-500/60 transition-colors" />
          </div>
          <div className="flex-1 text-center">
            <span className="text-green-400/40 text-xs" style={{ fontFamily: "'JetBrains Mono', monospace" }}>terminal</span>
          </div>
        </div>

        {/* Terminal Content */}
        <div className="p-6 text-sm space-y-4" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
          
          {/* Command Line */}
          <div className="flex items-center gap-2">
            <span className="text-green-400">❯</span>
            <motion.span 
              className="text-green-300/80"
              animate={isHovered ? { opacity: [0.8, 1, 0.8] } : {}}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              {feature.command}
            </motion.span>
            {isHovered && showCursor && (
              <span className="inline-block w-2 h-4 bg-green-400 animate-pulse" />
            )}
          </div>

          {/* Output Divider */}
          <div className="h-px bg-green-500/10" />

          {/* Feature Number */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 border border-green-500/30 text-green-400/60 text-xs">
              {String(index + 1).padStart(2, '0')}
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-green-500/30 to-transparent" />
          </div>

          {/* Title */}
          <motion.h3
            className="text-2xl font-normal text-green-300 tracking-tight"
            style={{ fontFamily: "'Libre Baskerville', serif" }}
            animate={isHovered ? { x: 5 } : { x: 0 }}
            transition={{ duration: 0.3 }}
          >
            {feature.title}
          </motion.h3>

          {/* Description */}
          <p className="text-green-200/60 leading-relaxed text-base" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            {feature.desc}
          </p>

          {/* Status Indicator */}
          <motion.div
            className="flex items-center gap-2 pt-2"
            animate={isHovered ? { opacity: 1 } : { opacity: 0.5 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-2 h-2 rounded-full bg-green-400" />
            <span className="text-green-400/60 text-xs">READY</span>
          </motion.div>
        </div>

        {/* Scan line effect */}
        <motion.div
          className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-green-400/30 to-transparent opacity-0 group-hover:opacity-100"
          animate={isHovered ? {
            top: ["0%", "100%"],
          } : {}}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Glow effect on hover */}
        <div className="absolute inset-0 bg-green-500/0 group-hover:bg-green-500/5 transition-all duration-500 pointer-events-none" />
      </div>
    </motion.div>
  )
}