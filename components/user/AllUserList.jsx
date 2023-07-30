'use client'

import Link from 'next/link'
import { TrashIcons, EditIcons } from '@components/Icons'
import { useContext } from 'react'
import AuthContext from '@context/AuthContext'
import Image from 'next/image'

const AllUserList = ({ allUsers, deleteData }) => {
  const { user } = useContext(AuthContext)
  console.log(allUsers)
  return (
    <section className='userlist_container'>
      <div className='userlist_heading'>
        <Link href={'/'}>GO HOME</Link>
        <div>
          <h1>Users' List</h1>
        </div>
        <Link href={'/register'}>
          <button>Register User</button>
        </Link>
      </div>
      <div>
        <div className='singleuserimage' >
          <Image
            style={{ borderRadius: '50%', marginBottom: '15px' }}
            src={
              user?.avarta
                ? user.avarta.url
                : '/assets/images/BeautifulImage.jpg'
            }
            width={100}
            height={100}
            alt={user?.name}
          />
        </div>
        <div className='singleuserinfo'>
          {allUsers.map((singleUser) => (
            <div className='singleuserdetails'>
              <h3>{singleUser.name}</h3>
              <ul>
                <li>{singleUser.email}</li>
                <li>{singleUser.phone}</li>
                <li>{singleUser.role}</li>
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AllUserList
