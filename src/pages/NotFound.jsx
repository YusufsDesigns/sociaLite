import { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../context/Theme";

export default function NotFound() {
    const theme = useContext(ThemeContext)
    return (
        <div className={`flex flex-col items-center justify-center w-full h-screen ${theme.theme}`}>
            <h2>Page not found!</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia alias cupiditate ad nostrum doloribus iste tempora quisquam excepturi repellat, fugit cumque dolore magni possimus inventore neque provident! Sunt, quo eos?</p>

            <p>Go to the <Link to="/">Homepage</Link>.</p>
        </div>
    )
}
