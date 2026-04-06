import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Guides from './pages/Guides.jsx'
import Products from './pages/Products.jsx'
import ProductDetail from './pages/ProductDetail.jsx'
import Contact from './pages/Contact.jsx'
import Verification from './pages/Verification.jsx'
import GuideRetatrutide from './pages/GuideRetatrutide.jsx'
import GuideMotsC from './pages/GuideMotsC.jsx'
import GuideNadPlus from './pages/GuideNadPlus.jsx'
import GuideBpc157 from './pages/GuideBpc157.jsx'
import GuideTb500 from './pages/GuideTb500.jsx'
import GuideTesamorelin from './pages/GuideTesamorelin.jsx'
import GuidePt141 from './pages/GuidePt141.jsx'
import GuideGhkCu from './pages/GuideGhkCu.jsx'
import Calculator from './pages/Calculator.jsx'
import Admin from "./pages/Admin"
import BeginnerGuide from './pages/BeginnerGuide.jsx'

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:slug" element={<ProductDetail />} />
        <Route path="/guides" element={<Guides />} />
        <Route path="/verification" element={<Verification />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/guides/retatrutide" element={<GuideRetatrutide />} />
        <Route path="/guides/mots-c" element={<GuideMotsC />} />
        <Route path="/guides/nad-plus" element={<GuideNadPlus />} />
        <Route path="/guides/bpc-157" element={<GuideBpc157 />} />
        <Route path="/guides/tb-500" element={<GuideTb500 />} />
        <Route path="/guides/tesamorelin" element={<GuideTesamorelin />} />
        <Route path="/guides/pt-141" element={<GuidePt141 />} />
        <Route path="/guides/ghk-cu" element={<GuideGhkCu />} />
	<Route path="/calculator" element={<Calculator />} />
	<Route path="/admin" element={<Admin />} />
	<Route path="/guides/beginner-guide" element={<BeginnerGuide />} />
      </Routes>

    </>
  )
}