import { LibraryBig, User } from 'lucide-react';
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from "../../assets/GZLogo.png";
import { ToastContainer, toast } from 'react-toastify';

const Sidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () =>{
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        toast.success("Successfully logged out", {
            position: "top-right",
            autoClose:true
          });
          navigate("/login")
    }
    return (
        <div className='w-56 h-full bg-white border-r border-gray-400 p-4'>
             <ToastContainer position="top-right" autoClose={1000} />
            <div className='w-full flex flex-col justify-center items-center gap-2'>
                <img src={logo} className='w-12 h-12' />
                <h1 className='text-black font-bold text-center text-xl tracking-wide'>Ground Zero</h1>
            </div>
            <div className='w-full h-full mt-8 relative'>
                <ul className='w-full flex flex-col justify-start items-center gap-4'>
                    <NavItem to="/" icon={<User size={20} />} label="User" currentPath={location.pathname} />
                    <NavItem to="/booth" icon={<LibraryBig size={20} />} label="Booths" currentPath={location.pathname} />
                </ul>
                <button className='w-full absolute bottom-60 left-0 p-2 rounded-md border border-gray-600 text-black hover:bg-blue-700 hover:text-white' onClick={handleLogout}>
                    Logout
                </button>
            </div>

        </div>
    )
}

const NavItem = ({ to, icon, label, currentPath }) => {
    const isActive = to === currentPath;

    return (
        <li className={`w-full p-2 rounded-md ${isActive ? 'bg-blue-600 text-white' : 'bg-white text-black hover:bg-blue-700 hover:text-white'}`}>
            <Link to={to} className='flex flex-row justify-center items-center gap-2'>
                {icon}
                {label}
            </Link>
        </li>
    );
};

export default Sidebar
