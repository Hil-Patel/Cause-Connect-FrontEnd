import React from "react";
import logo from "../assets/hill_logo-removebg-preview.png"
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#100C33] text-white py-10">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        
        <div>
          <img src={logo} alt="" className="w-24"/>
          <p className="mt-3 text-sm text-gray-300">
            Bridging the gap between NGOs and professionals to create meaningful change.
            Join us in making the world a better place.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">Quick Links</h2>
          <ul className="mt-3 space-y-2 text-gray-300">
            <li><a href="#" className="hover:text-blue-400">Home</a></li>
            <li><a href="#" className="hover:text-blue-400">About Us</a></li>
            <li><a href="#" className="hover:text-blue-400">Get Involved</a></li>
            <li><a href="#" className="hover:text-blue-400">Contact</a></li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold">Contact Us</h2>
          <p className="mt-3 text-sm text-gray-300">Email: support@causeconnect.org</p>
          <p className="mt-1 text-sm text-gray-300">Phone: +1 9725713039</p>
          <div className="mt-4 flex space-x-4">
            <a href="#" className="text-gray-300 hover:text-blue-400 text-lg"><FaFacebookF /></a>
            <a href="#" className="text-gray-300 hover:text-blue-400 text-lg"><FaTwitter /></a>
            <a href="#" className="text-gray-300 hover:text-blue-400 text-lg"><FaInstagram /></a>
            <a href="#" className="text-gray-300 hover:text-blue-400 text-lg"><FaLinkedinIn /></a>
          </div>
        </div>

      </div>

      <div className="mt-8 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} CauseConnect. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
