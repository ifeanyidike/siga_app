import Image from 'next/image'
import Link from 'next/link'

const Register = ({
  name,
  setName,
  setEmail,
  setPassword,
  setPhone,
  email,
  password,
  confirmPassword,
  setConfirmPassword,
  phone,
  loading,
  handleSubmit,
  handlePhoneChange,
  handleNameChange,
  handleEmailChange,
  handlePasswordChange,
  handleConfirmPasswordChange,
  type,
}) => {
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
      <form onSubmit={handleSubmit}>
        <h1>Register / Sign Up</h1>
        <input
          type='text'
          placeholder='Enter Your Name'
          onChange={handleNameChange}
        />
        <input
          type='email'
          placeholder='Enter Your Email'
          onChange={handleEmailChange}
        />
        <input
          type='number'
          placeholder='Enter Your Phone No'
          onChange={handlePhoneChange}
        />
        <input
          type='password'
          placeholder='Enter Your Password'
          onChange={handlePasswordChange}
        />
        <input
          type='password'
          placeholder='Confirm Password'
          onChange={handleConfirmPasswordChange}
        />
        <button
          type='submit'
          value='register'
          className='form-container-button'
        >
          {loading ? `${type}...` : type}
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
