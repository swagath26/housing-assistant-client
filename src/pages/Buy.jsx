import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import './Buy.css';
import BathsFilterBox from '../components/Buy/BathsFilterBox';
import BedsFilterBox from '../components/Buy/BedsFilterBox';
import HomeTypeFilterBox from '../components/Buy/HomeTypeFilterBox';
import SortButton from '../components/Buy/SortButton';
import PropertyCard from '../components/Buy/PropertyCard';
import PriceFilterBox from '../components/Buy/PriceFilterBox';
import AreaFilterBox from '../components/Buy/AreaFilterBox';
import SearchBox from '../components/Buy/SearchBox';
import geocode from '../utils/geocode';
import initMap from '../utils/initMap';
import debounce from '../utils/debounce';
import throttle from '../utils/throttle';

const Buy = () => {

  const hasMounted = useRef(false);
  const params = useParams();
  const [properties, setProperties] = useState([]);
  const [propertyCount, setPropertyCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [showCurrentPage, setShowCurrentPage] = useState(1);
  const pageSize = 50;
  const [pageCount, setPageCount] = useState(1);

  const [searchQuery, setSearchQuery] = useState(params.search_query? params.search_query : '' );
  const searchQueryRef = useRef(searchQuery);
  searchQueryRef.current = searchQuery;
  const [sortBy, setSortBy] = useState('');

  const [minPriceFilter, setMinPriceFilter] = useState('');
  const [maxPriceFilter, setMaxPriceFilter] = useState('');
  const [minAreaFilter, setMinAreaFilter] = useState('');
  const [maxAreaFilter, setMaxAreaFilter] = useState('');
  const [bedsFilter, setBedsFilter] = useState([]);
  const [minBedsFilter, setMinBedsFilter] = useState('');
  const [minBathsFilter, setMinBathsFilter] = useState('');
  const [homeTypeFilter, setHomeTypeFilter] = useState([]);

  const [minLatFilter, setMinLatFilter] = useState();
  const [maxLatFilter, setMaxLatFilter] = useState();
  const [minLngFilter, setMinLngFilter] = useState();
  const [maxLngFilter, setMaxLngFilter] = useState();

  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const [markers] = useState({});

  const [center, setCenter] = useState([12.98, 77.58]);

  const [refetch, setRefetch] = useState(false);
  const abortController = useRef(null);

  const [filterPrice, setFilterPrice] = useState('Price');
  const [filterBeds, setFilterBeds] = useState('Beds');
  const [filterBaths, setFilterBaths] = useState('Baths');
  const [filterArea, setFilterArea] = useState('Area');
  const [filterHomeType, setFilterHomeType] = useState('Type');

  const handleMapFilter = () => {
    console.log('handle map');
    if (mapRef.current?.getBounds()._southWest.lat !== mapRef.current?.getBounds()._northEast.lat && mapRef.current?.getBounds()._southWest.lng !== mapRef.current?.getBounds()._northEast.lng) {
      setMinLatFilter(mapRef.current?.getBounds()._southWest.lat);
      setMaxLatFilter(mapRef.current?.getBounds()._northEast.lat);
      setMinLngFilter(mapRef.current?.getBounds()._southWest.lng);
      setMaxLngFilter(mapRef.current?.getBounds()._northEast.lng);
    }
  }

  const handleSearchChange = async () => {
    let [lat, lng] = await geocode(searchQueryRef.current);
    if (lat && lng) {
      setCenter([lat,lng]);
      mapRef.current?.setView([lat,lng], 11);
    } else {
      console.log("No results found for:", searchQueryRef.current);
    }
  };

  useEffect(() => {

    if(!mapRef.current)  {
      mapRef.current = initMap(mapContainerRef.current, center);
      mapRef.current?.addEventListener('move', debounce(handleMapFilter, 200));
      mapRef.current?.addEventListener('zoom', debounce(handleMapFilter, 200));
      document.querySelector('.map-row a img').style.display = 'none';
      document.querySelector('.leaflet-bottom.leaflet-right').style.display = 'none';
      if (searchQueryRef.current)
        handleSearchChange();
      else {
        handleMapFilter();
      }
    }
  }, []);

  useEffect(() => {
    if (hasMounted.current) {
      newFetch();
    }
    else {
      hasMounted.current = true;
    }
  }, [currentPage, sortBy, minLatFilter, maxLatFilter, minLngFilter, maxLngFilter, 
    minPriceFilter, maxPriceFilter, minAreaFilter, maxAreaFilter, minBathsFilter, 
    bedsFilter, minBedsFilter, homeTypeFilter]);

  const newFetch = () => {
    if(!isLoading) {
      fetchProperties();
    }
    else if(abortController.current) {
      abortController.current.abort();
    }
  };

  const fetchProperties = async () => {
    const controller = new AbortController();
    abortController.current = controller;
    try {
      setIsLoading(true);
      const response = await axios.get('/api/properties_list/', {
        params: {
          page: currentPage,
          ordering: sortBy,
          min_lat: minLatFilter,
          max_lat: maxLatFilter,
          min_lng: minLngFilter,
          max_lng: maxLngFilter,
          min_price: minPriceFilter,
          max_price: maxPriceFilter,
          min_area: minAreaFilter,
          max_area: maxAreaFilter,
          beds: bedsFilter.join(','),
          min_bed: minBedsFilter,
          min_bath: minBathsFilter,
          type: homeTypeFilter.join(',')
        },
        signal: controller.signal,
      });
      setProperties(response.data.results);
      setPropertyCount(response.data.count);
      setShowCurrentPage(currentPage);
      setPageCount(Math.trunc(response.data.count/pageSize) + 1);
      setError(null);
      setIsLoading(false);
      abortController.current = null;
    }
    catch (error) {
      if (error.name !== 'CanceledError') {
        console.log('canceled error');
        setError(error);
        setIsLoading(false);
        abortController.current = null;
      }
      else {
        console.log('other error, set refetch');
        abortController.current = null;
        setRefetch(true);
      }
    }
  };

  useEffect(() => {
    if(refetch) {
      setRefetch(false);
      fetchProperties();
    }
  }, [refetch])

  useEffect(() => {
      for(let key in markers)
        markers[key].remove();
      properties.forEach(property => {
        if (property.latitude && property.longitude && mapRef.current) {
            let new_marker = window.L.marker(
              [parseFloat(property.latitude), parseFloat(property.longitude)], 
              {icon: icon_std}
            ).addTo(mapRef.current);
          new_marker.bindPopup(property.price)
          markers[property.id] = new_marker;
        }
      });
  }, [properties]);

  const icon_std = window.L.icon({
    iconUrl: "/static/img/map_icon_std.png",
    shadowUrl: "/static/img/map_icon_shadow.png",
    iconSize: [14, 14],
    shadowSize: [16, 16],
  })

  const icon_hov = window.L.icon({
    iconUrl: "/static/img/map_icon_hover.png",
    shadowUrl: "/static/img/map_icon_shadow.png",
    iconSize: [20, 20],
    shadowSize: [23, 23],
  })

  const handleNextpage = () => {
    if (currentPage < pageCount) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const clearFilters = () => {
    setMinPriceFilter('');
    setMaxPriceFilter('');
    setMinAreaFilter('');
    setMaxAreaFilter('');
    setMinBedsFilter('');
    setMinBathsFilter('');
    setHomeTypeFilter([]);
    setBedsFilter([]);
    setCurrentPage(1);
    setFilterPrice('Price');
    setFilterBaths('Baths');
    setFilterBeds('Beds');
    setFilterArea('Area');
    setFilterHomeType('Type');
  }

  return (
    <div className='buy-container row m-0' style={{height: '100vh', paddingTop: '10vh'}}>

      <div className="map-section col-lg-6 col-xl-5 col-xxl-4 d-flex px-0 flex-column">
        <div className='row search-row m-0 d-flex p-2 align-items-center'>
          <div className='col-lg-10 col-8 p-0 py-2'>
            <SearchBox 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              handleSearchChange={handleSearchChange}
            />
          </div>

          <div className='col-2 px-0 ps-2 d-flex justify-content-center'>
            <button className='btn btn-outline-dark' style={{width:'100%'}} id='filter-toggle-button' data-bs-toggle='collapse' data-bs-target='#filter-collapse'>Filter</button>
          </div>
        </div>

        <div className='row m-0 flex-grow-1' id='map-collapse'>
          <div className='map-box d-flex h-100 align-items-top justify-content-center px-0'>
            <div ref={mapContainerRef} className='row map-row h-100 w-100'></div>
          </div>
        </div>

      </div>

      <input id='map-toggle-button' type='checkbox' style={{background: 'white', color: 'black', outline: '1px solid black', position: 'fixed', zIndex: 900, bottom: '30px'}} 
        onClick={() => mapRef.current?.invalidateSize()}>
      </input>

      <div className='property-section col-lg-6 col-xl-7 col-xxl-8 px-2' id='property-section'>

        <div className='filter-section collapse' id="filter-collapse">
          <div className='filter-row d-flex align-items-center'>
            <div className='col-2 d-flex justify-content-center'>
              <button className='btn btn-text-nowrap dropdown-toggle' style={{width:'85%'}} data-bs-toggle='dropdown' data-bs-auto-close="outside" aria-expanded='false'>
                {filterPrice}
              </button>
              <div className="dropdown-menu m-0 p-0">
                <PriceFilterBox 
                  setMinPriceFilter={setMinPriceFilter}
                  minPriceFilter={minPriceFilter}
                  maxPriceFilter={maxPriceFilter}
                  setMaxPriceFilter={setMaxPriceFilter}
                  setFilterPrice={setFilterPrice}
                  setCurrentPage={setCurrentPage}
                />
              </div>
            </div>
            <div className='col-2 d-flex justify-content-center'>
              <button className='btn btn-text-nowrap dropdown-toggle' style={{width:'85%'}} data-bs-toggle='dropdown' data-bs-auto-close="outside" aria-expanded='false'>
                {filterBeds}
              </button>
                <div className="dropdown-menu m-0 p-0">
                  <BedsFilterBox
                    bedsFilter={bedsFilter}
                    setBedsFilter={setBedsFilter}
                    minBedsFilter={minBedsFilter}
                    setMinBedsFilter={setMinBedsFilter}
                    setFilterBeds={setFilterBeds}
                    setCurrentPage={setCurrentPage}
                  />
                </div>
            </div>
            <div className='col-2 d-flex justify-content-center'>
              <button className='btn btn-text-nowrap dropdown-toggle' style={{width:'85%'}} data-bs-toggle='dropdown' data-bs-auto-close="outside" aria-expanded='false'>
                {filterBaths}
              </button>
                <div className="dropdown-menu m-0 p-0" id='baths-dropdown'>
                <BathsFilterBox 
                  minBathsFilter={minBathsFilter}
                  setMinBathsFilter={setMinBathsFilter}
                  setFilterBaths={setFilterBaths}
                  setCurrentPage={setCurrentPage} 
                />
                </div>
            </div>
            <div className='col-2 d-flex justify-content-center'>
              <button className='btn btn-text-nowrap dropdown-toggle' style={{width:'85%'}} data-bs-toggle='dropdown' data-bs-auto-close="outside" aria-expanded='false'>
                {filterArea}
              </button>
                <div className="dropdown-menu m-0 p-0">
                  <AreaFilterBox 
                    setMinAreaFilter={setMinAreaFilter}
                    minAreaFilter={minAreaFilter}
                    maxAreaFilter={maxAreaFilter}
                    setMaxAreaFilter={setMaxAreaFilter}
                    setFilterArea={setFilterArea}
                    setCurrentPage={setCurrentPage}
                  />
                </div>
            </div>
            <div className='col-2 d-flex justify-content-center'>
              <button className='btn btn-text-nowrap dropdown-toggle' style={{width:'85%'}} data-bs-toggle='dropdown' data-bs-auto-close="outside" aria-expanded='false'>
                {filterHomeType}
              </button>
                <div className="dropdown-menu m-0 p-0">
                  <HomeTypeFilterBox 
                    setHomeTypeFilter={setHomeTypeFilter} 
                    homeTypeFilter={homeTypeFilter}
                    setFilterHomeType={setFilterHomeType}
                    setCurrentPage={setCurrentPage}
                  />
                </div>
            </div>
            <div className='col-2 d-flex justify-content-center'>
              <button className='btn text-nowrap' onClick={clearFilters} style={{width:'85%'}}>
                Clear
              </button>
            </div>
          </div>
        </div>

        <div className={`list-section ${isLoading? 'loading' : 'loaded'}`} id="list-section">

          <div className='row p-2 m-0 list-section-header'>
            <div className='col-6'>
              <div>
                <b>Homes for sale</b>
              </div>

              {isLoading ?
              <div>Properties Loading...</div>
              : <div>{propertyCount} Result{propertyCount>1 && 's'}</div>
              }
            </div>
            
            <div className='col-6 d-flex justify-content-end'>
              <SortButton
                sortBy={sortBy}
                setSortBy={setSortBy}
              />
            </div>
          </div>

          <div className='row p-1 m-0 list-section-body'>
            {!isLoading && error && 
            <div className='list-error'>
              <p>Error: {error.message}</p>
            </div> 
            }
            {properties.length > 0 &&
            <div className='list-loaded'>
              <div className='row p-0 m-0'>
                {properties.map((property) => (
                  <div key={property.id} className='col-12 col-md-6 col-lg-12 col-xl-6 col-xxl-4 d-flex justify-content-center p-1'
                    onMouseEnter={() => {
                      markers[property.id]?.setIcon(icon_hov)}
                    }
                    onMouseLeave={() => {
                      markers[property.id]?.setIcon(icon_std)}
                  }>
                    <PropertyCard property={property} />
                  </div>
                ))}
              </div>

              <div className='row py-4 m-0'>
                <div className='col-4 d-flex justify-content-center'>
                  <button className='btn btn-primary' onClick={handlePreviousPage}>Previous</button>
                </div>
                <div className='col-4 px-0 d-flex justify-content-center align-items-center'>
                  <span>Page {showCurrentPage} of {pageCount} </span>
                </div>
                <div className='col-4 d-flex justify-content-center'>
                  <button className='btn btn-primary' onClick={handleNextpage}>Next</button>
                </div>
              </div>
            </div>
            }
            {!isLoading && properties.length === 0 &&
            <div className='list-noresult'>
              <p>No properties found.</p>
            </div>
            }
          </div>

          <footer className="footer py-2 bg-light mt-auto list-section-footer" style={{height:'10vh'}}>
            <div className="container">
              <p className="text-center text-muted">&copy; 2024 Housing</p>
            </div>
          </footer>
        
        </div>

      </div>
      
    </div>
  );
};

export default Buy;