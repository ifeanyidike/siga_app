'use client'

import axios, { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { createContext, useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { countries } from 'countries-list'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const searchParams = useSearchParams()
  const userId = searchParams.get('id')
  console.log(userId)

  // const { data: session } = useSession()

  const router = useRouter()

  const [error, setError] = useState(null)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
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

  const updateUserProfile = async (formData) => {
    setLoading(true)

    if (!userId) return alert('User ID not Found')

    try {
      const formDataObj = new FormData()
      formDataObj.append('name', formData.name)
      formDataObj.append('email', formData.email)
      formDataObj.append('phone', formData.phone)
      formDataObj.append('role', formData.role)

      formDataObj.append('image', formData.image)

      const response = await fetch(`/api/users/${userId}`, {
        method: 'PATCH',
        body: JSON.stringify(formDataObj),
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      console.log(response)
      if (response.ok) {
        setLoading(false)
        alert('User updated successfully!')
        router.push('/me/userprofilepage')
      }
    } catch (error) {
      setLoading(false)
      console.log(error)
    } finally {
      setLoading(false)
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
        updateUserProfile,
        loading,
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
