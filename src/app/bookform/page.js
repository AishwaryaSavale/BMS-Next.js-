"use client";

import {  useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";


export default function BookForm() {

  const [isPending,setPending]=useState(false)
  const router=useRouter()

  const {register,handleSubmit,setFocus,setValue}=useForm()

  const onBook=(data)=>{
      setPending(true)
      setTimeout(async()=>{
          const res = await axios.post('/api/addbooks',data)
          const resData=res.data
          setPending(false)
          if(resData.status){
              toast.success(resData.message)
          }else{
              toast.error(resData.message)
          }
      },1200)
  }

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
        <div className="max-w-3xl mx-auto my-9 p-4 bg-white rounded shadow-md shadow-cyan-200">
          <h2 className="text-2xl font-semibold mb-4">Add a New Book</h2>
          <form onSubmit={handleSubmit(onBook)} className="grid grid-cols-1 md:grid-cols-2 gap-4" autoComplete="off">
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Title</label>
              <input type="text"
                className=" disabled:bg-blue-100 disabled:cursor-not-allowed w-full p-2 border border-cyan-500  rounded" 
                disabled={isPending} {...register('title')} required/>
            </div>
  
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Author</label>
              <input type="text"
                className=" disabled:bg-blue-100 disabled:cursor-not-allowed w-full p-2 border border-cyan-500  rounded" 
                disabled={isPending} {...register('author')} required/>
            </div>
  
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Category/Type</label>
              <input type="text"
                className=" disabled:bg-blue-100 disabled:cursor-not-allowed w-full p-2 border border-cyan-500  rounded" 
                disabled={isPending} {...register('type')}  required/>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Quantity</label>
              <input type="number"
                className=" disabled:bg-blue-100 disabled:cursor-not-allowed w-full p-2 border border-cyan-500  rounded" 
                disabled={isPending} {...register('quantity')}  required/>
            </div>
  
            <div className="mb-4 col-span-2">
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                className=" disabled:bg-blue-100 disabled:cursor-not-allowed w-full p-2 border border-cyan-500  rounded" rows="3" 
                disabled={isPending} {...register('description')}  required />
            </div>
  
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Publication Year</label>
              <input type="number"
                className=" disabled:bg-blue-100 disabled:cursor-not-allowed w-full p-2 border border-cyan-500 rounded" 
                disabled={isPending} {...register('year')}  required/>
            </div>
  
            <div className="col-span-2">
              <button type="submit"
                className=" disabled:bg-blue-100 disabled:cursor-not-allowed w-full py-2 px-4 bg-cyan-600 text-white rounded hover:bg-cyan-700" 
                disabled={isPending}> Add Book</button>
            </div>
          </form>
        </div>
      </>
    );
  }
  