import {useNavigate} from "react-router-dom";
import {Title} from "../../components/UiComponents/Title/Title";
import {SimpleTextInfo} from "../../components/UiComponents/SimpleTextInfo/SimpleTextInfo";
import {Select} from "../../components/UiComponents/Select/Select";
import {InputLocal} from "../../components/UiComponents/InputLocal/InputLocal";
import {ButtonBig} from "../../components/UiComponents/ButtonBig/ButtonBig";
import {SimpleLink} from "../../components/UiComponents/SimpleLink/SimpleLink";
import "./CurrenciesPage.scss"
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {asyncRequestApi} from "../../redux/RequestSlice/request.thunk";
import {setCurrencyList} from "../../redux/RequestSlice/request.slice";
import {asyncUserCountryCodeRequest} from "../../redux/RequestSlice/userCountryCode.thunk";

interface Iprops {
    currenciesPageProps?: any
}

export const CurrenciesPage = ({ currenciesPageProps }: Iprops) => {

    const dispatch = useDispatch<any>()
    const state = useSelector(state => state)
    // @ts-ignore
    const userCountryCode = state.toolkit.userCountryCode
    // @ts-ignore
    const allCurrenciesList = state?.toolkit?.currencyList
    // @ts-ignore
    const exchangeOneCurrencyToAllArray = state.toolkit.exchangeOneCurrencyToAll && Object.entries(state.toolkit.exchangeOneCurrencyToAll.rates)
    // @ts-ignore
    const [currencyCode, setCurrencyCode] = useState('');

    const currencyCodesArray = allCurrenciesList ? allCurrenciesList.map((item:Array<string>) => item[0]) : ""

    // const currencyCodesArray = [
    //     "AUD",  "BGN",  "BRL", "CAD", "CHF", "CNY", "CZK", "DKK", "EUR", "GBP", "HKD", "HRK", "HUF", "IDR", "ILS",
    //     "INR", "ISK", "JPY", "KRW", "MXN", "MYR", "NOK", "NZD", "PHP", "PLN", "RON", "SEK", "SGD", "THB", "TRY",
    //     "USD", "ZAR" ]

    // convert country code to currency code
    useEffect(() => {
        if(!userCountryCode) {
            dispatch(asyncUserCountryCodeRequest(dispatch))
        }
        if(userCountryCode && !currencyCode) {
            // @ts-ignore
            // setCurrencyCode(currencyCodesArray.filter(element => element.includes(userCountryCode)))
            setCurrencyCode(currencyCodesArray.find(item => item.includes(userCountryCode)))
        }
    },[userCountryCode, currencyCode])
    // End convert country code to currency code

    // show Exchange Rates To Base currency
    const showExchangeRatesToBase = () => {
        dispatch(asyncRequestApi(dispatch, 'fromOneCurrencyToAllCurrencies', {}, currencyCode))
    }
    //End  show Exchange Rates To Base currency

    return (
        <div className={`currenciesPage__main`}>
            <div className={`currenciesPage__wrapper`}>
                <Title titleText={'Currency Converter'} />
                <div className={`currenciesPage__wrapper-inner`}>
                    <div className={`currenciesPage__inputs-wrapper`}>
                        <div className={`currenciesPage__input-wrapper`}>
                            <SimpleTextInfo simpleTextInfo={'Please select a base currency from the list.'} />
                            <Select valuesArray={allCurrenciesList} currencyCodes={true} selectAction={setCurrencyCode}/>
                            <div  className={`currenciesPage__base-currency-info`}>
                                <span>Base currency is: <span  style={{textDecoration: 'underline'}}>{currencyCode}</span></span>
                            </div>
                        </div>
                    </div>
                    <div className={`currenciesPage__buttons-wrapper`}>
                        <ButtonBig
                            buttonText={'Show rates'}
                            buttonAction={showExchangeRatesToBase}
                        />
                    </div>
                    <SimpleLink navigatePath={"converterPage"} linkText={"See converter page"} />
                    <ul className={`currenciesPage__result-list`}>
                        {
                            exchangeOneCurrencyToAllArray &&
                            exchangeOneCurrencyToAllArray.map((item: Array<any>) => {
                                return (
                                    <li key={item[0]} className={`currenciesPage__result-list-item`}>
                                       <span>{item[0]}</span> - <span>{item[1]}</span>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}
