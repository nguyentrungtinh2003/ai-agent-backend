import SubjectModel from "../models/subject.model";

const addSubject = async (file, subjectData) => {
  const { name, description, imgUrl, documents } = subjectData;

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
  const { name, description, imgUrl, lecturers } = documentData;
  const updatedFields = {};
  if (name) updatedFields.name = name;
  if (description) updatedFields.description = description;
  if (fileUrl) updatedFields.fileUrl = file.path;

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
