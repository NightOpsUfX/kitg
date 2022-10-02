import "./Title.scss"

interface Iprops {
    titleText?: string
}

export const Title = ({titleText}: Iprops) => {
    return (
        <h1 className={`page-title`}>{titleText}</h1>
    )
}
