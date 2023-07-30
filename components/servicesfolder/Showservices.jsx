import React from 'react'
import ServiceItems from '@components/servicesfolder/ServiceItems'

const Showservices = ({ data }) => {
  return (
    <section className='serviceitem_container'>
      <div className='listservice-wrapper'>
        <div className='serviceitem_wrapper'>
          {data?.map((service) => (
            <ServiceItems key={service._id} service={service} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Showservices
