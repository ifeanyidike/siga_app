import { AiOutlineSearch } from 'react-icons/ai'

const Searchbar = () => {
  return (
    <div className='input_container'>
      <form
        style={{ display: 'grid', gridTemplateColumns: '4fr 1fr', gridGap: 0 }}
      >
        <input
          type='text'
          placeholder='Search Product...'
          className='search-input'
        />
        <button
          type='submit'
          variant='outline-success'
          className='searchbar-btn'
        >
          <AiOutlineSearch style={{ fontSize: '1.2rem', color: '#ffffff' }} />
        </button>
      </form>
    </div>
  )
}

export default Searchbar
