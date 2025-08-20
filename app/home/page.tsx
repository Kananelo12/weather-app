import React from 'react'

const page = () => {
  return (
    <div className='mt-24'>
      <div className='hero-content text-center'>
        <h2 className='font-bold text-6xl bg-gradient-to-r from-[#B36CFF] to-[#FF8B52] bg-clip-text text-transparent'>Just Building a <br />Simple Weather App</h2>
        <p className="text-lg mt-8">
            Track temperature, wind, and sky conditions in one simple app.
          </p>

          <div className='hero-buttons w-full flex__center gap-6 font-semibold mt-7'>
            <a
              href="/weather"
              className="bg-accent-warning text-white rounded-full px-8 py-3 cursor-pointer"
            >
              View Weather
            </a>
            <a
              href="#"
              className="rounded-full ring ring-transparent px-8 py-3 cursor-pointer transition-shadow duration-200 ease-in-out hover:ring-black"
            >
              Click
            </a>
          </div>
      </div>
    </div>
  )
}

export default page