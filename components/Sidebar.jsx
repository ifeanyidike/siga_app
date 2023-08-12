'use client'

import Link from 'next/link'
import { useSession, signIn, getProviders } from 'next-auth/react'
import { useContext, useState, useEffect } from 'react'
import AuthContext from '@context/AuthContext'
import { signOut } from 'next-auth/react'

const Sidebar = () => {
  const [providers, setProviders] = useState(null)
  const { user, setUser } = useContext(AuthContext)
  const { data } = useSession()

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders()
      setProviders(response)
      console.log(response)
    }
    setUpProviders()
    if (data) {
      setUser(data?.user)
    }
  }, [data])

  const logoutHandler = () => {
    signOut()
  }

  return (
    <aside className='md:w-1/3 lg:w-1/4 px-4'>
      <ul className='sidebar'>
        {user?.role === 'admin' ? (
          <>
            <li>
              {' '}
              <Link
                href='/admin/sigaservices/new'
                className='block px-3 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-500 rounded-md'
              >
                New Service <span className='text-red-500'>(Admin)</span>
              </Link>
            </li>

            <li>
              {' '}
              <Link
                href='/admin/sigaservices'
                className='block px-3 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-500 rounded-md'
              >
                All Services <span className='text-red-500'>(Admin)</span>
              </Link>
            </li>

            <li>
              {' '}
              <Link
                href='/admin/wishlists'
                className='block px-3 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-500 rounded-md'
              >
                All Wishes <span className='text-red-500'>(Admin)</span>
              </Link>
            </li>

            <li>
              {' '}
              <Link
                href='/admin/users'
                className='block px-3 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-500 rounded-md'
              >
                All Users <span className='text-red-500'>(Admin)</span>
              </Link>
            </li>

            <hr />
            <li>
              {' '}
              <Link
                href='/me/userprofilepage'
                className='block px-3 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-500 rounded-md'
              >
                Your Profile
              </Link>
            </li>
            <li>
              {' '}
              <Link
                href='/me/orders'
                className='block px-3 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-500 rounded-md'
              >
                Wish List
              </Link>
            </li>
            <li>
              {' '}
              <Link
                href={user && `/me/update?id=${user.id}`}
                className='block px-3 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-500 rounded-md'
              >
                Update Profile
              </Link>
            </li>
            <li>
              {' '}
              <Link
                href='/me/update_password'
                className='block px-3 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-500 rounded-md'
              >
                Update Password
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              {' '}
              <Link
                href='/me'
                className='block px-3 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-500 rounded-md'
              >
                Your Profile
              </Link>
            </li>
            <li>
              {' '}
              <Link
                href='/me/orders'
                className='block px-3 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-500 rounded-md'
              >
                Wish List
              </Link>
            </li>
            <li>
              {' '}
              <Link
                href={`/me/update`}
                className='block px-3 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-500 rounded-md'
              >
                Update Profile
              </Link>
            </li>
            <li>
              {' '}
              <Link
                href='/me/update_password'
                className='block px-3 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-500 rounded-md'
              >
                Update Password
              </Link>
            </li>
          </>
        )}

        <li style={{ listStyle: 'none' }}>
          {' '}
          <button
            style={{
              cursor: 'pointer',
              backgroundColor: 'gray',
              padding: '10px 20px',
              margin: '10px',
              border: 'none',
              color: '#fff',
            }}
            className='block px-3 py-2 text-red-800 hover:bg-red-100 hover:text-white-500 rounded-md cursor-pointer'
            onClick={logoutHandler}
          >
            Logout
          </button>
        </li>
      </ul>
    </aside>
  )
}

export default Sidebar
