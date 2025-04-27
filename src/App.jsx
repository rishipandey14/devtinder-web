import { BrowserRouter, Route, Routes } from "react-router-dom"
import Body from "./Components/Body"
import Feed from "./Components/Feed"
import Login from "./Components/Login"
import Profile from "./Components/Profile"
import { Provider } from "react-redux"
import appStore from "./utils/appStore"
import Connections from "./Components/Connections"
import Requests from "./Components/Requests"
import Toast from "./Components/Toast"
import HomePage from "./Components/HomePage"

function App() {
  return (
    <>
      <Provider store={appStore}>
        < BrowserRouter basename="/">
          <Toast />
          <Routes >
            <Route path="/" element={<Body />}>
              <Route index element={<HomePage />} />
              <Route path="/feed" element={<Feed />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/connections" element={<Connections />} />
              <Route path="/requests" element={<Requests />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  )
}

export default App
