import { handleInputChange } from "../../../utils/FormUtils";

const SelectionInput = ({ label, field, options, required=false, formData, updateFormData, isValidated=false }) => {
    
    return (
        <div className='tw-flex tw-flex-col tw-content-center tw-gap-4 tw-relative'>

            <label 
                htmlFor={`${field}_input`}
                className='tw-font-medium tw-text-slate-700 tw-py-2'
            >{label}</label>

            {isValidated && formData[field] !== '' && !formData[field] && 
                <div className='tw-absolute tw-text-red-600 tw-top-[-10px] lg:tw-top-2 tw-right-0 tw-font-medium tw-pr-2'>
                    Please select one
                </div>
            }

            <div className='tw-flex tw-gap-3 lg:tw-gap-4 tw-flex-wrap'>

                {options.map((option, index) => (
                    <label 
                        className={`tw-pt-2 tw-pb-3 tw-px-4 tw-border tw-border-solid tw-rounded-lg tw-cursor-pointer hover:tw-bg-blue-100 hover:tw-border-blue-300
                            ${formData[field] === option ? 'tw-border-blue-400 tw-bg-blue-100' 
                                : 'tw-border-neutral-300'}`}
                        key={index}
                    >{option}
                        <input
                            className='tw-hidden'
                            name={field}
                            type='radio'
                            value={option}
                            checked={formData[field] === option}
                            onChange={(event) => handleInputChange(event, formData, updateFormData)}
                        />
                    
                    </label>
                ))}
                {!required && 
                    <label 
                        className={`tw-pt-2 tw-pb-3 tw-px-4 tw-border tw-border-solid tw-rounded-lg tw-cursor-pointer hover:tw-bg-blue-100 hover:tw-border-blue-300
                        ${formData[field] === '' ? 'tw-border-blue-400 tw-bg-blue-100' 
                            : 'tw-border-neutral-300'}`}
                        key={options.length}
                    >Other
                        <input
                            className='tw-hidden'
                            name={field}
                            type='radio'
                            value=''
                            checked={formData[field] === ''}
                            onChange={(event) => handleInputChange(event, formData, updateFormData)}
                        />
                    
                    </label>
                }
            </div>

        </div>
    )
};

export default SelectionInput;