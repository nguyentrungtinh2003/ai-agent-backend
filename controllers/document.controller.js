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

const getAllDocument = async () => {
  try {
    const documents = await documentService.getAllDocument();

    return successResponse(res, "Get all document success !", documents);
  } catch (e) {
    return errorResponse(res, "Something went wrong", e.message);
  }
};

const getDocumentById = async (req, res) => {
  try {
    const document = await documentService.getDocumentById(req.params.id);

    return successResponse(
      res,
      `Get document by id ${req.params.id} success !`,
      document
    );
  } catch (e) {
    return errorResponse(res, "Something went wrong", e.message);
  }
};

const updateDocument = async (req, res) => {
  try {
    const document = await documentService.updateDocument(
      req.params.id,
      req.body
    );

    return successResponse(
      res,
      `Update document by id ${req.params.id} success !`,
      document
    );
  } catch (e) {
    return errorResponse(res, "Something went wrong", e.message);
  }
};

export default {
  uploadDocument,
  getAllDocument,
  getDocumentById,
  updateDocument,
};
