import { handleInputCheck } from "../../../utils/FormUtils";

const CheckboxInputField = ({ label, field, formData, updateFormData }) => {
    
    return (
        <div className={`tw-relative tw-self-start tw-border tw-border-solid tw-rounded-lg hover:tw-border-blue-500
                ${formData[field] ? 'tw-border-blue-400 tw-bg-blue-100' 
                    : 'tw-border-neutral-300'}`}>
            <label 
                htmlFor={`${field}_input`}
                className=' tw-cursor-pointer tw-font-medium tw-text-slate-700 tw-py-5 tw-pl-4 tw-pr-10'
            >{label}</label>
            <input
                className='tw-absolute tw-right-3 tw-top-6'
                id={`${field}_input`}
                name={field}
                checked={formData[field] || false}
                type="checkbox"
                onChange={(event) => handleInputCheck(event, formData, updateFormData)}

            />
        </div>
    )
};

export default CheckboxInputField;