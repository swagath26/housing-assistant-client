import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import './PropertyCard.css';
import { INRFormat } from '../../utils/CurrencyFormat';

const PropertyCard = ({ property}) => {

    return (
        <div className='card property-card w-100 tw-rounded-xl tw-overflow-hidden'>

          <div className='card-top-section'>
            <div className="row m-0 p-0 pt-2" style={{position:'absolute', zIndex:'1', width:'100%'}}>
              <div className='col-10 px-2'>
                <div className='rounded-3 px-2 tw-pt-1' style={{backgroundColor:'rgba(0,0,0,0.7)', color:'#f0f0f0', fontSize:'13px', display:'inline-block'}}>
                  {property.home_type}
                </div>
              </div>
              <div className='col-2' >
                <a className='favourites-icon' id={`fav_${property.id}`} style={{display:'inline-block'}}>
                  <img src="/static/img/fav-logo.png" alt="fav-icon"/>
                </a>
              </div>
            </div>
            <div id={`property_${property.id}`} className="carousel slide" style={{zIndex:'0'}}>
              <div className="carousel-inner tw-h-40 tw-bg-neutral-300">
                {property.images && 
                property.images.map((image, index) => (
                <div className={index===0 ? 'carousel-item active' : 'carousel-item'} key={index}>
                  <img className='w-100 object-fit-cover card-img tw-rounded-none tw-h-full' 
                  src={image.image}
                  alt={`Property Image ${index+1}`} />
                </div>
                ))}
              </div>
              <div>
                <button className="carousel-controls carousel-control-prev" type="button" data-bs-target={`#property_${property.id}`} data-bs-slide="prev">
                  <FontAwesomeIcon icon={faAngleLeft} style={{fontSize:'30px'}} />
                </button>
  
                <button className="carousel-controls carousel-control-next" type="button" data-bs-target={`#property_${property.id}`} data-bs-slide="next">
                  <FontAwesomeIcon icon={faAngleRight} style={{fontSize:'30px'}} />
                </button>
              </div>
            </div>
          </div>
        
          <div className="card-body p-2">
            <div className='row mb-1'>
              <h5 className='card-title tw-font-medium tw-text-xl m-0'>{INRFormat(property.price)}</h5>
            </div>
            <div className='card-text tw-p-1'>
              <p className='tw-text-md tw-m-0 tw-text-neutral-700 tw-overflow-hidden' style={{textOverflow:'ellipsis', textWrap:'nowrap'}}>
              <b>{property.bedrooms} </b>bds | <b>{property.bathrooms}</b> ba <b>{property.balcony && ' | Balcony'}</b> | <b>{property.area || '--'}</b> sqft
              </p>
              <p className='tw-overflow-hidden tw-text-neutral-500 tw-text-sm tw-m-0' style={{textOverflow:'ellipsis', textWrap:'nowrap'}} >
              {property.address}, {property.location}
              </p>
              <p className='tw-text-sm tw-text-neutral-500 tw-m-0'>Listing by: {property.user_first_name} {property.user_last_name}
              </p>
            </div>
          </div>
        </div>
    );
};

export default PropertyCard;