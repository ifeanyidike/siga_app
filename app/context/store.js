'use client'
import {
  createContext,
  useReducer,
  Dispatch,
  SetStateAction,
  useState,
  useContext,
} from 'react'

export const GlobalContext = createContext()

const initialState = {
  wishList: { wishListItems: [] },
}
function reducer(state, action) {
  switch (action.type) {
    case 'CART_ADD_ITEM': {
      const newItem = action.payload
      const existItem = state.wishList.wishListItems.find(
        (item) => item.slug === newItem.slug
      )
      const wishListItems = existItem
        ? state.wishList.wishListItems.map((item) =>
            item.name === existItem.name ? newItem : item
          )
        : [...state.wishList.wishListItems, newItem]
      return { ...state, wishList: { ...state.wishList, wishListItems } }
    }
    default:
      return state
  }
}

export const GlobalContextProvider = ({ children }) => {
  const [wishList, setWishList] = useState('')
  const [wishListItems, setWishListItems] = useState([])
  const [state, dispatch] = useReducer(reducer, initialState)
  const value = {
    state,
    dispatch,
    wishList,
    setWishList,
    wishListItems,
    setWishListItems,
  }
  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  )
}

export const useGlobalContext = () => useContext(GlobalContext)
