'use client'

import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useContext } from 'react'
import AuthContext from '@context/AuthContext'
import Image from 'next/image'

const UserInfo = ({
  singleUserInfo,
  description,
  handleUserUpdate,
  handleUserDelete,
}) => {
  console.log(singleUserInfo)
  // const { user } = useContext(AuthContext)
  const { updateUser } = useContext(AuthContext)
  const pathName = usePathname()
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/login?callbackUrl=/me/userprofilepage')
    },
  })
  return (
    <section>
      <figure className='flex items-start sm:items-center'>
        <div className='relative'>
          <Image
            style={{ borderRadius: '50%' }}
            className='w-16 h-16 rounded-full mr-4'
            src={
              singleUserInfo?.avatar
                ? singleUserInfo.avatar.url
                : '/assets/images/defaultimage.png'
            }
            alt={singleUserInfo?.name}
            width={100}
            height={100}
          />
        </div>
        <figcaption>
          <h5 className='font-semibold text-lg'>{singleUserInfo?.name}</h5>
          <p>
            <b>Email:</b> {singleUserInfo?.email} | <b>Joined On: </b>
            {singleUserInfo?.createdAt}
          </p>
          <h1>You are the {singleUserInfo?.role}</h1>
        </figcaption>
        <p>{description}</p>
      </figure>
      {session?.user.id ||
        (pathName === '/me/userprofilepage' && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {' '}
            <p
              style={{
                fontFamily: 'inter',
                padding: '20px 30px',

                fontSize: 'small',
                cursor: 'pointer',
                color: 'green',
              }}
              onClick={handleUserUpdate}
            >
              Edit
            </p>
            <p
              style={{
                fontFamily: 'inter',
                fontSize: 'small',
                color: 'orange',
                cursor: 'pointer',
                padding: '20px 30px',
              }}
              onClick={handleUserDelete}
            >
              Delete
            </p>
          </div>
        ))}
    </section>
  )
}

export default UserInfo
