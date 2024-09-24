import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import frame from '../../assets/img/Frame_1.jpg';

const HeroBanner = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const handleSearch = () => {
      searchQuery && navigate(`/buy/${searchQuery}`)
    };
    useEffect(() => {
      document.getElementById('search-input').addEventListener('keypress', (event) => {
        if(event.key === 'Enter') {
          event.preventDefault();
          event.target.value && navigate(`/buy/${event.target.value}`);
        }
      })
    }, []);

    return (
      <div className="tw-w-full tw-h-[90dvh] lg:tw-h-[85dvh] tw-flex-col tw-justify-start tw-items-center tw-inline-flex">
        <div className="tw-self-stretch tw-h-full tw-grow tw-shrink tw-pt-6 tw-pb-6 tw-px-4 lg:tw-px-12 lg:tw-pt-8 lg:tw-pb-14 tw-justify-center tw-items-center lg:tw-gap-12 tw-flex tw-flex-col lg:tw-flex-row">

          <div className="tw-h-full lg:tw-w-min tw-w-full tw-px-4 lg:tw-px-10 tw-self-stretch tw-flex-col tw-justify-start tw-items-center tw-inline-flex">
            <div className="tw-w-full tw-max-w-[36em] tw-relative tw-justify-start tw-items-center tw-gap-[9px] tw-flex">
                <input type='text' 
                  id="search-input" 
                  value={searchQuery} 
                  onChange={(event) => {setSearchQuery(event.target.value)}}
                  className="tw-overflow-hidden tw-w-full tw-px-12 tw-py-2 lg:tw-py-4 tw-text-zinc-400 tw-text-base tw-font-normal 
                  tw-rounded-3xl tw-border tw-border-zinc-400 focus-visible:tw-outline-none"
                  placeholder='Search by location, address, etc.'
                  aria-label='Search'
                  aria-describedby='search-addon'/>
                <button onClick={handleSearch} className='tw-rounded-l-3xl tw-pl-7 tw-pr-2 tw-flex tw-justify-center tw-items-center tw-absolute tw-w-8 tw-h-full' id='search-addon'>
                  <i className='tw-text-zinc-400 fas fa-search'></i>
                </button>
            </div>
            <div className="tw-flex tw-flex-col tw-gap-4 tw-py-4 tw-grow lg:tw-justify-center">
              <div className="tw-pt-4 lg:tw-pt-0 tw-self-stretch lg:tw-w-max tw-text-center tw-text-neutral-800 tw-text-[length:var(--fs-xxl)] tw-font-[500] tw-leading-tight">Discover Your <br className='tw-hidden lg:tw-block'></br>Dream Home</div>
              <div className="tw-self-stretch tw-text-center lg:tw-text-start tw-text-black/60 tw-text-sm lg:tw-text-lg tw-font-normal">
                Connecting you with homes that inspire, comfort, and elevate your living experience.
              </div>
              <div className="tw-self-stretch tw-px-[30px] tw-py-2 lg:tw-py-5 tw-justify-center lg:tw-justify-end tw-items-center tw-gap-2.5 tw-inline-flex">
                <div className="tw-px-4 lg:tw-px-7 tw-py-3 tw-bg-neutral-800 tw-rounded-[23px] tw-justify-center tw-items-center tw-gap-2.5 tw-flex">
                  <div className="tw-text-white tw-text-md lg:tw-text-xl tw-font-semibold">Get Started</div>
                </div>
              </div>
            </div>
          </div>

          <div className="tw-self-stretch tw-h-full tw-grow tw-overflow-auto lg:tw-h-full">
              <img className="tw-h-full tw-w-full tw-object-cover tw-rounded-[30px] tw-object-left" src={frame}/>
          </div>

        </div>
      </div>

    )
}

export default HeroBanner;