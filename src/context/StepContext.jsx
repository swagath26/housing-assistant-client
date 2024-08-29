import { createContext, useState } from "react";

export const StepContext = createContext();

export const StepProvider = ({ children }) => {

    const steps = [
        'location',
        'map',
        'property',
        'additional',
        'upload',
        'preview',
        'finish',
    ];
    const totalSteps = steps.length;

    const [currentStep, setCurrentStep] = useState(0);

    const nextStep = () => {
        setCurrentStep(Math.min(currentStep + 1, totalSteps-1));
    };

    const prevStep = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 0));
    };

    return (
        <StepContext.Provider value={{currentStep, setCurrentStep, steps, totalSteps, nextStep, prevStep}}>
            {children}
        </StepContext.Provider>
    );
};