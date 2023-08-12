'use client'

import axios from 'axios'
import Profile from '@components/auth/Profile'
import Image from 'next/image'
import { useState, useEffect, useContext } from 'react'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import AuthContext from '@context/AuthContext'

// const getAddresses = async () => {
//   const { data } = await axios.get(`/api/address`)
//   return data
// }

const ProfilePage = () => {
  const [addresses, setAddresses] = useState([])
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/login?callbackUrl=/me')
    },
  })

  useEffect(() => {
    const fetchAddresses = async () => {
      const response = await fetch(`/api/address`)
      const addressData = await response.json()
      setAddresses(addressData)
      console.log(addressData)
    }

    fetchAddresses()
  }, [])

  return (
    <section>
      <Profile addressData={addresses} />
    </section>
  )
}

export default ProfilePage
