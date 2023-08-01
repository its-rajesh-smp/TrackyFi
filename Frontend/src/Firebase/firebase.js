import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth"
import { authUser } from "../Store/Reducer/authReducer";
import { USERS, GET_USER } from "./APIURL";
import axios from "axios";
import { fetchExpense } from "../Store/Reducer/transectionReducer";
import { fetchCategory } from "../Store/Reducer/categoryReducer";

const firebaseConfig = {
  apiKey: "AIzaSyDcahbA3jPDmyL32yQku83YEU3SAfF_OEM",
  authDomain: "trackyfi-a3960.firebaseapp.com",
  databaseURL: "https://trackyfi-a3960-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "trackyfi-a3960",
  storageBucket: "trackyfi-a3960.appspot.com",
  messagingSenderId: "292152962826",
  appId: "1:292152962826:web:44aa9b8b1c3520025a94f3"
};


const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider()
const auth = getAuth(app)


/* -------------------------------------------------------------------------- */
/*                           Login Using Google Auth                          */
/* -------------------------------------------------------------------------- */

export const authUsingGoogle = () => {
  return async (dispatch, getState) => {
    try {
      const { _tokenResponse: authData } = await signInWithPopup(auth, provider)

      if (authData.isNewUser) {
        localStorage.setItem("trackfyUser", authData.idToken)
        const userEmail = authData.email.replace(".", "").replace("@", "")
        await axios.patch(`${USERS}/${userEmail}.json`, {
          isVerified: false,
          email: authData.email
        })
        dispatch(authUser(authData))
      }
      else {
        localStorage.setItem("trackfyUser", authData.idToken)
        const userEmail = authData.email.replace(".", "").replace("@", "")
        const { data: userData } = await axios.get(`${USERS}/${userEmail}.json`)
        const { data: getUser } = await axios.post(GET_USER, { idToken: authData.idToken })


        // PREPAIRE FOR DISPATCH TRANSECTIONS
        const userTransections = !userData.transections ? {} : userData.transections

        const newExpenseArr = Object.keys(userTransections).map((expenseId) => {
          return { ...userTransections[expenseId], id: expenseId }
        })

        // PREPARING CATEGORY ARRAY
        const newCategoryArr = Object.values(!userData.category ? {} : userData.category)

        // DISPATCH TRANSECTIONS
        dispatch(fetchExpense(newExpenseArr))
        dispatch(fetchCategory(newCategoryArr))

        // Before Dispatch removing the transection field
        delete userData.transections
        delete userData.category
        const newUserDataObj = { ...authData, ...userData, ...getUser.users[0] }

        dispatch(authUser(newUserDataObj))


      }
    } catch (error) {
      console.log(error);
    }
  }
}