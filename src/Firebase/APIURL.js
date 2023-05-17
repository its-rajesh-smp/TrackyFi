export const API_KEY = "AIzaSyDcahbA3jPDmyL32yQku83YEU3SAfF_OEM";
export const CREATE_USER = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`
export const LOGIN_USER = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`
export const GET_USER = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${API_KEY}`
export const UPDATE_USER = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`


export const USERS = "https://trackyfi-a3960-default-rtdb.asia-southeast1.firebasedatabase.app/users/"