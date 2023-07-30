'use client'

import { CartProvider } from '@context/CartContext'
import { AuthProvider } from '@context/AuthContext'
import { SessionProvider } from 'next-auth/react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export function GlobalContextProvider({ children }) {
  return (
    <>
      <ToastContainer position='top-right' />
      <AuthProvider>
        <CartProvider>
          <SessionProvider>{children}</SessionProvider>
        </CartProvider>
      </AuthProvider>
    </>
  )
}
