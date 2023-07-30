import Sidebar from '@components/Sidebar'

export default function UserLayout({ children }) {
  return (
    <>
      <section>
        <div>
          <h1 className='user_dashboard'> User Dashboard</h1>
        </div>
      </section>
      <section className='py-10'>
        <div className='container max-w-screen-xl mx-auto px-4'>
          <div className='flex flex-col md:flex-row -mx-4'>
            <Sidebar />
            <main className='md:w-2/3 lg:w-3/4 px-4'>
              <article>{children}</article>
            </main>
          </div>
        </div>
      </section>
    </>
  )
}
