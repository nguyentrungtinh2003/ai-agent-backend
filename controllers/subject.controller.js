import subjectService from "../services/subject.service.js";
import { successResponse, errorResponse } from "../utils/apiResponse.js";

const addSubject = async (req, res) => {
  try {
    const file = req.file;
    const subject = await subjectService.addSubject(file, req.body);
    return successResponse(res, "Add subject success !", subject);
  } catch (e) {
    return errorResponse(res, "Something went wrong", e.message);
  }
};

const getAllSubject = async (req, res) => {
  try {
    const subjects = await subjectService.getAllSubject();
    return successResponse(res, "Get all subject success !", subjects);
  } catch (e) {
    return errorResponse(res, "Something went wrong", e.message);
  }
};

const getSubjectById = async (req, res) => {
  try {
    const subject = await subjectService.getSubjectById(req.params.id);
    return successResponse(
      res,
      `Get subject by id ${req.params.id} success !`,
      subject
    );
  } catch (e) {
    return errorResponse(res, "Something went wrong", e.message);
  }
};

const updateSubject = async (req, res) => {
  try {
    const subject = await subjectService.updateSubject(
      req.params.id,
      req.file,
      req.body
    );
    return successResponse(
      res,
      `Update subject by id ${req.params.id} success !`,
      subject
    );
  } catch (e) {
    return errorResponse(res, "Something went wrong", e.message);
  }
};

export default { addSubject, getAllSubject, getSubjectById, updateSubject };
