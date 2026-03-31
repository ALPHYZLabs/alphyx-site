export default function Contact() {
  return (
    <div className="section page-shell">
      <h1 className="title">Contact</h1>
      <p className="subtle" style={{ maxWidth: "700px", marginBottom: "30px" }}>
        For product availability, order requests, and general enquiries, contact ALPHYX Labs directly by email.
      </p>

      <div className="contact-grid">
        <div className="contact-card">
          <h2 style={{ color: "#39FF14" }}>Order Enquiries</h2>
          <p className="subtle">
            Email: alphyxlabs@yahoo.com
          </p>
          <p className="subtle">
            Include product name, size, and quantity in your request for faster processing.
          </p>
          <a href="mailto:alphyxlabs@yahoo.com">
            <button className="btn-primary">Email ALPHYX</button>
          </a>
        </div>

        <div className="contact-card">
          <h2 style={{ color: "#39FF14" }}>Processing Info</h2>
          <p className="subtle">
            Orders are reviewed manually. You will receive confirmation, availability, and payment instructions by email.
          </p>
          <p className="subtle" style={{ marginBottom: 0 }}>
            Typical reply window: within 24 hours.
          </p>
        </div>
      </div>
    </div>
  );
}