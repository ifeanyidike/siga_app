'use client'

import axios, { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { createContext, useState } from 'react'
import { useSession } from 'next-auth/react'
import { countries } from 'countries-list'
import Image from 'next/image'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const { data: session } = useSession()
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    phoneNo: '',
    zipCode: '',
  })
  const countriesList = Object.values(countries)

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
  // const addNewAddress = async ({
  //   street,
  //   city,
  //   state,
  //   phoneNo,
  //   zipCode,
  //   country,
  // }) => {
  //   try {
  //     const { data } = await axios.post('/api/address/new', {
  //       street,
  //       city,
  //       state,
  //       phoneNo,
  //       zipCode,
  //       country,
  //       user,
  //     })
  //     if (data?.ok) {
  //       setSuccess(success?.response?.data.message)
  //       router.push('/me')
  //     }
  //   } catch (error) {
  //     setError(error?.response?.data?.message)
  //   }
  // }
  const addNewAddress = async (e) => {
    setSubmitting(true)

    try {
      const response = await fetch('/api/address/new', {
        method: 'POST',
        body: JSON.stringify({
          street: address.street,
          city: address.city,
          state: address.state,
          phoneNo: address.phoneNo,
          zipCode: address.zipCode,
          country: address.country,
          user: session?.user._id,
        }),
      })
      if (response.ok) {
        router.push('/me')
      }
    } catch (error) {
      console.log(error)
    } finally {
      setSubmitting(false)
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
        address,
        setAddress,
        submitting,
        setSubmitting,
        setUser,
        registerUser,
        clearError,
        success,
        addNewAddress,
        countriesList,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
export default AuthContext
