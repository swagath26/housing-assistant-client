import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LatestListings.css';
import PropertyCard from '../common/PropertyCard';

const LatestListings = () => {

    const [properties, setProperties] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
  
    const fetchProperties = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('/api/properties_list/', {
          params: {
            page: 1,
            page_size: 10
          }
        })
        setProperties(response.data.results);
        setIsLoading(false);
      }
      catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    }
  
    useEffect(() => {
      fetchProperties();
    }, []);
  
    const handlePreviousSlide = () => {
      const scrollContainer = document.getElementById('property-scroll-div');
      const isAtLeftEdge = scrollContainer.scrollLeft < 50;
      var scrollby = -350
      if (scrollContainer.clientWidth >= 1320) {
        scrollby = -1050;
      }
      else if (scrollContainer.clientWidth >= 960) {
        scrollby = -700;
      }
      !isAtLeftEdge && scrollContainer.scrollBy({left: scrollby, behavior:'smooth'});
    }
  
    const handleNextSlide = () => {
      const scrollContainer = document.getElementById('property-scroll-div');
      const isAtRightEdge = scrollContainer.scrollLeft + 50 > scrollContainer.scrollWidth - scrollContainer.clientWidth;
    
      var scrollby = 350;
      if (scrollContainer.clientWidth >= 1320) {
        scrollby = 1050;
      }
      else if (scrollContainer.clientWidth >= 960) {
        scrollby = 700;
      }
      !isAtRightEdge && scrollContainer.scrollBy({left: scrollby, behavior:'smooth'});
    }
  
    function updateScrollIconVisibility() {
      const scrollContainer = document.getElementById('property-scroll-div');
      const scrollLeftButton = document.getElementById('scroll-left-button');
      const scrollRightButton = document.getElementById('scroll-right-button');
    
      const isAtLeftEdge = scrollContainer.scrollLeft < 50;
      const isAtRightEdge = scrollContainer.scrollLeft + 50 > scrollContainer.scrollWidth - scrollContainer.clientWidth;
    
      scrollLeftButton.style.opacity = isAtLeftEdge ? 0.5 : 1;
      document.getElementById('scroll-left-button-div').style.cursor = isAtLeftEdge ? 'default' : 'pointer';
      scrollRightButton.style.opacity = isAtRightEdge ? 0.5 : 1;
      document.getElementById('scroll-right-button-div').style.cursor = isAtRightEdge ? 'default' : 'pointer';
    }
  
    return (
        <div className="container pb-5 pt-3 px-0">
          <div className='row px-3 mx-0'>
            <div className='col-8 col-md-9 col-xl-10 px-0'>
              <h1 className='fs-3'>Homes For You</h1>
              <p className='lead fs-6'>Recently listed</p>
            </div>
            <div className='col-1'></div>
            <div className='col-3 col-md-2 col-xl-1 px-0 d-flex align-items-center justify-content-between'>
              <div id="scroll-left-button-div" onClick={handlePreviousSlide}>
              <i id='scroll-left-button' className='fa-solid fa-chevron-left'/>
              </div>
              <div id="scroll-right-button-div" onClick={handleNextSlide}>
                <i id='scroll-right-button' className='fa-solid fa-chevron-right'/>
              </div>
            </div>
          </div>
  
          {isLoading && <p>Loading Properties...</p>}
          {!isLoading && properties.length === 0 &&
          <div className='text-center w-100'>No properties listed yet</div>}
          {!isLoading && properties.length > 0 &&
          <ul id='property-scroll-div' className='property-scroll-div pb-2 p-0 my-0' onScroll={updateScrollIconVisibility}>
            {properties.map((property) => (
              <li className='property-card-div px-3' key={property.id}>
                <PropertyCard property={property} />
              </li>
            ))} 
            <li className='property-card-div h-100 px-3'>
              <button className='btn btn-outline-primary d-flex align-items-center' onClick={() => navigate(`/buy`)}>
                Browse for<br/> More</button>
            </li>
          </ul>
          }
        </div>
    )
}

export default LatestListings;