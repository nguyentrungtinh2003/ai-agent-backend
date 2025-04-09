import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.config";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "ai-agent-files", // tên thư mục trên Cloudinary
    resource_type: "raw", // raw cho file pdf, docx, zip...
    format: async (req, file) => undefined, // giữ định dạng gốc
    public_id: (req, file) => Date.now() + "-" + file.originalname,
  },
});

const upload = multer({ storage });

export default upload;
