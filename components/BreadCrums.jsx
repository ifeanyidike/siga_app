import React from 'react'
import Link from 'next/link'
import { ChevronSingle } from '@components/Icons'

const BreadCrums = ({ breadcrums }) => {
  return (
    <section className='breadcrum-container'>
      <div className='breadcrum_wrapper'>
        <ol className='breadcrum-orderedlist'>
          {breadcrums.map((breadcrum, index) => (
            <li className='breadcrum-list'>
              <Link href={breadcrum.url} className='breadcrum-link'>
                {breadcrum.name}
              </Link>
              {breadcrums.length - 1 !== index && <ChevronSingle />}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export default BreadCrums
