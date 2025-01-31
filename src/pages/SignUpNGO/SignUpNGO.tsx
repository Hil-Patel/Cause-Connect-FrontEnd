import React, { useEffect, useState } from 'react'
import SignUpNGOForm1 from './component/SignUpNGOForm1'
import SignUpNGOForm2 from './component/SignUpNGOForm2'
import { useSelector } from 'react-redux'
import { RootState } from '@reduxjs/toolkit/query'

const SignUpNGO = () => {
    const [formOneSubmitted, setFormOneSubmitted] = useState(false)
    const loading = useSelector((state: RootState) => state.loading.isLoading);

    useEffect(() => {
        if (loading) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
    }, [loading]);
    return (
        <div>
            {loading && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-[9999]">
                    <span className="loader"></span>
                </div>
            )}
            {formOneSubmitted ? <SignUpNGOForm2 setFormOneSubmitted={setFormOneSubmitted} /> : <SignUpNGOForm1 setFormOneSubmitted={setFormOneSubmitted} />
            }

        </div>
    )
}

export default SignUpNGO