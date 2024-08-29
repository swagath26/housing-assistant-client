import AuthContext from "../context/AuthContext";
import './SellHome.css';
import StepIndicator from "../components/SellForm/StepIndicator";
import { useContext } from "react";
import FormTemplate from "../components/SellForm/FormTemplate";

const SellForm = () => {

    const isAuthenticated = useContext(AuthContext).isAuthenticated;
    
    return (
        
        <div className='tw-flex tw-justify-center tw-mt-[10vh] lg:tw-min-h-[90vh] lg:tw-mt-[12.5vh]'>
            
            <div className='tw-flex tw-flex-col tw-w-full
                lg:tw-flex-row lg:tw-px-8 lg:tw-py-8 lg:tw-gap-8 lg:tw-w-4/5 lg:tw-shadow-[0px_0px_5px_2px_rgba(0,0,0,0.1)]
                lg:tw-min-h-[85vh] tw-min-h-[90vh] 2xl:tw-w-2/3 xl:tw-w-3/4'>
                
                <div className='tw-hidden lg:tw-flex tw-items-center'>
                    <StepIndicator />
                </div>

                <div className='tw-grow tw-py-4 tw-px-4 lg:tw-p-0'>
                    <FormTemplate />
                </div>

            </div>
            
        </div>
            
    )
}

export default SellForm;