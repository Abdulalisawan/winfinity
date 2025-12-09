import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import Swal from 'sweetalert2';
import Useaxiossecure from '../Hooks/Useaxiossecure';

const Usertable = ({User}) => {

    const queryClient = useQueryClient()
    
    const axiossecure=Useaxiossecure()



   const{mutate}=useMutation({
    mutationFn:(id)=>axiossecure.patch(`/user/admin/${id}`),
    onSuccess:()=>{
          queryClient.invalidateQueries(['Alluser']);
          Swal.fire({
  title: "User is Now admin",

  icon: "success",
});
    }

   })

    const handlemodal=(id)=>{
        
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
    mutate(id)
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
        <td>{User.role}</td>
        <th className=' space-x-3'>
          <button onClick={()=>{handlemodal(User._id)}} className="btn btn-ghost border bg-base-300 hover:bg-amber-100 btn-xs">Admin</button>
          <button className="btn btn-ghost border bg-base-300 hover:bg-amber-100 btn-xs">Creator</button>
          <button className="btn btn-ghost border bg-base-300 hover:bg-amber-100 btn-xs">user</button>
        </th>
      </tr>
    );
};

export default Usertable;