const currencyConvert = (number: number) => {
    return Math.abs(number).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export default currencyConvert;