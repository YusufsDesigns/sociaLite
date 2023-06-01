import Post from "./Post";
import { BsArrowLeft } from "react-icons/bs"
import PropTypes from 'prop-types';


export default function FloatPost({setPostCard}) {
    return (
        <div className="px-5 module">
            <div className="p-2 bg-white float-post">
            <BsArrowLeft className="text-xl font-bold text-black" onClick={() => setPostCard(false)} />
                <Post setPostCard={setPostCard} />
            </div>
        </div>
    )
}

FloatPost.propTypes = {
    setPostCard: PropTypes.func.isRequired
}
