import { useEffect, useMemo, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import products from '../data/products'
import { getSavedStock, saveStock, getMergedProducts } from '../utils/stock'

const ADMIN_PASSWORD = 'Summer090215'
const DELIVERIES_KEY = 'alphyx_deliveries'
const BUDGET_KEY = 'alphyx_budget'

function loadLocalArray(key) {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(key)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function saveLocalArray(key, value) {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {}
}

function money(n) {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
    maximumFractionDigits: 0,
  }).format(Number(n) || 0)
}

function parsePrice(price) {
  if (!price) return 0
  const cleaned = String(price).replace(/[^0-9.]/g, '')
  return Number(cleaned) || 0
}

function todayString() {
  return new Date().toISOString().slice(0, 10)
}

function uid(prefix) {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
}

const COLORS = {
  green: '#39FF14',
  greenSoft: 'rgba(57,255,20,0.10)',
  greenBorder: 'rgba(57,255,20,0.28)',
  whiteSoft: 'rgba(255,255,255,0.08)',
  whiteText: 'rgba(255,255,255,0.72)',
  whiteDim: 'rgba(255,255,255,0.5)',
  cardBg: 'rgba(255,255,255,0.04)',
  cardBgStrong: 'rgba(255,255,255,0.055)',
  blackSoft: 'rgba(0,0,0,0.55)',
  orange: '#f59e0b',
  orangeSoft: 'rgba(245,158,11,0.12)',
  orangeBorder: 'rgba(245,158,11,0.25)',
  blue: '#38bdf8',
  blueSoft: 'rgba(56,189,248,0.12)',
  blueBorder: 'rgba(56,189,248,0.22)',
  pink: '#e879f9',
  pinkSoft: 'rgba(232,121,249,0.12)',
  pinkBorder: 'rgba(232,121,249,0.22)',
  red: '#f87171',
  redSoft: 'rgba(248,113,113,0.12)',
  redBorder: 'rgba(248,113,113,0.22)',
}

function cardStyle({ border = COLORS.whiteSoft, background = COLORS.cardBgStrong, shadow = '0 0 28px rgba(57,255,20,0.05)' } = {}) {
  return {
    border: `1px solid ${border}`,
    background,
    backdropFilter: 'blur(18px)',
    borderRadius: 28,
    boxShadow: shadow,
  }
}

function pillStyle({ color = COLORS.green, background = COLORS.greenSoft, border = COLORS.greenBorder } = {}) {
  return {
    display: 'inline-block',
    fontSize: 10,
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    padding: '8px 12px',
    borderRadius: 999,
    border: `1px solid ${border}`,
    color,
    background,
  }
}

function baseInputStyle(borderColor = COLORS.whiteSoft) {
  return {
    width: '100%',
    background: 'rgba(0,0,0,0.62)',
    border: `1px solid ${borderColor}`,
    color: '#fff',
    borderRadius: 16,
    padding: '14px 16px',
    outline: 'none',
    fontSize: 15,
  }
}

function actionButtonStyle({ border = COLORS.whiteSoft, color = '#fff', background = 'rgba(255,255,255,0.04)' } = {}) {
  return {
    border: `1px solid ${border}`,
    color,
    background,
    borderRadius: 12,
    padding: '10px 12px',
    fontSize: 12,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  }
}

function primaryButtonStyle({ color = COLORS.green, background = COLORS.greenSoft, border = COLORS.green } = {}) {
  return {
    width: '100%',
    border: `1px solid ${border}`,
    color,
    background,
    borderRadius: 18,
    padding: '16px 18px',
    fontSize: 13,
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.18em',
    cursor: 'pointer',
    boxShadow: '0 0 22px rgba(57,255,20,0.16)',
    transition: 'all 0.2s ease',
  }
}

