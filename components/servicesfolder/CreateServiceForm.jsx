import Image from 'next/image'
import Link from 'next/link'

const CreateServiceForm = ({
  name,
  type = 'createservice',
  loading,
  slug,
  rating,
  numReviews,
  description,
  category,
  quantity,
  file,
  image,
  browse,
  availability,
  handleNameChange,
  handleNumReviewsChange,
  handleSlugChange,
  handleRatingChange,
  handleDescriptionChange,
  handleCategoryChange,
  handleFileChange,
  handleImageChange,
  handleAvailabilityChange,
  handleQuantityChange,
  handleSubmit,
}) => {
  return (
    <div className='createservice_form_container'>
      <div className='form-image'>
        <Image
          src='/assets/images/register_img.png'
          width={400}
          height={400}
          alt='register image'
          className='register-image'
        />
      </div>
      <form onSubmit={handleSubmit}>
        <h1>Create Service Form</h1>
        <input
          type='name'
          value={name}
          placeholder='Enter Your Name'
          onChange={handleNameChange}
        />
        <input
          type='slug'
          placeholder='Enter Slug'
          value={slug}
          onChange={handleSlugChange}
        />
        <input
          type='category'
          placeholder='Enter Your category'
          value={category}
          onChange={handleCategoryChange}
        />
        <input
          type='text'
          placeholder='Enter image url'
          value={image}
          onChange={handleImageChange}
        />
        <input
          type='availability'
          placeholder='Availability'
          value={availability}
          onChange={handleAvailabilityChange}
        />
        <input
          type='number'
          placeholder='quantity'
          value={quantity}
          onChange={handleQuantityChange}
        />
        <input
          type='number'
          placeholder='numReviews'
          value={numReviews}
          onChange={handleNumReviewsChange}
        />
        <select
          name='select'
          id=''
          value={rating}
          onChange={handleRatingChange}
        >
          <option value=''>Rating...</option>
          <option value='1'>1 - Poor</option>
          <option value='2'>2 - Fair</option>
          <option value='3'>3 - Good</option>
          <option value='4'>4 - Very good</option>
          <option value='5'>5 - Excellent</option>
        </select>
        <textarea
          name=''
          id=''
          cols='60'
          rows='7'
          type='description'
          placeholder='description'
          value={description}
          onChange={handleDescriptionChange}
        ></textarea>

        <button
          type='submit'
          value='createservice'
          className='form-container-button'
        >
          Create Service
        </button>
      </form>
    </div>
  )
}

export default CreateServiceForm
