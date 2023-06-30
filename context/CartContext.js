'use client'

import { useRouter } from 'next/navigation'
import { createContext, useEffect, useState } from 'react'

const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])

  const router = useRouter()

  useEffect(() => {
    setCartToState()
  }, [])

  const setCartToState = () => {
    setCart(
      localStorage.getItem('cart')
        ? JSON.parse(localStorage.getItem('cart'))
        : []
    )
  }

  const addItemToCart = async ({ service, name, image, quantity = 1 }) => {
    const item = {
      service,
      name,
      image,
      quantity,
    }

    const isItemExist = cart?.cartItems?.find((i) => i.service === item.service)

    let newCartItems

    if (isItemExist) {
      newCartItems = cart?.cartItems?.map((i) =>
        i.service === isItemExist.service ? item : i
      )
    } else {
      newCartItems = [...(cart?.cartItems || [])]
    }

    localStorage.setItem('cart', JSON.stringify({ cartItems: newCartItems }))
  }

  return (
    <CartContext.Provider value={{ cart, addItemToCart }}>
      {children}
    </CartContext.Provider>
  )
}
export default CartContext
