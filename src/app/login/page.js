"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import Cookies from "js-cookie";


export default function Login() {

    const [isPending, setPending] = useState(false)
    const {register,handleSubmit,setValue,setFocus,reset}=useForm()
    const router = useRouter()

    const onLogin=(data)=>{
        setPending(true)
        setTimeout(async()=>{
            const res=await axios.post('/api/login',data)
            const resData=res.data
            setPending(false)
            if(resData.status){
                toast.success(resData.message)
                Cookies.set('user',JSON.stringify(data),{expires:3})
                router.push('/dashboard')
            }else{
                toast.error(resData.message)
                if(resData==="Wrong Password."){
                    setValue('password',"")
                }
                
            }

        })

    }

    useEffect(()=>{
        const token=Cookies.get('user')
        if(token){
            router.push('/dashboard')
        }
    })


    return (

        <>
            <Toaster
                position="top-center"
                reverseOrder={false}
                gutter={8}
                containerClassName=""
                containerStyle={{}}
                toastOptions={{
                    // Define default options
                    className: '',
                    duration: 5000,
                    style: {
                        background: '#363636',
                        color: '#fff',
                    },

                    // Default options for specific types
                    success: {
                        duration: 3000,
                        theme: {
                            primary: 'green',
                            secondary: 'black',
                        },
                    },
                }}
            />


            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <div className="w-full max-w-md p-6 bg-white shadow-lg shadow-blue-500 rounded-lg item-center justify-center px-5 py-7 
                        transition duration-300 hover:bg-cyan-100">
                    <h2 className="text-2xl font-semibold text-center text-blue-800 mb-6">Login</h2>
                    <form onSubmit={handleSubmit(onLogin)} autoComplete="off" >
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-blue-600">Email Address</label>
                            <input
                                type="email"
                                className=" disabled:bg-blue-100 disabled:cursor-not-allowed w-full p-1 mt-1 border border-blue-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                {...register('username')} disabled={isPending} required />
                        </div>
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-blue-600">Password</label>
                            <input type="password"
                                className=" disabled:bg-blue-100 disabled:cursor-not-allowed w-full p-1 mt-1 border border-blue-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                {...register('password')} disabled={isPending} required />
                        </div>
                        <button type="submit"
                            className=" disabled:bg-blue-100 disabled:cursor-not-allowed w-full bg-blue-500 text-white py-2 rounded-md transition duration-300 hover:bg-blue-900 active:scale-95"
                            disabled={isPending}>Login</button>
                    </form>
                    <div className="w-full px-5 py-7">
                        <p >
                            Don't have an account? <Link href="/register" className="text-blue-500">Register</Link>
                        </p>
                    </div>
                </div>
            </div>


        </>
    )
}