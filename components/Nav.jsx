'use client'
import Link from 'next/link'
import Image from 'next/image'
import Searchbar from './Searchbar'
import { useContext, useState, useEffect } from 'react'

const Nav = () => {
  return (
    <nav className='nav-container'>
      <div className='searchbar-container'>
        <Searchbar />
        <div>
          <p className='event-text'>
            <span> Upcoming event :</span> Join us,{' '}
          </p>
        </div>
      </div>

      <div className='link-div'>
        <Link className='nav_link' href='/event'>
          WishList
          {/* {wishList && wishList.wishListItems.length > 0 && (
              <span className='wishlist_badge'>
                {wishList.wishListItems.reduce((a, c) => a + c.quantity, 0)}
              </span>
            )} */}
        </Link>

        <Link className='na_link' href='/login'>
          <button className='login'>Login</button>
        </Link>

        <div className='user_image_container'>
          <Image
            src={'/assets/images/joy.png'}
            height={30}
            width={30}
            alt='user image'
          />
          <Link href='/register_account' className='nav_link'>
            <p className='user_name'>
              Joy
              <time>amehj495@gmail.com</time>
            </p>
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Nav
