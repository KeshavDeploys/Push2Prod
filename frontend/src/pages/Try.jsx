import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useNavigate } from "react-router-dom"

export default function Try() {
  const navigate = useNavigate()
  
  const [form, setForm] = useState({
    repoUrl: "",
    githubToken: "",
    port: "3000",
    ec2Ip: "",
    sshUser: "ubuntu",
  })

  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState(null)
  const [focusedField, setFocusedField] = useState(null)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const isFormValid = () =>
    form.repoUrl &&
    form.githubToken &&
    form.port &&
    form.ec2Ip &&
    form.sshUser

const handleGenerate = async () => {
  if (!isFormValid()) return;

  setLoading(true);
  setStatus(null);

  try {
    const response = await fetch("http://localhost:5000/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        repoUrl: form.repoUrl,
        githubToken: form.githubToken,
        port: form.port,
        ec2Ip: form.ec2Ip,
        sshUser: form.sshUser
      })
    });

    const data = await response.json();

    if (data.success) {
      setStatus("Pipeline generated and deployment triggered 🚀");
    } else {
      setStatus(`Error: ${data.error}`);
    }

  } catch (err) {
    setStatus("Backend not reachable ❌");
  }

  setLoading(false);
};


  return (
    <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center">
      {/* Premium Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@200;300;400&family=JetBrains+Mono:wght@300;400&family=Libre+Baskerville:wght@400&display=swap');
      `}</style>

      {/* Ambient background layers */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,197,94,0.05),transparent_70%)]" />
        
        <motion.div
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-green-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-green-400/5 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />

        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `
            linear-gradient(rgba(34, 197, 94, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 197, 94, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }} />
      </div>

      {/* Back to Home Button */}
      <motion.button
        onClick={() => navigate("/")}
        className="fixed top-4 left-4 sm:top-6 sm:left-6 md:top-8 md:left-8 z-50 flex items-center gap-2 sm:gap-3 group"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        whileHover={{ x: -5 }}
      >
        <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full border border-green-500/30 bg-black/50 backdrop-blur-sm flex items-center justify-center group-hover:border-green-400/60 transition-all duration-300 group-hover:bg-green-500/10">
          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </div>
        <span className="hidden sm:inline text-green-400/80 text-xs sm:text-sm font-light tracking-wide group-hover:text-green-300 transition-colors" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
          Back to Home
        </span>
      </motion.button>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-2xl px-4 sm:px-6 py-20 sm:py-0">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-10 sm:mb-12 md:mb-16"
        >
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="h-[1px] w-16 sm:w-20 md:w-24 bg-gradient-to-r from-transparent via-green-500/60 to-transparent mx-auto mb-6 sm:mb-8"
          />
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight text-green-400 tracking-tight mb-3 sm:mb-4 px-4" style={{ fontFamily: "'Crimson Pro', serif" }}>
            Generate Pipeline
          </h1>
          
          <p className="text-green-200/50 text-sm sm:text-base md:text-lg font-light tracking-wide px-4" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            From git push to production in seconds
          </p>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative group"
        >
          {/* Glow effect */}
          <div className="absolute -inset-[1px] bg-gradient-to-br from-green-500/20 via-transparent to-green-400/20 rounded-2xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          
          {/* Card */}
          <div className="relative bg-black/60 backdrop-blur-xl border border-green-500/10 rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-10 group-hover:border-green-500/30 transition-all duration-700">
            
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-12 sm:w-14 md:w-16 h-12 sm:h-14 md:h-16 opacity-30">
              <div className="absolute top-0 left-0 w-6 sm:w-7 md:w-8 h-[1px] bg-green-500/40" />
              <div className="absolute top-0 left-0 w-[1px] h-6 sm:h-7 md:h-8 bg-green-500/40" />
            </div>
            <div className="absolute bottom-0 right-0 w-12 sm:w-14 md:w-16 h-12 sm:h-14 md:h-16 opacity-30">
              <div className="absolute bottom-0 right-0 w-6 sm:w-7 md:w-8 h-[1px] bg-green-500/40" />
              <div className="absolute bottom-0 right-0 w-[1px] h-6 sm:h-7 md:h-8 bg-green-500/40" />
            </div>

            <div className="space-y-5 sm:space-y-6">
              {/* Form Fields */}
              {[
                { name: "repoUrl", label: "GitHub Repository URL", type: "text", placeholder: "https://github.com/username/repo" },
                { name: "githubToken", label: "GitHub Personal Access Token", type: "password", placeholder: "ghp_xxxxxxxxxxxx" },
                { name: "port", label: "Application Port", type: "text", placeholder: "3000" },
                { name: "ec2Ip", label: "EC2 IP Address", type: "text", placeholder: "54.123.45.67" },
                { name: "sshUser", label: "SSH User", type: "text", placeholder: "ubuntu" },
              ].map((field, i) => (
                <motion.div
                  key={field.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                  className="relative"
                >
                  <label 
                    className="block text-green-400/70 text-[0.65rem] sm:text-xs font-light tracking-wide mb-2 uppercase"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {field.label}
                  </label>
                  
                  <div className="relative">
                    <input
                      type={field.type}
                      name={field.name}
                      placeholder={field.placeholder}
                      value={form[field.name]}
                      onChange={handleChange}
                      onFocus={() => setFocusedField(field.name)}
                      onBlur={() => setFocusedField(null)}
                      className="w-full bg-black/40 border border-green-500/20 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-green-100 placeholder-green-500/30 focus:outline-none focus:border-green-400/60 transition-all duration-300"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    />
                    
                    {/* Focus indicator */}
                    <motion.div
                      className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-green-500 to-green-400"
                      initial={{ width: 0 }}
                      animate={{ width: focusedField === field.name ? "100%" : 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </motion.div>
              ))}

              {/* Generate Button */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.9 }}
                disabled={loading || !isFormValid()}
                onClick={handleGenerate}
                className="relative w-full mt-8 group/btn"
              >
                <div className={`absolute -inset-[1px] bg-gradient-to-r from-green-500 to-green-400 rounded-lg transition-opacity duration-300 blur-sm ${
                  loading || !isFormValid() ? 'opacity-0' : 'opacity-0 group-hover/btn:opacity-100'
                }`} />
                
                <div className={`relative px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-medium tracking-wide transition-all duration-300 ${
                  loading || !isFormValid() 
                    ? 'bg-black text-green-500/40 cursor-not-allowed border border-green-500/20' 
                    : 'bg-black text-green-400 hover:text-green-300 border border-green-500/40 hover:border-green-400/80 group-hover/btn:shadow-[0_0_30px_rgba(34,197,94,0.3)]'
                }`} style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  {loading ? (
                    <span className="flex items-center justify-center gap-3">
                      <motion.div
                        className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-green-500/40 border-t-green-400 rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      <span className="text-sm sm:text-base">Generating Pipeline...</span>
                    </span>
                  ) : (
                    <span className="text-sm sm:text-base">Generate Pipeline</span>
                  )}
                </div>
              </motion.button>

              {/* Validation Message */}
              <AnimatePresence>
                {!isFormValid() && !loading && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-center text-green-500/40 text-[0.7rem] sm:text-xs tracking-wide px-2"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    Fill all fields to enable deployment
                  </motion.p>
                )}
              </AnimatePresence>

              {/* Success Message */}
              <AnimatePresence>
                {status && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                    className="relative"
                  >
                    <div className="absolute -inset-[1px] bg-gradient-to-r from-green-500/30 to-green-400/30 rounded-lg blur-sm" />
                    <div className="relative bg-green-500/10 border border-green-500/30 rounded-lg px-4 sm:px-6 py-3 sm:py-4 flex items-center gap-2 sm:gap-3">
                      <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
                      <p className="text-green-300 text-xs sm:text-sm font-light" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                        {status}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Bottom decorative elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="flex items-center justify-center gap-2 mt-6 sm:mt-8"
        >
          <div className="w-1 h-1 rounded-full bg-green-500/30" />
          <div className="w-1 h-1 rounded-full bg-green-500/30" />
          <div className="w-1 h-1 rounded-full bg-green-500/30" />
        </motion.div>
      </div>
    </div>
  )
}