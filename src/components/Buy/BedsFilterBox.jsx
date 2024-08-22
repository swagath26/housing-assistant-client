import { useEffect, useState } from "react";

const BedsBox = ({bedsFilter, setBedsFilter, minBedsFilter, setMinBedsFilter, setFilterBeds, setCurrentPage}) => {
    
    const [isExactMatchBeds, setIsExactMatchBeds] = useState(false);
    const [beds, setBeds] = useState([]);
    const [minBeds, setMinBeds] = useState();

    useEffect(() => {
      setBeds(bedsFilter);
      setMinBeds(minBedsFilter);
    }, [bedsFilter, minBedsFilter]);

    useEffect(() => {
        isExactMatchBeds ? setMinBeds('') : setBeds([]);
    }, [isExactMatchBeds]);

    return (
      <div className='card'>
        <div className='card-header'>
          <h6>Number of Bedrooms</h6>
        </div>
        <div className='card-body'>
          <div className='row mb-1 m-0' hidden={!isExactMatchBeds}>
            <div className='col px-2'>
              <input type="checkbox" className="btn-check" id="bed1" checked={beds.includes(1)} onChange={(event) => {
                setBeds(event.target.checked ? [...beds, 1] : beds.filter((n) => n !== 1));
              }} />
              <label className="btn btn-outline-primary" style={{minWidth:'45px'}} htmlFor="bed1">1</label>
            </div>

            <div className='col px-2'>
              <input type="checkbox" className="btn-check" id="bed2" checked={beds.includes(2)} onChange={(event) => {
                setBeds(event.target.checked ? [...beds, 2] : beds.filter((n) => n !== 2));
              }}/>
              <label className="btn btn-outline-primary" style={{minWidth:'45px'}} htmlFor="bed2">2</label>
            </div>

            <div className='col px-2'>
              <input type="checkbox" className="btn-check" id="bed3" checked={beds.includes(3)} onChange={(event) => {
                setBeds(event.target.checked ? [...beds, 3] : beds.filter((n) => n !== 3));
              }}/>
              <label className="btn btn-outline-primary" style={{minWidth:'45px'}} htmlFor="bed3">3</label>
            </div>

            <div className='col px-2'>
              <input type="checkbox" className="btn-check" id="bed4" checked={beds.includes(4)} onChange={(event) => {
                setBeds(event.target.checked ? [...beds, 4] : beds.filter((n) => n !== 4));
              }}/>
              <label className="btn btn-outline-primary" style={{minWidth:'45px'}} htmlFor="bed4">4</label>
            </div>

            <div className='col px-2'>
              <input type="checkbox" className="btn-check" id="bed5" checked={beds.includes(5)} onChange={(event) => {
                setBeds(event.target.checked ? [...beds, 5] : beds.filter((n) => n !== 5));
              }}/>
              <label className="btn btn-outline-primary" style={{minWidth:'45px'}} htmlFor="bed5">5</label>
            </div>
          </div>

          <div className='row mb-1 m-0' hidden={isExactMatchBeds}>
            <div className='col px-2'>
              <input type="radio" className="btn-check" name='bedrooms' id="bed1+" checked={minBeds===1} onChange={(event) => {
                setMinBeds(event.target.checked ? 1 : null)}}/>
              <label className="btn btn-outline-primary" style={{minWidth:'45px'}} htmlFor="bed1+">1+</label>
            </div>
            <div className='col px-2'>
              <input type="radio" className="btn-check" name='bedrooms' id="bed2+" checked={minBeds===2} onChange={(event) => {
                setMinBeds(event.target.checked ? 2 : null)}}/>
              <label className="btn btn-outline-primary" style={{minWidth:'45px'}} htmlFor="bed2+">2+</label>
            </div>
            <div className='col px-2'>
              <input type="radio" className="btn-check" name='bedrooms' id="bed3+" checked={minBeds===3} onChange={(event) => {
                setMinBeds(event.target.checked ? 3 : null)}}/>
              <label className="btn btn-outline-primary" style={{minWidth:'45px'}} htmlFor="bed3+">3+</label>
            </div>
            <div className='col px-2'>
              <input type="radio" className="btn-check" name='bedrooms' id="bed4+" checked={minBeds===4} onChange={(event) => {
                setMinBeds(event.target.checked ? 4 : null)}}/>
              <label className="btn btn-outline-primary" style={{minWidth:'45px'}} htmlFor="bed4+">4+</label>
            </div>
            <div className='col px-2'>
              <input type="radio" className="btn-check" name='bedrooms' id="bed5+" checked={minBeds===5} onChange={(event) => {
                setMinBeds(event.target.checked ? 5 : null)}}/>
              <label className="btn btn-outline-primary" style={{minWidth:'45px'}} htmlFor="bed5+">5+</label>
            </div>
          </div>

          <div className='row my-2 m-0 ps-2'>
            <div className='form-check'>
              <input className='form-check-input' type='checkbox' id='useexactmatch' checked={isExactMatchBeds} onChange={() => {setIsExactMatchBeds(!isExactMatchBeds)}}/>
              <label className='form-check-label' htmlFor='useexactmatch'>Use Exact Match</label>
            </div>
          </div>
          
          <div className='row my-1 m-0'>
            <button className='btn btn-primary' onClick={() => {
              if(minBeds !== '')
                setFilterBeds(`${minBeds}+ bds`)
              else if(beds.length > 0)
                setFilterBeds(`${beds.sort().join(', ')} bds`)
              else
                setFilterBeds('Beds')
              
              setCurrentPage(1);
              setBedsFilter(beds);
              setMinBedsFilter(minBeds);
              }}>
              Apply
            </button>
          </div>
        </div>
      </div>
    )
}

export default BedsBox;