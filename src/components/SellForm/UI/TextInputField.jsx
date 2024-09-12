import { handleInputChange } from "../../../utils/FormUtils";

const TextInputField = ({ label, autoFocus=false, field, placeholder, formData, updateFormData, isValidated }) => {
    
    return (
        <div className='tw-flex tw-flex-col tw-gap-1 tw-relative'>
            <label 
                htmlFor={`${field}_input`}
                className='tw-font-medium tw-text-slate-700 tw-pl-1'
            >{label}</label>
            <input
                autoFocus={autoFocus}
                className={`tw-px-4 tw-pt-2 tw-pb-3 tw-border tw-border-solid tw-rounded-lg 
                    ${isValidated && !formData[field] ? 
                        `tw-border-red-600 focus-visible:tw-outline-red-600` 
                        : `tw-border-neutral-300 focus-visible:tw-outline-blue-800`}
                    `}
                id={`${field}_input`}
                name={field}
                value={formData[field] || ''}
                placeholder={placeholder}  
                type="text"
                onChange={(event) => handleInputChange(event, formData, updateFormData)}
                required
            />
            {isValidated && !formData[field] && 
                <div className='tw-absolute tw-text-red-600 tw-top-0 tw-right-0 tw-font-medium tw-pr-1'>
                    This field is required
                </div>
            }
        </div>
    )
};

export default TextInputField;