'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Searchbar from '@components/Searchbar'
import SearchServices from '@components/SearchServices'

const SearchPage = () => {
  const [services, setServices] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchServices = async () => {
      const response = await fetch(`/api/ourservices`)
      const services = await response.json()
      setServices(services)
      setIsLoading(false)
    }
    fetchServices()
  }, [])

  const search = useSearchParams()

  // console.log('SEARCH PARAMS', searchQuery)

  return (
    <section className='homepage'>
      <Searchbar getSearchResults={(results) => setServices(results)} />
      <SearchServices services={services} />
    </section>
  )
}

export default SearchPage
