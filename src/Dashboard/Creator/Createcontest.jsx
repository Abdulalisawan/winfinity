import axios from 'axios';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { useForm } from 'react-hook-form';
import "react-datepicker/dist/react-datepicker.css";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Useaxiossecure from '../../Hooks/Useaxiossecure';
import Swal from 'sweetalert2';

const Createcontest = () => {
    const [deadline, setdeadline] = useState(null);
     const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm();
     const axiosscure=Useaxiossecure()

     const queryclient=  useQueryClient()


     const{mutate,isPending}=useMutation({
        mutationFn:async(data)=>{
            const paylaod={
                ...data,
                price:Number(data.price),
                prizeMoney:Number(data.prizeMoney),
                deadline
            }

            const res= await axiosscure.post('/creator/contest',paylaod)
            return res.data

        },
        onSuccess:()=>{
             Swal.fire("Success", "Contest created and pending approval", "success");
      queryclient.invalidateQueries({ queryKey: ["myCreatedContests"] });
      reset();
      setdeadline(null);
        },
        onError:(err)=>{
             Swal.fire("Error", err.response?.data?.message || "Something went wrong", "error");
        }

     })

     

     const onsubmit=async(data)=>{
       
        const photo= data.image[0]
        
        
        
        if(photo){
            const formdata= new FormData()
            formdata.append(`image`,photo)

            const res= await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imgbb_key}`,formdata);
            data.photoo= res.data.data.url;
       
     }
     console.log(data.photoo)
     mutate(data)
     
    }
    return (
       <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-semibold mb-4">Add New Contest</h2>

      <form onSubmit={handleSubmit(onsubmit)} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block mb-1 font-medium">Contest Name</label>
          <input
            type="text"
            className="input input-bordered w-full"
            {...register("name", { required: true })}
          />
          {errors.name && <p className="text-red-500 text-sm">Name is required</p>}
        </div>

        {/* Image */}
        <div>
          <label className="block  mb-1 font-medium">Image </label>
          <input
            type="File"
            className="input pt-2 input-bordered w-full"
            {...register("image", { required: true })}
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            className="textarea textarea-bordered w-full"
            rows={4}
            {...register("description", { required: true })}
          />
        </div>

        {/* Task Instruction */}
        <div>
          <label className="block mb-1 font-medium">Task Instruction</label>
          <textarea
            className="textarea textarea-bordered w-full"
            rows={4}
            {...register("taskInstruction", { required: true })}
          />
        </div>

        {/* Price & Prize Money */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Price (Entry Fee)</label>
            <input
              type="number"
              className="input input-bordered w-full"
              {...register("price", { required: true, min: 0 })}
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Prize Money</label>
            <input
              type="number"
              className="input input-bordered w-full"
              {...register("prizeMoney", { required: true, min: 0 })}
            />
          </div>
        </div>

        {/* Contest Type */}
        <div>
          <label className="block mb-1 font-medium">Contest Type</label>
          <select
            className="select select-bordered w-full"
            {...register("type", { required: true })}
          >
            <option value="">Select type</option>
            <option value="design">Image Design</option>
            <option value="article">Article Writing</option>
            <option value="business">Business Idea</option>
            <option value="gaming">Gaming Review</option>
          </select>
        </div>

        {/* Deadline */}
        <div>
          <label className="block mb-1 font-medium">Deadline</label>
          <DatePicker
         selected={deadline}
  onChange={(date) => {
    setdeadline(date);
    setValue("deadline", date, { shouldValidate: true });
  }}
  showTimeSelect
  timeFormat="HH:mm"
  timeIntervals={15}
  dateFormat="Pp"                     // e.g. Jan 20, 2026, 6:30 PM
  className="input input-bordered w-full"  // SAME style as your other inputs
  minDate={new Date()}
  placeholderText="Select deadline"
       
          >

          </DatePicker>
          
        </div>

        <button
          type="submit"
          
          className="btn  bg-sky-200 w-full"
          disabled={isPending}
          
        >
            {
                isPending ? `...creating`:`Create Now`
            }
          
        </button>
      </form>
    </div>
    );
};

export default Createcontest;