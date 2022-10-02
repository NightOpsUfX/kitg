import "./SimpleTextInfo.scss"

interface Iprops {
    simpleTextInfo?: string
}

export const SimpleTextInfo = ({simpleTextInfo}: Iprops) => {

    return (
        <span className={`simple-text-info`}>
           {simpleTextInfo}
        </span>
    )
}
