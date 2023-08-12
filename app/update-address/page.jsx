'use client'

import EditAddressForm from '@components/user/EditAddressForm'
import { useState, useEffect } from 'react'
import { countries } from 'countries-list'
import { useSearchParams, useRouter, redirect } from 'next/navigation'

const EditAddressPage = () => {
  const searchParams = useSearchParams()
  const addressId = searchParams.get('id')
  const router = useRouter()

  const [submitting, setSubmitting] = useState(false)
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    phoneNo: '',
    zipCode: '',
  })
  const countriesList = Object.values(countries)

  const updateAddress = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    if (!addressId) return alert('Address ID not Found!')

    try {
      const response = await fetch(`/api/address/${addressId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          street: address.street,
          city: address.city,
          state: address.state,
          phoneNo: address.phoneNo,
          zipCode: address.zipCode,
          country: address.country,
        }),
      })
      if (response.ok) {
        alert('Address updated successfully!')
        router.push('/me/userprofilepage')
      }
    } catch (error) {
      console.log(error)
    } finally {
      setSubmitting(false)
    }
  }
  useEffect(() => {
    const getAddressDetails = async () => {
      const response = await fetch(`/api/address/${addressId}`)
      const data = await response.json()

      setAddress({
        street: data.street,
        city: data.city,
        state: data.state,
        phoneNo: data.phoneNo,
        zipCode: data.zipCode,
        country: data.country,
      })
    }
    getAddressDetails()
  }, [addressId])

  return (
    <div>
      <EditAddressForm
        type='Edit'
        address={address}
        description=' or update your address to suit the location of your event. SIGA team would be greatful to work with you.'
        setAddress={setAddress}
        handleSubmit={updateAddress}
        submitting={submitting}
        setSubmitting={setSubmitting}
        countriesList={countriesList}
      />
    </div>
  )
}

export default EditAddressPage
