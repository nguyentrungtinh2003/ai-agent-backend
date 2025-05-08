import SubjectModel from "../models/subject.model.js";
import cloudinary from "../config/cloudinary.config.js";
import fileHandler from "../middleware/upload.middleware.js";
const { extractPublicId } = fileHandler;

const addSubject = async (file, subjectData) => {
  const { name, description } = subjectData;

  const subject = new SubjectModel({
    name,
    description,
    imgUrl: file ? file.path : "",
  });

  await subject.save();

  return subject;
};

const getAllSubject = async () => {
  const subjects = await SubjectModel.find();
  return subjects;
};

const getSubjectById = async (id) => {
  const subject = await SubjectModel.findById(id);
  return subject;
};

const updateSubject = async (id, file, subjectData) => {
  const { name, description, lecturers } = subjectData;
  const updatedFields = {};
  if (name) updatedFields.name = name;
  if (description) updatedFields.description = description;
  if (fileUrl) {
    updatedFields.fileUrl = file.path;
    const subjectOld = await SubjectModel.findById(id);
    const publicId = await extractPublicId(subjectOld.imgUrl);
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

export default { addSubject, getAllSubject, getSubjectById, updateSubject };
