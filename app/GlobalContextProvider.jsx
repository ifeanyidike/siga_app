import { CartProvider } from '@context/CartContext'

export function GlobalContextProvider({ children }) {
  return <CartProvider>{children}</CartProvider>
}
