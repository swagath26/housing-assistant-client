import { useEffect } from "react";

const SearchBox = ({searchQuery, setSearchQuery, handleSearchChange}) => {

    useEffect(() => {
        document.getElementById('search-input').addEventListener('keypress', (event) => {
          if(event.key === 'Enter') {
            event.preventDefault();
            handleSearchChange();
          }
        })
    }, []);

    return (
        <div className='input-group'>
            <input type='text' id="search-input" value={searchQuery} onChange={(event) => {setSearchQuery(event.target.value)}} className='form-control' placeholder='Search by location, address, etc.' aria-label='Search' aria-describedby='search-addon'/>
            <button onClick={handleSearchChange} className='btn btn-outline-secondary' id='search-addon'>
            <i className='fas fa-search'></i>
            </button>
        </div>
    )
};

export default SearchBox;