import Footer from "../../components/Footer"
import { Navbar } from "../../components/Navbar"
import { LoginForm } from "./components/LoginForm"


const LoginVolunteer = () => {
  return (
    <div className="h-screen">
      <Navbar/>
      <LoginForm/>
      <Footer/>
    </div>
  )
}

export default LoginVolunteer