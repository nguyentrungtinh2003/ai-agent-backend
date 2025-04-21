import subjectService from "../services/subject.service";
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

export default addSubject;
