'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useContext, useState, useEffect } from 'react'

const ServiceDetail = ({ service }) => {
  const [isWishListed, setIsWishListed] = useState(false)

  //   const service = data.find((x) => x.slug === slug)

  const handleWishList = () => {
    setIsWishListed(true)
  }

  return (
    <section className='sigaservice_container'>
      <div className='backtoservice_link_container'>
        <Link href='/' className='backtoservice_link'>
          Go Back
        </Link>
      </div>
      <div className='single_service_image_container'>
        <div className='single_service_image'>
          <Image
            src={service.image}
            alt='service.name'
            width={640}
            height={640}
          />
        </div>
        <div>
          <ul>
            <li>
              <h1>{service.name}</h1>
            </li>
            <li>Catetory: {service.category}</li>
            <li className='description-text'>{service.description}</li>
          </ul>
          <div className='wishlist-btn-container'>
            <button className='wishlist_btn' onClick={handleWishList}>
              {isWishListed ? 'Added to Wishlist' : 'Add to Wish List'}{' '}
            </button>
          </div>
        </div>
        <div className='call-to-action-container'>
          <div className='call-to-action-status'>
            <div className='availability'>
              {service.availability ? <h2>Available!</h2> : 'Coming up soon!'}
            </div>
            <div className='rating'>
              {service.rating}Rating of {service.numreviews}reviews
            </div>
          </div>
          <button className='action_btn'>Contact Us</button>
        </div>
      </div>
    </section>
  )
}

export default ServiceDetail
