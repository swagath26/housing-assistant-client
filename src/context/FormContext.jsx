import { createContext, useState } from "react";

export const FormContext = createContext();

export const FormProvider = ({ children }) => {
    const [formData, setFormData] = useState({
        bedrooms: 0,
        bathrooms: 0,
        balcony: false,
        latitude: 12.98,
        longitude: 77.58
    });

    const updateFormData = (newData) => {
        setFormData((prev) => (
            { ...prev, ...newData }
        ));
    };

    return (
        <FormContext.Provider value={{formData, updateFormData}}>
            {children}
        </FormContext.Provider>
    );
};