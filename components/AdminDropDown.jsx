import { Menu, Transition } from '@headlessui/react'
import { Fragment, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

export default function AdminDropDown() {
  return (
    <div className='admindropdown_top_container'>
      <Menu as='div' className='topcontainer_wrapper'>
        <div>
          <Menu.Button className='admindropdown-btn'>
            ADMIN
            <ChevronDownIcon className='drowpdownicon' aria-hidden='true' />
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
            <div className='dropdown-element-wrapper '>
              <Menu.Item>
                <Link href={'/admin/users'}>
                  <button className='dropdown-element-btn'>Users</button>
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link href={'/admin/sigaservices'}>
                  <button className='dropdown-element-btn'>Servicelist</button>
                </Link>
              </Menu.Item>
            </div>
            <div className='px-1 py-1'>
              <Menu.Item>
                <Link href='/admin/wishlists'>
                  <button className='dropdown-element-btn'>Wishlists</button>
                </Link>
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}
