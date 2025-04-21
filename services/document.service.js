import DocumentModel from "../models/document.model";
import UserModel from "../models/user.model";
import cloudinary from "../config/cloudinary.config";
import { extractPublicId } from "../middleware/upload.middleware";

const uploadDocument = async (files) => {
  if (!files || files.length === 0) {
    throw new Error("No files uploaded");
  }

  const savedDocuments = [];

  for (const file of files) {
    const fileName = path.parse(file.originalname).name;

    const document = new DocumentModel({
      name: fileName,
      description: "", // có thể lấy từ req.body nếu cần
      fileUrl: file.path,
    });

    await document.save();
    savedDocuments.push(document);
  }

  return savedDocuments;
};

const getAllDocument = async () => {
  const documents = await DocumentModel.find();
  return documents;
};

const getDocumentById = async (id) => {
  const document = await DocumentModel.findById(id);
  return document;
};

const updateDocument = async (id, file, documentData) => {
  const { name, description, lecturers } = documentData;
  const updatedFields = {};
  if (name) updatedFields.name = name;
  if (description) updatedFields.description = description;
  if (file) {
    updatedFields.fileUrl = file.path;
    const documentOld = await DocumentModel.findById(id);
    const publicId = await extractPublicId(documentOld.fileUrl);
    await cloudinary.uploader.destroy(publicId);
  }

  if (lecturers && Array.isArray(lecturers)) {
    const validLecturers = await UserModel.find({ _id: { $in: lecturers } });

    updatedFields.lecturers = validLecturers.map((user) => user._id);
  }

  const documentUpdate = await DocumentModel.findByIdAndUpdate(
    id,
    updatedFields,
    {
      new: true,
    }
  );

  return documentUpdate;
};

export default {
  uploadDocument,
  getAllDocument,
  getDocumentById,
  updateDocument,
};
