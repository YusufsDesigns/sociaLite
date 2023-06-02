import { useContext } from "react"
import { Link, useRouteError } from "react-router-dom"
import { ThemeContext } from "../context/Theme"

export default function Error() {
    const error = useRouteError()
    const theme = useContext(ThemeContext)
    return (
        <div className={`flex flex-col gap-3 items-center justify-center w-full h-screen bg-${theme.theme}`}>
            <h2>Error</h2>
            <p>{error.message}</p>
            <Link to='/'>Back to the Homepage</Link>
        </div>
    )
}