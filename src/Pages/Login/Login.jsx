import React from 'react';
import "./Login.css"

function Login(props) {
    return (
        <div className=' Login-div'>
            <div className='Login-div__topDiv'>
                <h1>expense tracker</h1>
            </div>

            <div className='Login-div__div'>
                <div className='Login-div__middleDiv'>
                    <h1>Create Account</h1>
                    <div className='GoogleBtnContainer'>
                        <button><i className='bx bxl-google'></i>Google</button>
                        <div className='lineContainer'><p className='lines'></p>Or connect with<p className='lines'></p></div>
                    </div>
                </div>



                <form className='Login-div__form'>

                    <div className='Login-div__form_inpDiv'>
                        <label htmlFor="Email">Email</label>
                        <input type="text" name="" id="" placeholder='Email' />
                    </div>

                    <div className='Login-div__form_inpDiv'>
                        <label htmlFor="Password">Password</label>
                        <input type="text" placeholder='Password' name="" id="" />
                    </div>

                    <button>Sign Up</button>

                    <div className='Login-div__form_switch'>
                        <p>Already have an account?</p>
                        <p>Sign In</p>
                    </div>



                </form>
            </div>
        </div>
    );
}

export default Login;
