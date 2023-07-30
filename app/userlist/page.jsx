// 'use client'

// import React, { useState, useEffect } from 'react'
// import axios from 'axios'
// import AllUserList from '@components/user/AllUserList'
// import { useSession } from 'next-auth/react'
// import { redirect } from 'next/navigation'

// const UserListPage = () => {
//   const [allUsers, setAllUsers] = useState([])

//   const { data: session } = useSession({
//     required: true,
//     onUnauthenticated() {
//       redirect('/login?callbackUrl=/userlist')
//     },
//   })

//   useEffect(() => {
//     const fetchUserList = async () => {
//       try {
//         const { data } = await axios.get('/api/userlist')
//         setAllUsers(data)
//       } catch (error) {
//         console.log(error)
//       }
//     }
//     fetchUserList()
//   }, [])

//   return <section>{session && <AllUserList allUsers={allUsers} />}</section>
// }
// export default UserListPage
