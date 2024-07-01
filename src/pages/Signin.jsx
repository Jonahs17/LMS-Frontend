import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { isEmail } from "../helpers/regexMatcher";
import HomeLayout from "../layouts/HomeLayout";
import { login } from "../redux/slices/authSlice";

function Signin() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.auth);

    const [signinDetails, setSigninDetails] = useState({
        email: '',
        password: ''
    });

    async function onFormSubmit(e) {
        e.preventDefault();

        if (!signinDetails.email || !signinDetails.password) {
            toast.error("Please fill all the details");
            return;
        }

        if (!isEmail(signinDetails.email)) {
            toast.error("Invalid email provided");
            return;
        }

        const response = await dispatch(login(signinDetails));

        if (response.meta.requestStatus === 'fulfilled' && response.payload) {
            navigate('/');
        }
    }

    function handleUserInput(e) {
        const { name, value } = e.target;
        setSigninDetails({
            ...signinDetails,
            [name]: value
        });
    }

    return (
        <HomeLayout>
            <div className="flex overflow-x-auto items-center justify-center h-[100vh]">
                <form onSubmit={onFormSubmit} noValidate className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white">
                    <h1 className="text-2xl text-center font-bold">
                        SignIn Page
                    </h1>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="email" className="font-semibold">Email</label>
                        <input onChange={handleUserInput} value={signinDetails.email} className="bg-transparent px-2 py-1 border" type="text" name="email" id="email" placeholder="Enter your email" required />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="password" className="font-semibold">Password</label>
                        <input onChange={handleUserInput} value={signinDetails.password} className="bg-transparent px-2 py-1 border" type="password" name="password" id="password" placeholder="Enter your password" required />
                    </div>

                    <button className="mt-2 px-2 py-1 bg-yellow-800 hover:bg-yellow-500 transition-all ease-in-out" disabled={loading}>
                        {loading ? 'Signing In...' : 'Sign In'}
                    </button>
                    <p>
                        Donot have an account? <Link to='/signup' className="text-yellow-800 hover:text-yellow-500">Sign up</Link>
                    </p>
                </form>
            </div>
        </HomeLayout>
    );
}

export default Signin;
