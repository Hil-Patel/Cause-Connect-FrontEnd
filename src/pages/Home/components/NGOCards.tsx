import React from 'react'

export const NGOCards = () => {
    const ngos = [
        {
          id: 1,
          name: "Helping Hands",
          city: "Mumbai",
          members: 120,
          profilePhoto: "https://childhope.org.ph/wp-content/uploads/2022/11/childhope-ngo-philippines-volunteers.jpg",
          aim: "Providing education for underprivileged children.",
        },
        {
          id: 2,
          name: "Green Earth Initiative",
          city: "Delhi",
          members: 85,
          profilePhoto: "https://th.bing.com/th/id/OIP.D7spWWMr2Gh2JzBiSD2BiQHaEK?w=1280&h=719&rs=1&pid=ImgDetMain",
          aim: "Promoting environmental sustainability.",
        },
        {
          id: 3,
          name: "Health for All",
          city: "Ahemdabad",
          members: 200,
          profilePhoto: "https://philippinesgraphic.com.ph/wp-content/uploads/2020/09/PCSO-Photo.jpg",
          aim: "Ensuring healthcare access for everyone.",
        },{
            id: 4,
            name: "Animal Welfare Society",
            city: "Chennai",
            members: 75,
            profilePhoto: "https://th.bing.com/th?id=OIP.hwV1hQmbsiCTwKcle7DokAHaF8&w=278&h=224&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2",
            aim: "Rescuing and sheltering stray animals.",
          },
          {
            id: 5,
            name: "Empower Women",
            city: "Kolkata",
            members: 150,
            profilePhoto: "https://th.bing.com/th?id=OIP.9Af-Fvf7oqFbvFPDqyMPIAHaE8&w=306&h=204&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2",
            aim: "Empowering women through education and skill training.",
          },
          {
            id: 6,
            name: "Food for All",
            city: "Jaipur",
            members: 300,
            profilePhoto: "https://s3.scoopwhoop.com/anj/ygudsk/e6cb0cc9-0c93-4390-b83c-30224c2c140c.jpg",
            aim: "Fighting hunger by distributing meals to the needy.",
          },
      ];
  return (
    <div className="bg-gray-100 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">
          Top NGOs Making an Impact
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {ngos.map((ngo) => (
            <div
              key={ngo.id}
              className="bg-white rounded-lg shadow-md p-6 transition-transform transform hover:scale-105"
            >
              <img
                src={ngo.profilePhoto}
                alt={ngo.name}
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-gray-800 text-center">{ngo.name}</h3>
              <p className="text-gray-600 text-center text-sm">{ngo.city}</p>
              <p className="mt-2 text-gray-700 text-sm">{ngo.aim}</p>
              <p className="mt-2 text-gray-500 text-sm">
                <strong>Members:</strong> {ngo.members}
              </p>
              <div className="mt-4 flex justify-center">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                  View More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
