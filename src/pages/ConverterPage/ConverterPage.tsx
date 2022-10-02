import {Title} from "../../components/UiComponents/Title/Title";
import {ButtonBig} from "../../components/UiComponents/ButtonBig/ButtonBig";
import {InputLocal} from "../../components/UiComponents/InputLocal/InputLocal";
import {useEffect, useState} from "react";
import "./ConverterPage.scss"
import {SimpleLink} from "../../components/UiComponents/SimpleLink/SimpleLink";
import {useDispatch, useSelector} from "react-redux";
import {asyncRequestApi} from "../../redux/RequestSlice/request.thunk";
import {Select} from "../../components/UiComponents/Select/Select";
import {SimpleTextInfo} from "../../components/UiComponents/SimpleTextInfo/SimpleTextInfo";

interface Iprops {
    converterPageProps?: any
}

export const ConverterPage = ({ converterPageProps }: Iprops) => {
    const dispatch = useDispatch<any>()
    const state = useSelector(state => state)
    // @ts-ignore
    const allCurrenciesList = state?.toolkit?.currencyList
    // @ts-ignore
    const oneCurrencyResult = state?.toolkit?.exchangeOneCurrencyRate
    const [currencyInputValue, setCurrencyInputValue] = useState('');
    const [urlParams, setUrlParams] = useState({currencyFrom: '', currencyTo: '', amount: ''});
    const [disableButton, setDisableButton] = useState(false);

    // first request for currency list
    useEffect(() => {
        dispatch(asyncRequestApi(dispatch, 'all'))
    },[])
    // End first request for currency list

    //create Url Params
    const createUrlParams = () => {
        let paramsArray = currencyInputValue.split(' ')
        let normalizedAllCurrenciesList = allCurrenciesList && allCurrenciesList?.flat()
        let normalizedCurrencyFrom = paramsArray[1]?.toUpperCase()
        let normalizedCurrencyTo = paramsArray[paramsArray.length - 1]?.toUpperCase()

        let urlParamsTemp = {}

        if (Number(paramsArray[0]) && Number(paramsArray[0]) > 0) {
            urlParamsTemp = {...urlParamsTemp, amount: currencyInputValue.split(' ')[0]}
        }
        if(allCurrenciesList &&  normalizedAllCurrenciesList?.find((item:any) => item === normalizedCurrencyFrom)) {
            urlParamsTemp = {...urlParamsTemp, currencyFrom: normalizedCurrencyFrom}
        }
        if(allCurrenciesList &&  normalizedAllCurrenciesList?.find((item:any) => item === normalizedCurrencyTo)) {
            urlParamsTemp = {...urlParamsTemp, currencyTo: normalizedCurrencyTo}
        }
        // @ts-ignore
        setUrlParams(urlParamsTemp)
    }

    useEffect(() => {
        createUrlParams()
    },[currencyInputValue])
    //end create Url Params

    // disable / enable button
    useEffect(() => {
        if (urlParams.amount && urlParams.currencyFrom && urlParams.currencyTo && currencyInputValue.length > 6) {
            setDisableButton(false)
        }
        else {
            setDisableButton(true)
        }
    }, [currencyInputValue, urlParams])
    // End disable / enable button


    // change selected currency amount
    const exchangeOneCurrency = (e: any) => {
        e.preventDefault()
        dispatch(asyncRequestApi(dispatch, 'exchangeOneCurrency', urlParams))
    }
    // End change selected currency amount

    return (
         <div className={`converterPage__main`}>
             <div className={`converterPage__form-wrapper`}>
                 <Title titleText={'Currency Converter'} />
                 <div className={`converterPage__form-wrapper-inner`}>
                     <form action="">
                         <div className={`converterPage__form-inputs-wrapper`}>
                             <div className={`converterPage__form-input-wrapper`}>
                                 <SimpleTextInfo simpleTextInfo={'See all currency codes list below'} />
                                 <Select valuesArray={allCurrenciesList} />
                                 <SimpleTextInfo simpleTextInfo={'Please type values in format: 15 usd in eur'} />
                                 <InputLocal
                                     inputType={'text'}
                                     inputClassList={"input-local"}
                                     placeholder={'15 usd in eur'}
                                     inputValue={currencyInputValue}
                                     setInputValue={setCurrencyInputValue}
                                 />
                             </div>
                         </div>
                         <div className={`converterPage__exchange-result`}>
                             {
                                 <span>Exchange result: <span style={{textDecoration: 'underline'}}> {oneCurrencyResult && oneCurrencyResult }</span></span>
                             }
                         </div>
                         <div className={`converterPage__form-buttons-wrapper`}>
                             <ButtonBig
                                 buttonText={'Convert'}
                                 buttonAction={exchangeOneCurrency}
                                 disabled={disableButton}
                             />
                         </div>
                         <SimpleLink navigatePath={"currenciesPage"} linkText={"See all currencies page"} />
                     </form>
                 </div>
             </div>
         </div>
     )
}
