const host = "http://localhost:5000";
export const SIGN_UP = `${host}/user/signup`;
export const SIGN_IN = `${host}/user/signin`;
export const GET_USER = `${host}/user/getuser`;
export const UPDATE_USER = `${host}/user/update`;

export const ADD_CATEGORY = `${host}/category/add`;
export const DELETE_CATEGORY = `${host}/category/delete`;

export const ADD_TRANSECTION = `${host}/transections/add`;
export const GET_TRANSECTIONS = `${host}/transections/get`;
export const EDIT_TRANSECTION = `${host}/transections/edit`;
export const DELETE_TRANSECTION = `${host}/transections/delete`;

export const BUY_VIP = `${host}/payment/create`;
export const PAYMENT_CAPTURE = `${host}/payment/capture`;
export const PAYMENT_FAILED = `${host}/payment/failed`;
