import React from 'react'
import { GoHomeFill } from "react-icons/go";
import { FiSearch } from "react-icons/fi";
import { RxVideo } from "react-icons/rx";
import { FiPlusSquare } from "react-icons/fi";
import dp from "../assets/dp.webp"
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ThemeToggle from './ThemeToggle';

function Nav() {
  const navigate=useNavigate()
  const {userData}=useSelector(state=>state.user)
  return (
    <div className='nav-container'>
      <div onClick={()=>navigate("/")}><GoHomeFill className='nav-icon'/></div>
      <div onClick={()=>navigate("/search")}><FiSearch className='nav-icon'/></div>
      <div onClick={()=>navigate("/upload")}><FiPlusSquare className='nav-icon'/></div>
      <div onClick={()=>navigate("/loops")}><RxVideo className='nav-icon nav-icon-lg'/></div>
      <ThemeToggle />
      <div className='profile-avatar' onClick={()=>navigate(`/profile/${userData.userName}`)}>
          <img src={userData.profileImage || dp} alt="Profile" className='w-full h-full object-cover'/>
      </div>
    </div>
  )
}

export default Nav
