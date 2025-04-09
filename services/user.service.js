import User from "../models/user.model.js";
import sendMail from "../utils/sendMail.js";

const register = async (userData) => {
  const { username, email, password } = userData;

  let user = await User.findOne({ email });
  if (user) return res.status(400).json({ msg: "User already exists" });

  const salt = await bcrypt.genSalt(10);

  const hashedPass = await bcrypt.hash(password, salt);

  user = new User({ username, email, password: hashedPass });
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

  let user = await User.findOne({ email });
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
  const user = await User.findOne({ email });
  if (!user) return "User not found !";

  const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Tạo 6 số
  const otpExpire = Date.now() + 5 * 60 * 1000; // 5 phút

  user.resetOTP = otp;
  user.otpExpire = otpExpire;

  await user.save();

  await sendMail(email, "Mã OTP tạo mới tài khoản", `Mã OTP của bạn là ${otp}`);

  return user;
};

const resetPassword = async (email, otp, newPassword) => {
  const user = await User.findOne({ email });
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
  const users = await User.find().select("-password");
  return users;
};

const getUserById = async (id) => {
  const user = await User.findById(id).select("-password");
  if (!user) return "User not found !";

  return user;
};

const updateUser = async (id, userData) => {
  const { username, email, password } = userData;
  let updatedFields = {};

  if (username) updatedFields.username = username;
  if (email) updatedFields.email = email;

  if (password) {
    const salt = await bcrypt.getSalt(10);
    updatedFields.password = await bcrypt.hash(password, salt);
  }

  const user = await User.findByIdAndUpdate(id, updatedFields, {
    new: true,
  });
  return user;
};

const deleteUser = async (id) => {
  await User.findByIdAndDelete(id);
  return null;
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
