import {useRef, useState} from "react";
import "./InputLocal.scss"

interface Iprops {
    inputType?: string,
    inputClassList?: string,
    placeholder?: string,
    inputValue?: string,
    setInputValue?: any

}

export const InputLocal = ({inputType, inputClassList, placeholder, inputValue, setInputValue}: Iprops) => {

    let inputRef = useRef<HTMLDivElement>(null);

    const changeInputValue = (e: any) => {
        // @ts-ignore
        setInputValue(inputRef.current.value)
    }

    return (
        <div className={`input-component `}>

            <input
                className={`input-component__input-field ${inputClassList}`}
                type={inputType}
                placeholder={placeholder}
                value={inputValue}
                // @ts-ignore
                ref={inputRef }
                onChange={(e) => {changeInputValue(e) }}
            />
        </div>
    )
}
