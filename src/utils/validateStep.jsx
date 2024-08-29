import { useContext, useEffect } from "react";
import { StepContext } from "../context/StepContext";
import { useLocation, useNavigate } from "react-router-dom";

const validateStep = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { currentStep, steps, setCurrentStep } = useContext(StepContext);

    useEffect(() => {
        const stepName = location.pathname.split('sell_home/')[1];
        setCurrentStep(steps.indexOf(stepName) + 1);
        // navigate(`/sell_home/${steps[currentStep-1]}`);
    }, [currentStep]);
};

export default validateStep;