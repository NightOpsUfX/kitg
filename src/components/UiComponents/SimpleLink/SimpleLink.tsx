import {useNavigate} from "react-router-dom";
import "../SimpleLink/SimpleLink.scss"

interface Iprops {
    navigatePath: string,
    linkText?: string
}

export const SimpleLink = ({navigatePath, linkText}: Iprops) => {

    const navigate = useNavigate()

    const redirectFunction = (navigatePath: string) => {
        navigate(`/${navigatePath}`)
    }


    return (
        <div className={`simple-link`} onClick={() => {redirectFunction(navigatePath)}}>
            <span>{linkText}</span>
        </div>
    )

}
