import axios from "axios";

const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;

export const fetchApi = async (path, method, data = null) => {
  const url = `${API_ENDPOINT}${path}`;
  // const user = localStorage.getItem("user");
  // const token = user ? JSON.parse(user).accessToken : "";

  try {
    let response;
    // const config = {
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${token}`,
    //   },
    // };

    switch (method) {
      case "GET":
        response = await axios.get(url, {
          cache: "no-store",
        });
        break;
      case "POST":
        response = await axios.post(url, data);
        break;
      case "PATCH":
        response = await axios.patch(url, data);
        break;
      case "PUT":
        response = await axios.put(url, data);
        break;
      case "DELETE":
        response = await axios.delete(url);
        break;
      default:
        throw new Error("Method not allowed");
    }

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