function SummaryCard({ label, value, accent, soft, border }) {
  return (
    <div
      style={{
        ...cardStyle({ border, shadow: `0 0 26px ${soft}` }),
        padding: 26,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(135deg, ${soft} 0%, transparent 65%)`,
        }}
      />
      <div style={{ position: 'relative' }}>
        <div style={{ color: COLORS.whiteDim, fontSize: 14, marginBottom: 12 }}>{label}</div>
        <div style={{ fontSize: 40, fontWeight: 700, color: accent }}>{value}</div>
      </div>
    </div>
  )
}

function SectionTag({ children, color = COLORS.green }) {
  return (
    <div
      style={{
        fontSize: 11,
        textTransform: 'uppercase',
        letterSpacing: '0.30em',
        color,
        marginBottom: 12,
      }}
    >
      {children}
    </div>
  )
}

function TabButton({ active, children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        border: active ? `1px solid ${COLORS.green}` : `1px solid ${COLORS.whiteSoft}`,
        color: active ? COLORS.green : COLORS.whiteText,
        background: active ? COLORS.greenSoft : 'rgba(0,0,0,0.45)',
        borderRadius: 16,
        padding: '14px 22px',
        fontSize: 13,
        textTransform: 'uppercase',
        letterSpacing: '0.18em',
        cursor: 'pointer',
        boxShadow: active ? '0 0 18px rgba(57,255,20,0.12)' : 'none',
      }}
    >
      {children}
    </button>
  )
}

function MobileInventoryCards({
  products,
  getCurrentItem,
  handleQuantityChange,
  handleStatusChange,
  quickSet,
  updateProductStock,
}) {
  return (
    <div className="xl:hidden space-y-4">
      {products.map((product) => {
        const current = getCurrentItem(product)

        return (
          <div
            key={product.slug}
            style={{
              border: '1px solid rgba(255,255,255,0.08)',
              background: 'rgba(255,255,255,0.04)',
              backdropFilter: 'blur(16px)',
              borderRadius: 24,
              padding: 18,
              boxShadow: '0 0 22px rgba(57,255,20,0.04)',
            }}
          >
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 6 }}>
                {product.name}
              </div>
              <div style={{ color: 'rgba(255,255,255,0.62)', fontSize: 14 }}>
                {product.price}
              </div>
            </div>

            <div style={{ display: 'grid', gap: 12, marginBottom: 14 }}>
              <div>
                <div
                  style={{
                    fontSize: 11,
                    textTransform: 'uppercase',
                    letterSpacing: '0.18em',
                    color: 'rgba(255,255,255,0.46)',
                    marginBottom: 8,
                  }}
                >
                  Quantity
                </div>
                <input
                  type="number"
                  min="0"
                  value={current.quantity}
                  onChange={(e) => handleQuantityChange(product, e.target.value)}
                  style={{
                    width: '100%',
                    background: 'rgba(0,0,0,0.62)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: '#fff',
                    borderRadius: 14,
                    padding: '14px 16px',
                    outline: 'none',
                    fontSize: 15,
                  }}
                />
              </div>

              <div>
                <div
                  style={{
                    fontSize: 11,
                    textTransform: 'uppercase',
                    letterSpacing: '0.18em',
                    color: 'rgba(255,255,255,0.46)',
                    marginBottom: 8,
                  }}
                >
                  Status
                </div>
                <select
                  value={current.status}
                  onChange={(e) => handleStatusChange(product, e.target.value)}
                  style={{
                    width: '100%',
                    background: 'rgba(0,0,0,0.62)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: '#fff',
                    borderRadius: 14,
                    padding: '14px 16px',
                    outline: 'none',
                    fontSize: 15,
                  }}
                >
                  <option value="available">Available</option>
                  <option value="sold-out">Sold Out</option>
                  <option value="coming-soon">Coming Soon</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
              {[0, 5, 10].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => quickSet(product, n)}
                  style={{
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: '#fff',
                    background: 'rgba(255,255,255,0.04)',
                    borderRadius: 12,
                    padding: '10px 12px',
                    fontSize: 12,
                  }}
                >
                  {n}
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() =>
                  updateProductStock(product, {
                    quantity: Math.max(0, current.quantity - 1),
                  })
                }
                style={{
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: '#fff',
                  background: 'rgba(255,255,255,0.04)',
                  borderRadius: 12,
                  padding: '10px 12px',
                  fontSize: 12,
                }}
              >
                -1
              </button>

              <button
                type="button"
                onClick={() =>
                  updateProductStock(product, {
                    quantity: current.quantity + 1,
                  })
                }
                style={{
                  border: '1px solid rgba(57,255,20,0.28)',
                  color: '#39FF14',
                  background: 'rgba(57,255,20,0.10)',
                  borderRadius: 12,
                  padding: '10px 12px',
                  fontSize: 12,
                }}
              >
                +1
              </button>

              <button
                type="button"
                onClick={() => handleStatusChange(product, 'coming-soon')}
                style={{
                  border: '1px solid rgba(245,158,11,0.25)',
                  color: '#f59e0b',
                  background: 'rgba(245,158,11,0.12)',
                  borderRadius: 12,
                  padding: '10px 12px',
                  fontSize: 12,
                }}
              >
                Coming Soon
              </button>

              <button
                type="button"
                onClick={() =>
                  updateProductStock(product, {
                    quantity: typeof product.quantity === 'number' ? product.quantity : 0,
                    status: product.status || 'sold-out',
                  })
                }
                style={{
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: '#fff',
                  background: 'rgba(255,255,255,0.04)',
                  borderRadius: 12,
                  padding: '10px 12px',
                  fontSize: 12,
                }}
              >
                Reset
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

function MobileDeliveryCards({ deliveries, markDeliveryDelivered, deleteDelivery }) {
  return (
    <div className="xl:hidden space-y-4">
      {deliveries.length === 0 ? (
        <div
          style={{
            border: '1px solid rgba(255,255,255,0.08)',
            background: 'rgba(255,255,255,0.04)',
            borderRadius: 24,
            padding: 20,
            color: 'rgba(255,255,255,0.5)',
            textAlign: 'center',
          }}
        >
          No deliveries added yet.
        </div>
      ) : (
        deliveries.map((delivery) => (
          <div
            key={delivery.id}
            style={{
              border: '1px solid rgba(255,255,255,0.08)',
              background: 'rgba(255,255,255,0.04)',
              backdropFilter: 'blur(16px)',
              borderRadius: 24,
              padding: 18,
            }}
          >
            <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>
              {delivery.productName}
            </div>

            <div style={{ display: 'grid', gap: 8, color: 'rgba(255,255,255,0.72)', fontSize: 14, marginBottom: 14 }}>
              <div>Supplier: {delivery.supplier || '—'}</div>
              <div>Quantity: {delivery.quantity}</div>
              <div>Cost: ${delivery.cost || 0}</div>
              <div>ETA: {delivery.eta || '—'}</div>
              <div>Status: {delivery.status === 'in-transit' ? 'In Transit' : delivery.status}</div>
            </div>

            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {delivery.status !== 'delivered' && (
                <button
                  type="button"
                  onClick={() => markDeliveryDelivered(delivery)}
                  style={{
                    border: '1px solid rgba(57,255,20,0.28)',
                    color: '#39FF14',
                    background: 'rgba(57,255,20,0.10)',
                    borderRadius: 12,
                    padding: '10px 12px',
                    fontSize: 12,
                  }}
                >
                  Mark Delivered
                </button>
              )}

              <button
                type="button"
                onClick={() => deleteDelivery(delivery.id)}
                style={{
                  border: '1px solid rgba(248,113,113,0.22)',
                  color: '#f87171',
                  background: 'rgba(248,113,113,0.12)',
                  borderRadius: 12,
                  padding: '10px 12px',
                  fontSize: 12,
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

function MobileBudgetCards({ budgetEntries, money, deleteBudgetEntry }) {
  return (
    <div className="xl:hidden space-y-4">
      {budgetEntries.length === 0 ? (
        <div
          style={{
            border: '1px solid rgba(255,255,255,0.08)',
            background: 'rgba(255,255,255,0.04)',
            borderRadius: 24,
            padding: 20,
            color: 'rgba(255,255,255,0.5)',
            textAlign: 'center',
          }}
        >
          No budget entries added yet.
        </div>
      ) : (
        budgetEntries.map((entry) => (
          <div
            key={entry.id}
            style={{
              border: '1px solid rgba(255,255,255,0.08)',
              background: 'rgba(255,255,255,0.04)',
              backdropFilter: 'blur(16px)',
              borderRadius: 24,
              padding: 18,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, marginBottom: 10 }}>
              <div style={{ fontSize: 16, fontWeight: 700 }}>{entry.category}</div>
              <div style={{ color: entry.type === 'income' ? '#39FF14' : '#f87171', fontWeight: 700 }}>
                {money(entry.amount)}
              </div>
            </div>

            <div style={{ display: 'grid', gap: 8, color: 'rgba(255,255,255,0.72)', fontSize: 14, marginBottom: 14 }}>
              <div>Date: {entry.date}</div>
              <div>Type: {entry.type}</div>
              <div>Note: {entry.note || '—'}</div>
            </div>

            <button
              type="button"
              onClick={() => deleteBudgetEntry(entry.id)}
              style={{
                border: '1px solid rgba(248,113,113,0.22)',
                color: '#f87171',
                background: 'rgba(248,113,113,0.12)',
                borderRadius: 12,
                padding: '10px 12px',
                fontSize: 12,
              }}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  )
}

export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [password, setPassword] = useState('')
  const [activeTab, setActiveTab] = useState('inventory')

  const [stock, setStock] = useState({})
  const [deliveries, setDeliveries] = useState([])
  const [budgetEntries, setBudgetEntries] = useState([])

  const [search, setSearch] = useState('')
  const [showLowStockOnly, setShowLowStockOnly] = useState(false)

  const [deliveryForm, setDeliveryForm] = useState({
    supplier: '',
    productSlug: products[0]?.slug || '',
    quantity: '',
    cost: '',
    eta: '',
    status: 'ordered',
    notes: '',
  })

  const [budgetForm, setBudgetForm] = useState({
    date: todayString(),
    type: 'expense',
    category: 'stock',
    amount: '',
    note: '',
  })

  useEffect(() => {
    setStock(getSavedStock())
    setDeliveries(loadLocalArray(DELIVERIES_KEY))
    setBudgetEntries(loadLocalArray(BUDGET_KEY))
  }, [])

  const mergedProducts = useMemo(() => {
    return getMergedProducts(products)
  }, [stock])

  const filteredProducts = useMemo(() => {
    let list = mergedProducts

    const q = search.trim().toLowerCase()
    if (q) {
      list = list.filter(
        (product) =>
          product.name.toLowerCase().includes(q) ||
          product.slug.toLowerCase().includes(q)
      )
    }

    if (showLowStockOnly) {
      list = list.filter(
        (p) => p.status === 'available' && p.quantity > 0 && p.quantity <= 3
      )
    }

    return list
  }, [mergedProducts, search, showLowStockOnly])

  const lowStockItems = useMemo(() => {
    return mergedProducts.filter(
      (p) => p.status === 'available' && p.quantity > 0 && p.quantity <= 3
    )
  }, [mergedProducts])

  const pendingDeliveries = useMemo(() => {
    return deliveries.filter((d) => d.status !== 'delivered')
  }, [deliveries])

  const pendingDeliverySpend = useMemo(() => {
    return pendingDeliveries.reduce((sum, item) => sum + (Number(item.cost) || 0), 0)
  }, [pendingDeliveries])

  const inventoryRetailValue = useMemo(() => {
    return mergedProducts.reduce(
      (sum, product) => sum + parsePrice(product.price) * (product.quantity || 0),
      0
    )
  }, [mergedProducts])

  const inventoryUnitCount = useMemo(() => {
    return mergedProducts.reduce((sum, product) => sum + (product.quantity || 0), 0)
  }, [mergedProducts])

  const monthKey = todayString().slice(0, 7)

  const spendThisMonth = useMemo(() => {
    const budgetSpend = budgetEntries
      .filter((entry) => entry.type === 'expense' && String(entry.date || '').startsWith(monthKey))
      .reduce((sum, entry) => sum + (Number(entry.amount) || 0), 0)

    const deliveredSpend = deliveries
      .filter((entry) => entry.status === 'delivered' && String(entry.deliveredAt || '').startsWith(monthKey))
      .reduce((sum, entry) => sum + (Number(entry.cost) || 0), 0)

    return budgetSpend + deliveredSpend
  }, [budgetEntries, deliveries, monthKey])

  const totalBudgetIncome = useMemo(() => {
    return budgetEntries
      .filter((entry) => entry.type === 'income')
      .reduce((sum, entry) => sum + (Number(entry.amount) || 0), 0)
  }, [budgetEntries])

  const totalBudgetExpense = useMemo(() => {
    return budgetEntries
      .filter((entry) => entry.type === 'expense')
      .reduce((sum, entry) => sum + (Number(entry.amount) || 0), 0)
  }, [budgetEntries])

  const netBudget = totalBudgetIncome - totalBudgetExpense

  const handleLogin = (e) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setIsLoggedIn(true)
    } else {
      alert('Wrong password')
    }
  }

  const getCurrentItem = (product) => {
    const savedItem = stock[product.slug]

    if (savedItem && typeof savedItem === 'object') {
      const quantity =
        typeof savedItem.quantity === 'number'
          ? savedItem.quantity
          : typeof product.quantity === 'number'
          ? product.quantity
          : 0

      let status = savedItem.status || product.status || 'sold-out'

      if (status !== 'coming-soon') {
        status = quantity > 0 ? 'available' : 'sold-out'
      }

      return { quantity, status }
    }

    const quantity = typeof product.quantity === 'number' ? product.quantity : 0
    const status =
      product.status === 'coming-soon'
        ? 'coming-soon'
        : quantity > 0
        ? 'available'
        : 'sold-out'

    return { quantity, status }
  }

  const updateProductStock = (product, updates) => {
    const current = getCurrentItem(product)

    const next = {
      ...current,
      ...updates,
    }

    if (next.status !== 'coming-soon') {
      next.status = next.quantity > 0 ? 'available' : 'sold-out'
    }

    const updated = {
      ...stock,
      [product.slug]: next,
    }

    setStock(updated)
    saveStock(updated)
  }

  const handleQuantityChange = (product, value) => {
    const parsed = Number(value)
    const safeQuantity = Number.isNaN(parsed) ? 0 : Math.max(0, parsed)
    updateProductStock(product, { quantity: safeQuantity })
  }

  const handleStatusChange = (product, value) => {
    if (value === 'coming-soon') {
      updateProductStock(product, { status: 'coming-soon', quantity: 0 })
      return
    }

    const current = getCurrentItem(product)
    updateProductStock(product, {
      status: value,
      quantity: value === 'sold-out' ? 0 : Math.max(1, current.quantity || 1),
    })
  }

  const quickSet = (product, quantity) => {
    updateProductStock(product, { quantity })
  }

  const getStatusPill = (status) => {
    if (status === 'available') {
      return pillStyle({
        color: COLORS.green,
        background: COLORS.greenSoft,
        border: COLORS.greenBorder,
      })
    }

    if (status === 'coming-soon') {
      return pillStyle({
        color: COLORS.orange,
        background: COLORS.orangeSoft,
        border: COLORS.orangeBorder,
      })
    }

    return pillStyle({
      color: COLORS.red,
      background: COLORS.redSoft,
      border: COLORS.redBorder,
    })
  }

  const handleDeliveryFormChange = (field, value) => {
    setDeliveryForm((prev) => ({ ...prev, [field]: value }))
  }

  const addDelivery = (e) => {
    e.preventDefault()

    if (!deliveryForm.productSlug || !deliveryForm.quantity) {
      alert('Add at least a product and quantity.')
      return
    }

    const product = products.find((p) => p.slug === deliveryForm.productSlug)

    const next = {
      id: uid('delivery'),
      supplier: deliveryForm.supplier.trim(),
      productSlug: deliveryForm.productSlug,
      productName: product?.name || deliveryForm.productSlug,
      quantity: Math.max(0, Number(deliveryForm.quantity) || 0),
      cost: Math.max(0, Number(deliveryForm.cost) || 0),
      eta: deliveryForm.eta || '',
      status: deliveryForm.status,
      notes: deliveryForm.notes.trim(),
      createdAt: todayString(),
      deliveredAt: '',
    }

    const updated = [next, ...deliveries]
    setDeliveries(updated)
    saveLocalArray(DELIVERIES_KEY, updated)

    setDeliveryForm({
      supplier: '',
      productSlug: products[0]?.slug || '',
      quantity: '',
      cost: '',
      eta: '',
      status: 'ordered',
      notes: '',
    })
  }

  const markDeliveryDelivered = (delivery) => {
    const updatedDeliveries = deliveries.map((item) =>
      item.id === delivery.id
        ? { ...item, status: 'delivered', deliveredAt: todayString() }
        : item
    )
    setDeliveries(updatedDeliveries)
    saveLocalArray(DELIVERIES_KEY, updatedDeliveries)

    const product = products.find((p) => p.slug === delivery.productSlug)
    if (product) {
      const current = getCurrentItem(product)
      updateProductStock(product, { quantity: current.quantity + (Number(delivery.quantity) || 0) })
    }
  }

  const deleteDelivery = (id) => {
    const updated = deliveries.filter((item) => item.id !== id)
    setDeliveries(updated)
    saveLocalArray(DELIVERIES_KEY, updated)
  }

  const handleBudgetFormChange = (field, value) => {
    setBudgetForm((prev) => ({ ...prev, [field]: value }))
  }

  const addBudgetEntry = (e) => {
    e.preventDefault()

    if (!budgetForm.amount) {
      alert('Enter an amount.')
      return
    }

    const next = {
      id: uid('budget'),
      date: budgetForm.date || todayString(),
      type: budgetForm.type,
      category: budgetForm.category,
      amount: Math.max(0, Number(budgetForm.amount) || 0),
      note: budgetForm.note.trim(),
    }

    const updated = [next, ...budgetEntries]
    setBudgetEntries(updated)
    saveLocalArray(BUDGET_KEY, updated)

    setBudgetForm({
      date: todayString(),
      type: 'expense',
      category: 'stock',
      amount: '',
      note: '',
    })
  }

  const deleteBudgetEntry = (id) => {
    const updated = budgetEntries.filter((item) => item.id !== id)
    setBudgetEntries(updated)
    saveLocalArray(BUDGET_KEY, updated)
  }

  if (!isLoggedIn) {
    return (
      <div style={{ minHeight: '100vh', background: '#000', color: '#fff' }}>
        <Navbar />

        <section
          style={{
            position: 'relative',
            minHeight: 'calc(100vh - 80px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '70px 24px',
            overflow: 'hidden',
            background:
              'radial-gradient(circle at center, rgba(57,255,20,0.08) 0%, rgba(57,255,20,0.03) 22%, rgba(0,0,0,0) 55%), linear-gradient(to bottom, #050505 0%, #000 100%)',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'none',
              opacity: 0.07,
            }}
          >
            <img
              src="/logo.png"
              alt=""
              style={{
                width: '760px',
                maxWidth: '92vw',
                objectFit: 'contain',
                filter: 'blur(0.5px)',
              }}
            />
          </div>

          <div style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: 540 }}>
            <div
              style={{
                ...cardStyle({
                  border: COLORS.greenBorder,
                  background: 'rgba(255,255,255,0.05)',
                  shadow: '0 0 42px rgba(57,255,20,0.08)',
                }),
                textAlign: 'center',
                padding: '42px 36px',
              }}
            >
              <div
                style={{
                  height: 1,
                  width: 120,
                  margin: '0 auto 22px auto',
                  background: 'linear-gradient(to right, transparent, rgba(57,255,20,0.75), transparent)',
                }}
              />

              <SectionTag>ALPHYX Admin</SectionTag>

              <h1
                style={{
                  fontSize: 'clamp(40px, 6vw, 56px)',
                  lineHeight: 1,
                  margin: '0 0 16px 0',
                  letterSpacing: '-0.04em',
                  fontWeight: 700,
                }}
              >
                Operations Login
              </h1>

              <p
                style={{
                  margin: '0 auto 28px auto',
                  maxWidth: 420,
                  color: COLORS.whiteText,
                  fontSize: 17,
                  lineHeight: 1.7,
                }}
              >
                Access inventory, deliveries, budgeting, and internal stock controls.
              </p>

              <form onSubmit={handleLogin} style={{ maxWidth: 380, margin: '0 auto', display: 'grid', gap: 14 }}>
                <input
                  type="password"
                  placeholder="Enter admin password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ ...baseInputStyle(COLORS.whiteSoft), textAlign: 'center' }}
                />

                <button type="submit" style={primaryButtonStyle()}>
                  Enter Admin
                </button>
              </form>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#fff' }}>
      <Navbar />

      <section
        style={{
          position: 'relative',
          minHeight: '100vh',
          overflow: 'hidden',
          padding: '72px 24px 90px',
          background:
            'radial-gradient(circle at top, rgba(57,255,20,0.08), transparent 36%), linear-gradient(to bottom, rgba(255,255,255,0.02), transparent 20%, rgba(0,0,0,0.55))',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
            opacity: 0.06,
          }}
        >
          <img
            src="/logo.png"
            alt=""
            style={{
              width: '860px',
              maxWidth: '96vw',
              objectFit: 'contain',
              filter: 'blur(0.5px)',
            }}
          />
        </div>

        <div style={{ position: 'relative', zIndex: 2, maxWidth: 1380, margin: '0 auto' }}>
          <div style={{ maxWidth: 760, margin: '0 auto 56px auto', textAlign: 'center' }}>
            <SectionTag>ALPHYX Admin</SectionTag>

            <h1
              style={{
                fontSize: 'clamp(42px, 6vw, 74px)',
                lineHeight: 1,
                margin: '0 0 16px 0',
                letterSpacing: '-0.045em',
                fontWeight: 700,
              }}
            >
              Operations Dashboard
            </h1>

            <p
              style={{
                color: COLORS.whiteText,
                fontSize: 18,
                lineHeight: 1.75,
                margin: 0,
              }}
            >
              Track stock, incoming deliveries, and budgeting in one clean control panel.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 20,
              marginBottom: 28,
            }}
          >
            <SummaryCard
              label="Units On Hand"
              value={inventoryUnitCount}
              accent={COLORS.green}
              soft="rgba(57,255,20,0.10)"
              border="rgba(57,255,20,0.18)"
            />
            <SummaryCard
              label="Low Stock Items"
              value={lowStockItems.length}
              accent={COLORS.orange}
              soft="rgba(245,158,11,0.10)"
              border="rgba(245,158,11,0.18)"
            />
            <SummaryCard
              label="Pending Deliveries"
              value={pendingDeliveries.length}
              accent={COLORS.blue}
              soft="rgba(56,189,248,0.10)"
              border="rgba(56,189,248,0.18)"
            />
            <SummaryCard
              label="Spend This Month"
              value={money(spendThisMonth)}
              accent={COLORS.pink}
              soft="rgba(232,121,249,0.10)"
              border="rgba(232,121,249,0.18)"
            />
          </div>

          {lowStockItems.length > 0 ? (
            <div
              style={{
                ...cardStyle({
                  border: COLORS.orangeBorder,
                  background: COLORS.orangeSoft,
                  shadow: '0 0 24px rgba(245,158,11,0.06)',
                }),
                padding: 28,
                marginBottom: 28,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  gap: 22,
                  flexWrap: 'wrap',
                }}
              >
                <div style={{ maxWidth: 540 }}>
                  <SectionTag color={COLORS.orange}>Low Stock Warning</SectionTag>
                  <h2 style={{ fontSize: 36, margin: '0 0 12px 0', lineHeight: 1.05 }}>
                    {lowStockItems.length} item{lowStockItems.length === 1 ? '' : 's'} running low
                  </h2>
                  <p style={{ margin: 0, color: COLORS.whiteText, lineHeight: 1.7 }}>
                    These products have 3 units or less remaining.
                  </p>
                </div>

                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  {lowStockItems.map((item) => (
                    <span
                      key={item.slug}
                      style={pillStyle({
                        color: COLORS.orange,
                        background: COLORS.orangeSoft,
                        border: COLORS.orangeBorder,
                      })}
                    >
                      {item.name} · {item.quantity}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : null}

          <div
            style={{
              ...cardStyle({ border: COLORS.whiteSoft, background: COLORS.cardBg }),
              padding: 14,
              marginBottom: 28,
              display: 'flex',
              justifyContent: 'center',
              gap: 12,
              flexWrap: 'wrap',
            }}
          >
            <TabButton active={activeTab === 'inventory'} onClick={() => setActiveTab('inventory')}>
              Inventory
            </TabButton>
            <TabButton active={activeTab === 'deliveries'} onClick={() => setActiveTab('deliveries')}>
              Deliveries
            </TabButton>
            <TabButton active={activeTab === 'budget'} onClick={() => setActiveTab('budget')}>
              Budget
            </TabButton>
          </div>

          {activeTab === 'inventory' && (
            <>
              <div
                style={{
                  ...cardStyle(),
                  padding: 22,
                  marginBottom: 28,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    gap: 18,
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                  }}
                >
                  <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', flex: 1 }}>
                    <div style={{ width: '100%', maxWidth: 360 }}>
                      <input
                        type="text"
                        placeholder="Search product"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={baseInputStyle()}
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => setShowLowStockOnly((prev) => !prev)}
                      style={{
                        ...actionButtonStyle({
                          border: showLowStockOnly ? COLORS.green : COLORS.whiteSoft,
                          color: showLowStockOnly ? COLORS.green : COLORS.whiteText,
                          background: showLowStockOnly ? COLORS.greenSoft : 'rgba(0,0,0,0.45)',
                        }),
                        borderRadius: 16,
                        padding: '14px 18px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.16em',
                        fontSize: 13,
                      }}
                    >
                      Low Stock Only
                    </button>
                  </div>

                  <div style={{ color: COLORS.whiteDim, fontSize: 14 }}>
                    {filteredProducts.length} item{filteredProducts.length === 1 ? '' : 's'}
                  </div>
                </div>
              </div>

              <div style={cardStyle()}>
                <div style={{ overflow: 'auto', maxHeight: '75vh', borderRadius: 28 }}>
                  <table style={{ width: '100%', minWidth: 1120, borderCollapse: 'collapse' }}>
                    <thead
                      style={{
                        position: 'sticky',
                        top: 0,
                        zIndex: 20,
                        background: 'rgba(2,2,2,0.96)',
                        backdropFilter: 'blur(18px)',
                        borderBottom: `1px solid ${COLORS.whiteSoft}`,
                      }}
                    >
                      <tr>
                        {['Product', 'Type', 'Price', 'Quantity', 'Status', 'Quick Set', 'Actions'].map((label) => (
                          <th
                            key={label}
                            style={{
                              textAlign: 'left',
                              padding: '18px 24px',
                              fontSize: 11,
                              textTransform: 'uppercase',
                              letterSpacing: '0.22em',
                              color: COLORS.whiteDim,
                              whiteSpace: 'nowrap',
                              fontWeight: 500,
                            }}
                          >
                            {label}
                          </th>
                        ))}
                      </tr>
                    </thead>

                    <tbody>
                      {filteredProducts.map((product, index) => {
                        const current = getCurrentItem(product)

                        return (
                          <tr
                            key={product.slug}
                            style={{
                              borderBottom: index !== filteredProducts.length - 1 ? `1px solid ${COLORS.whiteSoft}` : 'none',
                              background: index % 2 === 0 ? 'rgba(255,255,255,0.015)' : 'transparent',
                            }}
                          >
                            <td style={{ padding: '20px 24px', fontSize: 15, fontWeight: 600 }}>{product.name}</td>
                            <td style={{ padding: '20px 24px' }}>
                              <span style={pillStyle({ color: '#d1d5db', background: 'rgba(255,255,255,0.04)', border: COLORS.whiteSoft })}>
                                {product.type}
                              </span>
                            </td>
                            <td style={{ padding: '20px 24px', color: COLORS.whiteText, fontSize: 15 }}>{product.price}</td>
                            <td style={{ padding: '20px 24px' }}>
                              <input
                                type="number"
                                min="0"
                                value={current.quantity}
                                onChange={(e) => handleQuantityChange(product, e.target.value)}
                                style={{ ...baseInputStyle(), width: 110, padding: '12px 14px' }}
                              />
                            </td>
                            <td style={{ padding: '20px 24px' }}>
                              <select
                                value={current.status}
                                onChange={(e) => handleStatusChange(product, e.target.value)}
                                style={{ ...baseInputStyle(), width: 150, padding: '12px 14px', marginBottom: 10 }}
                              >
                                <option value="available">Available</option>
                                <option value="sold-out">Sold Out</option>
                                <option value="coming-soon">Coming Soon</option>
                              </select>
                              <div>
                                <span style={getStatusPill(current.status)}>
                                  {current.status === 'available' && 'Available'}
                                  {current.status === 'sold-out' && 'Sold Out'}
                                  {current.status === 'coming-soon' && 'Coming Soon'}
                                </span>
                              </div>
                            </td>
                            <td style={{ padding: '20px 24px' }}>
                              <div style={{ display: 'flex', gap: 8 }}>
                                {[0, 5, 10].map((n) => (
                                  <button
                                    key={n}
                                    type="button"
                                    onClick={() => quickSet(product, n)}
                                    style={actionButtonStyle()}
                                  >
                                    {n}
                                  </button>
                                ))}
                              </div>
                            </td>
                            <td style={{ padding: '20px 24px' }}>
                              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                                <button
                                  type="button"
                                  onClick={() =>
                                    updateProductStock(product, {
                                      quantity: Math.max(0, current.quantity - 1),
                                    })
                                  }
                                  style={actionButtonStyle()}
                                >
                                  -1
                                </button>

                                <button
                                  type="button"
                                  onClick={() =>
                                    updateProductStock(product, {
                                      quantity: current.quantity + 1,
                                    })
                                  }
                                  style={actionButtonStyle({ border: COLORS.greenBorder, color: COLORS.green, background: COLORS.greenSoft })}
                                >
                                  +1
                                </button>

                                <button
                                  type="button"
                                  onClick={() => handleStatusChange(product, 'coming-soon')}
                                  style={actionButtonStyle({ border: COLORS.orangeBorder, color: COLORS.orange, background: COLORS.orangeSoft })}
                                >
                                  Coming Soon
                                </button>

                                <button
                                  type="button"
                                  onClick={() =>
                                    updateProductStock(product, {
                                      quantity: typeof product.quantity === 'number' ? product.quantity : 0,
                                      status: product.status || 'sold-out',
                                    })
                                  }
                                  style={actionButtonStyle()}
                                >
                                  Reset
                                </button>
                              </div>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {activeTab === 'deliveries' && (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '430px minmax(0,1fr)',
                gap: 28,
                alignItems: 'start',
              }}
            >
              <div
                style={cardStyle({
                  border: COLORS.blueBorder,
                  shadow: '0 0 28px rgba(56,189,248,0.05)',
                })}
              >
                <div style={{ padding: 30 }}>
                  <SectionTag color={COLORS.blue}>Add Delivery</SectionTag>
                  <h2 style={{ fontSize: 40, lineHeight: 1, margin: '0 0 24px 0' }}>Incoming Stock</h2>

                  <form onSubmit={addDelivery} style={{ display: 'grid', gap: 16 }}>
                    <input
                      type="text"
                      placeholder="Supplier"
                      value={deliveryForm.supplier}
                      onChange={(e) => handleDeliveryFormChange('supplier', e.target.value)}
                      style={baseInputStyle(COLORS.blueBorder)}
                    />

                    <select
                      value={deliveryForm.productSlug}
                      onChange={(e) => handleDeliveryFormChange('productSlug', e.target.value)}
                      style={baseInputStyle(COLORS.blueBorder)}
                    >
                      {products.map((product) => (
                        <option key={product.slug} value={product.slug}>
                          {product.name}
                        </option>
                      ))}
                    </select>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                      <input
                        type="number"
                        min="0"
                        placeholder="Quantity"
                        value={deliveryForm.quantity}
                        onChange={(e) => handleDeliveryFormChange('quantity', e.target.value)}
                        style={baseInputStyle(COLORS.blueBorder)}
                      />
                      <input
                        type="number"
                        min="0"
                        placeholder="Cost"
                        value={deliveryForm.cost}
                        onChange={(e) => handleDeliveryFormChange('cost', e.target.value)}
                        style={baseInputStyle(COLORS.blueBorder)}
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                      <input
                        type="date"
                        value={deliveryForm.eta}
                        onChange={(e) => handleDeliveryFormChange('eta', e.target.value)}
                        style={baseInputStyle(COLORS.blueBorder)}
                      />
                      <select
                        value={deliveryForm.status}
                        onChange={(e) => handleDeliveryFormChange('status', e.target.value)}
                        style={baseInputStyle(COLORS.blueBorder)}
                      >
                        <option value="ordered">Ordered</option>
                        <option value="in-transit">In Transit</option>
                        <option value="delivered">Delivered</option>
                      </select>
                    </div>

                    <textarea
                      rows="5"
                      placeholder="Notes"
                      value={deliveryForm.notes}
                      onChange={(e) => handleDeliveryFormChange('notes', e.target.value)}
                      style={{ ...baseInputStyle(COLORS.blueBorder), resize: 'none' }}
                    />

                    <button
                      type="submit"
                      style={primaryButtonStyle({
                        color: COLORS.blue,
                        background: COLORS.blueSoft,
                        border: COLORS.blue,
                      })}
                    >
                      Save Delivery
                    </button>
                  </form>
                </div>
              </div>

              <div style={cardStyle({ shadow: '0 0 28px rgba(56,189,248,0.04)' })}>
                <div style={{ overflow: 'auto', maxHeight: '75vh', borderRadius: 28 }}>
                  <table style={{ width: '100%', minWidth: 960, borderCollapse: 'collapse' }}>
                    <thead
                      style={{
                        position: 'sticky',
                        top: 0,
                        zIndex: 20,
                        background: 'rgba(2,2,2,0.96)',
                        backdropFilter: 'blur(18px)',
                        borderBottom: `1px solid ${COLORS.whiteSoft}`,
                      }}
                    >
                      <tr>
                        {['Product', 'Supplier', 'Qty', 'Cost', 'ETA', 'Status', 'Actions'].map((label) => (
                          <th
                            key={label}
                            style={{
                              textAlign: 'left',
                              padding: '18px 24px',
                              fontSize: 11,
                              textTransform: 'uppercase',
                              letterSpacing: '0.22em',
                              color: COLORS.whiteDim,
                              whiteSpace: 'nowrap',
                              fontWeight: 500,
                            }}
                          >
                            {label}
                          </th>
                        ))}
                      </tr>
                    </thead>

                    <tbody>
                      {deliveries.length === 0 ? (
                        <tr>
                          <td colSpan="7" style={{ padding: '56px 24px', textAlign: 'center', color: COLORS.whiteDim }}>
                            No deliveries added yet.
                          </td>
                        </tr>
                      ) : (
                        deliveries.map((delivery, index) => (
                          <tr
                            key={delivery.id}
                            style={{
                              borderBottom: index !== deliveries.length - 1 ? `1px solid ${COLORS.whiteSoft}` : 'none',
                              background: index % 2 === 0 ? 'rgba(255,255,255,0.015)' : 'transparent',
                            }}
                          >
                            <td style={{ padding: '20px 24px', fontSize: 15 }}>{delivery.productName}</td>
                            <td style={{ padding: '20px 24px', color: COLORS.whiteText }}>{delivery.supplier || '—'}</td>
                            <td style={{ padding: '20px 24px', color: COLORS.whiteText }}>{delivery.quantity}</td>
                            <td style={{ padding: '20px 24px', color: COLORS.whiteText }}>{money(delivery.cost)}</td>
                            <td style={{ padding: '20px 24px', color: COLORS.whiteText }}>{delivery.eta || '—'}</td>
                            <td style={{ padding: '20px 24px' }}>
                              <span
                                style={
                                  delivery.status === 'delivered'
                                    ? pillStyle({ color: COLORS.green, background: COLORS.greenSoft, border: COLORS.greenBorder })
                                    : delivery.status === 'in-transit'
                                    ? pillStyle({ color: COLORS.orange, background: COLORS.orangeSoft, border: COLORS.orangeBorder })
                                    : pillStyle({ color: COLORS.blue, background: COLORS.blueSoft, border: COLORS.blueBorder })
                                }
                              >
                                {delivery.status === 'in-transit' ? 'In Transit' : delivery.status}
                              </span>
                            </td>
                            <td style={{ padding: '20px 24px' }}>
                              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                                {delivery.status !== 'delivered' && (
                                  <button
                                    type="button"
                                    onClick={() => markDeliveryDelivered(delivery)}
                                    style={actionButtonStyle({ border: COLORS.greenBorder, color: COLORS.green, background: COLORS.greenSoft })}
                                  >
                                    Mark Delivered
                                  </button>
                                )}

                                <button
                                  type="button"
                                  onClick={() => deleteDelivery(delivery.id)}
                                  style={actionButtonStyle({ border: COLORS.redBorder, color: COLORS.red, background: COLORS.redSoft })}
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'budget' && (
            <>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                  gap: 20,
                  marginBottom: 28,
                }}
              >
                <SummaryCard
                  label="Inventory Retail Value"
                  value={money(inventoryRetailValue)}
                  accent="#10b981"
                  soft="rgba(16,185,129,0.10)"
                  border="rgba(16,185,129,0.18)"
                />
                <SummaryCard
                  label="Pending Delivery Spend"
                  value={money(pendingDeliverySpend)}
                  accent={COLORS.pink}
                  soft="rgba(232,121,249,0.10)"
                  border="rgba(232,121,249,0.18)"
                />
                <SummaryCard
                  label="Income Logged"
                  value={money(totalBudgetIncome)}
                  accent={COLORS.green}
                  soft="rgba(57,255,20,0.10)"
                  border="rgba(57,255,20,0.18)"
                />
                <SummaryCard
                  label="Net Budget"
                  value={money(netBudget)}
                  accent={COLORS.red}
                  soft="rgba(248,113,113,0.10)"
                  border="rgba(248,113,113,0.18)"
                />
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '430px minmax(0,1fr)',
                  gap: 28,
                  alignItems: 'start',
                }}
              >
                <div
                  style={cardStyle({
                    border: COLORS.pinkBorder,
                    shadow: '0 0 28px rgba(232,121,249,0.05)',
                  })}
                >
                  <div style={{ padding: 30 }}>
                    <SectionTag color={COLORS.pink}>Add Budget Entry</SectionTag>
                    <h2 style={{ fontSize: 40, lineHeight: 1, margin: '0 0 24px 0' }}>Cash Tracking</h2>

                    <form onSubmit={addBudgetEntry} style={{ display: 'grid', gap: 16 }}>
                      <input
                        type="date"
                        value={budgetForm.date}
                        onChange={(e) => handleBudgetFormChange('date', e.target.value)}
                        style={baseInputStyle(COLORS.pinkBorder)}
                      />

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                        <select
                          value={budgetForm.type}
                          onChange={(e) => handleBudgetFormChange('type', e.target.value)}
                          style={baseInputStyle(COLORS.pinkBorder)}
                        >
                          <option value="expense">Expense</option>
                          <option value="income">Income</option>
                        </select>

                        <select
                          value={budgetForm.category}
                          onChange={(e) => handleBudgetFormChange('category', e.target.value)}
                          style={baseInputStyle(COLORS.pinkBorder)}
                        >
                          <option value="stock">Stock</option>
                          <option value="shipping">Shipping</option>
                          <option value="marketing">Marketing</option>
                          <option value="misc">Misc</option>
                          <option value="sales">Sales</option>
                        </select>
                      </div>

                      <input
                        type="number"
                        min="0"
                        placeholder="Amount"
                        value={budgetForm.amount}
                        onChange={(e) => handleBudgetFormChange('amount', e.target.value)}
                        style={baseInputStyle(COLORS.pinkBorder)}
                      />

                      <textarea
                        rows="5"
                        placeholder="Note"
                        value={budgetForm.note}
                        onChange={(e) => handleBudgetFormChange('note', e.target.value)}
                        style={{ ...baseInputStyle(COLORS.pinkBorder), resize: 'none' }}
                      />

                      <button
                        type="submit"
                        style={primaryButtonStyle({
                          color: COLORS.pink,
                          background: COLORS.pinkSoft,
                          border: COLORS.pink,
                        })}
                      >
                        Save Entry
                      </button>
                    </form>
                  </div>
                </div>

                <div style={cardStyle({ shadow: '0 0 28px rgba(232,121,249,0.04)' })}>
                  <div style={{ overflow: 'auto', maxHeight: '75vh', borderRadius: 28 }}>
                    <table style={{ width: '100%', minWidth: 840, borderCollapse: 'collapse' }}>
                      <thead
                        style={{
                          position: 'sticky',
                          top: 0,
                          zIndex: 20,
                          background: 'rgba(2,2,2,0.96)',
                          backdropFilter: 'blur(18px)',
                          borderBottom: `1px solid ${COLORS.whiteSoft}`,
                        }}
                      >
                        <tr>
                          {['Date', 'Type', 'Category', 'Amount', 'Note', 'Action'].map((label) => (
                            <th
                              key={label}
                              style={{
                                textAlign: 'left',
                                padding: '18px 24px',
                                fontSize: 11,
                                textTransform: 'uppercase',
                                letterSpacing: '0.22em',
                                color: COLORS.whiteDim,
                                whiteSpace: 'nowrap',
                                fontWeight: 500,
                              }}
                            >
                              {label}
                            </th>
                          ))}
                        </tr>
                      </thead>

                      <tbody>
                        {budgetEntries.length === 0 ? (
                          <tr>
                            <td colSpan="6" style={{ padding: '56px 24px', textAlign: 'center', color: COLORS.whiteDim }}>
                              No budget entries added yet.
                            </td>
                          </tr>
                        ) : (
                          budgetEntries.map((entry, index) => (
                            <tr
                              key={entry.id}
                              style={{
                                borderBottom: index !== budgetEntries.length - 1 ? `1px solid ${COLORS.whiteSoft}` : 'none',
                                background: index % 2 === 0 ? 'rgba(255,255,255,0.015)' : 'transparent',
                              }}
                            >
                              <td style={{ padding: '20px 24px', color: COLORS.whiteText }}>{entry.date}</td>
                              <td style={{ padding: '20px 24px' }}>
                                <span
                                  style={
                                    entry.type === 'income'
                                      ? pillStyle({ color: COLORS.green, background: COLORS.greenSoft, border: COLORS.greenBorder })
                                      : pillStyle({ color: COLORS.red, background: COLORS.redSoft, border: COLORS.redBorder })
                                  }
                                >
                                  {entry.type}
                                </span>
                              </td>
                              <td style={{ padding: '20px 24px', color: COLORS.whiteText }}>{entry.category}</td>
                              <td style={{ padding: '20px 24px', color: COLORS.whiteText }}>{money(entry.amount)}</td>
                              <td style={{ padding: '20px 24px', color: COLORS.whiteDim }}>{entry.note || '—'}</td>
                              <td style={{ padding: '20px 24px' }}>
                                <button
                                  type="button"
                                  onClick={() => deleteBudgetEntry(entry.id)}
                                  style={actionButtonStyle({ border: COLORS.redBorder, color: COLORS.red, background: COLORS.redSoft })}
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}