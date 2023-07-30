'use client'

import Link from 'next/link'
import Image from 'next/image'
import Searchbar from './Searchbar'
import { useContext, useState, useEffect } from 'react'
import CartContext from '@context/CartContext'
import AuthContext from '@context/AuthContext'
import { useSession, signIn, signOut, getProviders } from 'next-auth/react'
import AdminDropDown from '@components/AdminDropDown'
import AdminUser from '@components/AdminUser'
import UserDropDown from './UserDropDown'

const Nav = () => {
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
  const { cart } = useContext(CartContext)
  const cartItems = cart?.cartItems

  return (
    <nav className='nav-container'>
      <div className='searchbar-container'>{/* <Searchbar /> */}</div>
      <div className='wishlist_link'>
        <Link href='/wishlist'>
          <Image
            style={{ color: 'green' }}
            src={'/assets/icons/addtofavorite.svg'}
            width={30}
            height={30}
            alt='wish list image'
          />
          <span>
            (<b>{cartItems?.length || 0}</b>)
          </span>
        </Link>
      </div>
      <div className='link-div'>
        {!user ? (
          <Link className='nav_link' href='/login'>
            <button className='login'>SIGN IN</button>
          </Link>
        ) : user?.role !== 'admin' ? (
          <div className='user_maincontainer'>
            <div className='userandadmin_container'>
              <UserDropDown user={user} />
            </div>
          </div>
        ) : (
          <div className='admin_dropdown_div'>
            <div>
              <AdminDropDown />
            </div>
            <div>
              <AdminUser user={user} />
            </div>
          </div>
        )}

        <div class='hamburger-menu-container'>
          <div class='hamburger-menu'></div>
          <div class='hamburger-menu'></div>
          <div class='hamburger-menu'></div>
        </div>
      </div>
    </nav>
  )
}

export default Nav
