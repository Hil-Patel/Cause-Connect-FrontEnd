import React, { useState } from 'react'
import { Navbar } from '../../components/Navbar'
import Footer from '../../components/Footer'
import SignUpNGOForm1 from './component/SignUpNGOForm1'
import SignUpNGOForm2 from './component/SignUpNGOForm2'

const SignUpNGO = () => {
    const [formOneSubmitted, setFormOneSubmitted] = useState(false)
    return (
        <div>
            <Navbar />
            {formOneSubmitted ?  <SignUpNGOForm2 setFormOneSubmitted={setFormOneSubmitted} />: <SignUpNGOForm1 setFormOneSubmitted={setFormOneSubmitted} />
        }
            
            <Footer />
        </div>
    )
}

export default SignUpNGO