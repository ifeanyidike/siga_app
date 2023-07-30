'use client'

import React, { useEffect, useState } from 'react'
import ServiceDetail from '@components/servicesfolder/ServiceDetail'
import Image from 'next/image'

const ServiceDetailPage = ({ params }) => {
  const id = params.id
  const [service, setService] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    console.log('id', id)
    const fetchServiceDetails = async () => {
      const response = await fetch(`/api/ourservices/${id}`)
      const service = await response.json()
      console.log('service', service)

      setService(service)
      setLoading(false)
    }

    fetchServiceDetails()
  }, [id])

  if (loading) {
    return (
      <div>
        <Image width={50} height={50} src='/assets/images/loading.gif' />
      </div>
    )
  }

  if (!service) {
    return <div>Service not found</div>
  }

  return (
    <section>
      <ServiceDetail service={service} />
    </section>
  )
}

export default ServiceDetailPage
