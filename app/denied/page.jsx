import React from 'react'
import Link from 'next/link'

const DeniedPage = () => {
  return (
    <div>
      {' '}
      <h1>access denied!!!</h1>You must be either an Admin or Manager to view
      this page <Link href={'/'}>Back to Homepage</Link>
    </div>
  )
}

export default DeniedPage
