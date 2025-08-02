import React, { useCallback, useEffect, useState } from 'react'
import { apiGetAllContact } from '../script/api.js';
import toast from 'react-hot-toast';
import Contact from '../Component/contact.jsx';
import Searchbar from '../Component/Searchbar.jsx';
export default function HomePage() {
    const [searchbar,setSearchBar] = useState('');
    const [error,setError] = useState(null);
    const [loading,setLoading] = useState(true);
    const [contacts,setContacts] = useState([]);
    const fetchContacts = useCallback( async () => {
        
        setLoading(true);
        // 1. Gọi api GET
        const { data, error } = await apiGetAllContact();

        // 2. Xử lý kết quả cuối cùng
        if(error) {
            setError(error);
            toast.error(error?.message || "Failed to get all file")

        } else {
            setContacts(data || []);
        }
        // 3. Chuyển Loading State Sau khi xong
        setLoading(false);
    },[])
    const hasResults = contacts.some(item =>
        item.name?.toLowerCase().includes(searchbar.toLowerCase())
    );
    // Fetch toàn bộ Contacts
    useEffect(() => {
        fetchContacts();
    },[fetchContacts])
    
    if(loading){return <div className='container mx-auto'><h2 className='text-center font-bold text-3xl mt-8'>Loading...</h2></div>}
    if(error){return <div className='container mx-auto'><h2 className='text-center font-bold text-3xl mt-8'>Failed to load data...</h2></div>}
    return (
        <div className='container mx-auto mt-8'>
            <div className='flex gap-8'>
                <div className='m-auto w-[450px]'>
                    <Searchbar 
                        searchbar={searchbar} 
                        setSearchBar={setSearchBar}
                    />
                    <div className='flex flex-1 flex-col items-center gap-4 mt-8'>
                        { contacts.length > 0 && 
                            contacts.map((item) => (
                                <Contact 
                                    key={item._id} 
                                    contact={item} 
                                    hidden={searchbar ? item.name.indexOf(searchbar) === -1 : false}
                                />
                            ))
                        }
                        {contacts.length === 0 && (
                        <p className="text-center font-bold text-2xl text-gray-500">
                            No contacts available
                        </p>
                        )}
                        {contacts.length > 0 && !hasResults && (
                        <p className="text-center font-bold text-2xl text-gray-500">
                            No search results
                        </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
