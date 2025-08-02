import React from 'react'
import { Link } from 'react-router-dom'
import { MdExitToApp } from "react-icons/md";
const BackToMenu = () => {
  return (
    <Link className="ml-auto mr-4 mt-4 group duration-[400ms] flex gap-2 items-center p-2 px-4 rounded-lg hover:bg-gray-400 transition-colors w-fit border-1 border-b-2 border-gray-600" to={'/'}>
        <div className='flex gap-2 items-center'>
            <MdExitToApp size={24} className='group-hover:text-white transition-colors duration-[400ms]' />
            <h3 className='text-[24px] group-hover:text-white transition-colors duration-[400ms]'>Back to menu</h3>
        </div>
    </Link>
  )
}

export default BackToMenu