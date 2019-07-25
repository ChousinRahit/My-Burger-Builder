import axios from "axios";

const instance = axios.create({
  baseURL: "https://myburger-2428.firebaseio.com/"
});

export default instance;
