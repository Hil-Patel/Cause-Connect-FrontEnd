import React from 'react'

export const Navbar = () => {
    const toggleDisplay=()=>{
          document.getElementById('mobile-menu')?.classList.toggle('hidden');
            
    }
  return (
    <nav className="bg-blue-200 shadow-md sticky top-0 z-50">

    <div className="px-4">
      <div className="flex justify-between items-center py-4">
        <a href="#" className="text-black text-2xl font-bold px-2 py-1 rounded hover:text-blue-400 hover:bg-white">
          CauseConnect
        </a>

        <div className="lg:hidden" onClick={toggleDisplay}>
          <button id="menu-btn" className="text-black focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>

        <ul id="menu" className="hidden lg:flex space-x-6">
          <li><a href="#" className="text-black hover:text-blue-500 hover:bg-white px-2 py-1 rounded">Home</a></li>
          <li><a href="#" className="text-black hover:text-blue-500 hover:bg-white px-2 py-1 rounded">About</a></li>
          <li><a href="#" className="text-black hover:text-blue-500 hover:bg-white px-2 py-1 rounded">Sign In</a></li>
          <li><a href="#" className="text-black hover:text-blue-500 hover:bg-white px-2 py-1 rounded">Sign Up</a></li>
        </ul>
      </div>

      <ul id="mobile-menu" className="hidden flex flex-col space-y-2 lg:hidden bg-blue-100 px-4 py-2">
        <li><a href="#" className="text-black hover:text-blue-500 hover:bg-white px-2 py-1 rounded">Home</a></li>
        <li><a href="#" className="text-black hover:text-blue-500 hover:bg-white px-2 py-1 rounded">About</a></li>
        <li><a href="#" className="text-black hover:text-blue-500 hover:bg-white px-2 py-1 rounded">Sign In</a></li>
        <li><a href="#" className="text-black hover:text-blue-500 hover:bg-white px-2 py-1 rounded">Sign Up</a></li>
      </ul>
    </div>
  </nav>

  )
}
