'use client'

import axios from 'axios'
import Profile from '@components/auth/Profile'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

const getAddresses = async () => {
  const { data } = await axios.get(`/api/address`)
  return data
}

const ProfilePage = () => {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/login?callbackUrl=/me')
    },
  })

  const [addresses, setAddresses] = useState([])

  useEffect(() => {
    const fetchAddresses = async () => {
      const addressesData = await getAddresses()
      setAddresses(addressesData)
    }

    if (session) {
      fetchAddresses()
    }
  }, [session])

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (!session || status === 'unauthenticated') {
    // You can choose to show a message or redirect here, depending on your requirements
    return <div>Please login to view this page.</div>
  }

  return (
    <section>
      {session && <Profile addresses={addresses} session={session} />}
    </section>
  )
}

export default ProfilePage
