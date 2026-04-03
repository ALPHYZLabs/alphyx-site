import { useMemo, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import products from '../data/products'
import { getMergedProducts } from '../utils/stock'
import Disclaimer from '../components/Disclaimer'

const ORDER_EMAIL = 'alphyxlabs@yahoo.com'
const WHATSAPP_NUMBER = '61466985311'

const stacksWellWithMap = {
  'retatrutide-20mg': ['mots-c', 'tesamorelin-10mg', 'shred-stack'],
  'retatrutide-30mg': ['mots-c', 'tesamorelin-10mg', 'shred-max'],
  'mots-c': ['retatrutide-30mg', 'nad-500mg', 'mots-c-stack'],
  'nad-500mg': ['mots-c', 'ghk-cu-50mg', 'tesamorelin-10mg'],
  'ghk-cu-50mg': ['nad-500mg', 'bpc-157-10mg'],
  'bpc-157-10mg': ['tb-500-10mg', 'repair-stack'],
  'tb-500-10mg': ['bpc-157-10mg', 'repair-stack'],
  'pt-141-10mg': ['tesamorelin-10mg', 'nad-500mg'],
  'tesamorelin-10mg': ['retatrutide-30mg', 'mots-c'],
  'bac-water-10ml': ['retatrutide-30mg', 'mots-c', 'bpc-157-10mg'],
  'shred-stack': ['retatrutide-20mg', 'mots-c'],
  'shred-max': ['retatrutide-30mg', 'mots-c', 'tesamorelin-10mg'],
  'repair-stack': ['bpc-157-10mg', 'tb-500-10mg'],
  'mots-c-stack': ['mots-c', 'retatrutide-30mg', 'nad-500mg'],
}

const bestForMap = {
  'retatrutide-20mg': ['Fat Loss', 'Metabolic Support'],
  'retatrutide-30mg': ['Fat Loss', 'Metabolic Support'],
  'mots-c': ['Fat Loss', 'Energy', 'Insulin Sensitivity'],
  'nad-500mg': ['Energy', 'Cellular Support'],
  'ghk-cu-50mg': ['Skin', 'Repair', 'Regeneration'],
  'bpc-157-10mg': ['Recovery', 'Gut Support', 'Tissue Repair'],
  'tb-500-10mg': ['Recovery', 'Tissue Repair'],
  'pt-141-10mg': ['Libido', 'Arousal'],
  'tesamorelin-10mg': ['Fat Loss', 'Abdominal Support'],
  'bac-water-10ml': ['Reconstitution'],
  'shred-stack': ['Fat Loss', 'Metabolic Support'],
  'shred-max': ['Fat Loss', 'Metabolic Support', 'Energy'],
  'repair-stack': ['Recovery', 'Tissue Repair'],
  'mots-c-stack': ['Energy', 'Fat Loss', 'Metabolic Support'],
}

function getInventoryMeta(product) {
  if (product.status === 'coming-soon') {
    return {
      badge: 'Coming Soon',
      badgeClass: 'border-yellow-400/40 text-yellow-300',
      note: 'This item is not live yet.',
    }
  }

  if (product.quantity <= 0 || product.status === 'sold-out') {
    return {
      badge: 'Sold Out',
      badgeClass: 'border-red-400/40 text-red-300',
      note: 'Currently unavailable.',
    }
  }

  if (product.quantity <= 3) {
    return {
      badge: `Low Stock · ${product.quantity} Left`,
      badgeClass: 'border-orange-400/40 text-orange-300',
      note: `Only ${product.quantity} vial${product.quantity === 1 ? '' : 's'} left.`,
    }
  }

  return {
    badge: `In Stock · ${product.quantity} Available`,
    badgeClass: 'border-[#39FF14]/40 text-[#39FF14]',
    note: `${product.quantity} vial${product.quantity === 1 ? '' : 's'} currently in stock.`,
  }
}

export default function ProductDetail() {
  const { slug } = useParams()
  const mergedProducts = getMergedProducts(products)
  const product = mergedProducts.find((p) => p.slug === slug)

  const [quantity, setQuantity] = useState(1)
  const [copied, setCopied] = useState(false)

  const orderMessage = useMemo(() => {
    if (!product) return ''
    return `Hi, I want to order:\n- ${product.name}\nQuantity: ${quantity}\n\nPlease let me know current availability.`
  }, [product, quantity])

  const emailHref = useMemo(() => {
    const subject = encodeURIComponent(`Order Request - ${product?.name || 'Product'}`)
    const body = encodeURIComponent(orderMessage)
    return `mailto:${ORDER_EMAIL}?subject=${subject}&body=${body}`
  }, [product, orderMessage])

  const whatsappHref = useMemo(() => {
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(orderMessage)}`
  }, [orderMessage])

  async function handleCopyEmail() {
    try {
      await navigator.clipboard.writeText(ORDER_EMAIL)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
  }

  if (!product) {
    return (
      <div className="page">
        <Navbar />
        <section className="guide-wrap">
          <h1 className="section-title">Product not found</h1>
        </section>
        <Footer />
      </div>
    )
  }

  const relatedSlugs = stacksWellWithMap[product.slug] || []
  const relatedProducts = mergedProducts.filter((p) => relatedSlugs.includes(p.slug))
  const isUnavailable = product.status === 'sold-out' || product.status === 'coming-soon'
  const inventory = getInventoryMeta(product)

  return (
    <div className="page">
      <Navbar />

      <section className="detail-section">
        <div className="container">
          <div className="detail-layout">
            <div className="detail-image-card">
              <img src={product.image} alt={product.name} className="detail-image-large" />
            </div>

            <div className="detail-content-card">
              <div className="section-kicker">Product</div>

              {product.badge ? (
                <div
                  className={`detail-badge ${
                    product.badge === 'BEST SELLER' ? 'badge-bestseller' : 'badge-stack'
                  }`}
                >
                  {product.badge}
                </div>
              ) : null}

              <h1 className="detail-title">{product.name}</h1>
              <div className="detail-price">{product.price}</div>

              <div
                className={`inline-block text-[10px] uppercase tracking-[0.2em] border rounded-full px-3 py-1 mb-3 ${inventory.badgeClass}`}
              >
                {inventory.badge}
              </div>

              <div className="text-sm text-white/55 mb-5">{inventory.note}</div>

              <p className="detail-description">{product.desc}</p>

              <div className="detail-meta-grid">
                <div className="detail-meta-card">
                  <h3>Best For</h3>
                  <div className="best-for-tags">
                    {(bestForMap[product.slug] || []).map((tag) => (
                      <span key={tag} className="best-for-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="detail-meta-card">
                  <h3>Research Note</h3>
                  <p>For research purposes only.</p>
                </div>
              </div>

              {relatedProducts.length > 0 ? (
                <div className="stacks-well-section">
                  <div className="order-label">Stacks Well With</div>
                  <div className="stacks-well-grid">
                    {relatedProducts.map((item) => {
                      const relatedInventory = getInventoryMeta(item)

                      return (
                        <Link
                          key={item.slug}
                          to={`/products/${item.slug}`}
                          className="stacks-well-card"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="stacks-well-image"
                          />
                          <div className="stacks-well-name">{item.name}</div>
                          <div
                            className={`mt-2 inline-block text-[9px] uppercase tracking-[0.18em] border rounded-full px-2 py-1 ${relatedInventory.badgeClass}`}
                          >
                            {item.status === 'available'
                              ? item.quantity <= 3
                                ? `Low Stock · ${item.quantity}`
                                : 'In Stock'
                              : item.status === 'coming-soon'
                              ? 'Coming Soon'
                              : 'Sold Out'}
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              ) : null}

              <div className="order-panel">
                <div className="order-panel-top">
                  <div>
                    <div className="order-label">Quantity</div>
                    <div className="quantity-control">
                      <button
                        type="button"
                        className="quantity-btn"
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        disabled={isUnavailable}
                      >
                        −
                      </button>
                      <span className="quantity-value">{quantity}</span>
                      <button
                        type="button"
                        className="quantity-btn"
                        onClick={() => setQuantity((q) => q + 1)}
                        disabled={isUnavailable}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="copy-email-btn"
                    onClick={handleCopyEmail}
                  >
                    {copied ? 'Email Copied' : 'Copy Email'}
                  </button>
                </div>

                <div className="order-preview">
                  <div className="order-label">Order Message Preview</div>
                  <pre className="order-preview-text">{orderMessage}</pre>
                </div>

                <div className="detail-cta-wrap">
                  <div className="detail-cta-row">
                    {product.status === 'available' ? (
                      <>
                        <a href={emailHref} className="detail-cta-primary">
                          Email to Order
                        </a>

                        <a
                          href={whatsappHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="detail-cta-secondary"
                        >
                          WhatsApp
                        </a>
                      </>
                    ) : (
                      <>
                        <button
                          type="button"
                          disabled
                          className="detail-cta-primary opacity-50 cursor-not-allowed"
                        >
                          {product.status === 'sold-out' ? 'Sold Out' : 'Coming Soon'}
                        </button>

                        <button
                          type="button"
                          disabled
                          className="detail-cta-secondary opacity-50 cursor-not-allowed"
                        >
                          {product.status === 'sold-out' ? 'Unavailable' : 'Not Yet Available'}
                        </button>
                      </>
                    )}
                  </div>
		<Disclaimer />

                  <div className="detail-cta-bottom">
                    <Link to="/products" className="detail-cta-back">
                      Back to Products
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}