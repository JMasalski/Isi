import { Route, Routes } from "react-router"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import SignUpPage from "./pages/SignUpPage"
import AddPostPage from "./pages/AddPostPage"
import ProfilePage from "./pages/ProfilePage"

const App = () => {
  return (
    <div className="h-screen bg-[#daf5f0]">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/create-post" element={<AddPostPage/>} />
        <Route path= "/profile/:username" element={<ProfilePage />} />
      </Routes>
    </div>
  )
}

export default App