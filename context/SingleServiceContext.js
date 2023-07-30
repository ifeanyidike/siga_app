'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect, createContext } from 'react'

const SingleServiceContext = createContext()

export const SingleServiceProvider = ({ children }) => {
  const [service, setService] = useState({})

  const router = useRouter()

  useEffect(() => {}, [])

  const setServiceToState = () => {
    setService(
      localStorage.getItem('service')
        ? JSON.parse(localStorage.getItem('service'))
        : []
    )
  }

  const fetchSingleService = async ({
    name,
    category,
    discription,
    image,
    numReviews,
    rating,
  }) => {
    const item = {
      name,
      category,
      discription,
      image,
      numReviews,
      rating,
    }
    localStorage.setItem('service', JSON.stringify({ serviceItems }))
  }

  return (
    <SingleServiceContext.Provider value={{ service, fetchSingleService }}>
      {children}
    </SingleServiceContext.Provider>
  )
}
export default SingleServiceContext
