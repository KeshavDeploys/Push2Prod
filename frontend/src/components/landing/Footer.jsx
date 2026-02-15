/* eslint-disable no-unused-vars */

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"

// Binary scramble text component - triggers on hover
function BinaryScrambleText({ children }) {
  const [displayText, setDisplayText] = useState(children)
  const [isAnimating, setIsAnimating] = useState(false)
  
  const handleMouseEnter = () => {
    if (isAnimating) return
    
    setIsAnimating(true)
    const text = children
    let iteration = 0
    
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (char === " " || char === "\n") return char
            
            if (index < iteration) {
              return text[index]
            }
            
            return Math.random() > 0.5 ? "1" : "0"
          })
          .join("")
      )
      
      iteration += 1 / 3
      
      if (iteration >= text.length + 2) {
        clearInterval(interval)
        setDisplayText(text)
        setIsAnimating(false)
      }
    }, 30)
  }
  
  return <span onMouseEnter={handleMouseEnter} className="cursor-pointer">{displayText}</span>
}

export default function CTA() {
  const navigate = useNavigate()

  return (
    <footer className="relative bg-black border-t border-green-500/10 overflow-hidden">
      {/* Premium Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@200;300&family=JetBrains+Mono:wght@300;400&family=Libre+Baskerville:wght@400&display=swap');
      `}</style>

      {/* Epic background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,197,94,0.08),transparent_70%)]" />
        
        {/* Floating orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>

      {/* Main CTA Section */}
      <section className="relative py-32">
        <div className="relative max-w-5xl mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-12"
          >
            {/* Eyebrow text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <p className="text-green-500/60 text-sm font-light tracking-[0.3em] uppercase mb-8" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                Ready to ship faster?
              </p>
            </motion.div>

            {/* Main headline with binary scramble and glow */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="relative"
            >
              <h2 className="text-6xl md:text-8xl font-light text-green-400 tracking-tight leading-tight mb-4 relative" style={{ fontFamily: "'Crimson Pro', serif" }}>
                <BinaryScrambleText>Stop configuring.</BinaryScrambleText>
                <br />
                <span className="text-green-300">
                  <BinaryScrambleText>Start shipping.</BinaryScrambleText>
                </span>
                
                {/* Text glow effect */}
                <motion.div
                  className="absolute inset-0 blur-2xl opacity-30 pointer-events-none"
                  animate={{
                    opacity: [0.2, 0.4, 0.2],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <h2 className="text-6xl md:text-8xl font-light text-green-400 tracking-tight leading-tight">
                    Stop configuring.
                    <br />
                    <span className="text-green-300">Start shipping.</span>
                  </h2>
                </motion.div>
              </h2>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-green-200/60 text-xl md:text-2xl font-light max-w-2xl mx-auto leading-relaxed"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              Join thousands of developers who've eliminated DevOps overhead and shipped to production in minutes.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Infinite Scrolling Text Bar */}
      <div className="relative border-t border-green-500/20 bg-black/80 backdrop-blur-sm overflow-hidden">
        <div className="relative flex whitespace-nowrap py-6">
          {/* Scrolling text - Changed to light green */}
          <motion.div
            className="flex items-center gap-16 px-8"
            animate={{
              x: [0, -1000],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {[...Array(20)].map((_, i) => (
              <span key={i} className="text-green-300/70 text-sm font-light tracking-[0.2em] uppercase" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                PUSH2PROD • ZERO CONFIG • CI/CD AUTOMATION
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Footer Links Section */}
      <div className="relative border-t border-green-500/10 py-16">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid md:grid-cols-5 gap-12">
            {/* Company Info */}
            <div className="md:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                {/* Logo */}
                <h3 className="text-3xl font-light text-green-400 tracking-tight" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  PUSH2PROD
                </h3>
                <p className="text-green-200/50 text-sm font-light leading-relaxed max-w-md" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  We empower developers to build better products. Places that don't just enrich everyday deployments, but are part of them, built with simplicity and speed in mind, from the ground up.
                </p>
              </motion.div>
            </div>

            {/* Product Links */}
            <div>
              <h4 className="text-green-400/90 text-sm font-medium tracking-wide mb-6 uppercase" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                PRODUCT
              </h4>
              <ul className="space-y-3">
                {['Features', 'Integrations', 'Pricing', 'Documentation', 'Changelog'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-green-200/60 hover:text-green-300 text-sm font-light transition-colors duration-200" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h4 className="text-green-400/90 text-sm font-medium tracking-wide mb-6 uppercase" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                COMPANY
              </h4>
              <ul className="space-y-3">
                {['About', 'Blog', 'Careers', 'Contact', 'Press Kit'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-green-200/60 hover:text-green-300 text-sm font-light transition-colors duration-200" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-green-400/90 text-sm font-medium tracking-wide mb-6 uppercase" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                CONNECT
              </h4>
              <ul className="space-y-3">
                {['GitHub', 'Twitter', 'Discord', 'LinkedIn', 'YouTube'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-green-200/60 hover:text-green-300 text-sm font-light transition-colors duration-200" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative border-t border-green-500/10 py-8">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <div className="flex items-center gap-6 text-green-500/40 text-xs font-light" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              <span>PUSH2PROD © 2025</span>
              <a href="#" className="hover:text-green-400 transition-colors duration-200">
                PRIVACY POLICY
              </a>
              <a href="#" className="hover:text-green-400 transition-colors duration-200">
                TERMS & CONDITIONS
              </a>
              <a href="#" className="hover:text-green-400 transition-colors duration-200">
                COOKIE POLICY
              </a>
            </div>

            {/* Made by - Changed Keshav Kumar color to bright green */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-2"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              <span className="text-green-300 text-xs font-medium">Made with</span>
              <motion.span
                className="text-green-500"
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                ♥
              </motion.span>
              <span className="text-green-300 text-xs font-medium">by</span>
              <span className="text-green-300 text-xs font-medium">Keshav Kumar</span>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  )
}