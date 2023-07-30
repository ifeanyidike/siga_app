'use client'

import CreateServiceForm from '@components/servicesfolder/CreateServiceForm'
import { useState, useEffect } from 'react'
import { redirect, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

const CreateServicePage = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [rating, setRating] = useState(0)
  const [numReviews, setNumReviews] = useState([])
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [file, setFile] = useState('')
  const [images, setImages] = useState([])
  const [browse, setBrowse] = useState('')
  const [availability, setAvailability] = useState('')
  const [quantity, setQuantity] = useState('')

  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/login?callbackUrl=/servicelist/createservice')
    },
  })

  const handleNameChange = (e) => {
    setName(e.target.value)
    console.log(e.target.value)
  }

  const handleSlugChange = (e) => {
    setSlug(e.target.value)
    console.log(e.target.value)
  }
  const handleNumReviewsChange = (e) => {
    setNumReviews(e.target.value)
    console.log(e.target.value)
  }
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value)
    console.log(e.target.value)
  }

  const handleCategoryChange = (e) => {
    setCategory(e.target.value)
    console.log(e.target.value)
  }
  const handleFileChange = (e) => {
    setFile(e.target.value)
    console.log(e.target.value)
  }
  const handleImageChange = (e) => {
    const selectedImages = Array.from(e.target.files)
    setImages(e.target.selectedImages)
    console.log(selectedImages)
  }
  const handleBrowseChange = (e) => {
    setBrowse(e.target.value)
    console.log(e.target.value)
  }
  const handleAvailabilityChange = (e) => {
    setAvailability(e.target.value)
    console.log(e.target.value)
  }

  const handleRatingChange = (e) => {
    setRating(e.target.value)
    console.log(e.target.value)
  }
  const handleQuantityChange = (e) => {
    setQuantity(e.target.value)
    console.log(e.target.value)
  }
  const createService = async (e) => {
    e.preventDefault()
    setLoading(true)
    console.log(createService)
    try {
      const formData = new FormData()

      formData.append('name', name)
      formData.append('slug', slug)
      formData.append('description', description)
      formData.append('category', category)
      formData.append('availability', availability)
      formData.append('quantity', quantity)
      formData.append('rating', rating)
      formData.append('numReviews', numReviews)

      images.forEach((image, index) => {
        formData.append(`images[${index}][public_id]`, image.public_id)
        formData.append(`images[${index}][url]`, image.url)
      })
      const response = await fetch('/api/ourservices/new', {
        method: 'POST',
        body: formData,
      })
      if (response) {
        router.push('/')
      }
      console.log(response)
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (!session || status === 'unauthenticated') {
    // You can choose to show a message or redirect here, depending on your requirements
    return <div>Please login to view this page.</div>
  }

  return (
    <section className='createservice-container'>
      {session && (
        <>
          <Link href={'/admin/sigaservices'}>SERVICE LIST</Link>
          {loading ? (
            <Image
              src='/assets/images/loading.gif'
              alt='loading image'
              width={100}
              height={100}
            />
          ) : (
            <CreateServiceForm
              type='createservice'
              name={name}
              loading={loading}
              slug={slug}
              quantity={quantity}
              description={description}
              category={category}
              file={file}
              images={images}
              browse={browse}
              rating={rating}
              numReviews={numReviews}
              availability={availability}
              handleNumReviewsChange={handleNumReviewsChange}
              handleNameChange={handleNameChange}
              handleRatingChange={handleRatingChange}
              handleSlugChange={handleSlugChange}
              handleDescriptionChange={handleDescriptionChange}
              handleCategoryChange={handleCategoryChange}
              handleFileChange={handleFileChange}
              handleImageChange={handleImageChange}
              handleBrowseChange={handleBrowseChange}
              handleAvailabilityChange={handleAvailabilityChange}
              handleQuantityChange={handleQuantityChange}
              handleSubmit={createService}
            />
          )}
        </>
      )}
    </section>
  )
}

export default CreateServicePage
