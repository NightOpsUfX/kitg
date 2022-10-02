
import {setCurrencyList, setExchangeOneCurrency, setExchangeOneCurrencyToAll} from "./request.slice";

export const asyncRequestApi = (dispatch: any, flag: string, urlParams?: any, fromOneCurrencyToAllCurrencies?: string) => {

    let currencyFrom = urlParams && urlParams?.currencyFrom
    let currencyTo = urlParams && urlParams?.currencyTo
    let amount= urlParams && urlParams?.amount
    const host = 'api.frankfurter.app';

    return async (dispatch: any) => {
        try {
            if(flag === 'all') {
                await
                    fetch(`https://${host}/currencies`)
                        .then(resp => resp.json())
                        .then((data) => {
                            let currencyTemp = Object.entries(data)
                            dispatch(setCurrencyList(currencyTemp))
                        });
            }
            if(flag === 'exchangeOneCurrency') {
                await
                    fetch(`https://${host}/latest?amount=${amount}&from=${currencyFrom}&to=${currencyTo}`)
                        .then(resp => resp.json())
                        .then((data) => {
                            dispatch(setExchangeOneCurrency(data?.rates[currencyTo]))
                    });
            }
            if(flag === 'fromOneCurrencyToAllCurrencies') {
                await
                    fetch(`https://${host}/latest?from=${fromOneCurrencyToAllCurrencies}`)
                        .then(resp => resp.json())
                        .then((data) => {
                            dispatch(setExchangeOneCurrencyToAll(data))
                        });
            }
        }
        catch (e) {
            console.log(e)
        }
    }
}
