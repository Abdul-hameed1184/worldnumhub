import { CircleChevronLeft } from 'lucide-react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
// import { FaChevronCircleLeft } from "react-icons/fa";

const ResetPassword = () => {
    const [email, setEmail] = useState('')
    const handleSubmit = async () => {
        console.log('email submitted:', email )
    }
  return (
     <div className="min-h-screen flex items-center justify-center bg-[#fafafa] px-4 ">
      <div className="bg-white p-8 rounded-md shadow-md w-full max-w-md">
        <Link to='/' >
        <CircleChevronLeft size={35}  className='text-orange-300 mb-5'/>
        </Link>
        

        <form className="space-y-5">
          <div>
            <label className="block text-3xl font-bold text-gray-800 mb-5">
              Reset Your Password
            </label>
            <input
              type="email"
              placeholder="Enter your Email"
              value={email}
              onChange={(e)=> setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-none"
            />
          </div>
          <div className="mx-15">
             <button
            type="submit"
            onClick={handleSubmit}
            className="w-full border-[#E3A549] border-1 text-orange-400  py-2 rounded-md text-sm  hover:bg-[#E3A549] hover:text-white transition-color font-bold"
          >
            RESET
          </button>
          </div>

         
        </form>

      </div>
    </div>
  )
}

export default ResetPassword
