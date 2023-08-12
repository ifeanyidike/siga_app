import { Menu, Transition } from '@headlessui/react'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import Image from 'next/image'
import { Fragment, useEffect, useRef, useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

export default function AdminUser({ user }) {
  const logoutHandler = () => {
    signOut()
  }
  return (
    <div className='adminuser_dropdown_top_container'>
      <Menu as='div' className='topcontainer_wrapper'>
        <div>
          <Menu.Button className='admindropdown-btn'>
            ADMIN USER
            {/* <ChevronDownIcon className='drowpdownicon' aria-hidden='true' /> */}
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter='transition ease-out duration-100'
          enterFrom='transform opacity-0 scale-95'
          enterTo='transform opacity-100 scale-100'
          leave='transition ease-in duration-75'
          leaveFrom='transform opacity-100 scale-100'
          leaveTo='transform opacity-0 scale-95'
        >
          <Menu.Items className='dropdown-element'>
            <div className='dropdown-element-wrapper  '>
              <Menu.Item>
                <Link href={'/me'} className='dropdown-element-btn'>
                  <Image
                    style={{ borderRadius: '50%' }}
                    src={
                      user.avarta
                        ? user.avarta.url
                        : '/assets/images/defaultavatar.jpg'
                    }
                    height={30}
                    width={30}
                    alt='user image'
                  />
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link href={'/me'}>
                  <button className='dropdown-element-btn'>Profile</button>
                </Link>
              </Menu.Item>
              <Menu.Item>
                <button
                  className='dropdown-element-btn'
                  onClick={logoutHandler}
                >
                  Logout
                </button>
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}
