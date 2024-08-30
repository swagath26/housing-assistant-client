import { useContext } from "react";
import AdditionalInfo from "./AdditionalInfo";
import Finish from "./Finish";
import LocationInfo from "./LocationInfo";
import MapInfo from "./MapInfo";
import PropertyInfo from "./PropertyInfo";
import UploadImages from "./UploadImages";
import { StepContext } from "../../context/StepContext";
import Pricing from "./Pricing";

const FormTemplate = () => {

    const { currentStep } = useContext(StepContext);

    const renderStep = () => {
        switch (currentStep) {
            case 0:
                return <LocationInfo />;
            case 1:
                return <MapInfo />;
            case 2:
                return <PropertyInfo />;
            case 3:
                return <AdditionalInfo />;
            case 4:
                return <UploadImages />;
            case 5:
                return <Pricing />;
            case 6:
                return <Finish />;
            default:
                return <LocationInfo />;
        }
    };

    const renderTitle = [
        'Location Info',
        'Locate in Map',
        'Property Features',
        'Additional Info',
        'Upload Images',
        'Pricing',
        '',
    ];

    const renderInfo = [
        'Provide your property location details',
        'Move the marker to the exact location',
        'Specify the number of rooms and other amenities',
        'Provide a brief description and area of the property (optional)',
        'Showcase your property with high-quality images',
        'Select the property type and set a price',
        '',
    ];

    return (
        <div className="tw-flex tw-flex-col tw-h-full tw-px-4 lg:tw-px-8">
            <div className="tw-pb-4">
                <h1 className="tw-text-2xl lg:tw-text-3xl tw-text-slate-900 tw-font-medium tw-py-2">
                    {renderTitle[currentStep]}
                </h1>
                <p className="tw-text-md tw-font-normal tw-py-1 tw-text-slate-500">
                    {renderInfo[currentStep]}
                </p>
            </div>
            {renderStep()}
        </div>
    )
}

export default FormTemplate;