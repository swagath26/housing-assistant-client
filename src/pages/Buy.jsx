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
import FooterComponent from '../components/layout/FooterComponent';

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

  const isExactMatchBedsRef = useRef(false);

  const [filters, setFilters] = useState({
    minPriceFilter : '',
    maxPriceFilter : '',
    minAreaFilter : '',
    maxAreaFilter : '',
    bedsFilter : [],
    minBedsFilter : '',
    minBathsFilter : '',
    homeTypeFilter : []
  });

  const [filterNames, setFilterNames] = useState({
    price: 'Price Range',
    beds: 'Beds',
    baths: 'Baths',
    area: 'Home Size',
    homeType: 'Home Type'
  });

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

  const handleMapFilter = () => {
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
  }, [currentPage, sortBy, minLatFilter, maxLatFilter, minLngFilter, maxLngFilter, filters]);

  const newFetch = () => {
    if(!isLoading) {
      fetchProperties();
    }
    else if(abortController.current) {
      abortController.current.abort();
    }
  };

  const fetchProperties = async () => {
    // console.log('fetch');
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
          min_price: filters.minPriceFilter,
          max_price: filters.maxPriceFilter,
          min_area: filters.minAreaFilter,
          max_area: filters.maxAreaFilter,
          beds: filters.bedsFilter.join(','),
          min_bed: filters.minBedsFilter,
          min_bath: filters.minBathsFilter,
          type: filters.homeTypeFilter.join(',')
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
        // console.log('canceled error');
        setError(error);
        setIsLoading(false);
        abortController.current = null;
      }
      else {
        // console.log('other error, set refetch');
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

  const updateFilter = (filterName, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterName]: value
    }));
    setCurrentPage(1);
  };

  const updateFilterName = (filter, name) => {
    setFilterNames(prevFilterNames => ({
      ...prevFilterNames,
      [filter]: name
    }));
  };

  const clearFilters = () => {
    setFilters({
      minPriceFilter : '',
      maxPriceFilter : '',
      minAreaFilter : '',
      maxAreaFilter : '',
      bedsFilter : [],
      minBedsFilter : '',
      minBathsFilter : '',
      homeTypeFilter : []
    });
    setFilterNames({
      price: 'Price Range',
      beds: 'Beds',
      baths: 'Baths',
      area: 'Home Size',
      homeType: 'Home Type'
    });
    setCurrentPage(1);
  };

  const FilterSection = () => {
    return (
      <div className={`tw-flex-wrap tw-justify-evenly tw-gap-4 tw-pt-1 tw-pb-3
         ${isFilterToggled ? 'tw-hidden' : 'tw-flex'} lg:tw-flex`}>

        <div className='d-flex justify-content-center tw-grow'>
          <button className='tw-grow tw-px-3 tw-rounded-md dropdown-toggle tw-font-normal hover:tw-bg-slate-100 active:tw-bg-slate-200 hover:tw-border-slate-400 
            tw-border tw-border-solid tw-border-slate-400 tw-py-2' data-bs-toggle='dropdown' data-bs-auto-close="outside" aria-expanded='false'>
            {filterNames.price}
          </button>
          <div className="dropdown-menu m-0 p-0">
            <PriceFilterBox 
              minPriceFilter={filters.minPriceFilter}
              maxPriceFilter={filters.maxPriceFilter}
              updateFilter={updateFilter}
              updateFilterName={updateFilterName}
            />
          </div>
        </div>
        <div className='d-flex justify-content-center tw-grow'>
          <button className='tw-grow tw-px-3 tw-rounded-md dropdown-toggle tw-font-normal hover:tw-bg-slate-100 active:tw-bg-slate-200 hover:tw-border-slate-400 
            tw-border tw-border-solid tw-border-slate-400 tw-py-2' data-bs-toggle='dropdown' data-bs-auto-close="outside" aria-expanded='false'>
            {filterNames.beds} & {filterNames.baths}
          </button>
            <div className="dropdown-menu m-0 p-0">
              <BedsFilterBox
                bedsFilter={filters.bedsFilter}
                minBedsFilter={filters.minBedsFilter}
                isExactMatchBedsRef={isExactMatchBedsRef}
                updateFilter={updateFilter}
                updateFilterName={updateFilterName}
                minBathsFilter={filters.minBathsFilter}
              />
            </div>
        </div>
        
        <div className='d-flex justify-content-center tw-grow'>
          <button className='tw-grow tw-px-3 tw-rounded-md dropdown-toggle tw-font-normal hover:tw-bg-slate-100 active:tw-bg-slate-200 hover:tw-border-slate-400 
            tw-border tw-border-solid tw-border-slate-400 tw-py-2' data-bs-toggle='dropdown' data-bs-auto-close="outside" aria-expanded='false'>
            {filterNames.area}
          </button>
            <div className="dropdown-menu m-0 p-0">
              <AreaFilterBox 
                minAreaFilter={filters.minAreaFilter}
                maxAreaFilter={filters.maxAreaFilter}
                updateFilter={updateFilter}
                updateFilterName={updateFilterName}
              />
            </div>
        </div>
        <div className='d-flex justify-content-center tw-grow'>
          <button className='tw-grow tw-px-3 tw-rounded-md dropdown-toggle tw-font-normal hover:tw-bg-slate-100 active:tw-bg-slate-200 hover:tw-border-slate-400 
            tw-border tw-border-solid tw-border-slate-400 tw-py-2' data-bs-toggle='dropdown' data-bs-auto-close="outside" aria-expanded='false'>
            {filterNames.homeType}
          </button>
            <div className="dropdown-menu m-0 p-0">
              <HomeTypeFilterBox 
                homeTypeFilter={filters.homeTypeFilter}
                updateFilter={updateFilter}
                updateFilterName={updateFilterName}
              />
            </div>
        </div>
        <div className='d-flex justify-content-center tw-grow'>
          <button className='tw-grow btn text-nowrap' onClick={clearFilters}>
            Clear
          </button>
        </div>
      </div>
    )
  }

  const ListSection = () => {
    return (
      <div className={`list-section tw-h-full ${isLoading? 'loading' : 'loaded'}`} id="list-section">
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
                  <div key={property.id} className='col-12 col-md-6 col-lg-12 col-xl-6 d-flex justify-content-center p-2'
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
        </div>
    )
  }

  const [isMapToggled, setIsMapToggled] = useState(true);
  const [isFilterToggled, setIsFilterToggled] = useState(true);

  useEffect(() => {
    mapRef.current?.invalidateSize();
  }, [isMapToggled]);

  return (
    <div className='tw-h-full tw-relative tw-w-full tw-flex tw-flex-col tw-items-center lg:tw-items-stretch lg:tw-flex-row'>

      <div className='tw-flex tw-flex-col tw-grow tw-w-full lg:tw-w-auto'>
        
        <div className='px-4 tw-py-2'>
          <FilterSection />
        </div>

        <div className="map-section d-flex px-0 flex-column h-100" style={{position: 'relative', zIndex: 1}}>
          <div className='row search-row ms-5 d-flex p-2 align-items-center' style={{position: 'absolute', zIndex: 1000}}>
            <div className='p-0 py-2'>
              <SearchBox
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                handleSearchChange={handleSearchChange}
              />
            </div>
          </div>
          <div className='row m-0 flex-grow-1' id='map-collapse' style={{zIndex: 900}}>
            <div className='map-box d-flex h-100 px-0'>
              <div ref={mapContainerRef} className='map-row h-100 w-100'></div>
            </div>
          </div>
        </div>

      </div>

      <div className='tw-fixed tw-z-10 tw-bottom-0 tw-flex tw-gap-4 tw-bg-white
        tw-w-full lg:tw-hidden tw-justify-center tw-py-3'>
        <button
          className='tw-bg-slate-900 tw-w-32 tw-py-3 tw-rounded-lg
            tw-font-medium tw-text-slate-100 tw-cursor-pointer'
            onClick={() => {
              setIsMapToggled(!isMapToggled);
            }}
        >
          {isMapToggled ? 'List View' : 'Map View'}
        </button>

        <button
          className='tw-bg-slate-900 tw-w-32 tw-py-3 tw-rounded-lg
            tw-font-medium tw-text-slate-100 tw-cursor-pointer'
            onClick={() => {
              setIsFilterToggled(!isFilterToggled);
            }}
        >
          Filter
        </button>

      </div>

      <div className={`property-section px-2 tw-h-full tw-w-screen tw-bg-zinc-100 ${isMapToggled ? 'tw-hidden' : ''} lg:tw-w-1/2 lg:tw-flex tw-flex-col`} style={{position: 'relative', zIndex: 2}}>
        <ListSection />
        {/* <FooterComponent /> */}
      </div>

    </div>
  );
};

export default Buy;