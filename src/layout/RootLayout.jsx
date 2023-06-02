import { Link, NavLink, Outlet, useNavigate } from "react-router-dom"
import { AiOutlineHome, HiOutlineEnvelope, FaRegUser, BiEdit, FiRadio, BsFillPencilFill } from "react-icons/all"
import { auth } from "../firebase"
import { signOut } from "firebase/auth"
import { Display } from "../components/Display"
import { useContext, useState } from "react"
import { ThemeContext } from "../context/Theme"
import { AuthContext } from "../context/AuthContext"
import FloatPost from "../components/FloatPost"


export const RootLayout = () => {
    const {currentUser} = useContext(AuthContext)
    // Context
    const theme = useContext(ThemeContext)
    
    // State
    const [display, setDisplay] = useState(false)
    const [btn, setBtn] = useState(false)
    const [postCard, setPostCard] = useState(false)

    // Navigation
    const navigate = useNavigate()

    

    // Sign out functionality
    const signUserOut = async() => {
        await signOut(auth)
        navigate('/login')
    }


    return (
        <div className={`bg-${theme.theme}`} >
            <div className="relative flex app">
                <div className="flex flex-col justify-between h-screen pt-5 pb-5 pl-5 pr-16 sidebar">
                    <div className="flex flex-col items-center">
                        <Link className="inline-block mb-10 text-3xl font-medium text-center roboto">
                            socia<span className="blue">Lite</span>
                        </Link>
                        <div className={`flex flex-col gap-6 links bg-${theme.theme}`}>
                            <NavLink to='/' className='flex items-center gap-3 text-2xl link'>
                                <AiOutlineHome className="icon" />
                                <span>Home</span>
                            </NavLink>
                            <NavLink to='/messages' className='flex items-center gap-3 text-2xl link'>
                                <HiOutlineEnvelope className="icon" /> 
                                <span>Messages</span>
                            </NavLink>
                            <NavLink to='/channels' className={`flex items-center gap-3 text-2xl link`}>
                                <FiRadio className="icon" /> 
                                <span>Channels</span>
                            </NavLink>
                            <NavLink to={`profile/${currentUser?.displayName}`}  className='flex items-center gap-3 text-2xl link'>
                                <FaRegUser className="icon" /> 
                                <span>Profile</span>
                            </NavLink>
                            <div className='flex items-center gap-3 text-2xl cursor-pointer link' onClick={() =>{setDisplay(true)}}>
                                <BiEdit className="icon" /> 
                                <span>Display</span>
                            </div>
                            <button onClick={() => {setPostCard(true)}} className={`h-14 w-14 flex items-center justify-center rounded-full self-center gap-3 text-2xl cursor-pointer link bg-${theme.color}`}><BsFillPencilFill/></button>
                        </div>
                    </div>
                    <div className="flex flex-col items-center space-y-5">
                        <button onClick={signUserOut} className={`w-full px-5 py-3 text-white rounded-3xl bg-${theme.color}`}>Logout</button>
                        <div className="flex items-center gap-2">
                            <img className="w-12 h-12 rounded-full" src={currentUser?.photoURL} alt="" />
                            <span className="text-sm">{currentUser?.displayName}</span>
                        </div>
                    </div>
                </div>
                <div className={`hidden links bg-${theme.theme}`}>
                            <NavLink to='/' className='flex items-center gap-3 text-xl link'>
                                <AiOutlineHome className="icon" />
                                <span>Home</span>
                            </NavLink>
                            <NavLink to='/messages' className='flex items-center gap-3 text-xl link'>
                                <HiOutlineEnvelope className="icon" /> 
                                <span>Messages</span>
                            </NavLink>
                            <NavLink to='/channels' className={`flex items-center gap-3 text-xl link`}>
                                <FiRadio className="icon" /> 
                                <span>Channels</span>
                            </NavLink>
                            <NavLink to={`profile/${currentUser?.displayName}`}  className='flex items-center gap-3 text-xl link'>
                                <FaRegUser className="icon" /> 
                                <span>Profile</span>
                            </NavLink>
                            <div className='flex items-center gap-3 text-xl cursor-pointer link' onClick={() =>{setDisplay(true)}}>
                                <BiEdit className="icon" /> 
                                <span>Display</span>
                            </div>
                            <div className="relative">
                                <img className="rounded-full w-7 h-7" src={currentUser?.photoURL} onClick={() => setBtn(prev => !prev)} alt="" />
                                {btn && <div className="absolute -top-16 -left-16">
                                    <button onClick={signUserOut} className={`w-full px-5 py-3 text-white rounded-3xl bg-${theme.color}`}>Logout</button>
                                </div>}
                            </div>
                        </div>
                <Outlet />
                {display && <Display setDisplay={setDisplay} />}
                {postCard && <FloatPost setPostCard={setPostCard} />}
            </div>
        </div>
    )
}
