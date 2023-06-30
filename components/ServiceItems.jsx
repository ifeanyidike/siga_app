import Link from 'next/link'
import Image from 'next/image'
// import StarRatings from 'react-star-ratings'

const ServiceItems = ({ service }) => {
  return (
    <div className='card'>
      <Link href={`/sigaservice/${service.slug}`}>
        <Image
          src={service?.image ? service.image : '/assets/images/song3.jpg'}
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

        <p className='service_description'>{service.description}</p>
        <button className='service_btn'>Learn more</button>
      </div>
    </div>
  )
}

export default ServiceItems
