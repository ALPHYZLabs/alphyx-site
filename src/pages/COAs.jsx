import { products } from "../data/products";

const coas = [
  {
    id: "ret30",
    name: "Retatrutide 30mg",
    file: "/coas/ret30.jpg"
  },
  {
    id: "mots",
    name: "MOTS-C 10mg",
    file: "/coas/mots.jpg"
  },
  {
    id: "ghk",
    name: "GHK-CU 50mg",
    file: "/coas/ghk.jpg"
  },
    {
    id: "bpc",
    name: "BPC-157 10mg",
    file: "/coas/bpc.jpg"
  }
];

export default function COAs() {
  return (
    <div className="section page-shell">
      <h1 className="title" style={{ textAlign: "center" }}>
        CERTIFICATES OF ANALYSIS
      </h1>

      <p
        className="subtle"
        style={{
          maxWidth: "760px",
          margin: "10px auto 30px",
          textAlign: "center"
        }}
      >
        Verified third-party COAs for current ALPHYX batches. Additional certificates are added as new batches are tested and documented.
      </p>

      <div className="product-grid">
        {coas.map((coa) => {
          const product = products.find((p) => p.id === coa.id);

          return (
            <div key={coa.id} className="card">
              <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
                {product && (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-image"
                  />
                )}

                <div>
                  <h3 className="product-name">{coa.name}</h3>

                  <a href={coa.file} target="_blank" rel="noreferrer">
                    <button className="btn-primary" style={{ marginTop: "10px" }}>
                      View COA
                    </button>
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}