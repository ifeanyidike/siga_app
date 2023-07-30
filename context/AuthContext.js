'use client'

import axios, { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { createContext, useState } from 'react'
import Image from 'next/image'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  const registerUser = async ({ name, email, password, phone }) => {
    try {
      const { data } = await axios.post('/api/auth/register', {
        name,
        email,
        phone,
        password,
      })
      console.log(data)
      if (data) {
        setSuccess(success?.response?.data.message)
      }
    } catch (error) {
      setError('An error occurred during registration.') // Generic error message
      return false // Return error status
    }
  }
  const addNewAddress = async ({
    street,
    city,
    state,
    phoneNo,
    zipCode,
    country,
  }) => {
    try {
      const { data } = await axios.post('/api/address/new', {
        street,
        city,
        state,
        phoneNo,
        zipCode,
        country,
        user,
      })
      if (data?.ok) {
        setSuccess(success?.response?.data.message)
        router.push('/me')
      }
    } catch (error) {
      setError(error?.response?.data?.message)
    }
  }

  const clearError = () => {
    setError(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        error,
        setUser,
        registerUser,
        clearError,
        success,
        addNewAddress,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
export default AuthContext
