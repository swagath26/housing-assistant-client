const handleNext = ( event, nextStep ) => {
    event.preventDefault();
    nextStep();
}

export default handleNext;