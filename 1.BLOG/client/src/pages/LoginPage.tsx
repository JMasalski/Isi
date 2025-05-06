import {Link} from "react-router";
import LoginForm from "@/components/forms/LoginForm.tsx";

const LoginPage = () => {
    return (
        <div className="h-screen flex justify-center items-center p-4 sm:p-6 md:p-8">
            <div
                className="border-2 border-black flex flex-col lg:flex-row w-full max-w-7xl mx-auto bg-primary shadow-lg overflow-hidden rounded-xl">
                {/* Left side */}

                <div className="w-full lg:w-1/2 flex flex-col gap-y-3 h-full p-8">
                    <h1 className="text-3xl font-bold mb-4">Welcome Back</h1>
                    <p className="text-lg mb-8">Please log in to your account</p>
                    <LoginForm/>
                    <p className="text-sm text-center mt-6">
                        Don&apos;t have an account?{" "}
                        <Link to="/signup" className="text-foreground hover:underline">
                            Join us
                        </Link>
                    </p>
                </div>

                <div className="lg:border-r-2 "/>
                {/* Right side */}

                <div className="hidden lg:flex w-full lg:w-1/2 items-center bg-secondary justify-center">
                    <div className="max-w-md p-8">
                        <div className="relative aspect-square max-w-sm mx-auto">
                            <img src="loginPage.svg" alt="Blog App" className="size-full"/>
                            <div className="text-center space-y-3 mt-6">
                                <h2 className="text-2xl font-bold">Join the Community</h2>
                                <p className="text-gray-700">
                                    Connect with like-minded individuals and share your thoughts.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
