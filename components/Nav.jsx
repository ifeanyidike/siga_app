'use client'
import Link from 'next/link'
import Image from 'next/image'
import Searchbar from './Searchbar'
import { useContext, useState, useEffect } from 'react'
import { GlobalContextProvider } from '@app/context/store'

const Nav = (props) => {
  const {
    state,
    dispatch,
    wishList,
    setWishList,
    wishListItems,
    setWishListItems,
  } = GlobalContextProvider()
  return (
    <nav className='nav-container'>
      <div className='searchbar-container'>
        <Searchbar />
        <div>
          <p className='event-text'>
            <span>Trending Songs :</span> Dream your moments, Until I Met You,{' '}
          </p>
        </div>
      </div>

      <div className='link-div'>
        <div>
          <Link className='nav_link' href='/event'>
            WishList
            {wishList && wishList.wishListItems.length > 0 && (
              <span className='wishlist_badge'>
                {wishList.wishListItems.reduce((a, c) => a + c.quantity, 0)}
              </span>
            )}
          </Link>
        </div>

        <Link href='/register_account' className='nav_link'>
          <button className='register'> Register</button>
        </Link>
        <Link className='nav_link' href='/login'>
          <button className='login'>Login</button>
        </Link>
      </div>
    </nav>
  )
}

export default Nav
