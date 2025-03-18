import React from 'react'

function ListofUsers() {
  return (
    <div>
         <div className="border-b  flex  p-4">
            <h4 className="font-semibold mr-8">List of Users</h4>
            <button className="bg-blue-600 text-white ml-8 px-3 py-2 rounded font-semibold">
              + Create New
            </button>
          </div>
          <input
            type="text"
            name=""
            id=""
            className="border px-3 py-1 m-2 "
            placeholder="search"
          />
          <table className="flex flex-col ">
            <div className="space-x-8 w-screen">
            <th className="px-4 py-1 border-b">#</th>
            <th className="px-4 py-1 border-b">Date Uodated</th>
            <th className="px-4 py-1 border-b">Avator</th>
            <th className="px-4 py-1 border-b">Name</th>
            <th className="px-4 py-1 border-b">UserName</th>
            <th className="px-4 py-1 border-b">Email</th>
            <th className="px-4 py-1 border-b">Type</th>
            <th className="px-4 py-1 border-b">Action</th>
            </div>
            <div className="">
            <td className="px-4 py-1 border-b">#1</td>
            <td className="px-4 py-1 border-b">01/02/23</td>
            <td className="px-4 py-1 border-b"><img src="" alt="" /></td>
            <td className="px-4 py-1 border-b">Selomon</td>
            <td className="px-4 py-1 border-b">sele</td>
            <td className="px-4 py-1 border-b">sele@gmail</td>
            <td className="px-4 py-1 border-b">Admin</td>
            <td className="px-4 py-1 border-b">Action
              <select name="" id="">
                <option value=""></option>
                <option value="">edit</option>
                <option value="">delete</option>
              </select>
            </td>
            </div>
          </table>
    </div>
  )
}

export default ListofUsers