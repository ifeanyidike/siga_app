'use client'

import CreateServiceForm from '@components/servicesfolder/CreateServiceForm'
import { useState, useEffect } from 'react'
import { redirect, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

const CreateServicePage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/login?callbackUrl=/admin/sigaservices/new')
    },
  })

  if (status === 'loading') {
    return (
      <div>
        <Image
          src='/assets/images/loading.gif'
          alt='loading image'
          width={100}
          height={100}
        />
      </div>
    )
  }

  if (!session || status === 'unauthenticated') {
    return <div>Please login to view this page.</div>
  }

  return (
    <section className='createservice-container'>
      {session && (
        <>
          <Link href={'/admin/sigaservices'}>SERVICE LIST</Link>
          {isLoading ? (
            <Image
              src='/assets/images/loading.gif'
              alt='loading image'
              width={100}
              height={100}
            />
          ) : (
            <CreateServiceForm
              type='Create'
              loading={isLoading}
              setIsLoading={setIsLoading}
            />
          )}
        </>
      )}
    </section>
  )
}

export default CreateServicePage
