import React from 'react';
import logo from '../../assets/NavLogoMain.png';
import { AiOutlineUser } from 'react-icons/ai';
import { HiOutlineShoppingBag } from 'react-icons/hi2';
import { GoHeart } from 'react-icons/go';
import { Link } from 'react-router-dom';
import Navitems from './Navitems';
import { NavData } from './data';
import { GoSignOut } from "react-icons/go";
import { useDispatch, useSelector } from 'react-redux';
import {logout} from './../../redux/userSlice'
function Navbar() {
 const name = localStorage.getItem('name')
 const dispatch = useDispatch()
 const {totalQuantity} = useSelector((state)=>state.cart)
 const handleLogOut = () => {
  dispatch(logout())
 }
  return (
    <header className="p-4 sticky top-0 z-50  bg-white border border-gray-200">
      <div>
        {/* //firstrow */}
        <div className="flex justify-between items-center p-2 mb-6">
          <div className="flex items-center space-x-2">
            <img src={logo} className="h-16 w-16 rounded-full object-contain" />
            <p className="text-xl tracking-wide font-semibold">WebifyMart</p>
          </div>

          <div className="w-96">
            <input
              className="w-full p-2 font-normal bg-white border border-gray-500 rounded-none"
              type="text"
              placeholder="Search"
            />
          </div>

          <div className="flex items-center space-x-10">

              <Link to="/profile">
              <AiOutlineUser />
              <span className="text-xs font-medium hover:underline transition-all duration-200">
               {name ? name : 'User'}
              </span>
            </Link>
           
            <Link to="/cart" className='relative'>
              <HiOutlineShoppingBag />
              <span className="text-xs font-medium hover:underline transition-all duration-200">
                Cart 
              </span>
{totalQuantity > 0 ? <span className='h-4 w-4 flex top-[-11px] right-[2px] items-center text-[9px] p-1 rounded-full justify-center bg-lime-500 absolute'>{totalQuantity}</span> : null }
 
             </Link>
            
           

             <Link onClick={handleLogOut}>
           <GoSignOut />
              <span className="text-xs font-medium hover:underline transition-all duration-200">
               Log-Out
              </span>
            </Link>
          </div>
        </div>

        {/* second */}
        <div>
          <div className="flex justify-center items-center">
            <ul className="flex space-x-10">
              {NavData.map((items) => (
                <Navitems to={items.url} text={items.text} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
