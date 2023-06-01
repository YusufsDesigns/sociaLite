import { createContext, useState } from "react";
import PropTypes from 'prop-types';

export const Postcontext = createContext()


export const PostProvider = ({ children }) => {
    const [postsList, setPostsList] = useState()
    return (
        <Postcontext.Provider value={{postsList, setPostsList}}>
            { children }
        </Postcontext.Provider>
    )
}

PostProvider.propTypes = {
    children: PropTypes.object.isRequired
}
