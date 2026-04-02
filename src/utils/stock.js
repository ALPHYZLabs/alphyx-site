export const STOCK_KEY = 'alphyx_stock_status'

export function getSavedStock() {
  if (typeof window === 'undefined') return {}

  try {
    const raw = localStorage.getItem(STOCK_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

export function saveStock(data) {
  if (typeof window === 'undefined') return

  try {
    localStorage.setItem(STOCK_KEY, JSON.stringify(data))
  } catch {}
}

function normalizeItem(savedItem, product) {
  if (!savedItem || typeof savedItem !== 'object') {
    const qty = typeof product.quantity === 'number' ? product.quantity : 0
    return {
      quantity: qty,
      status: product.status || (qty > 0 ? 'available' : 'sold-out'),
    }
  }

  const quantity =
    typeof savedItem.quantity === 'number'
      ? savedItem.quantity
      : typeof product.quantity === 'number'
      ? product.quantity
      : 0

  let status = savedItem.status || product.status

  if (!status) {
    status = quantity > 0 ? 'available' : 'sold-out'
  }

  return {
    quantity,
    status,
  }
}

export function getMergedProducts(products) {
  const saved = getSavedStock()

  return products.map((product) => {
    const stockItem = normalizeItem(saved[product.slug], product)

    let finalStatus = stockItem.status

    if (finalStatus !== 'coming-soon') {
      finalStatus = stockItem.quantity > 0 ? 'available' : 'sold-out'
    }

    return {
      ...product,
      quantity: stockItem.quantity,
      status: finalStatus,
    }
  })
}