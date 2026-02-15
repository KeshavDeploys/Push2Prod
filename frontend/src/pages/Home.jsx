import Header from "@/components/landing/Header"
import LandingPage from "@/components/landing/LandingPage"
import Features from "@/components/landing/Features"
import WorkingSteps from "@/components/landing/WorkingSteps"
import Footer from "@/components/landing/Footer"

export default function Home() {
  return (
    <div className="bg-base text-gray-200 min-h-screen">
      <Header />
      <LandingPage />
      <Features />
      <WorkingSteps />
      <Footer />
    </div>
  )
}
