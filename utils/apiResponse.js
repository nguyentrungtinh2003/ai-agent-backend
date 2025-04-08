export const successResponse = (res, message, data) => {
  return res.status(200).json({
    status: 200,
    message,
    data,
    timestamp: new Date(),
  });
};

export const errorResponse = (
  res,
  status = 500,
  message = "Server error",
  data = null
) => {
  return res.status(status).json({
    status,
    message,
    data,
    timestamp: new Date(),
  });
};
