export const successResponse = (res, message, data) => {
  return res.status(200).json({
    status: 200,
    message,
    data,
    timestamp: new Date(),
  });
};

export const errorResponse = (res, message = "Server error", data = null) => {
  return res.status(500).json({
    status: 500,
    message,
    data,
    timestamp: new Date(),
  });
};
