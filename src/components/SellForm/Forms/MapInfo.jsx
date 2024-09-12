import { useContext, useEffect, useRef, useState } from "react";
import { FormContext } from "../../../context/FormContext";
import { StepContext } from "../../../context/StepContext";
import BackButton from "../UI/BackButton";
import initMap from "../../../utils/initMap";
import geocode from "../../../utils/geocode";
import SearchBox from "../../Buy/SearchBox";

const MapInfo = () => {

    const mapRef = useRef(null);
    const mapContainerRef = useRef(null);
    const markerRef = useRef(null);
    const defaultZoom = 16;

    useEffect(() => {
        if(!mapRef.current) {
            mapRef.current = initMap(mapContainerRef.current, [formData.latitude, formData.longitude], defaultZoom);
        }
        markerRef.current = window.L?.marker([formData.latitude, formData.longitude]).addTo(mapRef.current);
        markerRef.current?.dragging.enable();

        markerRef.current?.on('dragend', function() {
            const v = markerRef.current.getLatLng();
            updateFormData({ ...formData, 
                latitude: Math.round(v.lat * 100000) / 100000,
                longitude: Math.round(v.lng * 100000) / 100000
            });
        });
    }, []);

    const { formData, updateFormData } = useContext(FormContext);
    const { nextStep, prevStep } = useContext(StepContext);

    const [searchQuery, setSearchQuery] = useState('');
    const searchQueryRef = useRef(searchQuery);
    searchQueryRef.current = searchQuery;

    const handleSearchChange = async () => {
        let [lat, lng] = await geocode(searchQueryRef.current);
        if (lat && lng) {
            updateFormData({ ...formData, 
                latitude: Math.round(lat * 100000) / 100000,
                longitude: Math.round(lng * 100000) / 100000
            });
            markerRef.current?.setLatLng([lat,lng]);
            mapRef.current?.setView([lat,lng], defaultZoom);
        } else {
          window.alert(`No results found for ${searchQueryRef.current}`);
        }
    };

    return (
        <div className="tw-flex tw-flex-col tw-h-full">

            <div className='row search-row mx-5 d-flex p-2 align-items-center' style={{position: 'absolute', zIndex: 1000}}>
                <div className='p-0 py-2'>
                    <SearchBox
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    handleSearchChange={handleSearchChange}
                    />
                </div>
            </div>

            <div ref={mapContainerRef} id="map" className="tw-grow tw-min-h-80"></div>

            <div className="tw-flex tw-justify-between tw-items-center tw-py-4">
                <BackButton prevStep={prevStep} />
                <div>
                    <button 
                        className="tw-bg-slate-800 tw-font-medium tw-text-white tw-py-2 tw-px-5 tw-rounded-lg" 
                        type="button"
                        onClick={nextStep}>
                        Next
                    </button>
                </div>
            </div>

        </div>
    )
}

export default MapInfo;