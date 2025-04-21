import DocumentModel from "../models/document.model";
import UserModel from "../models/user.model";

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

const updateDocument = async (id, documentData) => {
  const { name, description, fileUrl, lecturers } = documentData;
  const updatedFields = {};
  if (name) updatedFields.name = name;
  if (description) updatedFields.description = description;
  if (fileUrl) updatedFields.fileUrl = fileUrl;

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
