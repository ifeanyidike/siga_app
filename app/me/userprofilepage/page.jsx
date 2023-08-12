'use client'

import Image from 'next/image'
import { useState, useEffect, useContext } from 'react'
import { useSession } from 'next-auth/react'
import { redirect, useRouter } from 'next/navigation'
import AuthContext from '@context/AuthContext'
import UserProfile from '@components/auth/UserProfile'
import WishList from '@components/wishlist/WishList'

const UserProfilePage = () => {
  const [singleAddress, setSingleAddress] = useState([])
  const [singleUser, setSingleUser] = useState(null)

  const router = useRouter()
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/login?callbackUrl=/me/userprofilepage')
    },
  })

  useEffect(() => {
    const fetchAddresses = async () => {
      const response = await fetch(`/api/users/${session?.user._id}/address`)
      const singleUserAddress = await response.json()
      setSingleAddress(singleUserAddress)
      console.log(singleUserAddress)
    }

    if (session?.user._id) fetchAddresses()
  }, [session?.user._id])

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch(`/api/users/${session?.user._id}`)
      const singleUserInfo = await response.json()
      setSingleUser(singleUserInfo)
      console.log(singleUserInfo)
    }
    if (session?.user._id) fetchUsers()
  }, [session?.user._id])

  const { user } = useContext(AuthContext)

  const handleEdit = (singleUserAddress) => {
    router.push(`/update-address?id=${singleUserAddress._id}`)
  }

  const handleUserUpdate = () => {
    router.push(`/me/update?id=${user._id}`)
  }

  const handleDelete = async (singleUserAddress) => {
    const hasConfirmed = confirm(
      'Are you sure you want to delete this address?'
    )
    if (hasConfirmed) {
      try {
        await fetch(`/api/address/${singleUserAddress._id.toString()}`, {
          method: 'DELETE',
        })
        const filteredAddresses = singleAddress.filter(
          (a) => a._id !== singleUserAddress._id
        )
        setSingleAddress(filteredAddresses)
      } catch (error) {
        console.log(error)
      }
    }
  }

  const handleUserDelete = async (user) => {
    const hasConfirmed = confirm('Are you sure you want to delete this user?')
    if (hasConfirmed) {
      try {
        await fetch(`/api/users/${user._id.toString()}`, {
          method: 'DELETE',
        })
        const filteredUser = user.filter((a) => u._id !== user._id)
        setSingleAddress(filteredUser)
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <div>
      <UserProfile
        name='My'
        singleUserInfo={singleUser}
        singleUserAddress={singleAddress}
        session={session}
        description='Welcome this is your profile page utilize it'
        handleEdit={handleEdit}
        handleUserUpdate={handleUserUpdate}
        handleUserDelete={handleUserDelete}
        handleDelete={handleDelete}
      />
      <WishList type='Wish List' user={singleUser} />
    </div>
  )
}

export default UserProfilePage
