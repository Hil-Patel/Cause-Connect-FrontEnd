import React from 'react'

export const Hero = () => {
    return (
        <>
            <div>
                <div className="relative flex flex-col items-center mx-auto lg:flex-row-reverse lg:max-w-5xl lg:mt-12 xl:max-w-6xl">
                    <div className="w-full h-64 lg:w-1/2 lg:h-auto">
                        <img className="h-full w-full object-cover" src="https://spartanburggives.org/wp-content/uploads/2023/04/25-Ways-to-Volunteer-in-Your-Community.jpg" alt="Winding mountain road" />
                    </div>
                    <div className="max-w-lg bg-white md:max-w-2xl  md:shadow-lg md:absolute md:top-0 md:mt-48 lg:w-3/5 lg:left-0 lg:mt-20 lg:ml-20 xl:mt-24 xl:ml-12 ">
                        <div className="flex flex-col p-12 md:px-16">
                            <h2 className="text-2xl font-medium uppercase text-blue-800 lg:text-4xl">CONNECTING CHANGE-MAKERS</h2>
                            <p className="mt-4">
                                Bridging the gap between NGOs and professionals to drive impactful change. Our platform empowers NGOs by simplifying event management, volunteer recruitment, and donation tracking while enabling professionals to discover, engage, and contribute effortlessly. Join us in building a more transparent, efficient, and connected world for social good.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
