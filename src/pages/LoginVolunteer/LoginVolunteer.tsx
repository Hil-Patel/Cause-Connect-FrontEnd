import { useSelector } from "react-redux";
import Footer from "../../components/Footer"
import { Navbar } from "../../components/Navbar"
import { LoginForm } from "./components/LoginForm"
import { useEffect } from "react";
import { RootState } from "@reduxjs/toolkit/query";


const LoginVolunteer = () => {
  const loading = useSelector((state: RootState) => state.loading.isLoading);

  useEffect(() => {
    if (loading) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [loading]);
  return (
    <div >
      
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-[9999]">
          <span className="loader"></span>
        </div>
      )}
      <LoginForm/>
    </div>
  )
}

export default LoginVolunteer