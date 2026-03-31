import { useParams, Link } from "react-router-dom";
import { products } from "../data/products";

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="section page-shell">
        <h1 className="title">Product not found</h1>
        <Link to="/products">
          <button className="btn-primary">Back to Products</button>
        </Link>
      </div>
    );
  }

  const email = "alphyxlabs@yahoo.com";

  const orderMessage = `
Order Request

Product: ${product.name}
Size: ${product.size}
Price: ${product.price}

Please confirm availability and payment details.
`;

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  const badgeText = product.category === "stack" ? "ALPHYX STACK" : "CORE PEPTIDE";

  return (
    <div className="section page-shell">
      <div className="product-detail-layout">
        <div className="product-detail-left">
          <div className="product-image-panel">
            <div className="product-image-glow"></div>
            <img
              src={product.image}
              alt={product.name}
              className="product-detail-image"
            />
          </div>
        </div>

        <div className="product-detail-right">
          <span className="badge">{badgeText}</span>

          <h1 className="title" style={{ marginBottom: "10px" }}>
            {product.name}
          </h1>

          <p className="subtle" style={{ marginBottom: "8px", fontSize: "1rem" }}>
            {product.size}
          </p>

          <div className="detail-price">{product.price}</div>

          <p className="subtle" style={{ marginBottom: "24px", maxWidth: "700px" }}>
            {product.description || "Premium catalogue presentation with clean sizing, transparent pricing, and direct order request flow."}
          </p>

          <div className="detail-spec-grid">
            <div className="detail-spec-card">
              <h3>Category</h3>
              <p>{product.category === "core" ? "Core Peptide" : "ALPHYX Stack"}</p>
            </div>

            <div className="detail-spec-card">
              <h3>Format</h3>
              <p>{product.size}</p>
            </div>

            <div className="detail-spec-card">
              <h3>Storage</h3>
              <p>Refrigerate after mixing where applicable</p>
            </div>

            <div className="detail-spec-card">
              <h3>Notice</h3>
              <p>For research purposes only</p>
            </div>
          </div>

          <div className="product-order-panel">
            <h2 className="panel-title">Request This Product</h2>
            <p className="subtle">
              Submit an order request and receive confirmation, availability, and payment instructions by email.
            </p>

            <a
              href={`mailto:${email}?subject=ALPHYX Order - ${product.name}&body=${encodeURIComponent(orderMessage)}`}
            >
              <button className="btn-primary" style={{ width: "100%" }}>
                Order via Email
              </button>
            </a>

            <Link to="/products">
              <button
                className="btn-secondary"
                style={{ width: "100%", marginTop: "14px" }}
              >
                Back to Price List
              </button>
            </Link>

            <p className="subtle" style={{ marginTop: "18px", fontSize: "0.9rem" }}>
              Response time: usually within 24 hours.
            </p>
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div className="related-section">
          <h2 className="title" style={{ fontSize: "1.7rem", textAlign: "center" }}>
            Related Products
          </h2>

          <div className="product-grid">
            {relatedProducts.map((item) => (
              <Link
                key={item.id}
                to={`/product/${item.id}`}
                style={{ textDecoration: "none" }}
              >
                <div className="card">
                  <div style={{ display: "flex", alignItems: "center", gap: "22px" }}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="product-image"
                    />

                    <div>
                      <h3 className="product-name">{item.name}</h3>
                      <p className="product-size">{item.size}</p>
                      <p className="product-price">{item.price}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}