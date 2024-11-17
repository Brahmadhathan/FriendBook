import React from 'react';
import { useSelector} from 'react-redux';
import { useRef ,useState} from 'react';
import { updateUserStart,updateUserSuccess,updateUserFailure, deleteUserStart, deleteUserFailure, deleteUserSuccess, signOutUserStart, signOutUserFailure } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import {Link} from 'react-router-dom';




export default function Profile() {
    const fileRef = useRef(null);
    const {currentUser}= useSelector(state =>state.user)
    const [formData,setFormData]=useState({});
      // Local loading state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const handleSubmit= async(e)=>{
        e.preventDefault();
        setLoading(true); // Set loading state to true before sending request
        setError(null); // Reset error state before making a new request
        try {
            dispatch(updateUserStart());
            const res = await fetch(`/api/user/update/${currentUser._id}`,{
                method:'PUT',
                headers:{
                    'Content-Type':'application/json',
                },
                body:JSON.stringify(formData),
            });
            const data = await res.json();
            if(data.success==false){
                setError(data.message); // Update error state if request fails
                dispatch(updateUserFailure(data.message));
                setLoading(false);  // Set loading to false if the update fails
            return;
            }

            dispatch(updateUserSuccess(data));
        } catch (error) {
            dispatch(updateUserFailure(error.message));
            setLoading(false);  // Set loading to false if there is an error
        };
    }
    const handleChange=(e)=>{
        setFormData({...formData,[e.target.id]:e.target.value});
    }
    const handleDeleteUser = async()=>{
        try {
            dispatch(deleteUserStart());
            const res = await fetch(`/api/user/delete/${currentUser._id}`,{
                method:'DELETE',
        });
        const data = await res.json();
        if(data.success==false){
            dispatch(deleteUserFailure(data.message));
            return;
        }
        dispatch(deleteUserSuccess(data));
        } catch (error) {
            dispatch(deleteUserFailure(error.message))
        }
    }
    const handleSignOut = async()=>{
        try {
            dispatch(signOutUserStart())
            const res = await fetch('/api/auth/signout');
            const data = await res.json();
            if(data.success===false){
                dispatch(signOutUserFailure(data.message));
                return;
            }else {
                // Optionally, redirect the user to the login page or home page after signout
                window.location.href = '/signin';
              }
        } catch (error) {
            dispatch(signOutUserFailure(data.message));
        }
    }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center
      my-7'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col'>
        <input type="file" ref={fileRef} hidden accept='image/*'/>
        <img onClick={()=>fileRef.current.click()} src={currentUser.avatar} alt="profile"
        className='
        rounded-full h-24 w-24
        object-cover cursor-pointer self-center mt-2' />
        <input type="text" placeholder='username'
        defaultValue={currentUser.username}
         className='border p-3 rounded-lg'
         onChange={handleChange}
          id='username'/>
        <input type="email" placeholder='email'
        defaultValue={currentUser.email}
         className='border p-3 rounded-lg mt-2'
         onChange ={handleChange}
         id='email'/>
        <input type="password" placeholder='password' 
        className='border p-3 rounded-lg mt-2' 
        onChange={handleChange}
        id='password'
        autoComplete="current-password"/>

        <button type="submit" 
        disabled={loading}//Disable button when loading
        className='bg-slate-700 text-white rounded-lg
        p-3 uppercase hover:opacity-95 disabled:opacity-85 mt-2'>{loading ? 'Updating...' : 'Update'}</button>
        <Link className='bg-green-400 text-white p-3
        rounded-lg uppercase text-center hover:opacity-95 disabled:opacity-85 mt-2' to={"/createlisting"}>
            create listing
        </Link>

      </form>
      <div className='flex justify-between'>
        <span onClick={handleDeleteUser} className='text-red-700 cursor-pointer'>Delete account</span>
        <span onClick={handleSignOut} className='text-red-700 cursor-pointer'>signout</span>

      </div>
    </div>
  )
}
