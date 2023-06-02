import { Navigate, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import PropTypes from 'prop-types';
import Home from "./pages/Home"
import Login  from "./pages/Login"
import { RootLayout } from "./layout/RootLayout"
import Profile, { ProfileLoader } from "./pages/Profile"
import { ThemeProvider } from "./context/Theme"
import PostDetails, { PostDetailsLoader } from "./components/PostDetails"
import Channels from "./pages/Channels"
import { ChannelProvider } from "./context/ChannelContext"
import { ChannelDetails, ChannelDetailsLoader } from "./components/ChannelDetails"
import Register from "./pages/Register"
import { useContext } from "react"
import { AuthContext } from "./context/AuthContext"
import MessageContainer from "./pages/MessageContainer";
import ChatContextProvider from "./context/ChatContext";
import NotFound from "./pages/NotFound";
import Error from "./components/Error";

function App() {
  const {currentUser} = useContext(AuthContext)
  const ProtectedRoute = ({children}) => {
    if(!currentUser){
      return <Navigate to="/login" />
    }
    return children
  }

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route element={<RootLayout />} errorElement={<Error />}>
          <Route index element=
            {
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } 
            errorElement={<Error />}
          />
          <Route path="status" errorElement={<Error />}>
            <Route path=':id' element={<PostDetails />} loader={PostDetailsLoader} />
          </Route>
          <Route path="channels" element={<Channels />} />
          <Route path="/profile" errorElement={<Error />}>
            <Route path=":id" element={<Profile />} loader={ProfileLoader} />
          </Route>
          <Route path="search" errorElement={<Error />}>
            <Route path=':id' element={<ChannelDetails />} loader={ChannelDetailsLoader} />
          </Route>
          <Route path="messages" element=
            {
              <ChatContextProvider>
                <MessageContainer />
              </ChatContextProvider>
            } 
            errorElement={<Error />}
          />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  )

  return (
      <div>
          <ThemeProvider>
            <ChannelProvider>
              <RouterProvider router={router} />
            </ChannelProvider>
          </ThemeProvider>
      </div>
  )
}

App.propTypes = {
  children: PropTypes.object.isRequired
}

export default App
