import { useEffect, useState, useContext, useRef } from "react";
import axios from "axios";
import getCookie from './getCookie';
import AuthContext from "./AuthContext";
import { useNavigate } from "react-router-dom";
import './SellHome.css';

const SellHome = () => {

    const navigate = useNavigate();
    const isAuthenticated = useContext(AuthContext).isAuthenticated;
    
    const [images, setImages] = useState([]);

    const [formData, setFormData] = useState({
        location: '',
        address: '',
        description: '',
        price: '',
        bedrooms: '',
        bathrooms: '',
        balcony: false,
        area: '',
        home_type: '',
        latitude: 12.98,
        longitude: 77.58
    })

    const handleDataEntry = (event) => {
        const {name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCheckBoxEntry = (event) => {
        const {name, checked} = event.target;
        setFormData({ ...formData, [name]: checked });
    }

    const handleImageUpload = (event) => {
        const newImages = [...images, ...event.target.files]
        setImages(newImages);
    }

    const csrftoken = getCookie('csrftoken');

    const handleSubmitForm = async () => {
        const data = new FormData();
        for (const key in formData) {
            if (key !== 'images') {
                data.append(key, formData[key]);
            }
        }
        console.log(data, formData);
        images.forEach((image, index) => {
            data.append('images', image, `images[${index}]`);
        });
        try {
            const response = await axios.post('/api/properties_list/', data, 
                {headers: { 'X-CSRFToken': csrftoken }}
            );
            if(response.statusText==='Created') {
                navigate('/sell');
            }
            else {
                console.log(response);
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    const locationFormRef = useRef(null);
    const mapDetailsRef = useRef(null);
    const propertyFormRef = useRef(null);

    const locationTabRef = useRef(null);
    const mapTabRef = useRef(null);
    const propertyTabRef = useRef(null);
    
    const mapRef = useRef(null);
    const markerRef = useRef(null);

    useEffect(() => {
        async function initMap() {
            mapRef.current = window.L.map('map', {
                center: [formData.latitude, formData.longitude],
                zoom: 10
            });
    
            window.L.maptilerLayer({
                apiKey: 'cIpY5YW2swGKoC5mFkdK',
                style: window.L.MaptilerStyle.STREETS,
            }).addTo(mapRef.current);
        }
        if (!mapRef.current) {
            initMap();
            markerRef.current = window.L.marker([formData.latitude, formData.longitude]).addTo(mapRef.current);
            markerRef.current.dragging.enable();

            markerRef.current.on('dragend', function() {
                const v = markerRef.current.getLatLng();
                setFormData((prevFormData) => ({ 
                    ...prevFormData, 
                    latitude: Math.round(v.lat * 100000) / 100000,
                    longitude: Math.round(v.lng * 100000) / 100000 
                }));
            });
        }
    }, []);

    const geocode = async (address) => {
        const response = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${address}`);
        const lat = response.data[0]?.lat;
        const lng = response.data[0]?.lon;
        return [lat, lng];
    };

    const updateMap = async () => {
        let [lat, lng] = await geocode(formData.address + ',' + formData.location);
        if(lat && lng) {
            setFormData({ 
                ...formData, 
                latitude: Math.round(lat * 100000) / 100000,
                longitude: Math.round(lng * 100000) / 100000 
            });
            markerRef.current.setLatLng([lat, lng]);
            mapRef.current.setView([lat, lng], 16);
        }
        else {
            window.alert('We could not find your address in map. You can try known locations or manually locate in the map.');
        }
        mapRef.current.invalidateSize();
    }

    useEffect(() => {
        const showToast = () => {
            if(!isAuthenticated)
                window.bootstrap.Toast.getOrCreateInstance(document.getElementById('liveToast')).show();
            clearTimeout(toastTimeOut);
        }
        const toastTimeOut = setTimeout(showToast, 1000);
    }, [isAuthenticated])

    
    return (
        <div className="container d-flex flex-column align-items-stretch" style={{minHeight: '75vh'}}>
            
            <div className="d-flex flex-grow-1 flex-column sell-details">
                
                <ul className="d-flex text-center justify-content-center my-4 py-1" >
                    <li ref={locationTabRef} className="px-2 py-1 mx-md-3 mx-1 active">Location Details</li>
                    <li ref={mapTabRef} className="px-2 py-1 mx-md-3 mx-1">Find in Map</li>
                    <li ref={propertyTabRef} className="px-2 py-1 mx-md-3 mx-1">Property Details</li>
                </ul>

                <div className="row my-2">
                    <form id="location-form" ref={locationFormRef} className="sell-form needs-validation ps-5" noValidate>
                        
                        <div className="my-4 pb-3 mx-md-5 fs-4 text-start flex-grow-1">
                            Enter location details
                        </div>

                        <div className="my-4 mx-md-5">
                            <div className={`d-flex form-group-sellpage ${formData.address ? 'filled' : ''}`}>
                                <input type="text" className="form-control form-control-sellpage w-75" id="address"
                                    name="address" value={formData.address} onChange={handleDataEntry} required/>
                                <label htmlFor="address" className="sellpage-label">Locality / Street Address</label>
                                <div className="invalid-feedback px-2 p-2 w-25">Invalid address</div>
                            </div>
                        </div>

                        <div className="my-4 mx-md-5">
                            <div className={`d-flex form-group-sellpage ${formData.location ? 'filled' : ''}`}>
                                <input type="text" className="form-control form-control-sellpage w-50" id="location" 
                                    name="location" value={formData.location} onChange={handleDataEntry} required/>
                                <label htmlFor="location" className="sellpage-label">City / Town / Village</label>
                                <div className="invalid-feedback px-2 p-2 w-25">Invalid Location</div>
                            </div>
                        </div>

                        <div className="my-4 mx-md-5">
                            <button type="button" className="btn btn-success" id="continue-button" onClick={() => {
                                locationFormRef.current.classList.add('was-validated');
                                    if(locationFormRef.current.checkValidity()) {
                                        locationTabRef.current.classList.remove('active');
                                        locationFormRef.current.style.display = 'none';
                                        mapTabRef.current.classList.add('active');
                                        mapDetailsRef.current.style.display = 'flex';
                                        updateMap();
                                    }
                                }}>
                                Continue
                            </button>
                        </div>

                    </form>



                    <div ref={mapDetailsRef} className="container flex-column px-3" style={{display: 'none'}}>
                        <div className="d-flex my-1 mb-3">
                            <button type="button" className="btn btn-primary" onClick={() => {
                                mapDetailsRef.current.style.display = 'none';
                                mapTabRef.current.classList.remove('active');
                                locationFormRef.current.style.display = 'block';
                                locationTabRef.current.classList.add('active');
                            }}>
                            Back
                            </button>

                            <div className="px-3 fs-4 text-center flex-grow-1">
                                Move the marker to the locate your property
                            </div>

                            <button type="button" className="btn btn-success" onClick={() => {
                                mapDetailsRef.current.style.display = 'none';
                                mapTabRef.current.classList.remove('active');
                                propertyTabRef.current.classList.add('active');
                                propertyFormRef.current.style.display = 'flex';
                            }}>
                            Continue
                            </button>
                        </div>
                        <div id="map" className="flex-grow-1" style={{height: '60vh'}}></div>
                    </div>


                    <form id="details-form" ref={propertyFormRef} className="sell-form needs-validation ps-5 pe-lg-2 pe-5 flex-column" noValidate style={{display: 'none'}}>
                        
                        <div className="my-4 pb-3 fs-4 text-start flex-grow-1">
                            Enter property details
                        </div>

                        <div className="my-4 col-lg-4">
                            <div className="input-group">
                                <label className="input-group-text" htmlFor="hometype">Home Type</label>
                                <select className="form-control-sellpage w-50 py-1" id="hometype" 
                                    name="home_type" value={formData.home_type} onChange={handleDataEntry}>
                                    <option value=''>Choose...</option>
                                    <option>House</option>
                                    <option>Apartment</option>
                                    <option>Studio</option>
                                    <option>Multi-Family</option>
                                </select>
                            </div>
                        </div>
                        
                        <div className="my-3">
                            <div className={`d-flex form-group-sellpage ${formData.description ? 'filled' : ''}`}>
                                <textarea type="text" className="form-control-sellpage w-100" id="description"
                                    name="description" value={formData.description} onChange={handleDataEntry}/>
                                <label htmlFor="description" className="sellpage-label">Add Description</label>
                            </div>
                        </div>

                        <div className="my-3">
                            <div className={`d-flex col-lg-6 form-group-sellpage ${formData.bedrooms ? 'filled' : ''}`} >
                                <input type="number" className="form-control form-control-sellpage w-50" id="bedrooms"
                                    name="bedrooms" value={formData.bedrooms} onChange={handleDataEntry} required/>
                                <label htmlFor="bedrooms" className="sellpage-label">No. of Bedrooms *</label>
                                <div className="invalid-feedback mx-2 p-2 w-50">Provide a valid number</div>
                            </div>
                        </div>
                            
                        <div className="my-3">
                            <div className={`d-flex col-lg-6 form-group-sellpage ${formData.bathrooms ? 'filled' : ''}`} >
                                <input type="number" className="form-control form-control-sellpage w-50" id="bathrooms" 
                                    name="bathrooms" value={formData.bathrooms} onChange={handleDataEntry} required/>
                                <label htmlFor="bathrooms" className="sellpage-label">No. of Bathrooms *</label>
                                <div className="invalid-feedback mx-2 p-2 w-50">Provide a valid number</div>
                            </div>
                        </div>

                        <div className="my-4">
                            <div className={`input-group d-flex form-group-sellpage ${formData.area ? 'filled' : ''}`} >
                                <input type="number" className="form-control-sellpage" id="area"
                                    name="area" value={formData.area} onChange={handleDataEntry}/>
                                <label htmlFor="area" className="sellpage-label">Area</label><span className="input-group-text">Sqft</span>
                            </div>
                        </div>

                        <div className="form-check form-check-reverse d-flex justify-content-start" >
                            <label className="form-check-label" htmlFor="balcony">Balcony</label>
                            <input className="form-check-input mx-3" type="checkbox" id="balcony"
                                name="balcony" onChange={handleCheckBoxEntry}/>
                        </div>

                        <div className="my-4">
                            <div className="input-group d-flex flex-md-row flex-column">
                                <label className="input-text pe-3" htmlFor="images">Upload Images *</label>
                                <input type="file" multiple className="form-control w-75" id="images" 
                                    name="images" onChange={handleImageUpload} required/>
                                <div className="invalid-feedback mx-2 p-2">Upload atleast an image</div>
                            </div>
                        </div>

                        <div className="my-4 col-xl-6 d-flex flex-md-row flex-column">
                            <label htmlFor="price" className="pe-3 d-flex my-md-0 my-3">Price for the Property *</label>
                            <div className="input-group d-flex" >
                                <span className="input-group-text">INR</span>
                                <input type="number" className="form-control w-25" id="price"
                                    name="price" value={formData.price} onChange={handleDataEntry} required/>
                                <div className="invalid-feedback mx-2 px-2 w-50">
                                    Provide a Price for your Property
                                </div>
                            </div>
                        </div>

                        <div className="my-4">
                            <div className="d-flex justify-content-between">
                                <button type="button" className="btn btn-primary" onClick={() => {
                                    propertyTabRef.current.classList.remove('active');
                                    propertyFormRef.current.style.display = 'none';
                                    mapTabRef.current.classList.add('active');
                                    mapDetailsRef.current.style.display = 'flex';
                                }}>
                                Back
                                </button>

                                <button type="submit" className="btn btn-success" 
                                    onClick={(event) => {
                                        propertyFormRef.current.classList.add('was-validated');
                                        event.preventDefault();
                                        if(!isAuthenticated) {
                                            window.bootstrap.Toast.getOrCreateInstance(document.getElementById('liveToast')).show();
                                        }
                                        else if(propertyFormRef.current.checkValidity()) {
                                            handleSubmitForm(event);
                                        }
                                    }}>
                                    List for Sale
                                </button>
                                
                            </div>
                        </div>
                    </form>
                </div>

            </div>

            <div className="toast-container position-fixed bottom-0 end-0 p-3">
                <div id="liveToast" className="toast" role="alert" aria-live="assertive" aria-atomic="true">
                    <div className="toast-body">
                        <div className="d-flex justify-content-end">
                            <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close" />
                        </div>
                        <div className="d-flex justify-content-start p-2">
                            <b>Sign in to list your property..</b>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default SellHome;