import { products } from "../data/products";
import { Link } from "react-router-dom";

export default function Products() {
  const core = products.filter((p) => p.category === "core");
  const stacks = products.filter((p) => p.category === "stack");

  const renderSection = (title, items) => (
    <section style={{ marginTop: "42px" }}>
      <h2
        className="title"
        style={{ fontSize: "1.7rem", marginBottom: "18px", textAlign: "center" }}
      >
        {title}
      </h2>

      <div className="product-grid">
        {items.map((p) => (
          <Link
            key={p.id}
            to={`/product/${p.id}`}
            style={{ textDecoration: "none" }}
          >
            <div className="card">
              <div style={{ display: "flex", alignItems: "center", gap: "22px" }}>
              <img
  src={p.image}
  alt={p.name}
  className="product-image"
/>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center"
                  }}
                >
                  <h3 className="product-name">{p.name}</h3>
                  <p
                    className="product-size"
                    style={{
                      fontSize: "0.85rem",
                      lineHeight: "1.3",
                      margin: "4px 0"
                    }}
                  >
                    {p.size}
                  </p>
                  <p className="product-price" style={{ margin: "4px 0 0" }}>
                    {p.price}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );

  return (
    <div className="section page-shell">
      <h1 className="title" style={{ textAlign: "center" }}>
        PRICE LIST
      </h1>

      <p
        className="subtle"
        style={{
          maxWidth: "720px",
          margin: "10px auto 30px",
          textAlign: "center"
        }}
      >
        Explore the ALPHYX catalogue of core peptides and optimized stacks.
        Select any product to view details and submit an order request.
      </p>

      {renderSection("CORE PEPTIDES", core)}
      {renderSection("ALPHYX STACKS", stacks)}
    </div>
  );
}