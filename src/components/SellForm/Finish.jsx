import success from '../../assets/img/success.png';

const Finish = () => {
    return (
        <div className="tw-h-full tw-flex 
            tw-gap-4 tw-pb-20 tw-flex-col tw-items-center tw-justify-center">
            <img className='tw-m-4 tw-p-4' src={success} width='150' height='150' />
            <h1 className='tw-text-3xl tw-font-medium tw-text-slate-900'>Thank You</h1>
            <p className='tw-text-slate-500 tw-text-lg'>Your Property is successfully listed..</p>
        </div>
    )
}

export default Finish;