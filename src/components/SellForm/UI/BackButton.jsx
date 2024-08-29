const BackButton = ({ prevStep }) => {
    return (
        <div>
            <button className="tw-bg-slate-600 tw-font-medium tw-text-white tw-py-2 tw-px-3 tw-rounded-lg" type="button" onClick={prevStep}>
                Go back
            </button>
        </div>
    )
}

export default BackButton;