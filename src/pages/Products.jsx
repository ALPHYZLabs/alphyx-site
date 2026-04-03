import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import products from '../data/products'
import { getMergedProducts } from '../utils/stock'

const singleProducts = products.filter((item) => item.type === 'product')
const stacks = products.filter((item) => item.type === 'stack')

function getInventoryLabel(product) {
  if (product.status === 'coming-soon') {
    return {
      text: 'Coming Soon',
      style: {
        color: '#facc15',
        border: '1px solid rgba(250,204,21,0.35)',
        background: 'rgba(250,204,21,0.10)',
      },
    }
  }

  if (product.quantity <= 0 || product.status === 'sold-out') {
    return {
      text: 'Sold Out',
      style: {
        color: '#f87171',
        border: '1px solid rgba(248,113,113,0.35)',
        background: 'rgba(248,113,113,0.10)',
      },
    }
  }

  return {
    text: `In Stock · ${product.quantity} Available`,
    style: {
      color: '#39FF14',
      border: '1px solid rgba(57,255,20,0.35)',
      background: 'rgba(57,255,20,0.10)',
    },
  }
}

function ProductGrid({ items }) {
  const displayProducts = getMergedProducts(items)

  return (
    <div className="grid">
      {displayProducts.map((product) => {
        const inventory = getInventoryLabel(product)
        const isUnavailable =
          product.status === 'sold-out' || product.status === 'coming-soon'

        return (
          <Link
            to={`/products/${product.slug}`}
            className={`card ${product.type === 'stack' ? 'stack-card' : ''} ${
              isUnavailable ? 'opacity-80' : ''
            }`}
            key={product.slug}
          >
            <div className="card-media-wrap">
              {product.badge ? (
                <span
                  className={`product-badge ${
                    product.badge === 'BEST SELLER'
                      ? 'badge-bestseller'
                      : 'badge-stack'
                  }`}
                >
                  {product.badge}
                </span>
              ) : null}

              <img
                src={product.image}
                alt={product.name}
                className="product-image"
              />
            </div>

            <div className="card-topline">
              <h3 className="card-title">{product.name}</h3>
              <div
  className="product-price"
  style={{
    color: '#39FF14',
    fontWeight: 600,
    letterSpacing: '0.02em',
    textShadow: '0 0 8px rgba(57,255,20,0.6), 0 0 16px rgba(57,255,20,0.4)',
  }}
>
  {product.price}
</div>
            </div>

            <p className="card-text">{product.desc}</p>

            <div
              style={{
                display: 'inline-block',
                fontSize: 11,
                textTransform: 'uppercase',
                letterSpacing: '0.18em',
                borderRadius: 999,
                padding: '8px 12px',
                marginBottom: '16px',
                ...inventory.style,
              }}
            >
              {inventory.text}
            </div>

            <span className="card-link">View Product</span>
          </Link>
        )
      })}
    </div>
  )
}

export default function Products() {
  return (
    <div className="page">
      <Navbar />

      <section className="section">
        <div className="container">
          <div className="section-kicker">Products</div>
          <h1 className="section-title">Catalogue</h1>
          <p className="section-text">
            Browse core compounds and branded stacks.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-kicker">Core Products</div>
          <h2 className="section-title">Compounds and support items</h2>
          <p className="section-text">Individual products.</p>

          <ProductGrid items={singleProducts} />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-kicker">Stacks</div>
          <h2 className="section-title"></h2>
          <p className="section-text">Bundled combinations.</p>

          <ProductGrid items={stacks} />
        </div>
      </section>

      <Footer />
    </div>
  )
}