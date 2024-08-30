import { useContext } from "react";
import { FormContext } from "../../context/FormContext";
import handleNext from '../../utils/handleNext';
import { StepContext } from "../../context/StepContext";
import NextButton from "./UI/NextButton";
import BackButton from "./UI/BackButton";
import handleInputChange from "../../utils/handleInputChange";
import NumberWithUnitInputField from "./UI/NumberWithUnitInputField";

const AdditionalInfo = () => {
    const { formData, updateFormData } = useContext(FormContext);
    const { nextStep, prevStep } = useContext(StepContext);

    return (
        <form onSubmit={(event) => handleNext(event, nextStep)}
            className="tw-flex tw-flex-col tw-h-full"
            noValidate
        >

            <div className="tw-flex tw-flex-col tw-grow tw-gap-4 xl:tw-pl-16 tw-py-4 tw-min-h-80">
                <NumberWithUnitInputField 
                    label="Total Area"
                    field="area"
                    unit={{name: 'sqft', dir: 'right'}}
                    placeholder="e.g. 1800"
                    formData={formData}
                    updateFormData={updateFormData}
                />

                <div className='tw-flex tw-flex-col'>
                    <label htmlFor="description_input" 
                        className="tw-font-medium tw-py-2 tw-pb-4">
                        Add a description</label>
                    <textarea  
                        className='tw-w-full tw-min-h-32 tw-px-4 tw-pt-2 tw-pb-3 tw-border tw-border-solid tw-rounded-lg 
                            tw-border-neutral-300 focus-visible:tw-outline-blue-800'
                        id="description_input" 
                        placeholder="e.g. Spacious 3-bedroom apartment with a beautiful view"
                        name="description"
                        value={formData.description || ''}
                        onChange={(event) => handleInputChange(event, formData, updateFormData)}
                    />
                </div>
            </div>

            <div className="tw-flex tw-justify-between tw-items-center tw-py-4">
                <BackButton prevStep={prevStep} />
                <NextButton />
            </div>

        </form>
    )
}

export default AdditionalInfo;