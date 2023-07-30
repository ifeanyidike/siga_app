'use client'

import { useEffect, useState, useContext } from 'react'
import CartContext from '@context/CartContext'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import StarRatings from 'react-star-ratings'

const SearchServices = ({ services }) => {
  const { addItemToCart } = useContext(CartContext)
  console.log(services)

  if (!Array.isArray(services) || services.length === 0) {
    console.log('No Data Available')
  }

  return (
    <section className='serviceitem_container'>
      <div className='listservice-wrapper'>
        <div className='serviceitem_wrapper'>
          {services &&
            services?.map((service) => (
              <div className='card' key={service._id}>
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

                  <button
                    onClick={(e) =>
                      addItemToCart({
                        service: service._id,
                        name: service.name,
                        image: service.image,
                        quantity: service.quantity,
                        category: service.category,
                        availability: service.availability,
                      })
                    }
                    className='small-btn'
                  >
                    Wish List
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  )
}

export default SearchServices
