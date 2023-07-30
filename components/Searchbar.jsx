'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'
import { AiOutlineSearch } from 'react-icons/ai'

const Searchbar = ({ getSearchResults }) => {
  const [query, setQuery] = useState('')
  const router = useRouter()

  const onSearch = async (e) => {
    e.preventDefault()
    const response = await fetch(`/api/ourservices/search?query=${query}`)
    const data = await response.json()
    console.log(data)

    getSearchResults(data)
    const encodedSearchQuery = encodeURIComponent(query)
    router.push(`/?query=${encodedSearchQuery}`)
  }

  return (
    <div className='input_container'>
      <form onSubmit={onSearch} className='search_service_form'>
        <input
          type='text'
          placeholder='Search Service Here...'
          className='search-input'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          type='submit'
          variant='outline-success'
          className='searchbar-btn'
        >
          <AiOutlineSearch style={{ fontSize: '1.2rem', color: '#ffffff' }} />
        </button>
      </form>
    </div>
  )
}

export default Searchbar
