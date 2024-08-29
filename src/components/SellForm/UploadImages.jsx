import { useContext, useState } from "react";
import { FormContext } from "../../context/FormContext";
import { StepContext } from "../../context/StepContext";
import NextButton from "./UI/NextButton";
import BackButton from "./UI/BackButton";

const UploadImages = () => {
    const { formData, updateFormData } = useContext(FormContext);
    const { nextStep, prevStep } = useContext(StepContext);
    const [isValidated, setIsValidated] = useState(false);
    const [isValid, setisValid] = useState(formData.images?.length > 0);

    const handleContinue = (event) => {
        event.preventDefault();
        setIsValidated(true);
        if (isValid) {
            nextStep();
        }
    };

    const handleImageUpload = (event, formData, updateFormData) => {
        const newImages = [...(formData.images || []), ...event.target.files];
        updateFormData({ ...formData, images : newImages });
        setisValid((formData.images?.length > 0) || newImages.length > 0);
    };

    const clearImageUpload = (event, formData, updateFormData) => {
        const form = event.target.closest('form');
        form.reset();
        setisValid(false);
        updateFormData({ ...formData, images : [] });
    };

    return (
        <form onSubmit={(event) => handleContinue(event, nextStep)}
            className="tw-flex tw-flex-col tw-h-full"
            noValidate
        >

            <div className="tw-flex tw-flex-col tw-grow tw-py-4 tw-min-h-80">
                
                <div className="tw-flex tw-items-center tw-justify-center tw-w-full tw-h-full">
                    <label htmlFor="images_input" 
                        className={`tw-flex tw-flex-col tw-items-center tw-justify-center tw-w-full tw-h-full tw-cursor-pointer
                        tw-border ${isValidated && !isValid ? `tw-border-red-600` : `tw-border-slate-300`}
                        tw-border-solid tw-rounded-lg tw-bg-slate-50 hover:tw-bg-slate-100`}
                    >
                        <div className="tw-flex tw-flex-col tw-items-center tw-justify-center tw-py-5">
                            <svg className="tw-w-8 tw-h-8 tw-mb-4 tw-text-slate-500 dark:tw-text-slate-400" 
                                aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16"
                            >
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                            </svg>
                            <p className="tw-mb-2 tw-px-8 tw-text-center tw-text-sm tw-text-slate-500 dark:tw-text-slate-400">
                                <span 
                                    className={`${isValidated && !isValid ? `tw-text-red-600` : ``} tw-font-semibold`}
                                >
                                    {isValid ?
                                        `${formData.images.length} file${formData.images.length > 1 ? 's' : ''} uploaded. ` : 
                                        `${isValidated ? `Atleast an image is required. ` : ``}`
                                    }
                                    Click to upload or drag and drop..
                                </span>
                            </p>
                            <p className="tw-text-xs tw-text-slate-500 dark:tw-text-slate-400">JPG, JPEG, PNG, or SVG</p>
                        </div>
                        <input 
                            type="file" 
                            multiple
                            id="images_input"
                            name="images"
                            className="tw-hidden"
                            onChange={(event) => handleImageUpload(event, formData, updateFormData)}
                            required
                        />
                    </label>
                </div> 

                <div>
                    
                </div>
            </div>

            <div className="tw-flex tw-justify-between tw-items-center tw-py-4 tw-relative">
                <BackButton prevStep={prevStep} />
                <div className="tw-flex tw-items-center">
                    {formData.images?.length > 0 && (
                        <button 
                            type="button" 
                            onClick={(event) => clearImageUpload(event, formData, updateFormData)}
                            className="tw-font-medium tw-px-4 tw-mx-6 tw-text-slate-900" 
                        >
                            Clear
                        </button>
                    )
                    }
                    <NextButton />
                </div>
            </div>

        </form>
    )
}

export default UploadImages;