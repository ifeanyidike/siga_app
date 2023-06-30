import Image from 'next/image'
import Link from 'next/link'
import Register from '@components/Register'
import LogIn from '@components/LogIn'
// import data from '@utils/data'
import axios from 'axios'
import Listservices from '@components/servicesfolder/Listservices'

const getServices = async () => {
  const { data } = await axios.get(
    `${process.env.SERVICE_DATA_URI}/api/ourservices`
  )
  return data
}

const Homepage = async () => {
  const serviceData = await getServices()
  console.log(serviceData)
  return (
    <section className='homepage'>
      <div className='image-container'>
        <Image
          src='/assets/images/banner.png'
          alt='banner display'
          width={500}
          height={500}
        />
      </div>
      <div className='text-container'>
        <h2>This Month's</h2>
        <h2>Spotlight Event!</h2>
        <p>
          Dream your moments, Until I Met You, Gimme Some Courage, Dark Alley,
          One More Of A Stranger, Endless Things, The Heartbeat Stops, Walking
          Promises, Desired Games and many more...
        </p>
      </div>
      <div className='sigaserviceitem_container'>
        <Listservices key={serviceData._id} data={serviceData} />
      </div>
    </section>
  )
}

export default Homepage
