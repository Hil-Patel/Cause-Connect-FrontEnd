import React from 'react';
import logo from "../assets/hill_logo-removebg-preview.png";

export const Navbar = () => {
    const toggleDisplay = () => {
        document.getElementById('mobile-menu')?.classList.toggle('hidden');
    };

    return (
        <nav className="bg-white border-b sticky top-0 z-50">
            <div className=" px-6">
                <div className="flex justify-between items-center py-2">
                    
                    {/* Logo on Left */}
                    <a href="#" className="flex gap-2 items-center text-black text-2xl font-bold">
                        <img className='w-14' src={logo} alt="CauseConnect Logo" />
                        <span className='text-[#001886] text-md font-semibold'>CauseConnect</span>
                    </a>

                    {/* Centered Menu Items */}
                    <ul id="menu" className="hidden lg:flex space-x-8 absolute left-1/2 transform -translate-x-1/2">
                        <li><a href="http://localhost:5173/" className="text-black hover:text-blue-500">Home</a></li>
                        <li><a href="http://localhost:5173/" className="text-black hover:text-blue-500">About</a></li>
                    </ul>

                    {/* Right Side: Login Button */}
                    <div className="hidden lg:block flex justify-center items-center">
                        <a href="#" className="text-white px-6 py-3 rounded-full bg-blue-500 hover:bg-blue-400">Login</a>
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
                <ul id="mobile-menu" className="hidden flex flex-col space-y-2 lg:hidden bg-blue-100 px-4 py-2">
                    <li><a href="#" className="text-black hover:text-blue-500">Home</a></li>
                    <li><a href="#" className="text-black hover:text-blue-500">About</a></li>
                    <li><a href="#" className="text-black hover:text-blue-500">Sign In</a></li>
                    <li><a href="#" className="text-black hover:text-blue-500">Sign Up</a></li>
                </ul>
            </div>
        </nav>
    );
};
