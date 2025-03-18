import React from 'react'

function NewInmate() {
  return (
    <div>
        <div>
          <h2>New Inmate Entry</h2>

          <form >
            <div className='p-2'>
          <div className='flex flex-col'>
            <label className="py-1">Code</label>
            <input type="text" name='' className='border py-2' />
          </div>
          <div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-3'>
          <div className='flex flex-col'>
            <label className="py-1">First Name</label>
            <input type="text" name='' className='border py-2' />
          </div >
          <div className='flex flex-col'>
            <label className="py-1">Middle Name</label>
            <input type="text" name='' className='border py-2' />
          </div>
          <div className='flex flex-col'>
            <label className="py-1">Last Name</label>
            <input type="text" name='' className='border py-2' />
          </div>
          </div>
          </div >
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div className='flex flex-col'>
            <label className="py-1">Birth Day</label>
            <input type="date" name='' className='border py-2' />
          </div>
          <div className='flex flex-col'>
            <label className="py-1">Gender</label>
            <input type="text" name='' className='border py-2' />
          </div>
          </div>
          <div className='flex flex-col'>
            <label className="py-1">Address</label>
            <textarea name="" id="" className='border py-2'></textarea>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
          <div className='flex flex-col'>
            <label className="py-1">Marital Status</label>
            <input type="text" name='' className='border py-2' />
          </div>
          <div className='flex flex-col'>
            <label className="py-1">Complexion</label>
            <input type="text" name='' className='border py-2' />
          </div>
          <div className='flex flex-col'>
            <label className="py-1">Eye Color</label>
            <input type="text" name='' className='border py-2' />
          </div>
          </div>
          <div className='flex flex-col'>
            <label className="py-1">Crime Commited</label>
            <textarea name="" id="" className='border py-2'></textarea>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-3'>
          <div className='flex flex-col'>
            <label className="py-1">sentence</label>
            <input type="text" name='' className='border py-2' />
          </div>
          <div className='flex flex-col'>
            <label className="py-1">Time Serve Start</label>
            <input type="date" name='' className='border py-2' />
          </div>
          <div className='flex flex-col'>
            <label className="py-1">Time Serve End</label>
            <input type="date" name='' className='border py-2' />
          </div>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-3'>
          <div className='flex flex-col'>
            <label className="py-1">Name</label>
            <input type="text" name='' className='border py-2' />
          </div>
          <div className='flex flex-col'>
            <label className="py-1">Relation</label>
            <input type="text" name='' className='border py-2' />
          </div>
          <div className='flex flex-col'>
            <label className="py-1">Number</label>
            <input type="text" name='' className='border py-2' />
          </div>
          </div>
          <div className='flex flex-col'>
            <label className="py-1">Inmate Image</label>
            <input type="text" name='' className='border py-2' />
          </div>
          <button className='bg-blue-600 px-3 py-2 rounded mt-3'>Save</button>
          <button className='bg-red-600 text-white px-3 py-2 ml-3 rounded mt-3'>Cancel</button>
          </div>
          </form>
        </div>
    </div>
  )
}

export default NewInmate