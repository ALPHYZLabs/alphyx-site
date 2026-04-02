import { useEffect, useMemo, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import products from '../data/products'
import { getSavedStock, saveStock, getMergedProducts } from '../utils/stock'

const ADMIN_PASSWORD = 'Summer090215'

export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [password, setPassword] = useState('')
  const [stock, setStock] = useState({})
  const [search, setSearch] = useState('')

  useEffect(() => {
    setStock(getSavedStock())
  }, [])

  const mergedProducts = useMemo(() => {
    return getMergedProducts(products)
  }, [stock])

  const filteredProducts = useMemo(() => {
    const q = search.trim().toLowerCase()

    if (!q) return mergedProducts

    return mergedProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(q) ||
        product.slug.toLowerCase().includes(q)
    )
  }, [mergedProducts, search])

  const totals = useMemo(() => {
    const available = mergedProducts.filter((p) => p.status === 'available').length
    const soldOut = mergedProducts.filter((p) => p.status === 'sold-out').length
    const comingSoon = mergedProducts.filter((p) => p.status === 'coming-soon').length
    const totalUnits = mergedProducts.reduce((sum, p) => sum + (p.quantity || 0), 0)

    return { available, soldOut, comingSoon, totalUnits }
  }, [mergedProducts])

  const lowStockItems = useMemo(() => {
    return mergedProducts.filter(
      (p) => p.status === 'available' && p.quantity > 0 && p.quantity <= 3
    )
  }, [mergedProducts])

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

  const getStatusClasses = (status) => {
    if (status === 'available') return 'border-[#39FF14]/40 text-[#39FF14]'
    if (status === 'coming-soon') return 'border-yellow-400/40 text-yellow-300'
    return 'border-red-400/40 text-red-300'
  }

  if (!isLoggedIn) {
    return (
      <div className="page">
        <Navbar />
        <section className="min-h-screen bg-black text-white flex items-center justify-center px-6">
          <div className="w-full max-w-md rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-[0_0_40px_rgba(57,255,20,0.08)]">
            <div className="text-[11px] uppercase tracking-[0.28em] text-[#39FF14] mb-3">
              ALPHYX Admin
            </div>
            <h1 className="text-3xl font-semibold mb-2">Inventory Login</h1>
            <p className="text-white/60 mb-6">
              Access stock controls and product availability.
            </p>

            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="password"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-2xl bg-black/70 border border-white/10 px-4 py-3 outline-none focus:border-[#39FF14] transition"
              />

              <button
                type="submit"
                className="w-full rounded-2xl border border-[#39FF14] text-[#39FF14] py-3 font-medium hover:bg-[#39FF14] hover:text-black transition shadow-[0_0_20px_rgba(57,255,20,0.18)]"
              >
                Enter Admin
              </button>
            </form>
          </div>
        </section>
        <Footer />
      </div>
    )
  }

  return (
    <div className="page">
      <Navbar />

      <section className="min-h-screen bg-black text-white px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <div className="text-[11px] uppercase tracking-[0.28em] text-[#39FF14] mb-3">
              ALPHYX Admin
            </div>
            <h1 className="text-4xl md:text-5xl font-semibold mb-3">
              Inventory Control
            </h1>
            <p className="text-white/60 max-w-2xl">
              Track vial quantities, control availability, and keep the storefront synced with your real stock.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-4 mb-8">
            <div className="rounded-[24px] border border-white/10 bg-white/5 p-5">
              <div className="text-white/50 text-sm mb-2">Available Products</div>
              <div className="text-3xl font-semibold">{totals.available}</div>
            </div>

            <div className="rounded-[24px] border border-white/10 bg-white/5 p-5">
              <div className="text-white/50 text-sm mb-2">Sold Out</div>
              <div className="text-3xl font-semibold">{totals.soldOut}</div>
            </div>

            <div className="rounded-[24px] border border-white/10 bg-white/5 p-5">
              <div className="text-white/50 text-sm mb-2">Coming Soon</div>
              <div className="text-3xl font-semibold">{totals.comingSoon}</div>
            </div>

            <div className="rounded-[24px] border border-white/10 bg-white/5 p-5">
              <div className="text-white/50 text-sm mb-2">Total Units On Hand</div>
              <div className="text-3xl font-semibold">{totals.totalUnits}</div>
            </div>
          </div>

          {lowStockItems.length > 0 ? (
            <div className="rounded-[24px] border border-orange-400/25 bg-orange-400/8 p-5 mb-6">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.24em] text-orange-300 mb-2">
                    Low Stock Warning
                  </div>
                  <h2 className="text-xl font-semibold mb-2">
                    {lowStockItems.length} item{lowStockItems.length === 1 ? '' : 's'} running low
                  </h2>
                  <p className="text-white/60">
                    These products have 3 units or less remaining.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {lowStockItems.map((item) => (
                    <span
                      key={item.slug}
                      className="rounded-full border border-orange-400/25 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-orange-300"
                    >
                      {item.name} · {item.quantity}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : null}

          <div className="rounded-[24px] border border-white/10 bg-white/5 p-4 md:p-5 mb-6 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
            <input
              type="text"
              placeholder="Search product or slug"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:max-w-sm rounded-2xl bg-black/70 border border-white/10 px-4 py-3 outline-none focus:border-[#39FF14] transition"
            />

            <div className="text-sm text-white/50">
              {filteredProducts.length} item{filteredProducts.length === 1 ? '' : 's'}
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden shadow-[0_0_30px_rgba(57,255,20,0.05)]">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[980px]">
                <thead className="bg-white/5 border-b border-white/10">
                  <tr className="text-left">
                    <th className="px-5 py-4 text-[11px] uppercase tracking-[0.24em] text-white/45 font-medium">
                      Product
                    </th>
                    <th className="px-5 py-4 text-[11px] uppercase tracking-[0.24em] text-white/45 font-medium">
                      Type
                    </th>
                    <th className="px-5 py-4 text-[11px] uppercase tracking-[0.24em] text-white/45 font-medium">
                      Price
                    </th>
                    <th className="px-5 py-4 text-[11px] uppercase tracking-[0.24em] text-white/45 font-medium">
                      Quantity
                    </th>
                    <th className="px-5 py-4 text-[11px] uppercase tracking-[0.24em] text-white/45 font-medium">
                      Status
                    </th>
                    <th className="px-5 py-4 text-[11px] uppercase tracking-[0.24em] text-white/45 font-medium">
                      Quick Set
                    </th>
                    <th className="px-5 py-4 text-[11px] uppercase tracking-[0.24em] text-white/45 font-medium">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredProducts.map((product, index) => {
                    const current = getCurrentItem(product)

                    return (
                      <tr
                        key={product.slug}
                        className={index !== filteredProducts.length - 1 ? 'border-b border-white/10' : ''}
                      >
                     <td className="px-5 py-3 align-middle">
  <div className="text-sm font-medium text-white">
    {product.name}
  </div>
</td>

                        <td className="px-5 py-3 align-middle">
                          <span className="text-[10px] uppercase tracking-[0.2em] px-3 py-1 rounded-full border border-white/10 text-white/60">
                            {product.type}
                          </span>
                        </td>

                        <td className="px-5 py-3 align-middle text-sm text-white/75">
                          {product.price}
                        </td>

                        <td className="px-5 py-3 align-middle">
                          <input
                            type="number"
                            min="0"
                            value={current.quantity}
                            onChange={(e) => handleQuantityChange(product, e.target.value)}
                            className="w-24 rounded-xl bg-black/70 border border-white/10 px-3 py-2 outline-none focus:border-[#39FF14] transition"
                          />
                        </td>

                        <td className="px-5 py-3 align-middle">
                          <select
                            value={current.status}
                            onChange={(e) => handleStatusChange(product, e.target.value)}
                            className="rounded-xl bg-black/70 border border-white/10 px-3 py-2 outline-none focus:border-[#39FF14] transition"
                          >
                            <option value="available">Available</option>
                            <option value="sold-out">Sold Out</option>
                            <option value="coming-soon">Coming Soon</option>
                          </select>

                          <div className="mt-2">
                            <span
                              className={`inline-block text-[10px] uppercase tracking-[0.18em] px-3 py-1 rounded-full border ${getStatusClasses(current.status)}`}
                            >
                              {current.status === 'available' && 'Available'}
                              {current.status === 'sold-out' && 'Sold Out'}
                              {current.status === 'coming-soon' && 'Coming Soon'}
                            </span>
                          </div>
                        </td>

                        <td className="px-5 py-3 align-middle">
                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={() => quickSet(product, 0)}
                              className="rounded-xl border border-white/10 px-3 py-2 text-xs hover:border-red-400/40 hover:text-red-300 transition"
                            >
                              0
                            </button>
                            <button
                              type="button"
                              onClick={() => quickSet(product, 5)}
                              className="rounded-xl border border-white/10 px-3 py-2 text-xs hover:border-[#39FF14]/40 hover:text-[#39FF14] transition"
                            >
                              5
                            </button>
                            <button
                              type="button"
                              onClick={() => quickSet(product, 10)}
                              className="rounded-xl border border-white/10 px-3 py-2 text-xs hover:border-[#39FF14]/40 hover:text-[#39FF14] transition"
                            >
                              10
                            </button>
                          </div>
                        </td>

                        <td className="px-5 py-3 align-middle">
                          <div className="flex flex-wrap gap-2">
                            <button
                              type="button"
                              onClick={() =>
                                updateProductStock(product, {
                                  quantity: Math.max(0, current.quantity - 1),
                                })
                              }
                              className="rounded-xl border border-white/10 px-3 py-2 text-xs hover:border-white/25 transition"
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
                              className="rounded-xl border border-white/10 px-3 py-2 text-xs hover:border-[#39FF14]/40 hover:text-[#39FF14] transition"
                            >
                              +1
                            </button>

                            <button
                              type="button"
                              onClick={() => handleStatusChange(product, 'coming-soon')}
                              className="rounded-xl border border-white/10 px-3 py-2 text-xs hover:border-yellow-400/40 hover:text-yellow-300 transition"
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
                              className="rounded-xl border border-white/10 px-3 py-2 text-xs hover:border-white/25 transition"
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
        </div>
      </section>

      <Footer />
    </div>
  )
}