import { signInWithEmailAndPassword } from "firebase/auth"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { auth } from "../firebase"


export default function Login() {
    const [error, setError] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const email = e.target[0].value
        const password = e.target[1].value

        try {
            await signInWithEmailAndPassword(auth, email, password)
            navigate("/")
        } catch (error) {
            setError(true)
        }
            
    } 
    return (
        <div className='px-5 form-container'>
            <div className="form-wrapper">
                <Link className="inline-block mb-10 text-3xl font-medium text-center roboto">
                    socia<span className="blue">Lite</span>
                </Link>
                <span className="title">Login</span>
                <form onSubmit={handleSubmit}> 
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    <button>Sign up</button>
                    <span>{error && 'Something went wrong'}</span>
                </form>
                <p>You don&apos;t have an account? <Link to="/register">Register</Link></p>
            </div>
        </div>
    )
}
