import DocumentModel from "../models/document.model";
import UserModel from "../models/user.model";

const uploadDocument = async (documentData) => {
  const { name, description, fileUrl } = documentData;
  const saveDocument = new DocumentModel({
    name,
    description,
    fileUrl,
  });

  await saveDocument.save();
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
  const user = await UserModel.findById(lecturerId);
  const updatedFields = {};
  if (name) updatedFields.name = name;
  if (description) updatedFields.description = description;
  if (fileUrl) updatedFields.fileUrl = fileUrl;
  if (lecturers) updatedFields.lecturerId = [user.id];

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
