'use client'

import { Dialog } from '@headlessui/react'
import { StarIcon as StarIconOutline } from '@heroicons/react/24/outline'
import { StarIcon } from '@heroicons/react/24/solid'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import React from 'react'

const Modal = () => {
  let [isOpen, setIsOpen] = useState(true)
  const slug = useParams().slug
  console.log(slug)


  useEffect(()=>{

  },[slug])
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className='headless_dialog'
    >
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <div className='headless_modal_backdrop' aria-hidden='true' />

      {/* Full-screen container to center the panel */}
      <div className='headless_modal_fullscreen'>
        {/* The actual dialog panel  */}
        <Dialog.Panel className='headless_dialog_panel'>
          <Dialog.Title>Complete your order</Dialog.Title>

          {/* ... */}
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}

export default Modal
