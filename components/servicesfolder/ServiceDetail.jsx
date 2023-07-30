'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useContext, useState, useRef, useEffect } from 'react'
import CartContext from '@context/CartContext'
import StarRatings from 'react-star-ratings'
import BreadCrums from '@components/BreadCrums'

const ServiceDetail = ({ service }) => {
  const { addItemToCart } = useContext(CartContext)

  const [isWishListed, setIsWishListed] = useState(false)

  const imgRef = useRef(null)

  const setImagePreview = (url) => {
    imgRef.current.src = url
  }

  //   const service = data.find((x) => x.slug === slug)

  const wishListHandler = () => {
    setIsWishListed(true)
    addItemToCart({
      service: service._id,
      name: service.name,
      image: service.image,
      quantity: service.quantity,
      category: service.category,
      availability: service.availability,
    })
  }

  const breadcrums = [
    {
      name: 'Home',
      url: '/',
    },
    {
      name: `${service?.name?.substring(0, 100)}...`,
      url: `/sigaservice/${service.slug}`,
    },
  ]

  return (
    <>
      <BreadCrums breadcrums={breadcrums} />
      <section className='sigaservice_container'>
        <div className='backtoservice_link_container'>
          <Link href='/' className='backtoservice_link'></Link>
        </div>
        <div className='single_service_image_container'>
          <aside>
            <div className='single_service_image'>
              <img
                ref={imgRef}
                src={
                  service?.images[0]
                    ? service.images[0].url
                    : '/assets/images/lovelymusic.jpg'
                }
                alt='service.name'
                width='650'
                height='430'
                className='mysingle_image'
              />
            </div>
            <div className='single_small_service_image'>
              {service?.images?.map((img) => (
                <a onClick={() => setImagePreview(img?.url)}>
                  <img
                    src={img.url}
                    alt={service.name}
                    width='40'
                    height='40'
                    className='mysingle_small_image'
                  />
                </a>
              ))}
            </div>
          </aside>
          <div className='servicedetail_description_container'>
            <ul>
              <li>
                <h1>
                  {service.name}{' '}
                  <span>
                    {service.availability === 'yes' ? (
                      <h2 style={{ color: 'green' }}>(Available!)</h2>
                    ) : (
                      <span style={{ color: 'GrayText' }}>
                        (Coming up soon!)
                      </span>
                    )}
                  </span>
                </h1>
                <li className='rating'>
                  <StarRatings
                    rating={service.rating}
                    starRatedColor='#ffb829'
                    numberofStars={service.numreviews}
                    starDimension={'20px'}
                    starSpacing='2px'
                    name='rating'
                  />
                  {service.rating}
                </li>
              </li>
              <li>Catetory: {service.category}</li>
              <li className='description-text'>{service.description}</li>
            </ul>
            <div className='calltoaction_btn_container'>
              <button className='wishlist_btn' onClick={wishListHandler}>
                {isWishListed ? 'Wished' : 'Add to Wish'}{' '}
              </button>
              <Link href={'/contact'}>
                <button className='action_btn'>Contact Us</button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ServiceDetail
