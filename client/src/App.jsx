import React from 'react'
import { BrowserRouter, Routes,Route} from 'react-router-dom'
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Header from './components/Header';
import About from './pages/About';
import Signin from './pages/Signin';
import Profile from './pages/Profile';
import PrivateRoute from './components/PrivateRoute';
import Createlisting from './pages/Createlisting';

export default function App() {
  return (
   <BrowserRouter  future={{
    v7_startTransition: true,
    v7_relativeSplatPath: true,
  }}>
   <Header/>
   <Routes>
    <Route path="/"element={<Home/>}/>
    <Route path="/signin"element={<Signin/>}/>
    <Route path="/signup"element={<SignUp/>}/>
    <Route path="/about"element={<About/>}/>
    <Route element={<PrivateRoute/>}>
      <Route path="/profile"element={<Profile/>}/>
      <Route path="/createlisting"element={<Createlisting/>}/>
    </Route>

   </Routes>
   </BrowserRouter>
  )
}
