import PropTypes from 'prop-types';
import { useContext } from 'react';
import { ThemeContext } from '../context/Theme';

export default function CommentCard({ comment }) {
    // Context
    const theme = useContext(ThemeContext)
    return (
        <div className={`w-full p-5 bg-${theme.theme} comment-card`}>
            <img className="w-12 h-12 rounded-full" src={comment.img} alt="" />
            <div className='flex flex-col gap-2'>
                <span className='font-semibold text-xs italic'>@{comment.username}</span>
                <p>{comment.comment}</p>
            </div>
        </div>
    )
}

CommentCard.propTypes = {
    comment: PropTypes.object.isRequired
}
