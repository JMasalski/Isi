import {Navigate, Route, Routes} from "react-router"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import SignUpPage from "./pages/SignUpPage"
import AddPostPage from "./pages/AddPostPage"
import ProfilePage from "./pages/ProfilePage"
import {Toaster} from "react-hot-toast";
import useAuthUser from "@/hooks/useAuthUser.tsx";

const App = () => {
    const { authUser, isLoading, isError } = useAuthUser();

    // Jeśli dane użytkownika są w trakcie ładowania, pokazujemy spinner lub loading
    if (isLoading) {
        return <div>Loading...</div>;
    }

    // Jeśli wystąpił błąd, możemy wyświetlić komunikat o błędzie
    if (isError) {
        return <div>Error loading user data.</div>;
    }

    // Sprawdzamy, czy użytkownik jest zalogowany
    const isAuthenticated = Boolean(authUser);

    // Logowanie stanu użytkownika i autoryzacji
    console.log("authUser:", authUser);
    console.log("isAuthenticated:", isAuthenticated);

    return (
        <div className="h-screen bg-[#daf5f0]">
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />

                {/* Jeśli użytkownik jest zalogowany, dostęp do podstrony */}
                <Route
                    path="/create-post"
                    element={isAuthenticated ? <AddPostPage /> : <Navigate to="/signup" />}
                />

                <Route
                    path="/profile/:username"
                    element={isAuthenticated ? <ProfilePage /> : <Navigate to="/signup" />}
                />
            </Routes>
            <Toaster />
        </div>
    );
};


export default App