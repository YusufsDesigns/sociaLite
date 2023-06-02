import Input from "./Input"
import Messages from "./Messages"
import { useContext } from "react"
import { ChatContext } from "../context/ChatContext"
import { Link } from "react-router-dom"
import PropTypes from 'prop-types';
import { ThemeContext } from "../context/Theme"
import { BsArrowLeft } from "react-icons/bs"

export default function Chat({ chatOpened, setChatOpened }) {
    const { data } = useContext(ChatContext)
    const theme = useContext(ThemeContext)

    const style = chatOpened && `chat bg-${theme.theme} flex flex-col relative h-screen z-10`
    
    return (
        <div className={style}>
            {chatOpened 
            ?
                <>
                    <BsArrowLeft className="absolute text-xl font-bold top-5 left-10" onClick={() => setChatOpened(false)} />
                    <div className="flex flex-col items-center justify-center chat-info">
                        <span className="text-xl font-semibold">{data.user?.displayName}</span>
                        <Link to={`/profile/${data.user?.displayName}`}>View Profile</Link>
                    </div>
                    <Messages />
                    <Input />
                </>
            :
                <div className="flex items-center justify-center h-screen text-3xl font-bold select-chat">
                    <h1>Search for a user and select a chat</h1>
                </div>
            }
        </div>
    )
}

Chat.propTypes = {
    chatOpened: PropTypes.bool.isRequired
}

Chat.propTypes = {
    setChatOpened: PropTypes.func.isRequired
}

