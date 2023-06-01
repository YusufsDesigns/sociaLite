import { useContext, useEffect, useRef, useState } from "react"
import { ThemeContext } from "../context/Theme"
import ChannelCard from "../components/ChannelCard"
import { collection, getDocs } from "firebase/firestore"
import { db } from "../firebase"
import { ChannelContext } from "../context/ChannelContext"
import { Link} from "react-router-dom"


export default function Channels() {
    // State
    const [modal, setModal] = useState(false)
    // Context
    const theme = useContext(ThemeContext)
    const context = useContext(ChannelContext)

    // Channel Collection
    const channelRef = collection(db, "channels")

    // Get channels on load
    const getChannels = async () => {
        const data = await getDocs(channelRef)
        context.setChannel(data.docs.map(doc => ({...doc.data(), id: doc.id})));
    }

    const ref = useRef()

    // Display channels on load
    useEffect(() => {
        getChannels()
        ref.current?.scrollIntoView({behavior: "smooth"})
    }, [])
    return (
        <div className="flex w-full h-screen overflow-y-scroll">
            <div className="w-full p-5">
                <div className="flex items-center justify-between mb-5">
                    <h1 className="text-2xl font-semibold">Channels</h1>
                    <button className={`px-5 py-2 text-white cursor-pointer bg-${theme.color} btn-remove rounded-3xl`} onClick={() => {setModal(true)}}>Create Channel</button>
                    <button className={`px-4 py-2 hidden text-white cursor-pointer btn-mobile  bg-${theme.color} rounded-full`} onClick={() => {setModal(true)}}>+</button>
                    {modal && <ChannelCard setModal={setModal} />}
                </div>
                <div className="flex flex-col gap-5">
                    {context.channel?.map(channel => (
                        <Link to={`/search/${channel.title}`} key={channel.title} className="flex flex-col">
                            <span className="text-xs text-gray-500">{channel.category}</span>
                            <span className="text-xl font-semibold">{channel.title}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}
