import { useNavigate } from 'react-router-dom';
import './FeatureSection.css'

const FeatureSection = () => {
    const navigate = useNavigate();
    return (
      // <div className='tw-container tw-p-5 tw-mt-2'>
      //   <div className='tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-3'>
          
      //     <div className='tw-p-3'>
      //       <div className='tw-card nav-card tw-bg-white tw-shadow-lg tw-rounded-lg' id='buy-card' onClick={() => navigate('/buy')}>
      //         <div className='tw-flex tw-flex-col tw-items-center tw-p-2'>
      //           <div className='tw-w-full tw-flex tw-justify-center tw-p-2'>
      //             <img src="/static/img/buy.jpg" className='tw-w-full tw-max-w-[350px]' alt='buy'/>
      //           </div>
      //           <div className='tw-w-full tw-p-2'>
      //             <div className='tw-flex tw-justify-center tw-p-2'>
      //               <h2 className='tw-font-serif tw-text-lg'>Buy a home</h2>
      //             </div>
      //             <div className='tw-flex tw-justify-center tw-items-center tw-py-2' style={{ height: '120px' }}>
      //               <p className='tw-text-center tw-text-lg'>Find your place with an immersive photo experience and the listings, which you won’t find anywhere else.</p>
      //             </div>
      //             <div className='tw-flex tw-justify-center tw-p-4'>
      //               <button className='tw-btn tw-btn-outline-primary tw-font-bold' id='buy-button' style={{ maxWidth: '200px' }}>
      //                 Browse Homes
      //               </button>
      //             </div>
      //           </div>
      //         </div>
      //       </div>
      //     </div>

      //     <div className='tw-p-3'>
      //       <div className='tw-card nav-card tw-bg-white tw-shadow-lg tw-rounded-lg' id='sell-card' onClick={() => navigate('/sell')}>
      //         <div className='tw-flex tw-flex-col tw-items-center tw-p-2'>
      //           <div className='tw-w-full tw-flex tw-justify-center tw-p-2'>
      //             <img src="/static/img/sell.jpg" className='tw-w-full tw-max-w-[350px]' alt='sell'/>
      //           </div>
      //           <div className='tw-w-full tw-p-2'>
      //             <div className='tw-flex tw-justify-center tw-p-2'>
      //               <h3 className='tw-font-serif tw-text-lg'>Sell a home</h3>
      //             </div>
      //             <div className='tw-flex tw-justify-center tw-items-center tw-py-2' style={{ height: '120px' }}>
      //               <p className='tw-text-center tw-text-lg'>No matter what path you take to sell your home, we can help you navigate a successful sale without difficulties.</p>
      //             </div>
      //             <div className='tw-flex tw-justify-center tw-p-4'>
      //               <button className='tw-btn tw-btn-outline-primary tw-font-bold' id='sell-button' style={{ maxWidth: '200px' }}>
      //                 See Options
      //               </button>
      //             </div>
      //           </div>
      //         </div>
      //       </div>
      //     </div>

      //     <div className='tw-p-3'>
      //       <div className='tw-card nav-card tw-bg-white tw-shadow-lg tw-rounded-lg' id='rent-card' onClick={() => navigate('/price_estimator')}>
      //         <div className='tw-flex tw-flex-col tw-items-center tw-p-2'>
      //           <div className='tw-w-full tw-flex tw-justify-center tw-p-2'>
      //             <img src="/static/img/rent.jpg" className='tw-w-full tw-max-w-[350px]' alt='rent'/>
      //           </div>
      //           <div className='tw-w-full tw-p-2'>
      //             <div className='tw-flex tw-justify-center tw-p-2'>
      //               <h3 className='tw-font-serif tw-text-lg'>Estimate a home</h3>
      //             </div>
      //             <div className='tw-flex tw-justify-center tw-items-center tw-py-2' style={{ height: '120px' }}>
      //               <p className='tw-text-center tw-text-lg'>Experience a seamless AI-powered solution for accurately assessing property values in specific locations.</p>
      //             </div>
      //             <div className='tw-flex tw-justify-center tw-p-4'>
      //               <button className='tw-btn tw-btn-outline-primary tw-font-bold' id='rent-button' style={{ maxWidth: '200px' }}>
      //                 Evaluate Now
      //               </button>
      //             </div>
      //           </div>
      //         </div>
      //       </div>
      //     </div>

      //   </div>
      // </div>

      <div className='container p-5 mt-2'>
        <div className='row'>
  
          <div className='col-lg-4 p-3'>
            <div className='card nav-card' id='buy-card' onClick={() => navigate('/buy')}>
              <div className='row p-2 m-0 d-flex justify-content-center'>
                <div className='col-lg-12 col-12 col-md-6 d-flex align-items-center p-2'>
                    <img src="/static/img/buy.jpg" style={{width:'100%', maxWidth:'350px'}} alt='buy'/>
                </div>
                <div className='col-lg-12 col-12 col-md-6 p-2'>
                    <div className='row p-2 m-0'>
                        <h3 className='d-flex justify-content-center tw-text-2xl'>Buy a home</h3>
                    </div>
                    <div className='row p-0 py-2 m-0 d-flex align-items-center' style={{height:'120px'}}>
                        <p style={{textAlign:'center', fontSize:'17px'}}>Find your place with an immersive photo experience and the listings, 
                        which you won’t find anywhere else.</p>
                    </div>
                    <div className='row p-4 m-0 d-flex justify-content-center'>
                        <button className='btn btn-outline-primary fw-bold' id='buy-button' style={{maxWidth:'200px'}}>
                        Browse Homes
                        </button>
                    </div>
                </div>
              </div>
            </div>
          </div>
  
          <div className='col-lg-4 p-3'>
            <div className='card nav-card' id='sell-card' onClick={() => navigate('/sell')}>
              <div className='row p-2 m-0 d-flex justify-content-center'>
                <div className='col-lg-12 col-12 col-md-6 d-flex align-items-center p-2'>
                  <img src="/static/img/sell.jpg" style={{width:'100%', maxWidth:'350px'}} alt='sell'/>
                </div>
                <div className='col-lg-12 col-12 col-md-6 p-2'>
                  <div className='row p-2 m-0'>
                    <h3 className='d-flex justify-content-center tw-text-2xl'>Sell a home</h3>
                  </div>
                  <div className='row p-0 py-2 m-0 d-flex align-items-center' style={{height:'120px'}}>
                    <p style={{textAlign:'center', fontSize:'17px'}}>No matter what path you take to sell your home, we can help you navigate a 
                      successful sale without difficulties.</p>
                  </div>
                  <div className='row p-4 m-0 d-flex justify-content-center'>
                    <button className='btn btn-outline-primary fw-bold' id='sell-button' style={{maxWidth:'200px'}}>
                      See Options
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          <div className='col-lg-4 p-3'>
            <div className='card nav-card' id='rent-card' onClick={() => navigate('/price_estimator')}>
              <div className='row p-2 m-0 d-flex justify-content-center'>
                <div className='col-lg-12 col-12 col-md-6 d-flex align-items-center p-2'>
                  <img src="/static/img/rent.jpg" style={{width:'100%', maxWidth:'350px'}} alt='rent'/>
                </div>
                <div className='col-lg-12 col-12 col-md-6 p-2'>
                  <div className='row p-2 m-0'>
                    <h3 className='d-flex justify-content-center tw-text-2xl'>Estimate a home</h3>
                  </div>
                  <div className='row p-0 py-2 m-0 d-flex align-items-center' style={{height:'120px'}}>
                    <p style={{textAlign:'center', fontSize:'17px'}}>Experience a seamless AI-powered solution for accurately 
                    assessing property values in specific locations.</p>
                  </div>
                  <div className='row p-4 m-0 d-flex justify-content-center'>
                    <button className='btn btn-outline-primary fw-bold' id='rent-button' style={{maxWidth:'200px'}}>
                      Evaluate Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
  
        </div>
      </div>

    )
}

export default FeatureSection;