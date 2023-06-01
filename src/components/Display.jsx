import { useContext, useRef } from "react"
import {GrCheckmark} from "react-icons/all"
import { ThemeContext } from "../context/Theme"
import PropTypes from 'prop-types';

export const Display = ({ setDisplay }) => {
    // Remove display card
    const handleDisplayCard = () => {
        setDisplay(false)
    }

    // Context
    const theme = useContext(ThemeContext)

    // Refs to all the radio inputs
    const radioRef1 = useRef(null)
    const radioRef2 = useRef(null)
    const radioRef3 = useRef(null)
    const radioRef4 = useRef(null)
    const radioRef5 = useRef(null)
    const radioRef6 = useRef(null)
    const radioRef7 = useRef(null)

    // Values for radio inputs
    const radioValue1 = radioRef1.current?.value
    const radioValue2 = radioRef2.current?.value
    const radioValue3 = radioRef3.current?.value
    const radioValue4 = radioRef4.current?.value
    const radioValue5 = radioRef5.current?.value
    const radioValue6 = radioRef6.current?.value
    const radioValue7 = radioRef7.current?.value
    
    return (
        <div className="module">
            <div className="space-y-5 display-card">
                <div className="space-y-3">
                    <span>Color</span>
                    <div className="flex items-center gap-5">
                        <div className="bg bg-blue" onClick={() => {theme.setColor(radioRef1.current.value)}}>
                            <input type="radio" className="hidden" ref={radioRef1} value='blue' id="" />
                            <GrCheckmark className={theme.color === radioValue1 ? 'active' : ''} />
                        </div>
                        <div className="bg bg-pink" onClick={() => {theme.setColor(radioRef2.current.value)}}>
                            <input type="radio" className="hidden" ref={radioRef2} value='pink' id="" />
                            <GrCheckmark className={theme.color === radioValue2 ? 'active' : ''} />
                        </div>
                        <div className="bg bg-purple" onClick={() => {theme.setColor(radioRef3.current.value)}}>
                            <input type="radio" className="hidden" ref={radioRef3} value='purple' id="" />
                            <GrCheckmark className={theme.color === radioValue3 ? 'active' : ''} />
                        </div>
                        <div className="bg bg-orange" onClick={() => {theme.setColor(radioRef4.current.value)}}>
                            <input type="radio" className="hidden" ref={radioRef4} value='orange' id="" />
                            <GrCheckmark className={theme.color === radioValue4 ? 'active' : ''} />
                        </div>
                        <div className="bg bg-green" onClick={() => {theme.setColor(radioRef5.current.value)}}>
                            <input type="radio" className="hidden" ref={radioRef5} value='green' id="" />
                            <GrCheckmark className={theme.color === radioValue5 ? 'active' : ''} />
                        </div>
                    </div>
                </div>
                <div className="mb-10 space-y-3">
                    <span>Theme</span>
                    <div className="flex items-center w-full gap-5">
                        <div className={theme.theme === radioValue6 ? `th th-light ${theme.color} active` : "th th-light"} onClick={() => {theme.setTheme(radioRef6.current.value)}}>
                            <input type="radio" className="hidden" ref={radioRef6} value='light' id="" />
                            Light
                        </div>
                        <div className={theme.theme === radioValue7 ? `th th-dark ${theme.color} active` : "th th-dark"}  onClick={() => {theme.setTheme(radioRef7.current.value)}}>
                            <input type="radio" className="hidden" ref={radioRef7} value='dark' id="" />
                            Dark
                        </div>
                    </div>
                </div>
                <button onClick={handleDisplayCard} className={`bg-${theme.color} py-2 px-5 rounded-full text-white`}>Done</button>
            </div>
        </div>
    )
}

Display.propTypes = {
    setDisplay: PropTypes.func.isRequired
}
