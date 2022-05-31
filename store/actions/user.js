import axios from "../../utils/axios";

export const getUserByIdRedux = (id) => {
  return {
    type: "GET_USER_BY_ID",
    payload: axios.get(`/user/profile/${id}`),
  };
};

export const logoutRedux = () => {
  return {
    type: "LOGOUT",
    payload: axios.post("/auth/logout"),
  };
};
