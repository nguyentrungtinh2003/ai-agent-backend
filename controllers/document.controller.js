import documentService from "../services/document.service.js";
import { successResponse, errorResponse } from "../utils/apiResponse.js";

const uploadDocument = async (req, res) => {
  try {
    const documents = await documentService.uploadDocument(req.files);

    return successResponse(res, "Upload document success !", documents);
  } catch (e) {
    return errorResponse(res, "Something went wrong", e.message);
  }
};

export default { uploadDocument };
