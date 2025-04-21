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

export default addSubject;
