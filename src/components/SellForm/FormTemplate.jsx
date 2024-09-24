import { useContext } from "react";
import AdditionalInfo from "./Forms/AdditionalInfo";
import Finish from "./Forms/Finish";
import LocationInfo from "./Forms/LocationInfo";
import MapInfo from "./Forms/MapInfo";
import PropertyInfo from "./Forms/PropertyInfo";
import UploadImages from "./Forms/UploadImages";
import { StepContext } from "../../context/StepContext";
import Pricing from "./Forms/Pricing";

const FormTemplate = () => {

    const { currentStep } = useContext(StepContext);

    const renderForm = [
        {component: <LocationInfo />, title: 'Location Info', info: 'Provide your property location details'},
        {component: <MapInfo />, title: 'Locate in Map', info: 'Move the marker to the exact location'},
        {component: <PropertyInfo />, title: 'Property Features', info: 'Specify the number of rooms and other amenities'},
        {component: <AdditionalInfo />, title: 'Additional Info', info: 'Provide a brief description and area of the property (optional)'},
        {component: <UploadImages />, title: 'Upload Images', info: 'Showcase your property with high-quality images'},
        {component: <Pricing />, title: 'Pricing', info: 'Select the property type and set a price'},
        {component: <Finish />, title: '', info: ''},
    ]

    const {component, title, info} = renderForm[currentStep] || renderForm[0];

    return (
        <div className="tw-flex tw-flex-col tw-h-full tw-px-1 sm:tw-px-4 lg:tw-px-8">
            <div className="tw-pb-4">
                <h1 className="tw-text-2xl lg:tw-text-3xl tw-text-slate-900 tw-font-medium tw-py-2">
                    {title}
                </h1>
                <p className="tw-text-md tw-font-normal tw-py-1 tw-text-slate-500">
                    {info}
                </p>
            </div>
            {component}
        </div>
    )
}

export default FormTemplate;