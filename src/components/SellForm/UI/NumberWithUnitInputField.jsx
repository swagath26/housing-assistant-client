import handleInputChange from '../../../utils/handleInputChange';

const NumberWithUnitInputField = ({ label, field, unit, placeholder, required=false, formData, updateFormData, isValidated=false }) => {
    
    return (
        <div className='tw-flex tw-flex-col tw-content-center tw-relative'>
            <label 
                htmlFor={`${field}_input`}
                className='tw-font-medium tw-text-slate-700 tw-py-2 tw-pb-4'
            >{label}</label>

            {isValidated && !formData[field] && 
                <div className='tw-absolute tw-text-red-600 tw-top-4 tw-right-0 tw-font-medium tw-pr-1'>
                    This field is required
                </div>
            }

            <div className='tw-flex'>
                {unit.dir === 'left' &&    
                    <span className='tw-h-full tw-bg-slate-300 tw-px-4 tw-py-2 tw-pb-3  
                        tw-font-medium tw-text-slate-600 tw-rounded-tl-lg tw-rounded-bl-lg'>
                        {unit.name}
                    </span>
                }
                <input
                    className={`tw-w-40 tw-px-4 tw-pt-2 tw-pb-3 tw-border tw-border-solid tw-border-neutral-300 focus-visible:tw-outline-blue-800
                        ${unit.dir === 'left' ? 'tw-rounded-tr-lg tw-rounded-br-lg' : 'tw-rounded-tl-lg tw-rounded-bl-lg'}`}
                    id={`${field}_input`}
                    name={field}
                    placeholder={placeholder}
                    value={formData[field] || ''}
                    type="number"
                    required={required}
                    onChange={(event) => handleInputChange(event, formData, updateFormData)}
                />
                {unit.dir !== 'left' && 
                    <span className='tw-h-full tw-bg-slate-300 tw-px-4 tw-py-2 tw-pb-3  
                        tw-font-medium tw-text-slate-600 tw-rounded-tr-lg tw-rounded-br-lg'>
                        {unit.name}
                    </span>
                }
            </div>
        </div>
    )
};

export default NumberWithUnitInputField;