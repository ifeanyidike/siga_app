'use client'

import Image from 'next/image'
import Link from 'next/link'
import { TrashIcons, EditIcons } from '@components/Icons'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

const ServiceList = ({ allSigaServices, deleteData }) => {
  return (
    <section className='servicelist_container'>
      <div className='servicelist_heading'>
        <Link href={'/'}>GO HOME</Link>
        <div>
          <h1>Services</h1>
        </div>
        <Link href={'/admin/sigaservices/new'}>
          <button>Create Service +</button>
        </Link>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>SLUG</th>
              <th>CATEGORY</th>
              <th>AVAILABILITY</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {allSigaServices.map((allSigaservice) => (
              <tr key={allSigaservice._id}>
                <td>{allSigaservice._id}</td>
                <td>{allSigaservice.name}</td>
                <td>{allSigaservice.slug}</td>
                <td>{allSigaservice.category}</td>
                <td>{allSigaservice.availability}</td>
                <td className='edit-icon-container'>
                  <Link href={`/admin/services/edit`}>
                    <EditIcons className='editicons' />
                  </Link>
                </td>
                <td className='delete-icon-container'>
                  <TrashIcons className='trashicon' />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default ServiceList
