
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from '../pages/Home/Home'
import LoginVolunteer from '../pages/LoginVolunteer/LoginVolunteer'
import { SignUpVolunteer } from '../pages/SignUpVolunteer/SignUpVolunteer'
import LoginNGO from '../pages/LoginNGO/LoginNGO'
import SignUpNGO from '../pages/SignUpNGO/SignUpNGO'
import NGODashboard from '../pages/NGO/Dashboard/NGODashboard'
import VolunteerDashboard from '../pages/Volunteer/Dashboard/VolunteerDashboard'

export const AppRoutes = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route  path="/" element={<Home/>}/>
            <Route path='/Login-Volunteer' element={<LoginVolunteer/>}/>
            <Route path='/SignUp-Volunteer' element={<SignUpVolunteer/>}/>
            <Route path='/Login-NGO' element={<LoginNGO/>}/>
            <Route path='/SignUp-NGO' element={<SignUpNGO/>}/>
            <Route path='/NGO' >
              <Route path='dashboard' element={<NGODashboard/>}/>
            </Route>
            <Route path='/Volunteer'>
              <Route path='dashboard' element={<VolunteerDashboard/>}/>
            </Route>
            
        </Routes>
    </BrowserRouter>
  )
}
