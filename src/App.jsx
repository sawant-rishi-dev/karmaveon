import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Services from './pages/Services'
import Products from './pages/Products'
import QRBites from './pages/QRBites'
import SmartUdhaar from './pages/SmartUdhaar'
import Kwiee from './pages/Kwiee'
import InteractiveLanding from './pages/InteractiveLanding'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="services" element={<Services />} />
        <Route path="qr-bites" element={<QRBites />} />
        <Route path="products/qr-bites" element={<QRBites />} />
        <Route path="smart-udhaar" element={<SmartUdhaar />} />
        <Route path="products/smart-udhaar" element={<SmartUdhaar />} />
        <Route path="kwiee" element={<Kwiee />} />
        <Route path="products/kwiee" element={<Kwiee />} />
        <Route path="interactive" element={<InteractiveLanding />} />
        <Route path="solutions" element={<Services />} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  )
}
