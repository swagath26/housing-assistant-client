const handleInputCheck = (event, formData, updateFormData) => {
    const {name, checked} = event.target;
    updateFormData({ ...formData, [name]: checked });
}

export default handleInputCheck;