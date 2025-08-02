import React, { useEffect, useState } from 'react'
import BackToMenu from '../Component/BackToMenu.jsx'
import ImageComponent from '../Component/ImageComponent.jsx';
import toast from 'react-hot-toast'
import { apiCreateNewContact } from '../script/api.js';
import { useNavigate } from 'react-router-dom';
const CreatePage = () => {
  // Các dữ liệu về useState
  const [loading,setLoading] = useState(false);
  const [preview,setPreview] = useState('');
  const [image,setImage] = useState(null);
  const [name,setName] = useState('Tien');
  const [phoneNumber,setPhoneNumber] = useState('0768-222-455');
  const [email,setEmail] = useState('test@gmail.com ');
  const [address,setAddress] = useState('Vietnam');
  const [note,setNote] = useState('');
  
  // Các dữ liệu về navigate
  const navigate = useNavigate();

  const validateForm = () => {
    // 1. Kiểm tra xem tất cả đã được fill chưa
    if(!name.trim() || !phoneNumber.trim() || !email.trim() || !address.trim()){
      toast.error("Please fill all fields");
      return false;
    }

    // 2. Kiểm tra xem phoneNumber có đúng format không
    if (!/^[0-9]{4}-[0-9]{3}-[0-9]{3}$/.test(phoneNumber)) {
      toast.error("Phone number must be in format XXXX-XXX-XXX");
      return false;
    }

    return true;
  }
  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  }
  const handleSubmitForm  = async (e) => {
    // Tránh việc thay đổi URL
    e.preventDefault();
    
    // 1. Kiểm tra xem có đang tạo contact không
    if(loading) return;

    // 2. Kiểm tra xem data có validate không
    if(!validateForm()) return

    // 3. Set Loading để bắt đầu việc tạo contact
    setLoading(true);

    try{

      // 4. Tạo FormData
      const formData = new FormData();
      formData.append('phoneNumber',phoneNumber.trim())
      formData.append('email',email.trim())
      formData.append('address',address.trim())
      formData.append('name',name.trim())
      formData.append('note',note.trim())
      // 5. Thêm image vào FormData
      if(image) formData.append('image',image );
      
      // 6. Gọi api POST
      const success = await apiCreateNewContact(formData)

      // 7. Xử lý kết quả cuối cùng
      if(success) {
        toast.success("Success to create new contact");
        // resetForm();
        navigate('/');
      } else {
        toast.error("Failed to create contact");
      }

    }catch(error) {
      toast.error("Error creating contact");
      console.error(error);
    }finally {
      setLoading(false);
    }
  }
  
  const resetForm = () => {
    setName("");
    setPhoneNumber("");
    setEmail("");
    setAddress("");
    setNote("");
    setImage(null);
    setPreview("");
  };

  useEffect(() => {
    if(!image){
      setPreview('');
      return;
    }
    const objectUrl = URL.createObjectURL(image);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  },[image])
  return (
    <>
      <BackToMenu />
      <div className='container mx-auto px-4 mt-4'>
        <div className='flex flex-col gap-4'>
          <h2 className='text-3xl font-bold text-center mr-auto ml-2'>Create Contact Page</h2>
          <form onSubmit={handleSubmitForm }>
            <div className='max-w-[600px] p-4 bg-gray-100 rounded-xl'>
              <div className='flex flex-col gap-4 min-h-[600px]'>
                <div className='flex flex-col gap-2'>
                  {preview && 
                    <div className='overflow-hidden rounded-full w-fit'>
                        {
                          <ImageComponent 
                            width={80} 
                            height={80} 
                            src={preview} 
                            />
                        }
                    </div>
                  }
                  <input className='border-1 rounded-lg px-2 w-fit bg-white' type='file' id='image' onChange={handleFileChange}></input>
                </div>
                <div className='flex flex-col gap-2'>
                  <label htmlFor='name' className='font-bold text-md'>Name: </label>
                  <input className='border-1 rounded-lg p-2 bg-white' type='text' id='name' placeholder='Please fill name' value={name} onChange={e => setName(e.target.value)}></input>
                </div>
                <div className='flex flex-col gap-2'>
                  <label htmlFor='phoneNumber' className='font-bold text-md'>phoneNumber: </label>
                  <input className='border-1 rounded-lg p-2 bg-white' type='tel' id='phoneNumber' placeholder='Please fill phone number' value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} pattern='[0-9]{4}-[0-9]{3}-[0-9]{3}'></input>
                </div>
                <div className='flex flex-col gap-2'>
                  <label htmlFor='email' className='font-bold text-md'>Email: </label>
                  <input className='border-1 rounded-lg p-2 bg-white' type='text' id='email' placeholder='Please fill email' value={email} onChange={e => setEmail(e.target.value)}></input>
                </div>
                <div className='flex flex-col gap-2'>
                  <label htmlFor='address' className='font-bold text-md'>Address: </label>
                  <input className='border-1 rounded-lg p-2 bg-white' type='text' id='address' placeholder='Please fill Address' value={address} onChange={e => setAddress(e.target.value)}></input>
                </div>
              </div>
              <div className='flex items-end justify-center gap-4'>
                <div className='flex-1 flex flex-col gap-2'>
                  <label htmlFor='note' className='font-bold text-md'>Note: </label>
                  <input className='border-1 rounded-lg p-2 bg-white' type='text' id='note' placeholder='Please fill note' value={note} onChange={e => setNote(e.target.value)}></input>
                </div>
                <div>
                  <button className='rounded-lg px-4 py-2 rounded-lg bg-green-400 font-bold text-white' type='submit' disabled={loading}>{loading ? 'creating...' : "create"}</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default CreatePage