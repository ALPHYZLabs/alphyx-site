import COAs from "./pages/COAs";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Contact from "./pages/Contact";
import Navbar from "./components/Navbar";
import ProductDetail from "./pages/ProductDetail";
import logo from "./assets/logo.jpg";

function AppContent() {
  const location = useLocation();
  const isProductsPage = location.pathname === "/products";

  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      <img
        src={logo}
        alt="background logo"
        style={{
          position: "fixed",
          top: isProductsPage ? "60%" : "70%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: isProductsPage ? "1100px" : "900px",
          opacity: isProductsPage ? 0.28 : 0.04,
          filter: isProductsPage
            ? "brightness(0.9) blur(1px)"
            : "brightness(0.7) blur(1px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div style={{ position: "relative", zIndex: 1 }}>
        <Navbar />

  <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/products" element={<Products />} />
  <Route path="/coas" element={<COAs />} />
  <Route path="/contact" element={<Contact />} />
  <Route path="/product/:id" element={<ProductDetail />} />
</Routes>

        <footer className="footer">
          © 2026 ALPHYX Labs. All product listings are presented for research catalogue purposes only.
        </footer>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}