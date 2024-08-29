import { useContext, useEffect, useRef } from "react";
import { FormContext } from "../../context/FormContext";
import { StepContext } from "../../context/StepContext";
import BackButton from "./UI/BackButton";
import initMap from "../../utils/initMap";

const MapInfo = () => {

    const mapRef = useRef(null);
    const mapContainerRef = useRef(null);
    const markerRef = useRef(null);

    useEffect(() => {
        if(!mapRef.current) {
            mapRef.current = initMap(mapContainerRef.current, [formData.latitude, formData.longitude]);
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

    return (
        <div className="tw-flex tw-flex-col tw-h-full">

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