export const handleInputChange = (event, formData, updateFormData) => {
    const {name, value } = event.target;
    updateFormData({ ...formData, [name]: value });
};

export const handleInputCheck = (event, formData, updateFormData) => {
    const {name, checked} = event.target;
    updateFormData({ ...formData, [name]: checked });
}

export const handleNext = ( event, nextStep ) => {
    event.preventDefault();
    nextStep();
}