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
      className: 'border-yellow-400/40 text-yellow-300',
    }
  }

  if (product.quantity <= 0 || product.status === 'sold-out') {
    return {
      text: 'Sold Out',
      className: 'border-red-400/40 text-red-300',
    }
  }

  if (product.quantity <= 3) {
    return {
      text: `Low Stock · ${product.quantity} Left`,
      className: 'border-orange-400/40 text-orange-300',
    }
  }

  return {
    text: `In Stock · ${product.quantity} Available`,
    className: 'border-[#39FF14]/40 text-[#39FF14]',
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

              {product.status === 'sold-out' ? (
                <div className="absolute inset-0 flex items-center justify-center bg-black/45 backdrop-blur-[2px]">
                  <span className="rounded-full border border-red-400/40 bg-black/70 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.28em] text-red-300">
                    Sold Out
                  </span>
                </div>
              ) : null}

              {product.status === 'coming-soon' ? (
                <div className="absolute inset-0 flex items-center justify-center bg-black/45 backdrop-blur-[2px]">
                  <span className="rounded-full border border-yellow-400/40 bg-black/70 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.28em] text-yellow-300">
                    Coming Soon
                  </span>
                </div>
              ) : null}
            </div>

            <div className="card-topline">
              <h3 className="card-title">{product.name}</h3>
              <div className="product-price">{product.price}</div>
            </div>

            <p className="card-text">{product.desc}</p>

            <div
              className={`inline-block text-[10px] uppercase tracking-[0.2em] border rounded-full px-3 py-1 mb-2 ${inventory.className}`}
            >
              {inventory.text}
            </div>

            <span className="card-link">
              {product.status === 'sold-out'
                ? 'Sold Out'
                : product.status === 'coming-soon'
                ? 'Coming Soon'
                : 'View Product'}
            </span>
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