import React from 'react';
import logo from "../assets/hill_logo-removebg-preview.png";
import { Link, useNavigate } from 'react-router-dom';
import { HashLink } from "react-router-hash-link";
import { useDispatch } from 'react-redux';
import { setLoggedOut } from '../features/LoginDetailsSlice';
import { NavLink } from 'react-router-dom';

export const Navbar = ({ isLoggedIn, userType }) => {
    const navigate=useNavigate();
    const dispatch=useDispatch()
    const toggleDisplay = () => {
        document.getElementById('mobile-menu')?.classList.toggle('hidden');
    };

    const handleLogOut=()=>{
        dispatch(setLoggedOut("false"))
                
                setTimeout(()=>{
                    console.log(localStorage.getItem("loggedIn"));
                    navigate("/")

                },1000)
    }

    return (
        <nav className="bg-white border-b sticky top-0 z-[1000]">
            <div className=" px-6">
                <div className="flex justify-between items-center py-2">

                    {/* Logo on Left */}
                    <a href="#" className="flex gap-2 items-center text-black text-2xl font-bold">
                        <img className='w-14' src={logo} alt="CauseConnect Logo" />
                        <span className='text-[#001886] text-md font-semibold'>CauseConnect</span>
                    </a>

                    {/* Centered Menu Items */}
                    <ul id="menu" className="hidden lg:flex space-x-8 absolute left-1/2 transform -translate-x-1/2">
                    {isLoggedIn == "false" ? <>
                            <li >
                                <HashLink
                                    to="/"
                                    smooth
                                    className="text-black hover:text-blue-500"
                                >
                                    Home
                                </HashLink>
                            </li>
                            <li>
                                <HashLink
                                    to="/#footer"
                                    smooth
                                    className="text-black hover:text-blue-500"
                                >
                                    About
                                </HashLink>
                            </li>
                        </> : userType == "VOLUNTEER" ?
                            <>
                                <li>
                                    <NavLink
                                        to="/Volunteer/dashboard"
                                        className="text-black hover:text-blue-500"
                                    >
                                        Dashboard
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/#footer"
                                        className="text-black hover:text-blue-500"
                                    >
                                        Events
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/#footer"
                                        className="text-black hover:text-blue-500"
                                    >
                                        NGOs
                                    </NavLink>
                                </li>
                            </> : userType == "NGO" ?
                                <>
                                    <li>
                                        <NavLink
                                            to="/NGO/dashboard"
                                            className="text-black hover:text-blue-500"
                                        >
                                            Dashboard
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/#footer"
                                            className="text-black hover:text-blue-500"
                                        >
                                            Upcoming Events
                                        </NavLink>
                                    </li>
                                </>
                                :
                                userType == "ADMIN" ?
                                    <>
                                        <li>
                                            <NavLink
                                                to="/Admin/ApprovedNGO"
                                                className="text-black hover:text-blue-500"
                                            >
                                                Approved NGOs
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink
                                                to="/Admin/UnApprovedNGO"
                                                className="text-black hover:text-blue-500"
                                            >
                                                Unapproved NGOs
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink
                                                to="/Admin/VolunteerList"
                                                className="text-black hover:text-blue-500"
                                            >
                                                Volunteers
                                            </NavLink>
                                        </li>
                                    </>
                                    : null
                        }


                    </ul>

                    <div className="hidden lg:block flex justify-center items-center">
                        {isLoggedIn=="true"?
                        <button
                        onClick={()=>handleLogOut()}
                        className="text-white px-6 py-3 rounded-full bg-blue-500 hover:bg-blue-400"
                    >
                        Log Out
                    </button>
                        :
                        
                        <HashLink
                            to="/#loginoption"
                            smooth
                            className="text-white px-6 py-3 rounded-full bg-blue-500 hover:bg-blue-400"
                        >
                            Login
                        </HashLink>
                        }
                    </div>
                    {/* Mobile Menu Button */}
                    <div className="lg:hidden" onClick={toggleDisplay}>
                        <button id="menu-btn" className="text-black focus:outline-none">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Dropdown Menu */}
                <ul id="mobile-menu" className="hidden flex flex-col space-y-2 lg:hidden  px-4 py-2">
                {isLoggedIn == "false" ? <>
                            <li >
                                <HashLink
                                    to="/"
                                    smooth
                                    className="text-black hover:text-blue-500"
                                >
                                    Home
                                </HashLink>
                            </li>
                            <li>
                                <HashLink
                                    to="/#footer"
                                    smooth
                                    className="text-black hover:text-blue-500"
                                >
                                    About
                                </HashLink>
                            </li>
                        </> : userType == "VOLUNTEER" ?
                            <>
                                <li>
                                    <NavLink
                                        to="/Volunteer/dashboard"
                                        className="text-black hover:text-blue-500"
                                    >
                                        Dashboard
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/#footer"
                                        className="text-black hover:text-blue-500"
                                    >
                                        Events
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/#footer"
                                        className="text-black hover:text-blue-500"
                                    >
                                        NGOs
                                    </NavLink>
                                </li>
                            </> : userType == "NGO" ?
                                <>
                                    <li>
                                        <NavLink
                                            to="/NGO/dashboard"
                                            className="text-black hover:text-blue-500"
                                        >
                                            Dashboard
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/#footer"
                                            className="text-black hover:text-blue-500"
                                        >
                                            Upcoming Events
                                        </NavLink>
                                    </li>
                                </>
                                :
                                userType == "ADMIN" ?
                                    <>
                                        <li>
                                            <NavLink
                                                to="/Admin/ApprovedNGO"
                                                className="text-black hover:text-blue-500"
                                            >
                                                Approved NGOs
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink
                                                to="/Admin/UnApprovedNGO"
                                                className="text-black hover:text-blue-500"
                                                
                                            >
                                                Unapproved NGOs
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink
                                                to="/Admin/VolunteerList"
                                                className="text-black hover:text-blue-500"
                                                
                                            >
                                                Volunteers
                                            </NavLink>
                                        </li>
                                    </>
                                    : null
                        }
                </ul>
            </div>
        </nav>
    );
};
