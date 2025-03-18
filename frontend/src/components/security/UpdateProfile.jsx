import React from 'react'

function UpdateProfile() {
  return (
    <div className='flex flex-col items-center'>
        <form >
            <h3 className='text-lg font-bold p-2'>Update Profile</h3>
        <input type="file" className='border px-3 py-2'/>
        <div className='border h-[120px] w-[160px] m-2'>
            <img src="" alt="" />
        </div>
        
        <button className='bg-blue-600 px-3 py-2 rounded'>Update</button>
        <button className='bg-red-600 text-white px-3 py-2 rounded ml-4'>Cancel</button>
      
        </form>
    </div>
  )
}

export default UpdateProfile