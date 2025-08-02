import contacts from "../Modal/contacts.js"
export const apiGetAllContact = async (req,res) => {
    try{
        // 1. Lấy tất cả contact 
        const contactsList = await contacts.find().lean();
        
        // 2. Gửi kết quả nếu lấy data thành công
        return res.status(200).json(contactsList);

    }catch(error) {
        console.error(`Failed to get all Contact [${req.originalUrl}]: `,error);

        return res.status(500).json({message:"Internal server error"});
    }
}
export const apiGetContactById = async (req,res) => {
    //1. Lấy ID
    const { id } = req.params;
    try{

        //2. Lấy contact bằng ID
        const contact = await contacts.findById(id).lean();
        
        //3. Kiểm tra xem có thành công lấy contact không
        if(!contact)
            return res.status(404).json({message:"Contact not found"})

        //4. Gửi kết quả nếu lấy được data thành công
        return res.status(200).json(contact)

    }catch(error) {
        console.error(`Failed to load contact by ID (${id})`,error);
        return res.status(500).json({message:"Internal server error"});
    }
}
export const apiCreateNewContact = async (req,res) => {
    try{

        // 1. Tạo ra 1 Object data
        const contactData = {
            name: req.body.name,
            phoneNumber: req.body.phoneNumber,
            email: req.body.email,
            address: req.body.address,
            note: req.body.note
        }
        
        // 2. Kiểm tra update file có tồn tại hay không
        if (!contactData.name || !contactData.phoneNumber) {
            return res.status(400).json({ message: "Name and phone number are required" });
        }

        // 3. Thêm hình vào update file
        if(req.file){
            contactData.image = {
                data: req.file.buffer,
                contentType: req.file.mimetype
            }
        }
        
        // 4. Tạo contact từ update file
        const _contact = new contacts(contactData);

        // 5. đăng contact lên Database
        const savedContact = await _contact.save();
        if(!savedContact)
            return res.status(500).json({ message:"Failed to create contact" })

        //6. Gửi kết quả thành công
        return res.status(201).json(savedContact)

    }catch(error){
        console.error(`Failed to create contact: `,error);
        return res.status(500).json({message:"internal server error"});
    }
}
export const apiUpdateContactById = async (req,res) => {
    // 1. Lấy ID
    const { id } = req.params;
    try{
        
        // 2. Tạo contact data
        const contactData = {
            name: req.body.name,
            phoneNumber: req.body.phoneNumber,
            email: req.body.email,
            address: req.body.address,
            note: req.body.note
        }
        
        // 3. Thêm hình vào contact data
        if(req.file){
            contactData.image = {
                data: req.file.buffer,
                contentType: req.file.mimetype
            }
        }

        // 4. Update Contact bằng ID
        const updatedContact = await contacts.findByIdAndUpdate(id,
            contactData,
            {new:true}
        )

        // 5. Kiểm tra xem có update thành công không
        
        if(!updatedContact) return res.status(404).json({message:`Contact with ID (${id}) not found`})

        // 6. Gửi kết quả thành công sau khi update
        return res.status(200).json(updatedContact)

    }catch(error){
        console.error(`Failed to update Contact by id (${id})`,error)
        return res.status(500).json({message:"Internal server error"});
    }
}
export const apiDeleteContactById = async (req,res) => {
    // 1. Lấy ID
    const { id } = req.params;

    try{
        // 2. Xóa Contact
        const deletedContact = await contacts.findByIdAndDelete(id);

        // 3. Kiểm tra Contact có tồn tại hay không
        if(!deletedContact) {
            return res.status(404).json({message:"Contact not found"})
        }

        // 4. Gửi kết quả khi xóa thành công
        return res.status(200).json({message:"Successfully removed contact"})

    }catch(error){
        console.error(`Failed to delete contact by id (${id}): `,error)

        return res.status(500).json({message:"Internal server error"});
    }
}