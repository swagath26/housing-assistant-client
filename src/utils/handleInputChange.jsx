const handleInputChange = (event, formData, updateFormData) => {
    const {name, value } = event.target;
    updateFormData({ ...formData, [name]: value });
};

export default handleInputChange;