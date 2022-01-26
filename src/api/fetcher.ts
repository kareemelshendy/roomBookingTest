import axios from "../utils/axios";

export async function fetcher(url: string, token: string) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error: any) {
    console.log(error.response.data.message);
    return error.data;
  }
}
