

import React from 'react'
import { useAuth } from '../../context/authContext'

const Navbar = () => {
    const {user,logout} = useAuth()
  return (
    <div className='flex items-center justify-between h-12 bg-teal-600 px-5 text-white'>
        <p>welcome {user.name}</p>
        <button className='px-4 py-1 bg-teal-700 hover:bg-teal-800' onClick={logout}>Logout</button>
    </div>
  )
}

export default Navbar




// import React, { useState } from 'react'

// function SystenmInformation() {
//   const initialInfo={
//     systemName:'',
//     shortName:'',
//     logo:'',
//     cover:''

//   }
//   const [systemInformation,setSystemInformation]=useState(initialInfo);
//   const changeHandler=(e)=>{
//     setSystemInformation({...systemInformation,[e.target.name]:e.target.value});
//   }
//   const submitHandler=(e)=>{
//     e.preventDefault();
//     console.log(systemInformation)
//   }
//   return (
//     <div>
//         <h3 className="border-b border-t-4 border-t-gray-900 font-semibold text-lg text-center p-4">
//             System Information
//           </h3>
//           <form className="flex flex-col space-y-3 p-2" onSubmit={submitHandler}>
//             <div className="flex flex-col">
//                 <label>
//                     System Name
//                 </label>
//                 <input type="text" className="border py-2 mt-2" name='systemName' onChange={changeHandler}/>
//             </div>
//             <div className="flex flex-col">
//                 <label >System Short Name</label>
//                 <input type="text"  className="border py-2 mt-2"  name='shortName' onChange={changeHandler}/>
//             </div>
//             <div className="flex flex-col">
//                 <label >System Logo</label>
//                 <input type="file"  className="border py-2 mt-2" name='logo' onChange={changeHandler}/>
//             </div>
//             <div className="flex flex-col">
//                 <label >Website Cover</label>
//                 <input type="file"  className="border py-2 mt-2" name='cover' onChange={changeHandler}/>
//                 <div className="w-full h-64 p-2">
//                     <img src="" alt="" />
//                 </div>
//             </div>
//             <button type="submit" className="bg-blue-600 w-20 py-2 px-3 rounded">Update</button>
//           </form>
//     </div>
//   )
// }

// export default SystenmInformation