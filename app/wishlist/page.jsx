'use client'

import WishList from '@components/wishlist/WishList'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

const WishListPage = () => {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/login?callbackUrl=/wishlist')
    },
  })

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (!session || status === 'unauthenticated') {
    // You can choose to show a message or redirect here, depending on your requirements
    return <div>Please login to view this page.</div>
  }

  return <section>{session && <WishList />}</section>
}

export default WishListPage
