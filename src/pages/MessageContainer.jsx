import { useState } from "react";
import Chat from "../components/Chat";
import Sidebar from "../components/Sidebar";


export default function MessageContainer() {
    const [chatOpened, setChatOpened] = useState(false)
    return (
        <div className="w-full home">
            <div className="message-container">
                <Sidebar setChatOpened={setChatOpened} chatOpened={chatOpened} />
                <Chat chatOpened={chatOpened} setChatOpened={setChatOpened} />
            </div>
        </div>
    )
}
