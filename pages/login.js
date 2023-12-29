import LayoutHome from "@/components/_layoutHome";
import { headers } from "@/next.config";
import Header from "@/components/_header";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import { useNavigate, Redirect } from "react-router-dom";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import SwitchTheme from "@/components/_switchTheme";

export default function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();
    const [success, setSuccess] = useState('');
    const router = useRouter();
    const onSubmit = async (data) => {
        try {
            const res = await axios.post("http://localhost:3000/api/users/login",
                data, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });
            if (res.data.success) {
                sessionStorage.setItem('userId', res.data.user.user.user_id);
                sessionStorage.setItem('userName', res.data.user.user.user_name);
                router.push('/user/userList');
            }

            setSuccess(res.data.message);
        }
        catch (error) {
            setSuccess('Unsuccessfull: ' + error.response.data.message);
        }
    };

    useEffect(() => {
        if (sessionStorage.getItem('userId')) {
            router.push('/user/userList');
        }
    }, [])

    return (
        <>
            <div ><SwitchTheme /></div>
            <Header title="Login" />
            <div className="flex justify-center items-center h-screen">
                <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className="bg-white p-8 rounded shadow-md">
                    <a href="/" class="flex order-first lg:order-none title-font font-medium items-center text-gray-900 lg:items-center lg:justify-center mb-4 md:mb-4">
                        <Image src="/communify.png" alt="communify" width={30} height={0} />
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                        <span class="ml-3 text-2xl">Communify</span>
                    </a>

                    {success == 'Login Successfull!' ?
                        <div className="alert alert-success rounded p-2 m-1 text-white"><svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg><span>{success}</span></div> : success != '' ?
                            <div className="alert alert-error rounded p-2 m-1 text-white"><svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg><span>{success}</span></div> :
                            ''}

                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="username">
                            Username
                        </label>
                        <input
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            id="username"
                            placeholder="username"
                            {...register('username', { required: true })}
                        />
                        {errors.username && <p className="text-red-500">Username is required</p>}
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="password"
                            id="password"
                            placeholder="password"
                            {...register('password', { required: true })}
                        />
                        {errors.password && <p className="text-red-500">Password is required</p>}
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                            value={"Login"}
                        >
                            Login
                        </button>
                        <Link className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="/register">
                            Create an Account
                        </Link>
                    </div>
                </form>
            </div>
        </>
    )
}