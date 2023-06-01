import { createContext, useState } from "react";
import PropTypes from 'prop-types';

export const ThemeContext = createContext()


export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('dark')
    const [color, setColor] = useState('blue')
    return (
        <ThemeContext.Provider value={{theme, setTheme, color, setColor}}>
            { children }
        </ThemeContext.Provider>
    )
}

ThemeProvider.propTypes = {
    children: PropTypes.object.isRequired
}
