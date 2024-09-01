import { useContext, useState } from "react";
import { FormContext } from "../../../context/FormContext";
import { StepContext } from "../../../context/StepContext";
import geocode from "../../../utils/geocode";
import TextInputField from "../UI/TextInputField";

const LocationInfo = () => {

    const { formData, updateFormData } = useContext(FormContext);
    const { nextStep } = useContext(StepContext);
    const [isValidated, setIsValidated] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleContinue = async (event) => {
        event.preventDefault();
        setIsValidated(true);
        const form = event.target.closest('form');
        if (form.checkValidity()) {
            setIsSubmitting(true);
            await updateGeocode();
            nextStep();
        }
    };

    const updateGeocode = async () => {
        let [lat, lng] = await geocode(formData.address + ',' + formData.location + ',' + formData.state);
        if(lat && lng) {
            updateFormData({ ...formData, 
                latitude: Math.round(lat * 100000) / 100000,
                longitude: Math.round(lng * 100000) / 100000
            });
        }
    };

    return (
        <form onSubmit={(event) => handleContinue(event)}
            className="tw-flex tw-flex-col tw-h-full"
            noValidate
        >

            <div className="tw-flex tw-flex-col tw-grow tw-justify-start xl:tw-pl-16 tw-py-4 tw-gap-4 tw-min-h-80">
                <TextInputField 
                    autoFocus={true}
                    label='Street Address'
                    field='address'
                    placeholder='e.g. St. Thomas College Road'
                    formData={formData}
                    updateFormData={updateFormData}
                    isValidated={isValidated}
                />
                <TextInputField 
                    label='City / Province'
                    field='location'
                    placeholder='e.g. Thrissur'
                    formData={formData}
                    updateFormData={updateFormData}
                    isValidated={isValidated}
                />
                <TextInputField 
                    label='State'
                    field='state'
                    placeholder='e.g. Kerala'
                    formData={formData}
                    updateFormData={updateFormData}
                    isValidated={isValidated}
                />
            </div>

            <div className="tw-flex tw-justify-end tw-items-center tw-py-4">
                <div>
                    <button 
                        className="tw-bg-slate-800 tw-font-medium tw-text-white tw-py-2 tw-px-5 tw-rounded-lg" 
                        type="submit"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Please wait' : 'Next'}
                    </button>
                </div>
            </div>

        </form>
    )
}

export default LocationInfo;