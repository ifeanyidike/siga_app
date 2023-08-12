'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'

const UserAddresses = ({ useraddress, handleDelete, handleEdit, params }) => {
  console.log(params)
  const pathName = usePathname()
 
  const { data: session } = useSession()

  console.log('Pathname', pathName)
  console.log('sessionData', session)

  const [copied, setCopied] = useState()

  if (!useraddress) {
    return <div>There is no address for this user</div>
  }
  const addressToCopy = `${useraddress.street}, ${useraddress.city}, ${useraddress.state}, ${useraddress.zipCode}, ${useraddress.country}, Phone no: ${useraddress.phoneNo}`

  const handleCopy = () => {
    navigator.clipboard.writeText(addressToCopy)
    setCopied(true)

    // Reset copied state after 3 seconds
    setTimeout(() => setCopied(false), 3000)
  }

  return (
    <div className='mb-5 gap-4'>
      <figure className='w-full flex align-center bg-gray-100 p-4 rounded-md cursor-pointer'>
        <div className='mr-3'>
          <h3>I am a: {useraddress.user.name}</h3>
          <h3>Role: {useraddress.user.role}</h3>
        </div>
        <figcaption
          style={{ backgroundColor: 'white', color: 'gray', padding: '20px' }}
          className='text-gray-600'
        >
          <span className='flex items-center justify-center text-yellow-500 w-12 h-12 bg-white rounded-full shadow mt-2'>
            <Image
              src={'/assets/icons/location.svg'}
              width={40}
              height={40}
              alt='user_image'
              style={{ color: '#fff' }}
            />
          </span>
          <div
            style={{
              display: 'flex',
            }}
          >
            <p>
              {useraddress.street} <br /> {useraddress.city},{' '}
              {useraddress.state}, {useraddress.zipCode}, {useraddress.country}
              <br />
              Phone no: {useraddress.phoneNo}
            </p>
            <div
              className='copy_btn'
              onClick={() => {
                handleCopy()
              }}
            >
              <Image
                src={
                  copied ? '/assets/icons/tick.svg' : '/assets/icons/copy.svg'
                }
                width={18}
                height={18}
                style={{ color: 'green' }}
              />
            </div>
          </div>
          {session?.user.id === useraddress?.user.id &&
            pathName === '/me/userprofilepage' && (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {' '}
                <p
                  style={{
                    fontFamily: 'inter',
                    padding: '20px 30px',

                    fontSize: 'small',
                    cursor: 'pointer',
                    color: 'green',
                  }}
                  onClick={handleEdit}
                >
                  Edit
                </p>
                <p
                  style={{
                    fontFamily: 'inter',
                    fontSize: 'small',
                    color: 'orange',
                    cursor: 'pointer',
                    padding: '20px 30px',
                  }}
                  onClick={handleDelete}
                >
                  Delete
                </p>
              </div>
            )}
        </figcaption>
      </figure>
    </div>
  )
}

export default UserAddresses
