import UserModel from "../models/user.model.js";
import sendMail from "../utils/sendMail.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const register = async (userData) => {
  const { username, email, password } = userData;

  let user = await UserModel.findOne({ email });
  if (user) return res.status(400).json({ msg: "User already exists" });

  const salt = await bcrypt.genSalt(10);

  const hashedPass = await bcrypt.hash(password, salt);

  user = new UserModel({ username, email, password: hashedPass });
  await user.save();

  await sendMail(
    user.email,
    "Đăng ký thành công !",
    "Thông tin đăng ký " + user
  );

  return user;
};

const login = async (userData) => {
  const { email, password } = userData;

  let user = await UserModel.findOne({ email });
  if (!user) return res.status(400).json({ msg: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

  const payload = { id: user._id, username: user.username };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  return token;
};

const forgotPassword = async (email) => {
  const user = await UserModel.findOne({ email });
  if (!user) return "User not found !";

  const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Tạo 6 số
  const otpExpire = Date.now() + 3 * 60 * 1000; // 5 phút

  user.resetOTP = otp;
  user.otpExpire = otpExpire;

  await user.save();

  await sendMail(email, "Mã OTP tạo mới mật khẩu", `Mã OTP của bạn là ${otp}`);

  return user;
};

const resetPassword = async (email, otp, newPassword) => {
  const user = await UserModel.findOne({ email });
  if (!user) return "User not found !";
  if (!/^\d{6}$/.test(otp)) return "OTP format invalid!";
  if (user.resetOTP !== otp || Date.now() > user.otpExpire)
    return "OTP invalid !";

  const salt = await bcrypt.genSalt(10);

  const hashedPass = await bcrypt.hash(newPassword, salt);

  user.password = hashedPass;
  user.resetOTP = null;
  user.otpExpire = null;

  await user.save();
  return user;
};

const getAllUser = async () => {
  const users = await UserModel.find().select("-password -resetOTP -otpExpire");
  return users;
};

const getUserById = async (id) => {
  const user = await UserModel.findById(id).select(
    "-password -resetOTP -otpExpire"
  );
  if (!user) return "User not found !";

  return user;
};

const updateUser = async (id, userData) => {
  const { username, email, password } = userData;
  let updatedFields = {};

  if (username) updatedFields.username = username;
  if (email) updatedFields.email = email;

  if (password) {
    const salt = await bcrypt.genSalt(10);
    updatedFields.password = await bcrypt.hash(password, salt);
  }

  const user = await UserModel.findByIdAndUpdate(id, updatedFields, {
    new: true,
  });
  return user;
};

const deleteUser = async (id) => {
  await UserModel.findByIdAndDelete(id);
  return null;
};

const searchUser = async (req, res) => {
  try {
    const keyword = req.params.username;
    const users = await UserModel.find({
      username: { $regex: keyword, $options: "i" },
    }).select("-password -resetOTP -otpExpire");
    return successResponse(
      res,
      `Search user by username ${req.params.username} success !`,
      users
    );
  } catch (err) {
    return errorResponse(res, 500, "Something went wrong");
  }
};

export default {
  register,
  login,
  forgotPassword,
  resetPassword,
  getAllUser,
  getUserById,
  updateUser,
  deleteUser,
  searchUser,
};
