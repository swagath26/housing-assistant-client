import { useContext } from "react";
import { StepContext } from "../../context/StepContext";

const StepIndicator = () => {

    const { currentStep } = useContext(StepContext);

    const stepInfo = [
        'Location Info',
        'Find in Map',
        'Property Info',
        'Additional Info',
        'Upload Images',
        'Pricing',
        'Finish',
    ];

    return (
        <ul className="tw-flex tw-justify-evenly lg:tw-justify-center lg:tw-flex-col tw-w-full lg:tw-h-full tw-bg-slate-700 tw-py-6 lg:tw-py-8 lg:tw-px-10 lg:tw-gap-8
            lg:tw-rounded-lg">
            
            {stepInfo.map((step, index) => (
                <li 
                    key={index} 
                    className={`tw-text-nowrap lg:tw-flex tw-text-white`}
                >
                    <div className="tw-flex tw-items-center">
                        <div className={`tw-py-1 tw-px-3 tw-border tw-border-solid tw-border-neutral-200 tw-font-medium tw-rounded-3xl
                            ${currentStep === index ? 'tw-bg-neutral-200 tw-text-slate-800' : ''}`}>
                            {index+1}</div>
                        <div className="tw-px-4 tw-hidden lg:tw-flex">
                            {step}</div>
                    </div>
                </li>
            ))}

        </ul>
    )
}

export default StepIndicator;