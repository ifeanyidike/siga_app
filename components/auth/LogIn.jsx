'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { toast } from 'react-toastify'
import { parseCallbackUrl } from '@helpers/helpers'

const Login = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  // const [loading, setLoading] = useState(false)

  const params = useSearchParams()
  const callBackUrl = params.get('callbackUrl')

  const submitHandler = async (e) => {
    e.preventDefault()
    const data = await signIn('credentials', {
      email,
      password,

      callbackUrl: callBackUrl ? parseCallbackUrl(callBackUrl) : '/',
    })

    if (data) {
      toast.success('Login sucessfully')
      router.push('/')
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
        <h1>SignIn</h1>

        <input
          type='email'
          name='email'
          placeholder='Enter Your Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type='password'
          name='password'
          minLength={6}
          placeholder='Enter Your Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type='submit' value='login'>
          Sign In
        </button>
        <span>
          <span>Don't Have An Account? </span>
          <Link href='/register' className='myformlink'>
            Register Account
          </Link>
        </span>
      </form>
    </div>
  )
}

export default Login
