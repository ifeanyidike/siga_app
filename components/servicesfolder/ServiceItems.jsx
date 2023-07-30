'use client'
import React, { useContext } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import CartContext from '@context/CartContext'
import StarRatings from 'react-star-ratings'

// import StarRatings from 'react-star-ratings'

const ServiceItems = ({ service }) => {
  const { addItemToCart } = useContext(CartContext)

  const wishListHandler = () => {
    addItemToCart({
      service: service._id,
      name: service.name,
      image: service.image,
      quantity: service.quantity,
      category: service.category,
      availability: service.availability,
    })
  }

  return (
    <div className='card'>
      <Link href={`/sigaservice/${service.slug}`}>
        <Image
          src={
            service?.images[0]
              ? service.images[0].url
              : '/assets/images/lovelymusic.jpg'
          }
          alt={service.name}
          width={200}
          height={350}
          className='product_image rounded shadow'
        />
      </Link>
      <div className='service_info'>
        <Link href={`/sigaservice/${service.slug}`}>
          <h2 className='service_title'>{service.name}</h2>
        </Link>
        <div>
          <StarRatings
            rating={service.rating}
            starRatedColor='#ffb829'
            numberofStars={service.numreviews}
            starDimension={'12px'}
            starSpacing='2px'
            name='rating'
          />

          <span>
            {' '}
            <b>*</b> {service.rating}
          </span>
        </div>
        {/* <p className='service_description'>{service.description}</p> */}
        <Link href={`/sigaservice/${service.slug}`}>
          <button className='service_btn'>Learn more</button>
        </Link>

        <button onClick={wishListHandler} className='small-btn'>
          Wish List
        </button>
      </div>
    </div>
  )
}

export default ServiceItems
