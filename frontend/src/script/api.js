import toast from "react-hot-toast";

const Api_URL = import.meta.env.MODE === 'development' ? 'http://localhost:5001/api': '/api';

export const apiGetAllContact = async () => {
    try{

        // Gọi Api GET
        const res = await fetch(`${Api_URL}/contacts`);

        // Kiểm tra phản hồi
        if(!res.ok) {
            throw new Error("Failed to get all contacts");
        }
        // Chuyển dữ liệu sang json
        const data = await res.json();

        // Trả về dữ liệu
        return { data, error: null }

    }catch(error) {
        console.error(error.message || `Failed to get all contact`);
        return { data: null, error }
    }
}


export const apiCreateNewContact = async (formData) => {
    try{

        // Gọi api POST
        const res = await fetch(`${Api_URL}/contacts`,{
            method:"POST",
            body: formData
        });
        // Kiểm tra phản hồi
        if(!res.ok) throw new Error("Failed to create new contact");

        return true;

    }catch(err){

        toast.error(err)
        return false;
    }
}

export const apiDeleteContactByID = async (id) => {
    try{

        // Gọi api DELETE
        const res = await fetch(`${Api_URL}/contacts/${encodeURIComponent(id)}`,{
            method:"DELETE"
        })

        // Kiểm tra phản hồi
        if(!res.ok) {
            throw new Error(`Failed to remove contact: ${id}`)
        }

        return true;
    }
    catch(error){
        console.error(`Error in removing account (${id}): `,error.message)
        return false;
    }
}

export const apiGetContactByID = async (id) => {
    try{

        // 1. Gọi api GET
        const res = await fetch(`${Api_URL}/contacts/${encodeURIComponent(id)}`)
        
        // 2. Kiểm tra phản hồi
        if(!res.ok) {
            throw new Error(`Failed to get contact by ID (${id})`);
        }

        // 3. Chuyển dữ liệu sang json
        const data = await res.json();
        
        // 4. trả dữ liệu về
        return { data, error: null } 

    } catch(error) {
        console.error(`Error in getting contact (${id}):`,error.message)
        return { data: null, error: error.message || 'Failed to getting contact' }
    }
}

export const apiGetContactAvatarByID = async (id) => {
    try {

        // 1. Get api GET
        const res = await fetch(`${Api_URL}/image/${encodeURIComponent(id)}`)

        // 2. Kiểm tra phản hồi
        if(!res.ok)
            throw new Error(`[apiGetContactAvatarByID] Failed (${id})`)

        // 3. Chuyển dữ liệu sang json
        const data = await res.json();

        // 4. Trả về dữ liệu
        return data;

    }catch(error) {
        console.error(error.message || `[apiGetContactAvatarByID] Failed (${id})`);
        return null;
    }
} 

export const apiUpdateContactByID = async (id,formData) => {
    try{
        const res = await fetch(`${Api_URL}/contacts/${encodeURIComponent(id)}`,{
            method:"PUT",
            body: formData
        })

        if(!res.ok)
            throw new Error("[apiUpdateContactByID] Failed");

        return true;
    }catch(error){
        console.error(error);
        return false;
    }
}