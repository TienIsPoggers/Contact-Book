import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { apiGetContactAvatarByID } from '../script/api.js';
import ImageComponent from './ImageComponent.jsx';
export default function Contact({contact,hidden = false}) {
    const [imageURL,setImageURL] = useState('');

    const handleGetAvatar = async () => {
        const imageData = await apiGetContactAvatarByID(contact._id);
        if(imageData) {
            setImageURL(imageData.image)
        }
    }
    useEffect(() => {
        handleGetAvatar();
        // (async () => {
        //     if(!contact.image) return
        //     try{
        //         const res = await fetch(`http://localhost:5001/api/image/${contact._id}`);
        //         if(!res.ok)  throw new Error("Failed to load image");
        //         const data = await res.json();
        //         setImageURL(data.image);
        //     }catch(err){
        //         console.error(err);
        //     }
        // })()
    },[])
    return (
        <Link className={`w-fit ${hidden ? "hidden" : ""}`} to={`/contact/${contact._id}`}>
            <div className='flex gap-4 bg-white shadow-2xl w-fit p-4 rounded-2xl hover:translate-y-[-5px] hover:scale-[105%] transition-all duration-[600ms] w-fit'>
                <div className='rounded-2xl overflow-hidden'>
                    <ImageComponent width={120} height={120} src={ imageURL != '' ? imageURL : ''} />
                </div>
                
                <div className='pr-4'>
                {contact.name && <h2 className='font-bold text-xl pointer-events-none'>{ contact?.name }</h2>}
                {contact.phoneNumber && <p className='text-lg text-gray-600 pointer-events-none'>Phonenumber: { contact?.phoneNumber }</p>}
                {contact.email && <p className='text-md text-gray-600 pointer-events-none'>Email: { contact?.email }</p>}
                {contact.note && <p className='text-md text-gray-600 pointer-events-none'>{ contact?.note }</p>}
                </div>
            </div>
        </Link>
    )
}
