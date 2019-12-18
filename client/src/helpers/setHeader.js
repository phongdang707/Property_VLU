import axios from "axios";

// params la 1 object
const setHeaders = params => {
  const token = params.token;
  console.log(params);
  if (token) {
    axios.defaults.headers.common["token"] = token;
  } else {
    delete axios.defaults.headers.common["token"];
  }
};

export default setHeaders;
