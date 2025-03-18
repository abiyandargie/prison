import React, { useState } from 'react'
import { useNavigate } from 'react-router';

function CreateNewUser() {
    const initialUser={
        firstName:'',
        middleName:'',
        lastName:'',
        userName:'',
        email:'',
        password:'',
        type:'',
        avator:''
    }
  const  [user,setUser]=useState(initialUser);
 const changeHandler=(e)=>{
    setUser({ ...user, [e.target.name]: e.target.value });
 }
 const submitHandler=(e)=>{
    e.preventDefault();
    console.log(user);
 }
 const navigate=useNavigate();
  return (
    <div>
        <div className="p-2">
            <h3 className="text-lg font-semibold text-center">Create New User</h3>
            <form onSubmit={submitHandler}>
              <div className='flex flex-col py-2'>
                <label >First Name</label>
                <input type="text" className='border py-1' name='firstName' onChange={changeHandler} value={user.firstName}/>
              </div>
              <div className='flex flex-col py-2' >
                <label >Middle Name</label>
                <input type="text" className='border py-1' name='middleName' onChange={changeHandler} value={user.middleName}/>
              </div>
              <div className='flex flex-col py-2'>
                <label >Last Name</label>
                <input type="text" className='border py-1' name='lastName' onChange={changeHandler} value={user.lastName}/>
              </div>
              <div className='flex flex-col py-2'>
                <label >Users Name</label>
                <input type="text" className='border py-1' name='userName' onChange={changeHandler} value={user.userName}/>
              </div>
              <div className='flex flex-col py-2'>
                <label >Email</label>
                <input type="email" className='border py-1' name='email' onChange={changeHandler} value={user.email}/>
              </div>
              <div className='flex flex-col py-2'>
                <label >Password</label>
                <input type="text" className='border py-1' name='password' onChange={changeHandler} value={user.password}/>
              </div>
              <div className='flex flex-col py-2'>
                <label >Type</label>
                <input type="text" className='border py-1' name='type' onChange={changeHandler} value={user.type}/>
              </div>
              <div className='flex flex-col py-2'>
                <label >Avator</label>
                <input type="text" className='border py-1' name='avator' onChange={changeHandler} value={user.avator}/>
              </div>
              <button className="bg-blue-600 px-3 py-2 rounded text-white mr-2">Save</button>
              <button className="bg-red-600 px-3 py-2 rounded text-white" onClick={()=>navigate('/admin')}>Cancel</button>
            </form>
          </div>
    </div>
  )
}

export default CreateNewUser