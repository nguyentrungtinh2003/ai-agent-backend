import User from "../models/user.model";
import { successResponse, errorResponse } from "../utils/apiResponse";

const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "User already exists" });

    const salt = await bcrypt.getSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    user = new User({ username, email, password: hashedPass });
    await user.save();

    return successResponse(res, "Register success !", user);
  } catch (e) {
    return errorResponse(res, 500, "Something went wrong");
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const payload = { id: user._id, username: user.username };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return successResponse(res, "Login success !", token);
  } catch (e) {
    return errorResponse(res, 500, "Something went wrong");
  }
};

const getAllUser = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    return successResponse(res, "Get all user success !", users);
  } catch (err) {
    return errorResponse(res, 500, "Something went wrong");
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ msg: "User not found" });
    return successResponse(
      res,
      `Get user by id ${req.params.id} success !`,
      user
    );
  } catch (err) {
    return errorResponse(res, 500, "Something went wrong");
  }
};

const updateUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    let updatedFields = {};

    if (username) updatedFields.username = username;
    if (email) updatedFields.email = email;

    if (password) {
      const salt = await bcrypt.getSalt(10);
      updatedFields.password = await bcrypt.hash(password, salt);
    }

    const user = await User.findByIdAndUpdate(res.params.id, updatedFields, {
      new: true,
    });
    return successResponse(res, "Update user success !", user);
  } catch (err) {
    return errorResponse(res, 500, "Something went wrong");
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    return successResponse(
      res,
      `Delete user by id ${req.params.id} success !`,
      null
    );
  } catch (err) {
    return errorResponse(res, 500, "Something went wrong");
  }
};

const searchUser = async (req, res) => {
  try {
    const keyword = req.params.username;
    const users = await User.find({
      username: { $regex: keyword, $options: "i" },
    }).select("-password");
    return successResponse(
      res,
      `Search user by username ${req.params.username} success !`,
      users
    );
  } catch (err) {
    return errorResponse(res, 500, "Something went wrong");
  }
};

module.exports = {
  register,
  login,
  getAllUser,
  getUserById,
  updateUser,
  deleteUser,
};
