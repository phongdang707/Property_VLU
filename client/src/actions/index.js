import * as type from "./actionType";
import axios from "axios";
import { Alert } from "antd";
import jwtDecode from "jwt-decode";
import setHeaders from "../helpers/setHeader";
import Swal from "sweetalert2";

export const showProperty = () => {
  return dispatch => {
    try {
      axios.get("http://localhost:5000/api/property").then(res => {
        console.log(res);
        dispatch({
          type: type.SHOW,
          payload: res.data
        });
      });
      console.log("phong");
    } catch (e) {
      console.log(e);
    }
  };
};
export const searchProperty = search => {
  return dispatch => {
    try {
      axios
        .post("http://localhost:5000/api/property/searchProperty", {
          search: search
        })
        .then(res => {
          console.log(res);
          dispatch({
            type: type.SEARCH,
            search,
            payload: res.data
          });
        });
      console.log("vao search");
    } catch (e) {
      console.log(e);
    }
  };
};
export const deleteProperty = id => {
  return async dispatch => {
    try {
      axios.delete("http://localhost:5000/api/property/" + id).then(res => {
        dispatch({
          type: type.DELETE,
          payload: res.data
        });
      });
      console.log("vao delete");
    } catch (e) {}
  };
};

export const detailsProperty = id => {
  return dispatch => {
    try {
      axios.get("http://localhost:5000/api/property/" + id).then(res => {
        console.log("id: ", id);
        console.log(res);
        dispatch({
          type: type.DETAILS,
          payload: res.data
        });
      });
      console.log("vao details");
    } catch (e) {
      console.log(e);
    }
  };
};

export const detailsFullContract = id => {
  return dispatch => {
    try {
      axios.get("http://localhost:5000/api/fullContract/" + id).then(res => {
        console.log("id: ", id);
        console.log(res);
        dispatch({
          type: type.DETAILS_FULLCONTRACT,
          payload: res.data
        });
      });
      console.log("vao details fullContract");
    } catch (e) {
      console.log(e);
    }
  };
};
export const addProperty = property => {
  return dispatch => {
    try {
      axios.post("http://localhost:5000/api/property/", property).then(res => {
        console.log("property: ", property);
        console.log(res);
        dispatch({
          type: type.ADD,
          payload: res.data
        });
      });
    } catch (err) {
      console.log("err", err);
      dispatch({
        type: "GET_ERRORS",
        payload: err.response.data
      });
    }
  };
};
export const login = data => {
  return dispatch => {
    try {
      axios
        .post("http://localhost:5000/api/property/signin", data)
        .then(res => {
          console.log(res);

          const { token } = res.data;
          console.log("token: ", token);
          // dua jwt len localstorage
          localStorage.setItem("token", token);

          // decode --> dispatch auth reducer
          const decoded = jwtDecode(token);
          console.log(decoded);
          dispatch({
            type: type.SIGN_IN,
            payload: decoded
          });

          // set params token header cua nhung request
          setHeaders({ token });
          Swal.fire({
            icon: "success",
            title: "Đăng nhập thành công..."
            // text: "Sai mật khẩu hoặc tài khoản!"
          });
        })
        .catch(err => {
          Swal.fire({
            icon: "error",
            title: "Lỗi đăng nhập...",
            text: "Sai mật khẩu hoặc tài khoản!"
          });
          // dispatch({
          //   // đăng nhập fail sẽ thực hiện GET_ERROR
          //   type: type.GET_ERROR,
          //   payload: err.response.data
          // });
        });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Lỗi đăng nhập...",
        text: "Sai mật khẩu hoặc tài khoản!"
      });
      console.log(error);
    }
  };
};
export const logout = () => {
  return dispatch => {
    localStorage.removeItem("token");
    dispatch({ type: "SIGN_OUT" });
    setHeaders({});
  };
};

export const updateProperty = (id, data) => {
  return dispatch => {
    try {
      axios.put("http://localhost:5000/api/property/" + id, data).then(res => {
        console.log(res);
        dispatch({
          type: type.UPDATE_PROPERTY,
          payload: res.data
        });
      });
      console.log("vao update");
    } catch (e) {
      console.log(e);
    }
  };
};

export const deleteFullContract = id => {
  return async dispatch => {
    try {
      axios.delete("http://localhost:5000/api/fullContract/" + id).then(res => {
        dispatch({
          type: type.DELETE,
          payload: res.data
        });
      });
      console.log("vao delete");
    } catch (e) {
      console.log(e);
    }
  };
};

export const showFullContract = () => {
  return dispatch => {
    try {
      axios.get("http://localhost:5000/api/installementContract/").then(res => {
        console.log(res);
        dispatch({
          type: type.VIEW_FULLCONTRACT,
          payload: res.data
        });
      });
      console.log("phong");
    } catch (e) {
      console.log(e);
    }
  };
};
export const service = id => {
  return dispatch => {
    try {
      axios
        .get("http://localhost:5000/api/property/getServiceById/" + id)
        .then(res => {
          console.log("id: ", id);
          console.log(res);
          dispatch({
            type: type.GET_SERVICE,
            payload: res.data
          });
        });
      console.log("vao service");
    } catch (e) {
      console.log(e);
    }
  };
};
