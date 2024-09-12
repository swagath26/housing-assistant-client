import { useEffect, useState } from "react";

const HomeTypeFilterBox = ({homeTypeFilter, updateFilter, updateFilterName}) => {

  const [homeType, setHomeType] = useState([]);

  useEffect(() => {
    setHomeType(homeTypeFilter);
  }, [homeTypeFilter]);

  return (
        <div className="card" style={{maxWidth:'15em'}}>
          <div className='card-header'>
            <h6 className='tw-font-medium'>Home Type</h6>
          </div>
          <div className='card-body'>
            <div className='row mb-3 m-0'>
              <div className='form-check tw-py-2'>
                <input type="checkbox" className="form-check-input tw-border-slate-400" id="houses" checked={homeType.includes('Houses')} onChange={(event) => {
                setHomeType(event.target.checked ? [...homeType, 'Houses'] : homeType.filter((n) => n !== 'Houses'));
              }}/>
                <label className='tw-cursor-pointer tw-font-normal' htmlFor="houses">Houses</label>
              </div>

              <div className='form-check tw-py-2'>
                <input type="checkbox" className="form-check-input tw-border-slate-400" id="apartments" checked={homeType.includes('Apartments')} onChange={(event) => {
                setHomeType(event.target.checked ? [...homeType, 'Apartments'] : homeType.filter((n) => n !== 'Apartments'));
              }}/>
                <label className="tw-cursor-pointer tw-font-normal" htmlFor="apartments">Apartments</label>
              </div>

              <div className='form-check tw-py-2'>
                <input type="checkbox" className="form-check-input tw-border-slate-400" id="condos" checked={homeType.includes('Condos/Co-ops')} onChange={(event) => {
                setHomeType(event.target.checked ? [...homeType, 'Condos/Co-ops'] : homeType.filter((n) => n !== 'Condos/Co-ops'));
              }} />
                <label className="tw-cursor-pointer tw-font-normal" htmlFor="condos">Condos/Co-ops</label>
              </div>

              <div className='form-check tw-py-2'>
                <input type="checkbox" className="form-check-input tw-border-slate-400" id="multi"  checked={homeType.includes('Multi-family')} onChange={(event) => {
                setHomeType(event.target.checked ? [...homeType, 'Multi-family'] : homeType.filter((n) => n !== 'Multi-family'));
              }}/>
                <label className="tw-cursor-pointer tw-font-normal" htmlFor="multi">Multi-family</label>
              </div>
            </div>
                        
            <div className='row m-0'>
              <button className='tw-border tw-border-solid tw-py-2 tw-pb-3 tw-font-medium tw-rounded-md 
                        tw-text-white tw-bg-slate-900' onClick={() => {
                if(homeType.length > 0)
                  updateFilterName('homeType', `Home Type (${homeType.length})`)
                else
                  updateFilterName('homeType', 'Home Type')

                updateFilter('homeTypeFilter', homeType);
                }}>
                Apply
              </button>
            </div>
          </div>
      </div>
    )
}

export default HomeTypeFilterBox;