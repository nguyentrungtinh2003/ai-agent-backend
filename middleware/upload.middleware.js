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

const extractPublicId = (url) => {
  const parts = url.split("/");
  const fileWithExt = parts[parts.length - 1]; // 1713916275402-myfile.jpg
  const folder = parts[parts.length - 2]; // subjects
  const fileName = fileWithExt.substring(0, fileWithExt.lastIndexOf(".")); // bỏ phần .jpg
  return `${folder}/${fileName}`;
};

const upload = multer({ storage });

export default { upload, extractPublicId };
