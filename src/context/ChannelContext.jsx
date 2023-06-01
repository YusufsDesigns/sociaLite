import { createContext, useState } from "react";
import PropTypes from 'prop-types';

export const ChannelContext = createContext()


export const ChannelProvider = ({ children }) => {
    const [channel, setChannel] = useState()
    return (
        <ChannelContext.Provider value={{channel, setChannel}}>
            { children }
        </ChannelContext.Provider>
    )
}

ChannelProvider.propTypes = {
    children: PropTypes.object.isRequired
}
