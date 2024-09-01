import { useEffect, useState } from "react";
import { INRPriceFormat } from "../../utils/CurrencyFormat";

const PriceFilterBox = ({minPriceFilter, maxPriceFilter, updateFilter, updateFilterName}) => {

    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    const [formattedMinPrice, setFormattedMinPrice] = useState('');
    const [formattedMaxPrice, setFormattedMaxPrice] = useState('');

    const handleMinPriceInputChange = (event) => {
        const value = event.target.value;
        const numbericValue = value.replace(/[^0-9]/g, '');
        setFormattedMinPrice(INRPriceFormat(numbericValue));
        setMinPrice(parseInt(numbericValue));
    }

    const handleMaxPriceInputChange = (event) => {
        const value = event.target.value;
        const numbericValue = value.replace(/[^0-9]/g, '');
        setFormattedMaxPrice(INRPriceFormat(numbericValue));
        setMaxPrice(parseInt(numbericValue));
    }
    
    useEffect(() => {
        setMinPrice(minPriceFilter);
        setFormattedMinPrice(minPriceFilter ? INRPriceFormat(minPriceFilter) : '');
        setMaxPrice(maxPriceFilter);
        setFormattedMaxPrice(maxPriceFilter ? INRPriceFormat(maxPriceFilter) : '');
    }, [minPriceFilter, maxPriceFilter]);

    return (
        <div className='card' style={{maxWidth:'320px'}}>
            <div className='card-header'>
                <h6 className='tw-font-medium'>Price Range (in Rs)</h6>
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
                <div className='row mb-4'>
                    <div className='col-5 d-flex justify-content-center'>
                    <input className='tw-text-center tw-border-slate-400 tw-mt-1 ms-4 filter-input tw-border tw-py-2 tw-rounded-lg' placeholder='No Min' id='min-price' 
                        value={formattedMinPrice} onChange={handleMinPriceInputChange} 
                        style={{maxWidth:'110px'}} />
                    </div>
                    <div className='col-2 d-flex tw-mt-1 tw-text-3xl tw-text-slate-400 justify-content-center'>
                    <p>-</p>
                    </div>
                    <div className='col-5 d-flex justify-content-center'>
                    <input className='tw-text-center tw-border-slate-400 tw-mt-1 me-4 filter-input tw-border tw-py-2 tw-rounded-lg' placeholder='No Max' id='max-price' 
                        value={formattedMaxPrice} onChange={handleMaxPriceInputChange} 
                        style={{maxWidth:'110px'}} />
                    </div>
                </div>
                <div className='row m-0'>
                    <button className='tw-border tw-border-solid tw-py-2 tw-pb-3 tw-font-medium tw-rounded-md 
                        tw-text-white tw-bg-slate-900' onClick={() => {
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