
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Home } from '../pages/Home/Home'
import LoginVolunteer from '../pages/LoginVolunteer/LoginVolunteer'
import { SignUpVolunteer } from '../pages/SignUpVolunteer/SignUpVolunteer'
import LoginNGO from '../pages/LoginNGO/LoginNGO'
import SignUpNGO from '../pages/SignUpNGO/SignUpNGO'
import NGODashboard from '../pages/NGO/Dashboard/NGODashboard'
import VolunteerDashboard from '../pages/Volunteer/Dashboard/VolunteerDashboard'
import NgoProtectedRoutes from './NgoProtectedRoutes'
import { Navbar } from '../components/Navbar'
import Footer from '../components/Footer'
import { useEffect, useState } from 'react'
import AdminProtectedRoutes from './AdminProtectedRoutes'
import { useSelector } from 'react-redux'
import VolunteerProtectedRoutes from './VolunteerProtectedRoutes'

export const AppRoutes = () => {
  const IsLoggedin = useSelector((state)=>state.loggedIn.IsLoggedin);
  const userType= useSelector((state)=>state.loggedIn.UserType);

  const [changeThis,setChangeThis]=useState(false)

  useEffect(()=>{
    // console.log(IsLoggedin);
    // console.log(userType);
    
    if(!IsLoggedin){
      localStorage.setItem("IsLoggedin","false")
      setChangeThis(!changeThis)
    }
    // else{
    //   setIsLoggedIn(localStorage.getItem("loggedIn"))
    //   setUserType(localStorage.getItem("UserType"))

    // }
    
  })

  return (
    <BrowserRouter>
      <Navbar isLoggedIn={IsLoggedin} userType={userType}/>
      <Routes>

        {/* unauthorized route */}
        {IsLoggedin == "false" && (
          <>
            <Route path="/" element={<Home />} />
            <Route path='/Login-Volunteer' element={<LoginVolunteer />} />
            <Route path='/SignUp-Volunteer' element={<SignUpVolunteer />} />
            <Route path='/Login-NGO' element={<LoginNGO />} />
            <Route path='/SignUp-NGO' element={<SignUpNGO />} />
          </>
        )}


        
        {/* authorized route */}
        {userType == "NGO" ? (
          <Route element={<NgoProtectedRoutes />}>
            <Route path='/Login-Volunteer' element={<Navigate to="/" />} />
            <Route path='/SignUp-Volunteer' element={<Navigate to="/" />} />
            <Route path='/Login-NGO' element={<Navigate to="/" />} />
            <Route path='/SignUp-NGO' element={<Navigate to="/" />} />
            <Route path="/" element={<Navigate to="/NGO/dashboard" />} />


            <Route path='/NGO' >
              <Route path='dashboard' element={<NGODashboard />} />
            </Route>
          </Route>
        ) :
          userType == "VOLUNTEER" ?(
            <Route element={<VolunteerProtectedRoutes />}>
              <Route path='/Login-Volunteer' element={<Navigate to="/" />} />
              <Route path='/SignUp-Volunteer' element={<Navigate to="/" />} />
              <Route path='/Login-NGO' element={<Navigate to="/" />} />
              <Route path='/SignUp-NGO' element={<Navigate to="/" />} />
              <Route path="/" element={<Navigate to="/Volunteer/dashboard" />} />
  
              <Route path='/Volunteer'>
                <Route path='dashboard' element={<VolunteerDashboard />} />
              </Route>
  
            </Route>
          ):
          userType == "ADMIN" ?(
            <Route element={<AdminProtectedRoutes />}>
              <Route path='/Login-Volunteer' element={<Navigate to="/" />} />
              <Route path='/SignUp-Volunteer' element={<Navigate to="/" />} />
              <Route path='/Login-NGO' element={<Navigate to="/" />} />
              <Route path='/SignUp-NGO' element={<Navigate to="/" />} />
              <Route path="/" element={<Navigate to="/Admin/dashboard" />} />
  
              <Route path='/Admin'>
                <Route path='dashboard' element={<VolunteerDashboard />} />
              </Route>
  
            </Route>
          ):<Route path='*' element={<Navigate to={"/"}/>}/>
        }

        <Route path='*' element={<Navigate to={"/"}/>}/>

      </Routes>

      <Footer />
    </BrowserRouter>
  )
}
