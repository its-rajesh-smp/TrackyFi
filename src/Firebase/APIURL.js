export const API_KEY = "AIzaSyDcahbA3jPDmyL32yQku83YEU3SAfF_OEM";
export const CREATE_USER = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`
export const LOGIN_USER = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`
export const GET_USER = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${API_KEY}`

export const SEND_VERIFY_LINK = `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${API_KEY}`


export const USERS = "https://trackyfi-a3960-default-rtdb.asia-southeast1.firebasedatabase.app/users"


export const CHANGE_EMAIL = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`
export const CHANGE_PASSWORD = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`
export const UPDATE_USER = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`
export const PASSWORD_RESET = `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${API_KEY}`

export const FETCH_PAYMENT = `https://api.razorpay.com/v1/payments/`
export const AUTH_DETAILS = {
    auth: {
        username: "rzp_test_mPoNwadW6BCpBy",
        password: "sgs9uUwqA81IEvL6yjEQn7qa"
    }
}