'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useContext } from 'react'
import AuthContext from '@context/AuthContext'
import UserAddresses from '@components/user/UserAddresses'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

const Profile = ({ addressData }) => {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/login?callbackUrl=/me')
    },
  })

  const { user, updateUser, setUser, submitting, setSubmitting } =
    useContext(AuthContext)

  console.log(user)
  console.log(user)
  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (!session || status === 'unauthenticated') {
    redirect('/login')
  }

  return (
    <>
      <figure className='flex items-start sm:items-center'>
        <div className='relative'>
          <Image
            style={{ borderRadius: '50%' }}
            className='w-16 h-16 rounded-full mr-4'
            src={
              user?.avarta
                ? user.avarta.url
                : '/assets/images/defaultavatar.jpg'
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
      {addressData.map((useraddress) => (
        <UserAddresses useraddress={useraddress} user={user} />
      ))}

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
