import React from 'react'

export default function Searchbar({searchbar,setSearchBar}) {
  return (
    <div className='w-full'>
        <input 
            className='border-2 rounded-lg border-gray-200 w-full px-2 py-1' 
            type='text' 
            placeholder='Please enter search bar'
            value={searchbar}
            onChange={e => setSearchBar(e.target.value)}
        >   
        </input>
    </div>
  )
}
