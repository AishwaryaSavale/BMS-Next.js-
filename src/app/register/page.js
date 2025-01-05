"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

export default function Register() {

    const [isPending, setPending] = useState(false)

    const {register,handleSubmit,setFocus,setValue}=useForm()
    const router = useRouter()

    const onRegister=(data)=>{
        if(data.password !== data.cpassword){
            toast.error("Password doesn't Match !!")
            setValue('password',"")
            setValue('cpassword',"")
            return
        }
        setPending(true)
        setTimeout(async()=>{
            const res = await axios.post('/api/register',data)
            const resData=res.data
            setPending(false)
            if(resData.status){
                toast.success(resData.message)
                router.push('/login')
            }else{
                toast.error(resData.message)
            }
        },1200)
    }


    useEffect(()=>{
        setFocus('fullname')
    },[])


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


            <div className="flex items-center justify-center min-h-screen px-7 bg-gray-100">
                <div className="bg-blue-500 shadow-lg shadow-blue-500 bg-white rounded-lg overflow-hidden flex items-center justify-center 
                               transition duration-300 hover:bg-cyan-100 ">
                    <form onSubmit={handleSubmit(onRegister)} className="bg-white w-full px-9 py-7 border border-2 border-blue-300 bg-cyan-500" autoComplete="off">
                        <h2 className="my-4 text-2xl text-center font-bold text-white">Register</h2>
                        <div>
                            <label className="text-gray-800 block mb-1 text-sm">Fullname</label>
                            <input type="text"
                                className=" disabled:bg-blue-100 disabled:cursor-not-allowed w-full px-3 py-2 border border-2 border-blue-300 rounded-lg mb-3 outline-none focus:border-blue-500"
                                {...register('fullname')} disabled={isPending} required/>
                        </div>
                        <div>
                            <label className="text-gray-800 block mb-1 text-sm">Username</label>
                            <input type="email"
                                className="disabled:bg-blue-100 disabled:cursor-not-allowed w-full px-3 py-2 border border-2 border-blue-300 rounded-lg mb-3 outline-none focus:border-blue-500"
                                {...register('username')} disabled={isPending} required/>
                        </div>
                        <div>
                            <label className="text-gray-800 block mb-1 text-sm">Password</label>
                            <input type="password"
                                className=" disabled:bg-blue-100 disabled:cursor-not-allowed w-full px-3 py-2 border border-2 border-blue-300 rounded-lg mb-3 outline-none focus:border-blue-500"
                                {...register('password')} disabled={isPending}required />
                        </div>
                        <div>
                            <label className="text-gray-800 block mb-1 text-sm">Confirm Password</label>
                            <input type="password"
                                className=" disabled:bg-blue-100 disabled:cursor-not-allowed w-full px-3 py-2 border border-2 border-blue-300 rounded-lg mb-3 outline-none focus:border-blue-500"
                                {...register('cpassword')} disabled={isPending}required />
                        </div>
                        <button type="submit"
                            className=" disabled:bg-blue-100 disabled:cursor-not-allowed w-full py-3 my-7 bg-blue-600 text-white text-center rounded-lg 
                                transition duration-300 hover:bg-blue-900 active:scale-95"
                            disabled={isPending}>Register</button>
                    </form>
                    <div className="flex items-center justify-center w-full  px-3 py-7 text-white  ">
                        <p className="text-md text-center text-black">Already have an account? <Link href="/login" className="hover:underline font-bold text-blue-500">Click here</Link> to login</p>
                    </div>
                </div>
            </div>

        </>
    )
}