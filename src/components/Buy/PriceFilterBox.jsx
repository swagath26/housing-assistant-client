import { useEffect, useState } from "react";

const PriceFilterBox = ({minPriceFilter, maxPriceFilter, updateFilter, updateFilterName}) => {

    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    
    useEffect(() => {
        setMinPrice(minPriceFilter);
        setMaxPrice(maxPriceFilter);
    }, [minPriceFilter, maxPriceFilter]);

    return (
        <div className='card' style={{maxWidth:'320px'}}>
            <div className='card-header'>
                <h6>Price Range (in Rs)</h6>
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
                    <input className='ms-4 ps-2 filter-input' placeholder='No Min' id='min-price' 
                        value={minPrice} onChange={(event) => {setMinPrice(event.target.value)}} 
                        style={{maxWidth:'110px'}} />
                    </div>
                    <div className='col-2 d-flex justify-content-center'>
                    <p>-</p>
                    </div>
                    <div className='col-5 d-flex justify-content-center'>
                    <input className='me-4 ps-2 filter-input' placeholder='No Max' id='max-price' 
                        value={maxPrice} onChange={(event) => {setMaxPrice(event.target.value)}} 
                        style={{maxWidth:'110px'}} />
                    </div>
                </div>
                <div className='row'>
                    <button className='btn btn-primary' onClick={() => {
                        updateFilterName('price', minPrice && 
                            maxPrice ? 
                                `Rs ${minPrice/100000}L - ${maxPrice/100000}L` : 
                                (minPrice ? 
                                    `Rs ${minPrice/100000}L+` :
                                    (maxPrice ? 
                                        `Upto Rs ${maxPrice/100000}L` : 
                                        'Price Range')
                                )
                        );

                        updateFilter('minPriceFilter', minPrice);
                        updateFilter('maxPriceFilter', maxPrice);
                        }}>
                        Apply
                    </button>
                </div>
            </div>
        </div>
    )
};

export default PriceFilterBox;