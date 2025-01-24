import React from "react";
import volunteerImage from "../../../assets/Volunteer_landing.svg"; 
import ngoImage from "../../../assets/NGO_landing.svg"; 
import { useNavigate } from "react-router-dom";

const OptionsSection = () => {
    const navigate=useNavigate();

    const handleVolunteerLogin=()=>{
        navigate('/Login-Volunteer')
    }

    const handleNGOLogin=()=>{
      navigate('/Login-NGO')
    }

  return (
    <section id="loginoption" className="flex flex-col md:flex-row justify-center items-center gap-10 p-12">
      
      <div className="bg-[#F5F5F5] shadow-sm shadow-[#53599A] rounded-2xl m-12 px-8 py-4 text-center w-96 lg:w-[30%] h-auto">

        <h2 className="text-2xl font-bold">Volunteer</h2>
        <img src={volunteerImage} alt="Volunteer" className="mx-auto w-60" />
        <p className="text-gray-800 mt-4 text-lg font-bold">
          Be the Change You Seek 
        </p>
        <p className="text-gray-800 text-lg font-bold">
        Start Your Journey Here.
        </p>
        <button onClick={()=>handleVolunteerLogin()} className="mt-6 bg-[#08C2FF] text-white font-semibold mb-12 px-8 py-3 rounded-full text-md shadow-lg hover:bg-[#07AADC] transition">
          Get Start
        </button>
      </div>

      <div className="bg-[#F5F5F5] shadow-sm shadow-[#53599A] rounded-2xl m-12 px-8 py-4 text-center w-96 lg:w-[30%] h-auto">
        <h2 className="text-2xl font-bold">NGO</h2>
        <img src={ngoImage} alt="NGO" className="mx-auto w-60" />
        <p className="text-gray-800 mt-4 text-lg font-bold">
          Building a Better World,
        </p>
        <p className="text-gray-800 text-lg font-bold">
        One Cause at a Time.
        </p>
        <button onClick={()=>{handleNGOLogin()}} className="mt-6 bg-[#9ABAE3] text-black font-semibold mb-12 px-8 py-3 rounded-full text-md shadow-lg hover:bg-[#7A9AD1] transition">
          Get Start
        </button>
      </div>
    </section>
  );
};

export default OptionsSection;
