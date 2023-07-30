'use client'

import { useContext } from 'react'
import CartContext from '@context/CartContext'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

const WishList = () => {
  const { addItemToCart, cart, deleteItemFromCart } = useContext(CartContext)

  const { data: session, status } = useSession()
  console.log(session)
  const increaseQty = (cartItem) => {
    const newQty = cartItem?.quantity + 1
    const item = { ...cartItem, quantity: newQty }

    // if (newQty > Number(cartItem.quantity)) return
    addItemToCart(item)
  }

  const decrementQty = (cartItem) => {
    const newQty = cartItem?.quantity - 1
    const item = { ...cartItem, quantity: newQty }

    if (newQty <= 0) return
    addItemToCart(item)
  }

  return (
    <>
      <section>
        <div>
          <h2 className='title'>
            {cart?.cartItems?.length || 0} Service(s) in Wishlist
          </h2>
          <h3>Wished By:{session?.user?.name}</h3>
          <h3>Email{session?.user?.email}</h3>
        </div>
      </section>
      {cart?.cartItems?.length > 0 && (
        <section>
          <div>
            <div>
              <main>
                <article>
                  {cart?.cartItems?.map((cartItem) => (
                    <div>
                      <div>
                        <div>
                          <figure>
                            <div>
                              <div>
                                <Image
                                  src={
                                    cartItem.image
                                      ? cartItem.image
                                      : '/assets/images/joy.png'
                                  }
                                  alt='Title'
                                  width={60}
                                  height={60}
                                />
                              </div>
                            </div>
                            <figcaption className='figcaption'>
                              <p>
                                <a href='#' className='wish_name'>
                                  {cartItem.name}
                                </a>
                              </p>
                              <p className='wish_category'>
                                {' '}
                                Category: {cartItem.category}
                              </p>
                            </figcaption>
                          </figure>
                        </div>
                        <div className='wish_btn_container'>
                          <div className='wish-btn-wrapper'>
                            <button
                              data-action='decrement'
                              className=' wish-qty-btn'
                              onClick={() => decrementQty(cartItem)}
                            >
                              <span className='wish_qty_decrement'>−</span>
                            </button>
                            <input
                              type='number'
                              className='wish_input'
                              name='custom-input-number'
                              value={cartItem.quantity}
                              readOnly
                            ></input>
                            <button
                              data-action='increment'
                              className='wish_qty_btn_increment'
                              onClick={() => increaseQty(cartItem)}
                            >
                              <span className='wish_qty_increment'>+</span>
                            </button>
                          </div>
                        </div>

                        <div className='wish_remove_container'>
                          <div className='float-right'>
                            <a
                              className='px-4 py-2 inline-block text-red-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer'
                              onClick={() =>
                                deleteItemFromCart(cartItem?.service)
                              }
                            >
                              Remove
                            </a>
                          </div>
                        </div>
                      </div>

                      <hr className='my-4' />
                    </div>
                  ))}
                </article>
              </main>
              <aside className='md:w-1/4'>
                <article className='border border-gray-200 bg-white shadow-sm rounded mb-5 p-3 lg:p-5'>
                  <a className='px-4 py-3 mb-2 inline-block text-lg w-full text-center font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 cursor-pointer'>
                    Continue
                  </a>

                  <Link
                    href={'/'}
                    className='px-4 py-3 inline-block text-lg w-full text-center font-medium text-green-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100'
                  >
                    Back to shop
                  </Link>
                </article>
              </aside>
            </div>
          </div>
        </section>
      )}
    </>
  )
}

export default WishList
