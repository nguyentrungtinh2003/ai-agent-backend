import userService from "../services/user.service.js ";
import { successResponse, errorResponse } from "../utils/apiResponse.js";

const register = async (req, res) => {
  try {
    const user = await userService.register(req.body);

    return successResponse(res, "Register success !", user);
  } catch (e) {
    return errorResponse(res, "Something went wrong", e.message);
  }
};

const login = async (req, res) => {
  try {
    const token = await userService.login(req.body);
    return successResponse(res, "Login success !", token);
  } catch (e) {
    return errorResponse(res, "Something went wrong", e.message);
  }
};

const getAllUser = async (req, res) => {
  try {
    const users = await userService.getAllUser();
    return successResponse(res, "Get all user success !", users);
  } catch (err) {
    return errorResponse(res, "Something went wrong", e.message);
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);

    return successResponse(
      res,
      `Get user by id ${req.params.id} success !`,
      user
    );
  } catch (err) {
    return errorResponse(res, "Something went wrong", e.message);
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await userService.updateUser(req.params.id, req.body);
    return successResponse(res, "Update user success !", user);
  } catch (err) {
    return errorResponse(res, "Something went wrong", e.message);
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await userService.deleteUser(req.params.id);
    return successResponse(
      res,
      `Delete user by id ${req.params.id} success !`,
      null
    );
  } catch (err) {
    return errorResponse(res, "Something went wrong", e.message);
  }
};

const searchUser = async (req, res) => {
  try {
    const keyword = req.params.username;
    const users = await userService.searchUser(keyword);

    return successResponse(
      res,
      `Search user by username ${keyword} success !`,
      users
    );
  } catch (err) {
    return errorResponse(res, "Something went wrong", e.message);
  }
};

export default {
  register,
  login,
  getAllUser,
  getUserById,
  updateUser,
  deleteUser,
  searchUser,
};
