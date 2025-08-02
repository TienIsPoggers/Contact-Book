import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { apiDeleteContactByID, apiGetContactByID ,apiUpdateContactByID } from '../script/api';
import ImageComponent from '../Component/ImageComponent';
import toast from 'react-hot-toast';
import BackToMenu from '../Component/BackToMenu';

export default function ContactPage() {
  // Lấy các data từ useState
  const [loading,setLoading] = useState(true);
  const [updateLoading,setUpdateLoading] = useState(false);
  const [error,setError] = useState('');
  const [preview,setPreview] = useState('');
  const [image,setImage] = useState(null);
  const [name,setName] = useState('Tien');
  const [phoneNumber,setPhoneNumber] = useState('0768-038-455');
  const [email,setEmail] = useState('hangquoctien2008@gmail.com ');
  const [address,setAddress] = useState('Vietnam');
  const [note,setNote] = useState('');
  const [loadingDelete,setLoadingDelete] = useState(false);

  // Lấy id
  const { id } = useParams();

  // Lấy navigate
  const navigate = useNavigate();

  // Xử lý việc sau khi update ảnh từ input
  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  }
  // Function Xóa Contact
  const handleDeleteContact = async () => {
    // 1. Kiểm tra xem có đang xóa không
    if(loadingDelete) return;

    // 2. Xác nhận xóa
    if(!window.confirm("Are you sure you want to delete this contact?")) return
    
    // 3. Set trạng thái loading
    setLoadingDelete(true);

    // 4. Gọi api xóa
    const success = await apiDeleteContactByID(id);

    // 5 Xử lý kết quả 
    if(success) {
      toast.success("Contact removed successfully")
      handleGetContactByID
      navigate('/');
    } else {
      toast.error(`Failed to remove contact: ${id}`)
      setLoadingDelete(false);
    }
  }
  // Lấy thông tin bằng ID
  const handleGetContactByID = async (id) => {
    const { data, error } = await apiGetContactByID(id);
    if(error){
      setError(error);
      toast.error("Failed")
    } else {
      setName(data.name || '');
      setPhoneNumber(data.phoneNumber || '')
      setEmail(data.email || '');
      setAddress(data.address || '');
      setNote(data.note || '');
      if(data.image) {
        setPreview(data.image.data)
      }
      
    }
    setLoading(false)
  }

  const handleUpdateContactByID = async (e) => {
    e.preventDefault();

    if (!name.trim() || !phoneNumber.trim() || !email.trim()) {
      toast.error("Please fill required fields");
      return;
    }

    // 1. Kiểm tra xem có đang update không
    if(updateLoading) return;

    // 2. Chỉnh update state lại
    setUpdateLoading(true);

    try {

      // 3. Tạo FormData để update
      const formData = new FormData();
      formData.append('phoneNumber',phoneNumber.trim())
      formData.append('email',email.trim())
      formData.append('address',address.trim())
      formData.append('name',name.trim())
      formData.append('note',note.trim())
      
      // 3.5 Thêm Image vào FormData
      if(image) formData.append('image',image );
 
      // 4. Gọi api PUT
      const success = await apiUpdateContactByID(id,formData);
      

      // 5. Xử lý kết quả cuối cùng
      if(success) {
        toast.success("Successfully to update contact")
        handleGetContactByID(id); 
      } else {
        throw new Error('Failed to update contact')
      }
    } catch(error) {
      console.error(error.message || 'Failed to update contact');
      toast.error(error.message);
    } finally {
      // 6. Chỉnh Update State lại lần cuối
      setUpdateLoading(false);
    }
  }

  // Effect này sử dụng đê xử lý hình ảnh review
  useEffect(() => {
    if(!image){
      setPreview('');
      return;
    }

    const objectUrl = URL.createObjectURL(image);
    setPreview(objectUrl);
    
    return () => URL.revokeObjectURL(objectUrl);
  },[image])
  // Effect này sử dụng để load data
  useEffect(() => {
    handleGetContactByID(id);
  }, [id])

  if(loading) return <div className='container mx-auto'><h2 className='text-center font-bold text-3xl mt-8'>Loading</h2></div>
  if(error) return (<div className='container mx-auto'><h2 className='text-center font-bold text-3xl mt-8'>Contact Not Found</h2></div>)
  return (
    <>
      <BackToMenu />
      <div className='container mx-auto px-4 mt-4'>
        <div className='flex flex-col gap-4'>
          <h2 className='text-3xl font-bold text-center mr-auto ml-2'>Create Contact Page</h2>
          <form onSubmit={handleUpdateContactByID}>
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
                  <button className='rounded-lg px-4 py-2 rounded-lg bg-green-400 font-bold text-white' type='submit' disabled={updateLoading}>{updateLoading ? 'Saving...' : "Save"}</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className='mx-auto container px-4 mt-4'>
        <button 
          className='bg-red-400 px-4 py-2 rounded-xl font-bold text-white text-lg cursor-pointer' 
          onClick={handleDeleteContact} 
          disabled={loadingDelete}
        >
            {loadingDelete ? "Deleting..." : "Delete"}
        </button>
      </div>
    </>
  )
}
