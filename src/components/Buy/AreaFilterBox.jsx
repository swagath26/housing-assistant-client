import { useEffect, useState } from "react";

const AreaFilterBox = ({setMinAreaFilter, minAreaFilter, maxAreaFilter, setMaxAreaFilter, setFilterArea, setCurrentPage}) => {
    
    const [minArea, setMinArea] = useState('');
    const [maxArea, setMaxArea] = useState('');

    useEffect(() => {
        setMinArea(minAreaFilter);
        setMaxArea(maxAreaFilter);
    }, [minAreaFilter, maxAreaFilter]);

    return (
        <div className='card' style={{maxWidth:'320px'}}>
            <div className='card-header'>
                <h6>Area in Sqft</h6>
            </div>
            <div className='card-body'>
                <div className='row mb-1'>
                <div className='col-6 d-flex justify-content-center'>
                    <b>Minimum</b>
                </div>
                <div className='col-6 d-flex justify-content-center'>
                    <b>Maximum</b>
                </div>
                </div>
                <div className='row mb-3'>
                <div className='col-5 d-flex justify-content-center'>
                    <input className='ms-4 ps-2 filter-input' placeholder='No Min' id='min-area' 
                    value={minArea} onChange={(event) => {setMinArea(event.target.value)}} 
                    style={{maxWidth:'110px'}} />
                </div>
                <div className='col-2 d-flex justify-content-center'>
                    <p>-</p>
                </div>
                <div className='col-5 d-flex justify-content-center'>
                    <input className='me-4 ps-2 filter-input' placeholder='No Max' id='max-area' 
                    value={maxArea} onChange={(event) => {setMaxArea(event.target.value)}} 
                    style={{maxWidth:'110px'}} />
                </div>
                </div>
                <div className='row'>
                <button className='btn btn-primary' onClick={() => {
                    setFilterArea(minArea && 
                        maxArea ? 
                            `${minArea} - ${maxArea} sqft` : 
                            (minArea ?
                                `${minArea} sqft+` :
                                (maxArea ?
                                    `Upto ${maxArea} sqft` :
                                    'Area')
                            )
                    );
                    setCurrentPage(1);
                    setMinAreaFilter(minArea);
                    setMaxAreaFilter(maxArea);
                    }}>
                    Apply
                </button>
                </div>
            </div>
        </div>
    )
};

export default AreaFilterBox;