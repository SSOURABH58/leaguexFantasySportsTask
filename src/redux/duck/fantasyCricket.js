import axios from "axios";

var fcAPI = axios.create({
  baseURL: "http://15.206.110.130:5001",
});

const initialState = {};

const fantasyCricket = (state = initialState, { type, payload }) => {
  switch (type) {
    case "typeName":
      return { ...state, ...payload };

    default:
      return state;
  }
};
export default fantasyCricket;

export const getMatchs = (payload) => ({
  type: "type",
  payload,
});
