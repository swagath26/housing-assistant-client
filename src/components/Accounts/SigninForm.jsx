import { useState, useContext, useEffect } from "react"
import { FaLock, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../context/AuthContext";


const SigninForm = () => {

    const setIsAuthenticated = useContext(AuthContext).setIsAuthenticated;
    const csrftoken = useContext(AuthContext).csrftoken;

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberme, setRememberme] = useState(false);

    const [errors, setErrors] = useState(null);

    const [formValidate, setFormValidate] = useState(false);
    const [isFormValidated, setIsFormValidated] = useState(false);

    useEffect(() => {
        const password_input = document.getElementById('password');
        const username_input = document.getElementById('username');
        const handleError = () => {
            if(errors && errors === 'password') {
                invalidateField(password_input);
                document.getElementById('wrong-password').style.display = 'block';
                setIsPasswordValidated(false);
            }
            if(errors && errors === 'username') {
                invalidateField(username_input);
                document.getElementById('wrong-username').style.display = 'block';
                setIsUsernameValidated(false);
            }
        }
        handleError();
    }, [errors]);

    const clearFields = () => {
        setUsername('');
        setPassword('');
        setRememberme(false);
        setErrors(null);
        setFormValidate(false);
        setIsFormValidated(false);
    }

    const handleSignin = async () => {
        setErrors(null);
        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);
        formData.append('remember_me', rememberme);
        
        const response = await axios.post('/api/members/signin/', formData, {headers: { 'X-CSRFToken': csrftoken }});
        if (response.data.success) {
            clearFields();
            window.bootstrap.Modal.getInstance('#accounts').hide();
            setIsAuthenticated(true);
        }
        else {
            setErrors(response.data.errors);
            setIsAuthenticated(false);
        }
    }
    
    const [isPasswordValidated, setIsPasswordValidated] = useState(false);
    const [isUsernameValidated, setIsUsernameValidated] = useState(false);

    useEffect(() => {
        if(isPasswordValidated && isUsernameValidated) {
            setIsFormValidated(true);
        }
        else
            setIsFormValidated(false);
    }, [isPasswordValidated, isUsernameValidated])


    const validateField = (input) => {
        input.classList.contains('is-invalid') && input.classList.remove('is-invalid');
    }

    const invalidateField = (input) => {
        !input.classList.contains('is-invalid') && input.classList.add('is-invalid');
    }

    useEffect(() => {
        const password_input = document.getElementById('password');
        if(formValidate) {
            if (password === '') {
                invalidateField(password_input);
                document.getElementById('wrong-password').style.display = 'none';
                document.getElementById('invalid-password').style.display = 'block';
                setIsPasswordValidated(false);
            } else {
                validateField(password_input);
                document.getElementById('wrong-password').style.display = 'none';
                document.getElementById('invalid-password').style.display = 'none';
                setIsPasswordValidated(true);
            }
        }
    }, [password, formValidate]);

    useEffect(() => {
        const username_input = document.getElementById('username');
        if(formValidate) {
            if (username === '') {
                invalidateField(username_input);
                document.getElementById('wrong-username').style.display = 'none';
                document.getElementById('invalid-username').style.display = 'block';
                setIsUsernameValidated(false);
            } else {
                validateField(username_input);
                document.getElementById('wrong-username').style.display = 'none';
                document.getElementById('invalid-username').style.display = 'none';
                setIsUsernameValidated(true);
            }
        }
    }, [formValidate, username]);

    return (
        <div>
        <div className="card">
            <form className="p-2 needs-validation" id="login-form" noValidate>

                <div className="tw-p-2 tw-flex tw-gap-6">
                    <label htmlFor="username" className="col-form-label tw-mt-2">
                        <FaUser className="icon" />
                    </label>
                    <div className="tw-grow tw-flex max-md:tw-flex-wrap tw-items-center tw-gap-x-6 tw-gap-y-1">
                        <input type="text" className="form-control my-1 tw-grow" placeholder="Enter your username" id="username" value={username} onChange={(event) => setUsername(event.target.value)} required/>
                        
                        <div className="tw-w-40 tw-h-full">
                            <div className="invalid-feedback m-0 tw-w-full" id="invalid-username">
                                Enter your username!
                            </div>
                            <div className="invalid-feedback m-0 tw-w-full" id="wrong-username">
                                Username doesnot exist!
                            </div>
                        </div>
                    </div>
                </div>

                <div className="tw-p-2 tw-flex tw-gap-6">
                    <label htmlFor="password" className="col-form-label tw-mt-2">
                        <FaLock className="icon" />
                    </label>
                    <div className="tw-grow tw-flex max-md:tw-flex-wrap tw-items-center tw-gap-x-6 tw-gap-y-1">
                        <input type="password" className="form-control my-1" placeholder="Enter your password" id="password" value={password} onChange={(event) => setPassword(event.target.value)} aria-describedby="passwordHelp" required/>
                        
                        <div className="tw-w-40 tw-h-full">
                            <div className="invalid-feedback m-0 tw-w-full" id="invalid-password">
                                Enter your password
                            </div>
                            <div className="invalid-feedback m-0 tw-w-full" id="wrong-password">
                                Password is incorrect!
                            </div>
                        </div>
                    </div>
                </div>

                <div id="passwordHelp" className="form-text tw-px-2">Never share your passwords with anyone</div>

                <div className="tw-p-2 tw-flex tw-flex-wrap tw-gap-4 tw-my-3">
                    <div className="col-auto d-flex align-items-center">
                        <input type="checkbox" className="form-check-input m-0" id="rememberme" value={rememberme} onChange={(event) => {setRememberme(event.target.checked)}} />
                        <label htmlFor="rememberme" className="form-check-label ms-2">Remember me</label>
                    </div>
                    <div className="col-auto ms-3 d-flex align-items-center">
                        <button type="submit" className="tw-bg-slate-800 tw-font-medium tw-text-white tw-py-2 tw-px-5 tw-rounded-lg" 
                            onClick={(event) => {
                                event.preventDefault();
                                if(isFormValidated) {
                                    handleSignin();
                                }
                                if (!formValidate) {
                                    if(username && password ) handleSignin();
                                    setFormValidate(true);
                                }
                            }}>Sign in
                        </button>
                    </div>
                </div>

            </form>
        </div>
        </div> 
    )
}

export default SigninForm;