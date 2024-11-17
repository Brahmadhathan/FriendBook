import React, { useState } from 'react';
import { Link ,useNavigate } from 'react-router-dom';

export default function SignUp() {
  const [formData,setFormData]= useState({})
  const [error,setError]=useState(null);
  const [loading,setLoading]=useState(false);
  const navigate = useNavigate();
  const handleChange=(e)=>{
    setFormData({
      ...formData,
      [e.target.id]:e.target.value,
    });
  };
  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);//clear any previous error
    const res= await fetch('/api/auth/signup',
      {
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify(formData),
      });
    const data = await res.json();
    if(data.success === false){
      setLoading(false);
      setError(data.message||'signup faild');
      return;
    };
    console.log(data);
    setLoading(false);
    navigate('/signin');
    } catch (error) {
      setLoading(false);
    }
    
    
  };
  
  console.log(formData);
  
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-exl text-center font-semibold
      my-7'>SignUp</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type="text"placeholder='username'
        className='border p-3 rounded-lg'id='username'onChange={handleChange} />
         <input type="email"placeholder='email'
        className='border p-3 rounded-lg'id='email' onChange={handleChange}/>
         <input type="password"placeholder='password'
        className='border p-3 rounded-lg'id='password'onChange={handleChange} />
        <button disabled={loading} type='submit' className='bg-slate-700 text-white
        rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{loading? 'loading':'Sign Up'}</button>
        <OAuth/>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>have an account?</p>
        <Link to = {"/sign-in"}>
        <span className='text-blue-700'>Sign In</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}
