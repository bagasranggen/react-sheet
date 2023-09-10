const currencyConvert = (number: number, currency: '' | 'Rp' = '', withParentheses?: boolean) => {
    const currencyResult = Math.abs(number).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')

    switch (true) {
        case currency !== '' && withParentheses:
            return `(${currency}${currencyResult})`;

        case currency !== '':
            return `${currency}${currencyResult}`;

        case withParentheses:
            return `(${currencyResult})`;

        default:
            return currencyResult;
    }
};

export default currencyConvert;