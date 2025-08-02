import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className='shadow-lg'>
        <div className='container mx-auto px-4'>
            <div className='flex justify-between items-center h-[80px]'>
                <h1 className='text-3xl font-bold'>Contact Book</h1>
                <ul className='flex gap-4'>
                    <Link to={"/"}><li className='text-lg'>Home</li></Link>
                    <Link to={"/create"}><li className='text-lg'>Create</li></Link>
                </ul>
            </div>
        </div>
    </nav>
  )
}

export default Navbar