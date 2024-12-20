import React, { useState } from 'react';
import { Link ,useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInsuccess,signInStart } from '../redux/user/userSlice.js';
import { signInFailure} from '../redux/user/userSlice';
import OAuth from '../components/OAuth.jsx';

export default function Signin() {
  const [formData,setFormData]= useState({})
  const{loading,error} = useSelector((state)=>state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMessage, setError] = useState(null);
  const handleChange=(e)=>{
    setFormData({
      ...formData,
      [e.target.id]:e.target.value,
    });
  };
  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
      dispatch(signInStart());
      setError(null);//clear any previous error
    const res= await fetch('/api/auth/signin',
      {
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify(formData),
      });
    const data = await res.json();
    if(data.success === false){
      dispatch(signInFailure(error.message));
      return;
    };
    console.log(data);
    dispatch(signInsuccess(data))
    navigate('/');
    } catch (error) {
      dispatch(signInFailure(error.message));
      setError(error.message);
      console.log(error);
    }
    
    
  };
  
  console.log(formData);
  
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-exl text-center font-semibold
      my-7'>SignIn</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
         <input type="email"placeholder='email'
        className='border p-3 rounded-lg'id='email' onChange={handleChange}/>
         <input type="password"placeholder='password'
        className='border p-3 rounded-lg'id='password'onChange={handleChange} />
        <button disabled={loading} type='submit' className='bg-slate-700 text-white
        rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{loading? 'loading':'Sign In'}</button>
        <OAuth/>
      </form>
      <div className='flex gap-2 mt-5'>
        <p> Dont have an account?</p>
        <Link to = {"/signup"}>
        <span className='text-blue-700'>Sign Up</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}
