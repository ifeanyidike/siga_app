'use client'

import axios from 'axios'
import { useState, useEffect } from 'react'
import ServiceList from '@components/servicesfolder/ServiceList'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

const ServiceListPage = () => {
  const [allSigaServices, setAllSigaServices] = useState([])

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/login?callbackUrl=/admin/sigaservices')
    },
  })

  useEffect(() => {
    const fetchServiceLists = async () => {
      try {
        const { data } = await axios.get('/api/ourservices')
        setAllSigaServices(data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchServiceLists()
  }, [])

  // const deleteData = await deleteService()
  console.log(allSigaServices)

  return (
    <section>
      {session && (
        <ServiceList
          key={allSigaServices._id}
          allSigaServices={allSigaServices}
        />
      )}
    </section>
  )
}

export default ServiceListPage
