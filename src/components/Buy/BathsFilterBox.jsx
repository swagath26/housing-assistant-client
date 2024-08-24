import { useEffect, useState } from "react"

const BathsFilterBox = ({minBathsFilter, updateFilter, updateFilterName}) => {

  const [minBaths, setMinBaths] = useState();

  useEffect(() => {
    setMinBaths(minBathsFilter);
  }, [minBathsFilter]);

  return (
      <div className='card'>
        <div className='card-header'>
          <h6>Number of Bathrooms</h6>
        </div>
        <div className='card-body'>
          <div className='row mb-1 m-0'>
            <div className='col px-2'>
              <input type="radio" className="btn-check" id="bath1+" name='bathroms' checked={minBaths===1} 
                onChange={(event) => {setMinBaths(event.target.checked ? 1 : null)}} 
                />
              <label className="btn btn-outline-primary" style={{minWidth:'45px'}} htmlFor="bath1+">1+</label>
            </div>

            <div className='col px-2'>
              <input type="radio" className="btn-check" id="bath2+" name='bathroms' checked={minBaths===2} 
                onChange={(event) => {setMinBaths(event.target.checked ? 2 : null)}} 
                />
              <label className="btn btn-outline-primary" style={{minWidth:'45px'}} htmlFor="bath2+">2+</label>
            </div>

            <div className='col px-2'>
              <input type="radio" className="btn-check" id="bath3+" name='bathroms' checked={minBaths===3} 
                onChange={(event) => {setMinBaths(event.target.checked ? 3 : null)}} 
                />
              <label className="btn btn-outline-primary" style={{minWidth:'45px'}} htmlFor="bath3+">3+</label>
            </div>

            <div className='col px-2'>
              <input type="radio" className="btn-check" id="bath4+" name='bathroms' checked={minBaths===4} 
                onChange={(event) => {setMinBaths(event.target.checked ? 4 : null)}} 
                />
              <label className="btn btn-outline-primary" style={{minWidth:'45px'}} htmlFor="bath4+">4+</label>
            </div>

            <div className='col px-2'>
              <input type="radio" className="btn-check" id="bath5+" name='bathroms' checked={minBaths===5} 
                onChange={(event) => {setMinBaths(event.target.checked ? 5 : null)}} 
                />
              <label className="btn btn-outline-primary" style={{minWidth:'45px'}} htmlFor="bath5+">5+</label>
            </div>
          </div>

          <div className='row my-1 mt-3 m-0'>
            <button className='btn btn-primary' data-bs-dismiss='dropdown' data-bs-target='#baths-dropdown' onClick={() => {
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
      </div>
    )
}

export default BathsFilterBox;