import { Link } from "react-router-dom";

const Sell = () => {

    return (
        <div className="d-flex p-md-5 align-items-center flex-column flex-xl-row" style={{minHeight: '90vh'}}>
            <div className="col-xl-6 px-3">
                <img src="/static/img/sell-property2.jpg" className="w-100" alt=""/>
            </div>
            <div className="flex-grow-1 d-flex flex-column align-items-end p-5">
                <div className="row mx-0 mt-xl-5 mb-2">
                    <h1 className="pb-3">Sell your home yourself</h1>
                    <p> Deciding to sell your home yourself is referred to as for-sale-by-owner (FSBO). 
                        The FSBO process is similar to traditional selling, but without the help of a 
                        real estate agent. In this case, you’re responsible for the home prep, marketing, 
                        showings, and negotiations.</p>

                </div>
                <div className="row mx-0 mb-4">
                    <Link to="/sell_home" className="btn btn-primary fs-5 px-4">
                        Post your home for sale
                    </Link>
                </div>
            </div>
            
        </div>
    )
}

export default Sell;