"use client";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

export default function Dashboard() {
  const [data, setData] = useState(JSON.parse(Cookies.get("user")));
  const [isPending, setPending] = useState(false);
  const [isShow, setShow] = useState(false);
  const { register, handleSubmit, reset, setValue } = useForm();
  const [books, setBooks] = useState([]);
  const [updateId, setUpdateId] = useState("");
  const [actionStatus, setActionStatus] = useState("add");

  const getbooks = () => {
    setPending(true)
    setTimeout(async () => {
      const res = await axios.get("/api/addbooks");
      const resData = res.data;
      setPending(false)
      if (resData.status) {
        setBooks(resData.message);
      }
    }, 500);
  };

  const onBook = (formData) => {
    setPending(true)
    if (actionStatus === "add") {
      setTimeout(async () => {
        const res = await axios.post("/api/addbooks", formData);
        const resData = res.data;
        setPending(false)
        if (resData.status) {
          toast.success(resData.message);
          reset();
          onToggle();
          getbooks();
          setActionStatus("add");
        } else {
          toast.error(resData.message);
        }
      }, 1000);
    } else {
      setTimeout(async () => {
        const updatedData = {
          id: updateId,
          author: formData.author,
          description: formData.description,
          title: formData.title,
          type: formData.type,
          year: formData.year,
          quantity: formData.quantity
        };
        const res = await axios.put("/api/addbooks", updatedData);
        const resData = res.data;
        setPending(false)
        if (resData.status) {
          toast.success(resData.message);
          reset();
          onToggle();
          getbooks();
          setActionStatus("add");
        } else {
          toast.error(resData.message);
        }
      }, 1000);
    }
  };

  const onToggle = () => {
    setShow((prevState) => !prevState);
  };

  const onDelete =(id) => {
    setTimeout(async()=>{
      const res = await axios.delete("/api/addbooks", { data: { id } });
      const resData = res.data;
      if (resData.status) {
        toast.success(resData.message);
        getbooks();
      } else {
        toast.error(resData.message);
      }

    },1000)
   
  };

  const onUpdate = (item) => {
    setValue("author", item.author);
    setValue("title", item.title);
    setValue("type", item.type);
    setValue("description", item.description);
    setValue("quantity", item.quantity);
    setValue("year", item.year);

    onToggle();
    setActionStatus("update");
    setUpdateId(item._id);
  };

  useEffect(() => {
    getbooks();
  }, []);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="bg-gray-300 w-100 min-h-screen">
        <div className="w-100 py-3 px-10 bg-blue-400 flex align-center justify-between shadow-lg">
          <h2 className=" font-bold text-white">Welcome, {data.username}</h2>
          <button
            className={`p-2 rounded border text-sm font-bold text-purple-900 border-1 border-purple-800 transition 
              duration-0.25s hover:bg-purple-900 hover:text-white active:scale-95 
              ${isShow ? "bg-purple-900" : "bg-white"}`}
            onClick={onToggle}
          >
            {actionStatus === "add" ? "Add Book" : "Update Book"}
          </button>
        </div>
        {isShow && (
                  <div className="max-w-3xl mx-auto my-9 p-4 bg-white rounded shadow-md shadow-cyan-200">

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
             disabled={isPending} >  {actionStatus === "add" ? "Add Book" : "Update Book"}</button>
         </div>
       </form>
       </div>
    

        )}
        {!isShow && (
          <div className="bg-white rounded w-2/3 p-3 shadow-sm my-3 mx-auto">
            <h2 className="py-5 text-center font-bold text-blue-400"> Total Books</h2>
            <table className="w-full ">
              <thead>
                <tr className="border-b-2 bg-blue-200">
                  <th  className="px-3 py-1 text-center">#</th>
                  <th className="px-3 py-1 text-center">Title</th>
                  <th className="px-3 py-1 text-center" >Author</th>
                  <th className="px-3 py-1 text-center">Type</th>
                  <th className="px-3 py-1 text-center">Quantity</th>
                  <th className="px-3 py-1 text-center">Description</th>
                  <th className="px-3 py-1 text-center">Publication Year</th>
                  <th className="px-3 py-1 text-center">Date</th>
                  <th className="px-3 py-1 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {books.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="text-center">
                      No Books Available
                    </td>
                  </tr>
                ) : (
                  books.map((item, index) => (
                    <tr key={index} className=" border-b-4 border-blue-200 hover:bg-blue-100">
                      <td className="px-3 py-1 text-center">{index + 1}</td>
                      <td className="px-3 py-1 text-center">{item.title}</td>
                      <td className="px-3 py-1 text-center">{item.author}</td>
                      <td className="px-3 py-1 text-center">{item.type}</td>
                      <td className="px-3 py-1 text-center">{item.quantity}</td>
                      <td className="px-3 py-1 text-center">{item.description}</td>
                      <td className="px-3 py-1 text-center">{item.year}</td>
                      <td className="px-3 py-1 text-center">{item.createdAt}</td>
                      <td className="px-3 py-1 text-center">
                        <button className="px-2 py-1 text-center bg-green-300  transition duration-300 hover:bg-green-500 " onClick={() => onUpdate(item)}>Update</button>
                        <button className="px-2 py-1 text-center bg-gray-300 transition duration-300 hover:bg-gray-500 "  onClick={() => onDelete(item._id)}>Delete</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}