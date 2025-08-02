import express from 'express'
import dotenv from 'dotenv'
import router from './Routes/contactRoutes.js';
import cors from 'cors'
import path from 'path';
import { ConnectDB } from './config/db.js';
import contacts from "./Modal/contacts.js"
import { fileURLToPath } from 'url';
dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)

ConnectDB();
if(process.env.NODE_ENV !== 'production'){
    app.use(cors({origin:"http://localhost:5173"}))
}
app.use(express.json());
app.use("/api/contacts",router)
app.get('/api/image/:id',async (req,res) => {

    //1. Lấy Contact bằng ID
    const contact = await contacts.findById(req.params.id);

    //2. Kiểm tra xem Avatar có tồn tại trong contact
    if(!contact.image || !contact.image.data) {
        return res.status(404).json({ message: "Image not found in this account "})
    }

    // 3. Chuyển image binary sang base64
    const base64 = contact.image.data.toString("base64");

    // 4. Gửi kết quả sau khi convert thành công
    return res.json({
        image: base64
    });
})
if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname,"../../frontend/dist")))
    app.get(/.*/,(req,res) => {
        res.sendFile(path.join(__dirname,"../../frontend","dist","index.html"))
    })
}

if(process.env.NODE_ENV === 'production') {
    app.listen(PORT,() => console.log(`Server started at URL${PORT}`))
}
else {
    app.listen(PORT,() => console.log(`Server started at URL:http://localhost:${PORT}`))
}
