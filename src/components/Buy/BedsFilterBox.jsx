import { useEffect, useState } from "react";

const BedsBox = ({bedsFilter, minBedsFilter, isExactMatchBedsRef, updateFilter, updateFilterName, minBathsFilter}) => {
    
    const [isExactMatchBeds, setIsExactMatchBeds] = useState(isExactMatchBedsRef.current);
    const [beds, setBeds] = useState([]);
    const [minBeds, setMinBeds] = useState();

    useEffect(() => {
      setBeds(bedsFilter);
      setMinBeds(minBedsFilter);
    }, [bedsFilter, minBedsFilter]);

    const [minBaths, setMinBaths] = useState('');

    useEffect(() => {
      setMinBaths(minBathsFilter);
    }, [minBathsFilter]);

    return (
      <div className="tw-w-screen sm:tw-w-auto">
      <div className='card tw-m-2'>
        <div className='card-header'>
          <h6 className='tw-font-medium'>Number of Bedrooms</h6>
        </div>
        <div className='card-body'>
          <div className='row mb-1 m-0' hidden={!isExactMatchBeds}>
            <div className='col p-0 m-0'>
              <input type="checkbox" className="btn-check" id="bed0" checked={beds.length === 0} onChange={(event) => {
                  setBeds(event.target.checked ? [] : []);
                }}/>
              <label className={`tw-rounded-l-md tw-border tw-border-solid tw-py-2 tw-pb-3 tw-w-full tw-font-medium tw-box-border  ${beds.length === 0 ? 'tw-text-white tw-bg-slate-900' : ''}
                        hover:tw-text-white hover:tw-bg-slate-900 active:tw-bg-slate-700 tw-text-center sm:tw-px-4 tw-border-slate-400 tw-cursor-pointer`} htmlFor="bed0">Any</label>
            </div>

            <div className='col p-0 m-0'>
              <input type="checkbox" className="btn-check" id="bed1" checked={beds.includes(1)} onChange={(event) => {
                setBeds(event.target.checked ? [...beds, 1] : beds.filter((n) => n !== 1));
              }} />
              <label className={`tw-border-r tw-border-t tw-border-b tw-border-solid tw-py-2 tw-pb-3 tw-w-full tw-font-medium  ${beds.includes(1) ? 'tw-text-white tw-bg-slate-900' : ''}
                        hover:tw-text-white hover:tw-bg-slate-900 active:tw-bg-slate-700 tw-text-center sm:tw-px-4 tw-border-slate-400 tw-cursor-pointer`} htmlFor="bed1">1</label>
            </div>

            <div className='col p-0 m-0'>
              <input type="checkbox" className="btn-check" id="bed2" checked={beds.includes(2)} onChange={(event) => {
                setBeds(event.target.checked ? [...beds, 2] : beds.filter((n) => n !== 2));
              }}/>
              <label className={`tw-border-r tw-border-t tw-border-b tw-border-solid tw-py-2 tw-pb-3 tw-w-full tw-font-medium  ${beds.includes(2) ? 'tw-text-white tw-bg-slate-900' : ''}
                        hover:tw-text-white hover:tw-bg-slate-900 active:tw-bg-slate-700 tw-text-center sm:tw-px-4 tw-border-slate-400 tw-cursor-pointer`} htmlFor="bed2">2</label>
            </div>

            <div className='col p-0 m-0'>
              <input type="checkbox" className="btn-check" id="bed3" checked={beds.includes(3)} onChange={(event) => {
                setBeds(event.target.checked ? [...beds, 3] : beds.filter((n) => n !== 3));
              }}/>
              <label className={`tw-border-r tw-border-t tw-border-b tw-border-solid tw-py-2 tw-pb-3 tw-w-full tw-font-medium  ${beds.includes(3) ? 'tw-text-white tw-bg-slate-900' : ''}
                        hover:tw-text-white hover:tw-bg-slate-900 active:tw-bg-slate-700 tw-text-center sm:tw-px-4 tw-border-slate-400 tw-cursor-pointer`} htmlFor="bed3">3</label>
            </div>

            <div className='col p-0 m-0'>
              <input type="checkbox" className="btn-check" id="bed4" checked={beds.includes(4)} onChange={(event) => {
                setBeds(event.target.checked ? [...beds, 4] : beds.filter((n) => n !== 4));
              }}/>
              <label className={`tw-border-r tw-border-t tw-border-b tw-border-solid tw-py-2 tw-pb-3 tw-w-full tw-font-medium  ${beds.includes(4) ? 'tw-text-white tw-bg-slate-900' : ''}
                        hover:tw-text-white hover:tw-bg-slate-900 active:tw-bg-slate-700 tw-text-center sm:tw-px-4 tw-border-slate-400 tw-cursor-pointer`} htmlFor="bed4">4</label>
            </div>

            <div className='col p-0 m-0'>
              <input type="checkbox" className="btn-check" id="bed5" checked={beds.includes(5)} onChange={(event) => {
                setBeds(event.target.checked ? [...beds, 5] : beds.filter((n) => n !== 5));
              }}/>
              <label className={`tw-rounded-r-md tw-border-r tw-border-t tw-border-b tw-border-solid tw-py-2 tw-pb-3 tw-w-full tw-font-medium  ${beds.includes(5) ? 'tw-text-white tw-bg-slate-900' : ''}
                        hover:tw-text-white hover:tw-bg-slate-900 active:tw-bg-slate-700 tw-text-center sm:tw-px-4 tw-border-slate-400 tw-cursor-pointer`} htmlFor="bed5">5</label>
            </div>
          </div>

          <div className='row mb-1 m-0' hidden={isExactMatchBeds}>
            <div className='col p-0 m-0'>
              <input type="radio" className="btn-check" name='bedrooms' id="bed0+" checked={minBeds===''} onChange={(event) => {
                  setMinBeds(event.target.checked ? '' : '')
                }}/>
              <label className={`tw-rounded-l-md tw-border tw-border-solid tw-py-2 tw-pb-3 tw-w-full tw-font-medium tw-box-border  ${minBeds==='' ? 'tw-text-white tw-bg-slate-900' : ''}
                        hover:tw-text-white hover:tw-bg-slate-900 active:tw-bg-slate-700 tw-text-center sm:tw-px-4 tw-border-slate-400 tw-cursor-pointer`} htmlFor="bed0+">Any</label>
            </div>

            <div className='col p-0 m-0'>
              <input type="radio" className="btn-check" name='bedrooms' id="bed1+" checked={minBeds===1} onChange={(event) => {
                  setMinBeds(event.target.checked ? 1 : '')
                }}/>
              <label className={`tw-border-r tw-border-t tw-border-b tw-border-solid tw-py-2 tw-pb-3 tw-w-full tw-font-medium ${minBeds===1 ? 'tw-text-white tw-bg-slate-900' : ''}
                        hover:tw-text-white hover:tw-bg-slate-900 active:tw-bg-slate-700 tw-text-center sm:tw-px-4 tw-border-slate-400 tw-cursor-pointer`} htmlFor="bed1+">1+</label>
            </div>
            <div className='col p-0 m-0'>
              <input type="radio" className="btn-check" name='bedrooms' id="bed2+" checked={minBeds===2} onChange={(event) => {
                  setMinBeds(event.target.checked ? 2 : '')
                }}/>
              <label className={`tw-border-r tw-border-t tw-border-b tw-border-solid tw-py-2 tw-pb-3 tw-w-full tw-font-medium ${minBeds===2 ? 'tw-text-white tw-bg-slate-900' : ''}
                        hover:tw-text-white hover:tw-bg-slate-900 active:tw-bg-slate-700 tw-text-center sm:tw-px-4 tw-border-slate-400 tw-cursor-pointer`} htmlFor="bed2+">2+</label>
            </div>
            <div className='col p-0 m-0'>
              <input type="radio" className="btn-check" name='bedrooms' id="bed3+" checked={minBeds===3} onChange={(event) => {
                  setMinBeds(event.target.checked ? 3 : '')
                }}/>
              <label className={`tw-border-r tw-border-t tw-border-b tw-border-solid tw-py-2 tw-pb-3 tw-w-full tw-font-medium ${minBeds===3 ? 'tw-text-white tw-bg-slate-900' : ''}
                        hover:tw-text-white hover:tw-bg-slate-900 active:tw-bg-slate-700 tw-text-center sm:tw-px-4 tw-border-slate-400 tw-cursor-pointer`} htmlFor="bed3+">3+</label>
            </div>
            <div className='col p-0 m-0'>
              <input type="radio" className="btn-check" name='bedrooms' id="bed4+" checked={minBeds===4} onChange={(event) => {
                  setMinBeds(event.target.checked ? 4 : '')
                }}/>
              <label className={`tw-border-r tw-border-t tw-border-b tw-border-solid tw-py-2 tw-pb-3 tw-w-full tw-font-medium ${minBeds===4 ? 'tw-text-white tw-bg-slate-900' : ''}
                        hover:tw-text-white hover:tw-bg-slate-900 active:tw-bg-slate-700 tw-text-center sm:tw-px-4 tw-border-slate-400 tw-cursor-pointer`} htmlFor="bed4+">4+</label>
            </div>
            <div className='col p-0 m-0'>
              <input type="radio" className="btn-check" name='bedrooms' id="bed5+" checked={minBeds===5} onChange={(event) => {
                  setMinBeds(event.target.checked ? 5 : '')
                }}/>
              <label className={`tw-rounded-r-md tw-border-r tw-border-t tw-border-b tw-border-solid tw-py-2 tw-pb-3 tw-w-full tw-font-medium ${minBeds===5 ? 'tw-text-white tw-bg-slate-900' : ''}
                        hover:tw-text-white hover:tw-bg-slate-900 active:tw-bg-slate-700 tw-text-center sm:tw-px-4 tw-border-slate-400 tw-cursor-pointer`} htmlFor="bed5+">5+</label>
            </div>
          </div>

          <div className='row my-2 m-0 ps-2'>
            <div className='form-check'>
              <input className='form-check-input' type='checkbox' id='useexactmatch' 
                checked={isExactMatchBeds} 
                onChange={() => {
                  !isExactMatchBeds ? setMinBeds('') : setBeds([]);
                  isExactMatchBedsRef.current = !isExactMatchBeds; 
                  setIsExactMatchBeds(!isExactMatchBeds)
                }}/>
              <label className='form-check-label tw-cursor-pointer' htmlFor='useexactmatch'>Use Exact Match</label>
            </div>
          </div>
        </div>
      </div>

      <div className='card tw-m-2'>
        <div className='card-header'>
          <h6 className='tw-font-medium'>Number of Bathrooms</h6>
        </div>
        <div className='card-body'>
          <div className='row mb-1 m-0'>

            <div className='col p-0 m-0'>
              <input type="radio" className="btn-check" id="bath0+" name='bathroms' checked={minBaths===''} 
                onChange={(event) => {setMinBaths(event.target.checked ? '' : '')}} 
                />
              <label className={`tw-rounded-l-md tw-border tw-border-solid tw-py-2 tw-pb-3 tw-w-full tw-font-medium  ${minBaths==='' ? 'tw-text-white tw-bg-slate-900' : ''}
                        hover:tw-text-white hover:tw-bg-slate-900 active:tw-bg-slate-700 tw-text-center sm:tw-px-4 tw-border-slate-400 tw-cursor-pointer`} htmlFor="bath0+">Any</label>
            </div>

            <div className='col p-0 m-0'>
              <input type="radio" className="btn-check" id="bath1+" name='bathroms' checked={minBaths===1} 
                onChange={(event) => {setMinBaths(event.target.checked ? 1 : '')}} 
                />
              <label className={`tw-border-r tw-border-t tw-border-b tw-border-solid tw-py-2 tw-pb-3 tw-w-full tw-font-medium  ${minBaths===1 ? 'tw-text-white tw-bg-slate-900' : ''}
                        hover:tw-text-white hover:tw-bg-slate-900 active:tw-bg-slate-700 tw-text-center sm:tw-px-4 tw-border-slate-400 tw-cursor-pointer`} htmlFor="bath1+">1+</label>
            </div>

            <div className='col p-0 m-0'>
              <input type="radio" className="btn-check" id="bath2+" name='bathroms' checked={minBaths===2} 
                onChange={(event) => {setMinBaths(event.target.checked ? 2 : '')}} 
                />
              <label className={`tw-border-r tw-border-t tw-border-b tw-border-solid tw-py-2 tw-pb-3 tw-w-full tw-font-medium ${minBaths===2 ? 'tw-text-white tw-bg-slate-900' : ''}
                        hover:tw-text-white hover:tw-bg-slate-900 active:tw-bg-slate-700 tw-text-center sm:tw-px-4 tw-border-slate-400 tw-cursor-pointer`} htmlFor="bath2+">2+</label>
            </div>

            <div className='col p-0 m-0'>
              <input type="radio" className="btn-check" id="bath3+" name='bathroms' checked={minBaths===3} 
                onChange={(event) => {setMinBaths(event.target.checked ? 3 : '')}} 
                />
              <label className={`tw-border-r tw-border-t tw-border-b tw-border-solid tw-py-2 tw-pb-3 tw-w-full tw-font-medium  ${minBaths===3 ? 'tw-text-white tw-bg-slate-900' : ''}
                        hover:tw-text-white hover:tw-bg-slate-900 active:tw-bg-slate-700 tw-text-center sm:tw-px-4 tw-border-slate-400 tw-cursor-pointer`} htmlFor="bath3+">3+</label>
            </div>

            <div className='col p-0 m-0'>
              <input type="radio" className="btn-check" id="bath4+" name='bathroms' checked={minBaths===4} 
                onChange={(event) => {setMinBaths(event.target.checked ? 4 : '')}} 
                />
              <label className={`tw-border-r tw-border-t tw-border-b tw-border-solid tw-py-2 tw-pb-3 tw-w-full tw-font-medium  ${minBaths===4 ? 'tw-text-white tw-bg-slate-900' : ''}
                        hover:tw-text-white hover:tw-bg-slate-900 active:tw-bg-slate-700 tw-text-center sm:tw-px-4 tw-border-slate-400 tw-cursor-pointer`} htmlFor="bath4+">4+</label>
            </div>

            <div className='col p-0 m-0'>
              <input type="radio" className="btn-check" id="bath5+" name='bathroms' checked={minBaths===5} 
                onChange={(event) => {setMinBaths(event.target.checked ? 5 : '')}} 
                />
              <label className={`tw-rounded-r-md tw-border-r tw-border-t tw-border-b tw-border-solid tw-py-2 tw-pb-3 tw-w-full tw-font-medium  ${minBaths===5 ? 'tw-text-white tw-bg-slate-900' : ''}
                        hover:tw-text-white hover:tw-bg-slate-900 active:tw-bg-slate-700 tw-text-center sm:tw-px-4 tw-border-slate-400 tw-cursor-pointer`} htmlFor="bath5+">5+</label>
            </div>
          </div>
        </div>
      </div>

      <div className='row tw-m-3'>
            <button className='tw-border tw-border-solid tw-py-2 tw-pb-3 tw-font-medium tw-rounded-md 
                        tw-text-white tw-bg-slate-900' data-bs-dismiss='dropdown' data-bs-target='#baths-dropdown' onClick={() => {
              if(minBeds !== '')
                updateFilterName('beds', `${minBeds}+ bds`)
              else if(beds.length > 0)
                updateFilterName('beds', `${beds.sort().join(', ')} bds`)
              else
                updateFilterName('beds', 'Beds')

              updateFilter('bedsFilter', beds);
              updateFilter('minBedsFilter', minBeds);
  
              if(minBaths !== '')
                updateFilterName('baths', `${minBaths}+ baths`);
              else
              updateFilterName('baths', 'Baths');

              updateFilter('minBathsFilter', minBaths);
              }}>
              Apply
            </button>
          </div>
      </div>
    )
}

export default BedsBox;