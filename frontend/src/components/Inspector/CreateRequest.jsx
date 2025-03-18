import React from 'react'

function CreateRequest() {
  return (
    <div>
        <h2 className='text-center py-2 font-semibold'>Send Request</h2>
        <form >
        <div className='flex flex-col mx-3'>
        <label className='py-2'>Title of Request</label>
        <input type="text" className='border py-2'/>
        </div>
        <div className='flex flex-col mx-3'>
            <label className='py-2'>Mian Request</label>
            <textarea className='border py-6' rows={6}></textarea>
        </div>
        <div>
        <button className='bg-red-600 px-3 py-2 rounded float-right mr-8 mt-3 text-white'>Cancel</button>
        <button className='bg-blue-600 px-3 py-2 rounded float-right mr-8 mt-3'>Send</button>
        </div>
        </form>
    </div>
  )
}

export default CreateRequest