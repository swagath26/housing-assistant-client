const SortButton = ({sortBy, setSortBy}) => {
    return (
      <div className='dropdown'>
        <button className='btn text-nowrap dropdown-toggle' type='button' id='sortDropdown' data-bs-toggle='dropdown' aria-expanded='false'>
          Sort: {
          (sortBy === '' && 'Default') ||
          (sortBy === 'price' && 'Price (Low to High)') ||
          (sortBy === '-price' && 'Price (High to Low)')
          }
        </button>
        <ul className='dropdown-menu' aria-labelledby='sortDropdown'>
          <li><button className='dropdown-item' onClick={() => setSortBy('')}>Default</button></li>
          <li><button className='dropdown-item' onClick={() => setSortBy('price')}>Price (Low to High)</button></li>
          <li><button className='dropdown-item' onClick={() => setSortBy('-price')}>Price (High to Low)</button></li>
        </ul>
      </div>
    )
}

export default SortButton;