import "./Select.scss"

interface Iprops {
    valuesArray?: Array<any>,
    currencyCodes?: boolean,
    selectAction?: Function
}

export const Select = ({ valuesArray, currencyCodes, selectAction }: Iprops) => {

    return (
            <select
                defaultValue={valuesArray ? (valuesArray[0]) : ""} name="" id=""
                className={`currency-list__select`}
                // @ts-ignore
                onClick={({ target: { value } }) => currencyCodes ? selectAction(value) : ""}
            >
                {
                    valuesArray &&
                    valuesArray.map((item: Array<any>) => {
                        return <option key={item[0]} value={item[0]}>{item[0]} - {item[1]}</option>
                    })
                }
            </select>
    )
}
