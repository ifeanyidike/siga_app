'use client'

import { useContext, useState } from 'react'
import Sidebar from '@components/Sidebar'
import Link from 'next/link'
import { countries } from 'countries-list'
import AuthContext from '@context/AuthContext'

const AddressForm = ({ type }) => {
  const {
    error,
    addNewAddress,
    clearError,
    address,
    setAddress,
    submitting,
    setSubmitting,
    countriesList,
  } = useContext(AuthContext)

  const submitHandler = (e) => {
    e.preventDefault()
    const newAddress = {
      address,
    }
    addNewAddress(newAddress)
  }

  return (
    <>
      <section className='py-10'>
        <div className='container max-w-screen-xl mx-auto px-4'>
          <div className='flex flex-col md:flex-row -mx-4'>
            <Sidebar />
            <main className='md:w-2/3 lg:w-3/4 px-4'>
              <div
                style={{ maxWidth: '480px' }}
                className='mt-1 mb-20 p-4 md:p-7 mx-auto rounded bg-white shadow-lg'
              >
                <form onSubmit={submitHandler}>
                  <h2 className='mb-5 text-2xl font-semibold'>
                    {type} Address
                  </h2>

                  <div className='mb-4 md:col-span-2'>
                    <label className='block mb-1'> Street* </label>
                    <input
                      className='appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full'
                      type='text'
                      placeholder='Type your address'
                      value={address.street}
                      onChange={(e) =>
                        setAddress({ ...address, street: e.target.value })
                      }
                    />
                  </div>

                  <div className='grid md:grid-cols-2 gap-x-3'>
                    <div className='mb-4 md:col-span-1'>
                      <label className='block mb-1'> City </label>
                      <input
                        className='appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full'
                        type='text'
                        placeholder='Type your city'
                        value={address.city}
                        // onChange={(e) => setCity(e.target.value)}
                        onChange={(e) =>
                          setAddress({ ...address, city: e.target.value })
                        }
                      />
                    </div>

                    <div className='mb-4 md:col-span-1'>
                      <label className='block mb-1'> State </label>
                      <input
                        className='appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full'
                        type='text'
                        placeholder='Type state here'
                        value={address.state}
                        // onChange={(e) => setState(e.target.value)}
                        onChange={(e) =>
                          setAddress({ ...address, state: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className='grid md:grid-cols-2 gap-x-2'>
                    <div className='mb-4 md:col-span-1'>
                      <label className='block mb-1'> ZIP code </label>
                      <input
                        className='appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full'
                        type='number'
                        placeholder='Type zip code here'
                        value={address.zipCode}
                        // onChange={(e) => setZipCode(e.target.value)}
                        onChange={(e) =>
                          setAddress({ ...address, zipCode: e.target.value })
                        }
                      />
                    </div>

                    <div className='mb-4 md:col-span-1'>
                      <label className='block mb-1'> Phone No </label>
                      <input
                        className='appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full'
                        type='number'
                        placeholder='Type phone no here'
                        value={address.phoneNo}
                        // onChange={(e) => setPhoneNo(e.target.value)}
                        onChange={(e) =>
                          setAddress({ ...address, phoneNo: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className='mb-4 md:col-span-2'>
                    <label className='block mb-1'> Country </label>
                    <select
                      className='appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full'
                      value={address.country}
                      // onChange={(e) => setCountry(e.target.value)}
                      onChange={(e) =>
                        setAddress({ ...address, country: e.target.value })
                      }
                    >
                      {countriesList.map((country) => (
                        <option key={country.name} value={country.name}>
                          {country.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      marginBottom: '5px',
                    }}
                  >
                    <Link
                      href={'/'}
                      style={{
                        color: 'gray',
                        fontWeight: 500,
                        fontSize: 'small',
                        marginRight: '20px',
                      }}
                    >
                      Cancel
                    </Link>
                    <button
                      type='submit'
                      className='my-2 px-4 py-2 text-center w-full inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700'
                      disabbled={submitting}
                    >
                      {submitting ? `${type}...` : type}
                    </button>
                  </div>
                </form>
              </div>
            </main>
          </div>
        </div>
      </section>
    </>
  )
}

export default AddressForm
