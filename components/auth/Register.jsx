'use client'

import { useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import AuthContext from '@context/AuthContext'
import { toast } from 'react-toastify'

const Register = () => {
  const { error, clearError, registerUser, success, clearSuccess } =
    useContext(AuthContext)
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState()
  // const [loading, setLoading] = useState(false)

  const submitHandler = async (e) => {
    e.preventDefault()
    const registered = await registerUser({
      name,
      email,
      password,
      phone,
    })
    console.log(registered)
    if (!registered) {
      // Change this condition to check for truthy value
      toast.success('Successfully Registered')
      router.push('/login')
    } else {
      toast.error(error)
    }
  }

  return (
    <div className='form-container'>
      <div className='form-image'>
        <Image
          src='/assets/images/register_img.png'
          width={400}
          height={400}
          alt='register image'
          className='register-image'
        />
      </div>

      <form onSubmit={submitHandler}>
        <h1>Register / Sign Up</h1>
        <input
          type='text'
          placeholder='Enter Your Name'
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type='email'
          placeholder='Enter Your Email'
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type='number'
          placeholder='Enter Your Phone No'
          value={phone}
          required
          onChange={(e) => setPhone(e.target.value)}
        />
        <input
          type='password'
          placeholder='Enter Your Password'
          required
          minLength={6}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type='password' placeholder='Confirm Password' />
        <button type='submit' className='form-container-button'>
          create user
        </button>
        <span>
          Already Have An Account?
          <Link href='/login' className='myformlink'>
            Login Here
          </Link>
        </span>
      </form>
    </div>
  )
}

export default Register
