import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Try from "./pages/Try"

function App() {
  return (
    <div className="dark min-h-screen bg-slate-950">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/try" element={<Try />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
