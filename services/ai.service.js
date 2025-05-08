import { GoogleGenAI } form "@google/genai";
import axios from "axios";

const callDeepSeek = async (prompt) => {
  try {
    const response = await axios.post(
      "YOUR_DEEPSEEK_API_ENDPOINT", // Thay thế bằng API endpoint thực tế của DeepSeek
      {
        prompt: prompt,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer YOUR_DEEPSEEK_API_KEY", // Nếu DeepSeek yêu cầu API key
        },
      }
    );
    return response.data; // Trả về dữ liệu từ API
  } catch (error) {
    console.error("Lỗi khi gọi DeepSeek API:", error);
    throw error; // Ném lỗi để component gọi có thể xử lý
  }
};

const callGemini = async (subjects, file) => {
  try {
    const formData = new FormData();
    formData.append("subjects", subjects);
    formData.append("file", file);

    const response = await axios.post(
      "YOUR_GEMINI_API_ENDPOINT", // Thay thế bằng API endpoint thực tế của Gemini
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": "Bearer YOUR_GEMINI_API_KEY", // Nếu Gemini yêu cầu API key
        },
      }
    );
    return response.data; // Trả về dữ liệu từ API
  } catch (error) {
    console.error("Lỗi khi gọi Gemini API:", error);
    throw error; // Ném lỗi để component gọi có thể xử lý
  }
};

export default {
  callDeepSeek,
  callGemini,
};
