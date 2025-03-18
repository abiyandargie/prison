import React from 'react'

function Issue() {
  return (
    <div>
        <h3 className='text-lg font-bold p-2 mt-6'>Report an issue about your Profile</h3>
        <form>
     <div>
       <textarea name="" id="" className='p-2 border w-[50%] mt-4 mb-4' rows={5}></textarea>
       </div>
        <button className='bg-blue-600 text-white px-3 py-2 rounded ml-4'>Report</button>
        <button className='bg-red-600 text-white px-3 py-2 rounded ml-4'>Cancel</button>
       </form>
    </div>
  )
}

export default Issue