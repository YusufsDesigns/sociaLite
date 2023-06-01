import Chats from "./Chats";
import Search from "./Search";
import PropTypes from 'prop-types';

export default function Sidebar({ setChatOpened, chatOpened }) {
    const style = chatOpened ? 'hidden' : 'message-sidebar';
    return (
        <div className={style}>
            <div className="navbar">
                <h1 className="text-2xl font-semibold">Messages</h1>
            </div>
            <Search setChatOpened={setChatOpened} />
            <Chats setChatOpened={setChatOpened} />
        </div>
    )
}

Sidebar.propTypes = {
    setChatOpened: PropTypes.func.isRequired
}

Sidebar.propTypes = {
    chatOpened: PropTypes.bool.isRequired
}

