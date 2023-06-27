'use client'
import data from '@utils/data'
import Link from 'next/link'
import Image from 'next/image'
import { useContext, useState, useEffect } from 'react'
import { GlobalContextProvider } from '@app/context/store'

const WishListButton = () => {
  const [isWishListed, setIsWishListed] = useState(false)
  const handleWishList = () => {
    setIsWishListed(true)
  }

  return (
    <button className='wishlist_btn' onClick={handleWishList}>
      {isWishListed ? 'Added to Wishlist' : 'Add to Wish List'}{' '}
    </button>
  )
}

const SigaServicePage = (props) => {
  const {
    state,
    dispatch,
    wishList,
    setWishList,
    wishListItems,
    setWishListItems,
  } = GlobalContextProvider()
  const { slug } = props.params
  console.log(slug)
  const service = data.services.find((x) => x.slug === slug)

  if (!service) {
    return <div>Service not Found</div>
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
            alt={service.name}
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
            <WishListButton />
          </div>
        </div>
        <div className='call-to-action-container'>
          <div className='call-to-action-status'>
            <div className='availability'>
              {service.availability === 'yes' ? (
                <h2>Available!</h2>
              ) : (
                'Coming up soon!'
              )}
            </div>
            <div className='rating'>
              Rating: {service.rating} of {service.numReviews} reviews
            </div>
          </div>
          <button className='action_btn'>Contact Us</button>
        </div>
      </div>
    </section>
  )
}

export default SigaServicePage
