import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { login } from "../utils/networkCalls";
import { LoaderCircle } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";

function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        const { email, password } = data;
        setLoading(true);
        try {
            const response = await login(email, password);
            const token = response.access_token;
            if (token) {
                setLoading(false);
                setSuccess(true);
                setTimeout(() => {
                    setSuccess(false);
                }, 500)
            }
            toast.success("Successfully logged in :)", {
                position: "top-right",
                autoClose:true
              });
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(response?.user));
              setTimeout(() => {
                navigate("/");
            }, 1500)
             
            // Navigate to the next screen or perform other actions upon successful login
        } catch (error) {
            setError(true);
            toast.error("Error while login", {
                position: "top-right",
                autoClose: true
              });
        } finally {
            setLoading(false);
            setTimeout(() => {
                setError(false);
            }, 2000)
        }
    };
    return (
        <div className="w-full h-full flex flex-col justify-start items-center p-4 gap-4 ">
             <ToastContainer position="top-right" autoClose={500} />
             <h1 className='text-black font-bold text-center text-xl tracking-wide'>Login</h1>

            <form className='w-1/3 flex flex-col justify-center items-center border-2 border-blue-400 p-4 rounded-lg mt-4 gap-3 bg-gray-100' onSubmit={handleSubmit(onSubmit)}>
                <div className='w-full flex flex-col gap-2 justify-start items-start'>
                    <label className='text-black font-medium text-md'>Email</label>
                    <input className="w-full bg-gray-400 border rounded-md px-2 py-1 border-black" type="email" {...register("email", { required: true })} />
                    {errors.email && <span style={{ color: "red" }}>
                        *Email* is mandatory </span>}
                </div>
                <div className='w-full flex flex-col gap-2 justify-start items-start'>
                    <label className='text-black font-medium text-md'>Password</label>
                    <input className="w-full bg-gray-400 border rounded-md px-2 py-1 border-black" type="password" {...register("password",{ required: true })} />
                    {errors.password && <span style={{ color: "red" }}>
                        *password* is mandatory </span>}
                </div>
                <button
                    type='submit'
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex justify-center items-center gap-3"
                >
                    Login
                    {loading && <LoaderCircle size={20} className="rotate" />}
                </button>

            </form>
        </div>
    );
}
export default Login;
