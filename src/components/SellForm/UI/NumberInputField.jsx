import { handleInputChange } from "../../../utils/FormUtils";

const NumberInputField = ({ label, field, formData, updateFormData }) => {
    
    return (
        <div className='tw-flex tw-flex-col tw-gap-1'>
            <label 
                htmlFor={`${field}_input`}
                className='tw-font-medium tw-text-slate-700 tw-py-2 tw-pr-4'
            >{label}</label>

            <div className='tw-flex'>
                <button 
                    type='button'
                    onClick={() => {updateFormData({ [field]: Math.max(0, formData[field] - 1) })}}
                    className='tw-w-8 tw-h-full tw-bg-slate-300 hover:tw-bg-slate-700 hover:tw-text-white 
                    tw-font-bold tw-text-xl tw-pb-1 tw-text-slate-600 tw-rounded-tl-lg tw-rounded-bl-lg'>
                    -
                </button>
                <input
                    className='tw-max-w-10 tw-text-center tw-py-2 tw-px-2 tw-border tw-border-solid 
                                focus-visible:tw-outline-0'
                    id={`${field}_input`}
                    name={field}
                    value={formData[field] || 0}
                    type="number"
                    onChange={(event) => handleInputChange(event, formData, updateFormData)}
                />
                <button 
                    type='button'
                    onClick={() => {updateFormData({ [field]: (formData[field] || 0) + 1 })}}
                    className='tw-w-8 tw-h-full tw-bg-slate-300 hover:tw-bg-slate-700 hover:tw-text-white 
                    tw-font-bold tw-text-xl tw-pb-1 tw-text-slate-600 tw-rounded-tr-lg tw-rounded-br-lg'>
                    +
                </button>
            </div>
        </div>
    )
};

export default NumberInputField;