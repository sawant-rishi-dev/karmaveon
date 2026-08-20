import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Services from './pages/Services'
import Products from './pages/Products'
import QRBites from './pages/QRBites'
import SmartUdhaar from './pages/SmartUdhaar'
import InteractiveLanding from './pages/InteractiveLanding'
import Kwiee from './pages/Kwiee'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="services" element={<Services />} />
        <Route path="solutions" element={<Services />} />
        <Route path="products" element={<Products />} />
        <Route path="products/qr-bites" element={<QRBites />} />
        <Route path="products/smart-udhaar" element={<SmartUdhaar />} />
        <Route path="qr-bites" element={<QRBites />} />
        <Route path="smart-udhaar" element={<SmartUdhaar />} />
        <Route path="kwiee" element={<Kwiee />} />
        <Route path="products/kwiee" element={<Kwiee />} />
        <Route path="about" element={<InteractiveLanding />} />
        <Route path="interactive" element={<InteractiveLanding />} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  )
}

