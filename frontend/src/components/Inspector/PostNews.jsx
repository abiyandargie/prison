import React from 'react'

function PostNews() {
  return (
    <div>
        <h2 className='text-center py-2 font-semibold'>Post News</h2>
        <form >
        <div className='flex flex-col mx-3'>
        <label className='py-2'>Title of News</label>
        <input type="text" className='border py-2'/>
        </div>
        <div className='flex flex-col mx-3'>
            <label className='py-2'>Mian Content</label>
            <textarea className='border py-6' rows={6}></textarea>
        </div>
        <div>
        <button className='bg-red-600 px-3 py-2 rounded float-right mr-8 mt-3 text-white'>Cancel</button>
        <button className='bg-blue-600 px-3 py-2 rounded float-right mr-8 mt-3'>Post</button>
        </div>
        </form>
    </div>
  )
}

export default PostNews