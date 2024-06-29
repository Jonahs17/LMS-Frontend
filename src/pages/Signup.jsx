import { useState } from "react";
import toast from "react-hot-toast";
import { BsPersonCircle } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { isEmail, isValidPassword } from "../helpers/regexMatcher";
import HomeLayout from "../layouts/HomeLayout";
import { createAccount } from "../redux/slices/authSlice";

function Signup(){

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [signupDetails, setSignupDetails] = useState({
        email:'',
        fullName:'',
        password:'',
        avatar:''
    });

    const [previewImage,setPreviewImage] = useState("");

    async function  onFormSubmit(e){
        e.preventDefault();
        
        if(!signupDetails.email || !signupDetails.fullName || !signupDetails.password || !signupDetails.avatar ){
            toast.error("Please fill all the details")
            return;
        }

        if(signupDetails.fullName.length<5){
            toast.error("Name should atleast have 5 characters")
            return;
        }

        if(!isEmail(signupDetails.email)){
            toast.error("Invalid email provided")
            return; 
        }

        if(!isValidPassword(signupDetails.password)){
            toast.error("Password should have 6-16 chars, 1 Special char and 1 Number")
            return; 
        }

        const formData = new FormData();
        formData.append("fullName",signupDetails.fullName);
        formData.append("email",signupDetails.email);
        formData.append("password",signupDetails.password);
        formData.append("avatar",signupDetails.avatar);



        const response = await dispatch(createAccount(formData));

        console.log(response);

        if(response?.payload?.data){
            navigate('/');
        }

        setSignupDetails({
            email:'',
            fullName:'',
            password:'',
            avatar:''
        });

        setPreviewImage("");
    }

    function handleUserInput(e){
        const { name , value } = e.target;
        setSignupDetails({
            ...signupDetails,
            [name]: value
        });
    }

    function handleImage(e){
        e.preventDefault();

        const uploadedImage = e.target.files[0];

        if(!uploadedImage){
            return;
        }

        setSignupDetails({
            ...signupDetails,
            avatar: uploadedImage
        });

        const fileReader = new FileReader();
        fileReader.readAsDataURL(uploadedImage);
        fileReader.addEventListener("load",function (){
            setPreviewImage(this.result)
        })
    }

    return (
        <HomeLayout>
            <div className="flex overflow-x-auto items-center justify-center h-[100vh]">
                <form onSubmit={onFormSubmit} noValidate action="" className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white">
                    <h1 className="text-2xl text-center font-bold">
                        Registration Page
                    </h1>
                    <label htmlFor="image_uploads" className="cursor-pointer">
                        { previewImage ? (
                            <img className="w-24 h-24 rounded-full m-auto" src={previewImage}/>) :
                            (
                                <BsPersonCircle className="w-24 h-24 rounded-full m-auto"/>
                        )}

                    </label>
                    <input onChange={handleImage} type="file" className="hidden" id="image_uploads" name="image_uploads" accept=".jpg, .jpeg, .png, .svg"/>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="fullName" className="font-semibold">Name</label>
                        <input onChange={handleUserInput} value={signupDetails.fullName} className="bg-transparent px-2 py-1 border" type="text" name="fullName" id="fullName" placeholder="Enter your full name" required/>

                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="email" className="font-semibold">Email</label>
                        <input onChange={handleUserInput} value={signupDetails.email} className="bg-transparent px-2 py-1 border" type="text" name="email" id="email" placeholder="Enter your email" required/>

                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="password" className="font-semibold">Password</label>
                        <input onChange={handleUserInput} value={signupDetails.password} className="bg-transparent px-2 py-1 border" type="password" name="password" id="password" placeholder="Enter your password" required />

                    </div>

                    <button className="mt-2 px-2 py-1 bg-yellow-800 hover:bg-yellow-500 transition-all ease-in-out">Create Account</button>
                    <p>
                        Already have an account? <Link to='/login' className="text-yellow-800 hover:text-yellow-500">Login</Link>
                    </p>
                </form>

            </div>
        </HomeLayout>
    );

}

export default Signup;
