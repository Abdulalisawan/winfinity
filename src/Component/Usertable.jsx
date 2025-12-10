import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import Swal from 'sweetalert2';
import Useaxiossecure from '../Hooks/Useaxiossecure';

const Usertable = ({User}) => {

    const queryClient = useQueryClient()
    
    const axiossecure=Useaxiossecure()



   const{mutate}=useMutation({
    mutationFn:({userId,role})=>axiossecure.patch(`/user/admin/${userId}`,{role}),
    onSuccess:()=>{
          queryClient.invalidateQueries(['Alluser']);
          Swal.fire({
  title: "User is Now admin",

  icon: "success",
});
    }

   })

    const handlemodal=(userId,role)=>{
        
        const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-success",
    cancelButton: "btn btn-danger"
  },
  buttonsStyling: false
});
swalWithBootstrapButtons.fire({
  title: "Are you sure you want to make admin?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonText: "Yes, make it!",
  cancelButtonText: "No, cancel!",
  reverseButtons: true
}).then((result) => {
  if (result.isConfirmed) {
    mutate(userId,role)
  } else if (
   
    result.dismiss === Swal.DismissReason.cancel
  ) {
    swalWithBootstrapButtons.fire({
      title: "Cancelled",
  
      icon: "error"
    });
  }
});


    }


    const creatormodal=(userId,role)=>{

       const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-success",
    cancelButton: "btn btn-danger"
  },
  buttonsStyling: false
});
swalWithBootstrapButtons.fire({
  title: "Are you sure you want to make user creator?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonText: "Yes, make it!",
  cancelButtonText: "No, cancel!",
  reverseButtons: true
}).then((result) => {
  if (result.isConfirmed) {
    mutate(userId,role)
  } else if (
   
    result.dismiss === Swal.DismissReason.cancel
  ) {
    swalWithBootstrapButtons.fire({
      title: "Cancelled",
  
      icon: "error"
    });
  }
});

    }
    const usermodal=(userId,role)=>{

       const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-success",
    cancelButton: "btn btn-danger"
  },
  buttonsStyling: false
});
swalWithBootstrapButtons.fire({
  title: "Are you sure you want to make user?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonText: "Yes, make it!",
  cancelButtonText: "No, cancel!",
  reverseButtons: true
}).then((result) => {
  if (result.isConfirmed) {
    mutate(userId,role)
  } else if (
   
    result.dismiss === Swal.DismissReason.cancel
  ) {
    swalWithBootstrapButtons.fire({
      title: "Cancelled",
  
      icon: "error"
    });
  }
});

let userrole= <td className='text-xl font-semibold'>{User.role}</td>

  if(User.role ===`admin`){
    userrole= <td className='text-xl text-green-700 font-semibold'>{User.role}</td>
  
}else if(User.role ===`creator`){
  userrole=<td className='text-xl text-orange-700 font-semibold'>{User.role}</td>
}




    }
    return (
        <tr>
        <th>
          <label>
            <input  type="checkbox" className="checkbox" />
          </label>
        </th>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img
                  src={User.photoURL}
                 />
              </div>
            </div>
            <div>
              <div  className="font-bold">{User.name}</div>
              
            </div>
          </div>
        </td>
        
       
        <td>
          
          {User.email}
        </td>
         <td  className='font-semibold'>{User.role}</td>
          
        <th className=' space-x-3'>
          <button onClick={()=>{handlemodal({userId: User._id, role:`admin`})}} className="btn btn-ghost border bg-base-300 hover:bg-amber-100 btn-xs">Admin</button>
          <button onClick={()=>{creatormodal({userId: User._id, role:`creator`})}} className="btn btn-ghost border bg-base-300 hover:bg-amber-100 btn-xs">Creator</button>
          <button onClick={()=>{usermodal({userId: User._id, role:`user`})}} className="btn btn-ghost border bg-base-300 hover:bg-amber-100 btn-xs">user</button>
        </th>
      </tr>
    );
};

export default Usertable;