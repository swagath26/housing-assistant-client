import { useEffect, useState } from "react";

const AreaFilterBox = ({minAreaFilter, maxAreaFilter, updateFilter, updateFilterName}) => {
    
    const [minArea, setMinArea] = useState('');
    const [maxArea, setMaxArea] = useState('');

    useEffect(() => {
        setMinArea(minAreaFilter);
        setMaxArea(maxAreaFilter);
    }, [minAreaFilter, maxAreaFilter]);

    return (
        <div className='card' style={{maxWidth:'320px'}}>
            <div className='card-header'>
                <h6 className='tw-font-medium'>Area in Sqft</h6>
            </div>
            <div className='card-body'>
                <div className='row mb-1'>
                <div className='col-6 d-flex justify-content-center'>
                    Minimum
                </div>
                <div className='col-6 d-flex justify-content-center'>
                    Maximum
                </div>
                </div>
                <div className='row mb-4'>
                    <div className='col-5 d-flex justify-content-center'>
                        <input className='tw-text-center tw-border-slate-400 tw-mt-1 ms-4 filter-input tw-border tw-py-2 tw-rounded-lg' placeholder='No Min' id='min-area' 
                        value={minArea} onChange={(event) => {setMinArea(event.target.value)}} 
                        style={{maxWidth:'110px'}} />
                    </div>
                    <div className='col-2 d-flex tw-mt-1 tw-text-3xl tw-text-slate-400 justify-content-center'>
                        <p>-</p>
                    </div>
                    <div className='col-5 d-flex justify-content-center'>
                        <input className='tw-text-center tw-border-slate-400 tw-mt-1 me-4 filter-input tw-border tw-py-2 tw-rounded-lg' placeholder='No Max' id='max-area' 
                        value={maxArea} onChange={(event) => {setMaxArea(event.target.value)}} 
                        style={{maxWidth:'110px'}} />
                    </div>
                </div>
                <div className='row m-0'>
                    <button className='tw-border tw-border-solid tw-py-2 tw-pb-3 tw-font-medium tw-rounded-md 
                            tw-text-white tw-bg-slate-900' onClick={() => {
                        updateFilterName('area', minArea && 
                            maxArea ? 
                                `${minArea} - ${maxArea} sqft` : 
                                (minArea ?
                                    `${minArea} sqft+` :
                                    (maxArea ?
                                        `Upto ${maxArea} sqft` :
                                        'Area')
                                )
                        );

                        updateFilter('minAreaFilter', minArea);
                        updateFilter('maxAreaFilter', maxArea);
                        }}>
                        Apply
                    </button>
                </div>
            </div>
        </div>
    )
};

export default AreaFilterBox;