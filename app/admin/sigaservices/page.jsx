'use client'

import axios from 'axios'
import { useState, useEffect } from 'react'
import ServiceList from '@components/servicesfolder/ServiceList'
import { useSession } from 'next-auth/react'
import { redirect, useRouter } from 'next/navigation'

const ServiceListPage = () => {
  const [allSigaServices, setAllSigaServices] = useState([])
  const router = useRouter()
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

  const handleServiceUpdate = (slug) => {
    console.log('Service ID:', slug)
    router.push(`/sigaservice/update?slug=${slug}`)

    console.log('clicked')
  }

  // const deleteData = await deleteService()
  console.log(allSigaServices)

  return (
    <section>
      {session && (
        <ServiceList
          key={allSigaServices._id}
          allSigaServices={allSigaServices}
          handleServiceUpdate={handleServiceUpdate}
        />
      )}
    </section>
  )
}

export default ServiceListPage
