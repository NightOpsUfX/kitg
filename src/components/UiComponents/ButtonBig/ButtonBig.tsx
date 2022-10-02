import "./ButtonBig.scss"

interface Iprops {
    buttonText?: string,
    buttonAction?: any,
    disabled?: boolean
}

export const ButtonBig = ({buttonText, buttonAction, disabled}: Iprops) => {

    return (
        <button
            className={`button-big ${!disabled ? "button-active" : "button-disabled"}`}
            onClick={(e) => buttonAction(e)}
            disabled={false}
        >
            <span>{buttonText}</span>
        </button>
    )
}
