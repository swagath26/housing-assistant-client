import { useEffect, useState } from "react";

const HomeTypeFilterBox = ({setHomeTypeFilter, homeTypeFilter, setFilterHomeType, setCurrentPage}) => {

  const [homeType, setHomeType] = useState([]);

  useEffect(() => {
    setHomeType(homeTypeFilter);
  }, [homeTypeFilter]);

  return (
        <div className="card" style={{maxWidth:'320px'}}>
          <div className='card-header'>
            <h6>Home Type</h6>
          </div>
          <div className='card-body'>
            <div className='row mb-1'>
              <div className='form-check'>
                <input type="checkbox" className="form-check-input" id="houses" checked={homeType.includes('Houses')} onChange={(event) => {
                setHomeType(event.target.checked ? [...homeType, 'Houses'] : homeType.filter((n) => n !== 'Houses'));
              }}/>
                <label className='form-check-label' htmlFor="houses">Houses</label>
              </div>

              <div className='form-check'>
                <input type="checkbox" className="form-check-input" id="apartments" checked={homeType.includes('Apartments')} onChange={(event) => {
                setHomeType(event.target.checked ? [...homeType, 'Apartments'] : homeType.filter((n) => n !== 'Apartments'));
              }}/>
                <label htmlFor="apartments">Apartments</label>
              </div>

              <div className='form-check'>
                <input type="checkbox" className="form-check-input" id="condos" checked={homeType.includes('Condos/Co-ops')} onChange={(event) => {
                setHomeType(event.target.checked ? [...homeType, 'Condos/Co-ops'] : homeType.filter((n) => n !== 'Condos/Co-ops'));
              }} />
                <label htmlFor="condos">Condos/Co-ops</label>
              </div>

              <div className='form-check'>
                <input type="checkbox" className="form-check-input" id="multi"  checked={homeType.includes('Multi-family')} onChange={(event) => {
                setHomeType(event.target.checked ? [...homeType, 'Multi-family'] : homeType.filter((n) => n !== 'Multi-family'));
              }}/>
                <label htmlFor="multi">Multi-family</label>
              </div>
            </div>
                        
            <div className='row my-1'>
              <button className='btn btn-primary' onClick={() => {
                if(homeType.length > 0)
                  setFilterHomeType(`Type (${homeType.length})`)
                else
                setFilterHomeType('Type')
                
                setCurrentPage(1);
                setHomeTypeFilter(homeType);
                }}>
                Apply
              </button>
            </div>
          </div>
      </div>
    )
}

export default HomeTypeFilterBox;