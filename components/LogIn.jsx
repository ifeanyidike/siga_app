import Image from 'next/image'
import Link from 'next/link'

const Login = ({
  email,
  setEmail,
  password,
  setPassword,
  handleEmailChange,
  handlePasswordChange,
  handleSubmit,
}) => {
  return (
    <div className='form-container'>
      <div className='form-image'>
        <Image
          src='/assets/images/register_img.png'
          width={400}
          height={400}
          alt='register image'
        />
      </div>
      <form onSubmit={handleSubmit}>
        <h1>SignIn / LogIn</h1>

        <input
          type='email'
          name='email'
          placeholder='Enter Your Email'
          onChange={handleEmailChange}
        />
        <input
          type='password'
          name='password'
          placeholder='Enter Your Password'
          onChange={handlePasswordChange}
        />
        <button type='submit' value='login'>
          Log In
        </button>
        <span>
          Don't Have An Account?
          <Link href='/register_account' className='myformlink'>
            Register Account
          </Link>
        </span>
      </form>
    </div>
  )
}

export default Login
