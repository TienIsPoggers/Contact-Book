import express from 'express'
import { apiCreateNewContact,apiDeleteContactById,apiGetAllContact,apiGetContactById ,apiUpdateContactById} from '../Controller/contactController.js';
import multer from 'multer'
const storage = multer.memoryStorage();
const upload = multer({storage})

const router = express.Router();

router.get("/",apiGetAllContact)
router.get("/:id",apiGetContactById)
router.post("/",upload.single("image"),apiCreateNewContact)
router.put("/:id",upload.single('image'),apiUpdateContactById)
router.delete("/:id",apiDeleteContactById)

export default router;  