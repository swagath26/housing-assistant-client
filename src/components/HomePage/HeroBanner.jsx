import heroimg from '../../assets/img/housing-bg.jpg';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const HeroBanner = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const handleSearch = () => {
      navigate(`/buy/${searchQuery}`)
    };
    useEffect(() => {
      document.getElementById('search-input').addEventListener('keypress', (event) => {
        if(event.key === 'Enter') {
          event.preventDefault();
          navigate(`/buy/${event.target.value}`);
        }
      })
    }, []);
    
    return (
      // <div className="tw-relative tw-flex tw-flex-col tw-justify-between tw-items-center tw-h-screen" style={{ padding: '12vh 0' }}>
      //   <img src={heroimg} alt='' className='tw-absolute tw-top-0 tw-left-0 tw-w-full tw-h-full tw-object-cover' style={{ zIndex: -1 }} />
      //   <div className="tw-text-center tw-text-light">
      //     <h1 className="tw-text-5xl tw-font-bold">Welcome To Housing</h1>
      //     <p className="tw-text-base tw-font-light">Find your dream home with us</p>
      //   </div>
      //   <div className='tw-w-5/12 tw-text-light'>
      //     <div className='tw-flex tw-items-center tw-space-x-2'>
      //       <input
      //         type='text'
      //         id="search-input"
      //         value={searchQuery}
      //         onChange={(event) => { setSearchQuery(event.target.value) }}
      //         className='tw-form-input tw-w-full'
      //         placeholder='Search by location, address, etc.'
      //         aria-label='Search'
      //         aria-describedby='search-addon'
      //       />
      //       <button onClick={handleSearch} className='tw-btn tw-btn-outline-light' id='search-addon'>
      //         <i className='fas fa-search'></i>
      //       </button>
      //     </div>
      //   </div>
      // </div>
      <div className="view vh-100 d-flex flex-column justify-content-between align-items-center" style={{padding: '12vh 0'}}>
        <img src={heroimg} alt='' className='vh-100 w-100 object-fit-cover' style={{position: 'absolute', top: '0', zIndex: -1}} />
        <div className="text-center text-light">
          <h1 className="display-5 fw-bold">Welcome To Housing</h1>
          <p className="fs-6 fw-light">Find your dream home with us</p>
        </div>
        <div className='col-5 text-light'>
          <div className='input-group'>
            <input type='text' id="search-input" value={searchQuery} onChange={(event) => {setSearchQuery(event.target.value)}} className='form-control' placeholder='Search by location, address, etc.' aria-label='Search' aria-describedby='search-addon'/>
            <button onClick={handleSearch} className='btn btn-outline-light' id='search-addon'>
              <i className='fas fa-search'></i>
            </button>
          </div>
        </div>
      </div>

    )
}

export default HeroBanner;