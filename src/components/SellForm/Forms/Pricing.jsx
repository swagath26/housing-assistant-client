import { useContext, useState } from "react";
import { FormContext } from "../../../context/FormContext";
import { StepContext } from "../../../context/StepContext";
import BackButton from "../UI/BackButton";
import SelectionInput from "../UI/SelectionInput";
import handleSubmitForm from "../../../utils/handleSubmitForm";
import AuthContext from "../../../context/AuthContext";
import PriceInputField from "../UI/PriceInputField";
import Estimate from "../../../utils/Estimate";
import { INRPriceFormat } from "../../../utils/CurrencyFormat";

const Pricing = () => {
    const isAuthenticated = useContext(AuthContext).isAuthenticated;
    const { formData, updateFormData } = useContext(FormContext);
    const { nextStep, prevStep } = useContext(StepContext);
    const [isValidated, setIsValidated] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [isEstimating, setIsEstimating] = useState(false);

    const [estimatedPrice, setEstimatedPrice] = useState('');

    const handleEstimatePrice = async () => {
        if(!isNaN(formData.area) && formData.area?.trim() !== '') {
            setIsEstimating(true);
            const price = await Estimate(formData);
            setIsEstimating(false);
            setEstimatedPrice(`₹ ${INRPriceFormat(price)}`);
            setIsEstimating(false);
        }
        else {
            window.alert('Area of the property is required for estimating price. Please fill in the additional details section and try again..')
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsValidated(true);
        if(isAuthenticated) {
            const form = event.target.closest('form');
            if (form.checkValidity() && (formData.home_type || formData.home_type === '')) {
                setIsSubmitting(true);
                const response = await handleSubmitForm(formData);
                setIsSubmitting(false);
                if(response.success) 
                    nextStep();
            }
        }
        else {
            window.alert('Please sign-in to list your property..')
        }
    };

    return (
        <form onSubmit={(event) => handleSubmit(event, nextStep)}
            className="tw-flex tw-flex-col tw-h-full"
            noValidate
        >

            <div className="tw-flex tw-flex-col tw-grow tw-pb-4 max-sm:tw-px-2 xl:tw-pl-8 tw-gap-6 2xl:tw-gap-8 tw-h-full">

                <SelectionInput 
                    label="Select the type of property"
                    field="home_type"
                    options={['Apartment', 'Multi-Family', 'House', 'Studio']}
                    formData={formData}
                    updateFormData={updateFormData}
                    isValidated={isValidated}
                />

                <div className="tw-flex tw-flex-col tw-gap-2">
                    <PriceInputField 
                        label="Set your Price"
                        field="price"
                        unit={{name: 'INR', dir: 'left'}}
                        placeholder="e.g. 1,80,00,000"
                        required={true}
                        formData={formData}
                        updateFormData={updateFormData}
                        isValidated={isValidated}
                    />
                    <button 
                        type="button" 
                        className="tw-self-start tw-font-medium tw-text-slate-500 tw-ps-2 tw-py-2" 
                        onClick={handleEstimatePrice}
                    >
                        {estimatedPrice ? estimatedPrice : 
                            isEstimating ? 'Please wait...' : 'Get an estimated price'}
                    </button>
                </div>
                
            </div>

            <div className="tw-flex tw-justify-between tw-items-center tw-py-4">
                <BackButton prevStep={prevStep} />
                <div className="tw-flex tw-items-center">
                    {formData.price && (formData.home_type || formData.home_type === '') ? (
                        <button 
                            type="button" 
                            className="tw-font-medium tw-px-4 lg:tw-mx-6 tw-text-slate-900" 
                        >
                            Preview
                        </button>
                    ) : ''
                    }
                    <div>
                        <button 
                            className="tw-bg-slate-800 tw-font-medium tw-text-white tw-py-2 tw-px-5 tw-rounded-lg" 
                            type="submit"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Please wait..' : 'List for Sale'}
                        </button>
                    </div>
                </div>
            </div>

        </form>
    )
}

export default Pricing;