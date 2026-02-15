/* eslint-disable no-unused-vars */

import { LazyMotion, domAnimation, motion } from "framer-motion"

const steps = [
  {
    title: "Connect your GitHub repository",
    detail: "Seamless integration in seconds",
    number: "01"
  },
  {
    title: "Generate Docker & CI/CD pipeline",
    detail: "Automated infrastructure generation",
    number: "02"
  },
  {
    title: "Every git push deploys automatically",
    detail: "Zero-config continuous deployment",
    number: "03"
  },
]

export default function HowItWorks() {
  return (
    <LazyMotion features={domAnimation}>
      <section className="relative py-32 bg-black overflow-hidden border-t border-green-500/5">
        
        {/* Premium Typography */}
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@200;300&family=JetBrains+Mono:wght@300&family=Libre+Baskerville:wght@400&display=swap');
        `}</style>

        {/* Optimized background - static layers only */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-green-500/3 rounded-full blur-[100px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-green-400/3 rounded-full blur-[80px]" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-8">
          
          {/* Refined Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-32 text-center relative"
          >
            {/* Simple decorative line */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              className="h-[1px] w-24 bg-gradient-to-r from-transparent via-green-500/40 to-transparent mx-auto mb-12"
            />
            
            <h2 
              className="text-8xl md:text-[9rem] font-extralight text-green-400 tracking-tight mb-8 leading-none"
              style={{ fontFamily: "'Crimson Pro', serif" }}
            >
              How it works
            </h2>

            <p 
              className="text-green-300/40 tracking-[0.5em] uppercase text-xs"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              Three elegant steps
            </p>
          </motion.div>

          {/* Refined Cards */}
          <div className="grid md:grid-cols-3 gap-12 mb-20">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  delay: i * 0.15, 
                  duration: 0.7,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="group relative"
              >
                
                {/* Single layer glow - optimized */}
                <div className="absolute -inset-4 bg-gradient-to-br from-green-300/10 via-transparent to-green-400/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Card */}
                <div className="relative h-full bg-black/50 backdrop-blur-sm border border-green-300/10 rounded-2xl p-10 transition-all duration-500 group-hover:border-green-500/30 group-hover:bg-black/70">
                  
                  {/* Large step number */}
                  <div className="mb-10">
                    <span 
                      className="block text-[7rem] font-extralight text-green-200/20 group-hover:text-green-300/35 transition-colors duration-500 leading-none"
                      style={{ fontFamily: "'Crimson Pro', serif" }}
                    >
                      {step.number}
                    </span>

                    {/* Simple divider */}
                    <motion.div
                      className="h-[1px] bg-gradient-to-r from-green-500/30 to-transparent mt-6"
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: i * 0.15 + 0.3 }}
                    />
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    <h3 
                      className="text-2xl font-normal text-green-100 leading-tight group-hover:text-green-50 transition-colors duration-500"
                      style={{ fontFamily: "'Libre Baskerville', serif" }}
                    >
                      {step.title}
                    </h3>
                    <p 
                      className="text-sm text-green-400/50 font-light tracking-wide leading-relaxed"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      {step.detail}
                    </p>
                  </div>

                  {/* Minimal corner accents */}
                  <div className="absolute top-0 left-0 w-8 h-8">
                    <div className="absolute top-0 left-0 w-6 h-[1px] bg-green-500/20" />
                    <div className="absolute top-0 left-0 w-[1px] h-6 bg-green-500/20" />
                  </div>
                  
                  <div className="absolute bottom-0 right-0 w-8 h-8">
                    <div className="absolute bottom-0 right-0 w-6 h-[1px] bg-green-500/20" />
                    <div className="absolute bottom-0 right-0 w-[1px] h-6 bg-green-500/20" />
                  </div>
                  
                </div>
              </motion.div>
            ))}
          </div>

          {/* Simple final message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-block">
              <p 
                className="text-green-400/60 tracking-[0.4em] uppercase text-xs"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                Production ready in minutes
              </p>
              
              {/* Subtle decorative dots */}
              <div className="flex items-center justify-center gap-2 mt-6">
                <div className="w-1 h-1 rounded-full bg-green-500/30" />
                <div className="w-1 h-1 rounded-full bg-green-500/30" />
                <div className="w-1 h-1 rounded-full bg-green-500/30" />
              </div>
            </div>
          </motion.div>

        </div>
      </section>
    </LazyMotion>
  )
}
