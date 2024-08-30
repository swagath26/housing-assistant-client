import { useContext, useState } from "react";
import { FormContext } from "../../context/FormContext";
import { StepContext } from "../../context/StepContext";
import BackButton from "./UI/BackButton";
import SelectionInput from "./UI/SelectionInput";
import handleSubmitForm from "../../utils/handleSubmitForm";
import AuthContext from "../../context/AuthContext";
import PriceInputField from "./UI/PriceInputField";

const Pricing = () => {
    const isAuthenticated = useContext(AuthContext).isAuthenticated;
    const { formData, updateFormData } = useContext(FormContext);
    const { nextStep, prevStep } = useContext(StepContext);
    const [isValidated, setIsValidated] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsValidated(true);
        if(isAuthenticated) {
            const form = event.target.closest('form');
            if (form.checkValidity() && (formData.hometype || formData.hometype === '')) {
                setIsSubmitting(true);
                const response = await handleSubmitForm(formData);
                setIsSubmitting(false);
                if(response.success) nextStep();
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

            <div className="tw-flex tw-flex-col tw-justify-center tw-grow tw-pb-4 xl:tw-pl-16 tw-gap-8 tw-min-h-80">

                <SelectionInput 
                    label="Select the type of property"
                    field="hometype"
                    options={['House', 'Apartment', 'Studio', 'Multi-Family']}
                    formData={formData}
                    updateFormData={updateFormData}
                    isValidated={isValidated}
                />

                <div className="tw-flex tw-flex-col tw-gap-2">
                    <PriceInputField 
                        label="Set a Price"
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
                        className="tw-self-start tw-font-medium tw-text-slate-500 tw-py-2" 
                    >
                        Get an estimated price
                    </button>
                </div>
                
            </div>

            <div className="tw-flex tw-justify-between tw-items-center tw-py-4">
                <BackButton prevStep={prevStep} />
                <div className="tw-flex tw-items-center">
                    {formData.price && (formData.hometype || formData.hometype === '') ? (
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