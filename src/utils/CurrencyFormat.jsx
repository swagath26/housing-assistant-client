const IndianRupeeFormatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
});

export const INRFormat = (value) => {
    return IndianRupeeFormatter.format(value);
};

export const INRPriceFormat = (value) => {
    return IndianRupeeFormatter.format(value).replace('₹', '').trim();
};