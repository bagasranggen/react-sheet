const currencyToInt = (currency: string) => parseInt(currency.replace('Rp', '').replace(/,/g, ''))

export default currencyToInt;