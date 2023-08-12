

import UpdateProfile from '@components/auth/UpdateProfile'
// import { useState, useEffect, useContext } from 'react'
// import { useSearchParams, useRouter, redirect } from 'next/navigation'
// import AuthContext from '@context/AuthContext'

const UpdateProfilePage = () => {
  // const searchParams = useSearchParams()
  // const userId = searchParams.get('id')
  // const router = useRouter()
  // const [avarta, setAvarta] = useState()
  // const [avartaPreview, setAvartaPreview] = useState(
  //   '/assets/images/defaultimage.png'
  // )

  // const { user, setUser } = useContext(AuthContext)
  // console.log(user)
  // console.log(userId)
  // const [submitting, setSubmitting] = useState(false)

  // useEffect(() => {
  //   const getUserDetails = async () => {
  //     const response = await fetch(`/api/users/${userId}`)
  //     const data = await response.json()
  //     setUser({
  //       name: data.name,
  //       email: data.email,
  //       phone: data.phone,
  //       role: data.role,
  //     })
  //   }
  //   if (userId) getUserDetails()
  // }, [userId])

  // const updateUser = async (e) => {
  //   e.preventDefault()
  //   setSubmitting(true)

  //   if (!userId) return alert('User ID not Found')

    // try {
    //   const response = await fetch(`/api/users/${userId}`, {
    //     method: 'PATCH',
    //     body: JSON.stringify({
    //       name: user.name,
    //       email: user.email,
    //       phone: user.phone,
    //       role: user.role,
    //       // avarta: cloudinaryUrl,
    //     }),
    //   })
    //   if (response.ok) {
    //     alert('User updated successfully!')
    //     router.push('/me/userprofilepage')
    //   }
    // } catch (error) {
    //   console.log(error)
    // } finally {
    //   setSubmitting(false)
    // }
  // }

  // const handleImageSubmit = async (e) => {
  //   e.preventDefault()
  //   const form = e.currentTarget
  //   const fileInput = Array.from(form.elements).find(
  //     ({ name }) => name === 'file'
  //   )
  //   const formData = new FormData()

  //   for (const file of fileInput.files) {
  //     formData.append('file', avarta[0])
  //   }
  // }

  // const onImageChange = (changeEvent) => {
  //   const reader = new FileReader()

  //   reader.onload = function (onLoadEvent) {
  //     setAvarta(onLoadEvent.target.result)
  //     setAvartaPreview(undefined)
  //   }
  //   reader.readAsDataURL(changeEvent.target.files[0])
    // const selectedAvarta = e.target.files[0]
    // setAvarta(selectedAvarta)
    // setAvartaPreview(URL.createObjectURL(selectedAvarta))
    // setAvarta(e.target.files[0])
  // }

  return (
    <div>
      <UpdateProfile
        type='Update'
        // user={user}
        // onImageChange={onImageChange}
        // updateUser={updateUser}
        // setUser={setUser}
        // setAvartaPreview={setAvartaPreview}
        // avarta={avarta}
        // avartaPreview={avartaPreview}
        // submitting={submitting}
        // setSubmitting={setSubmitting}
        // handleImageSubmit={handleImageSubmit}
      />
    </div>
  )
}

export default UpdateProfilePage
