import {createSlice} from "@reduxjs/toolkit";

const slice = createSlice({
    name: "exchangeCurrency",
    initialState: {
        currencyList: '',
        exchangeOneCurrencyRate: '',
        userCountryCode: '',
        exchangeOneCurrencyToAll: ''
    },
    reducers: {
        setCurrencyList(state, action) {
            state.currencyList = action.payload
        },
        setExchangeOneCurrency(state, action) {
            state.exchangeOneCurrencyRate = action.payload
        },
        setUserCountryCode(state, action) {
            state.userCountryCode = action.payload.countryCode === 'UA' ? 'US' : action.payload.countryCode
        },
        setExchangeOneCurrencyToAll(state, action) {
            state.exchangeOneCurrencyToAll = action.payload
        }
    }
})

export default slice.reducer
export const {setCurrencyList, setExchangeOneCurrency, setUserCountryCode, setExchangeOneCurrencyToAll} = slice.actions
