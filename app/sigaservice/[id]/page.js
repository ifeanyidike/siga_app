'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ServiceDetail from '@components/servicesfolder/ServiceDetail'
import { useSearchParams } from 'next/navigation'

const ServiceDetailPage = ({ params }) => {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const [service, setService] = useState(null)

  useEffect(() => {
    const fetchServiceDetails = async () => {
      const response = await fetch(`/api/ourservices/${id}`)
      const service = await response.json()

      setService(service)
    }

    fetchServiceDetails()
  }, [id])
  console.log(service)

  if (!service) {
    return <div>Service not found</div>
  }

  return (
    <section>
      tthehehhe
      <ServiceDetail service={service} />
    </section>
  )
}

export default ServiceDetailPage
