import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Services from './pages/Services'
import Products from './pages/Products'
import InteractiveLanding from './pages/InteractiveLanding'

export default function App() {
  return (
    <Routes>
      <Route path="/interactive" element={<InteractiveLanding />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="services" element={<Services />} />
        <Route path="products" element={<Products />} />
      </Route>
    </Routes>
  )
}

