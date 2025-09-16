import axios from "axios";

class httpServices {
  constructor(baseURL) {
    this.axiosInstance = axios.create({
      baseURL: baseURL,
      timeout: 1000,
    });
  }
  async getStrapiData(url) {
    try {
      const res = await this.axiosInstance.get(url);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
}

export default httpServices;
