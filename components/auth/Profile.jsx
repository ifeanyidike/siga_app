'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useContext } from 'react'
import AuthContext from '@context/AuthContext'
import UserAddresses from '@components/user/UserAddresses'

const Profile = ({ addresses, session }) => {
  console.log(addresses)
  const { user } = useContext(AuthContext)

  console.log(user)

  if (!session?.user) {
    return <div>Loading user information...</div>
  }

  return (
    <>
      <figure className='flex items-start sm:items-center'>
        <div className='relative'>
          <Image
            style={{ borderRadius: '50%' }}
            className='w-16 h-16 rounded-full mr-4'
            src={
              user?.avarta ? user.avarta.url : '/assets/images/defaultimage.png'
            }
            alt={user?.name}
            width={100}
            height={100}
          />
        </div>
        <figcaption>
          <h5 className='font-semibold text-lg'>{user?.name}</h5>
          <p>
            <b>Email:</b> {user?.email} | <b>Joined On: </b>
            {user?.createdAt}
          </p>
        </figcaption>
      </figure>
      <hr className='my-4' />
      <UserAddresses addresses={addresses} />
      <Link href={'/address/new'}>
        <button className='px-4 py-2 inline-block text-blue-600 border border-gray-300 rounded-md hover:bg-gray-100'>
          <i className='mr-1 fa fa-plus'></i> Add new address
        </button>
      </Link>
      <hr className='my-4' />
    </>
  )
}

export default Profile
