import React from 'react';
import { useState, useContext } from 'react';
import { UserContext } from '../contexts/userContext';
import '../styles/SignIn.scss';
import PageHeader from '../Components/PageHeader';
import { Email, userType, CustomDate } from '../Types';

import { useNavigate } from 'react-router-dom';

interface SignINProps {

}

const SignIN: React.FunctionComponent<SignINProps> = () => {

    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const [loginUsername, setLoginUsername] = useState('');
    const [password, setPassword] = useState('');

    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [username, setUsername] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [dob, setDob] = useState('');
    const [nationality, setNationality] = useState('');
    const [userType, setUserType] = useState('fan');
    const [gender, setGender] = useState('male');

    const [registerError, setRegisterError] = useState('');
    const [loginError, setLoginError] = useState('');

    const checkRegister = () => {
        if (registerEmail === '') {
            setRegisterError('Email cannot be empty');
            return false;
        } else if (registerEmail.includes('@') === false) {
            setRegisterError('Email must contain @');
            return false;
        }
        else if (registerPassword === '') {
            setRegisterError('Password cannot be empty');
            return false;
        } else if (registerPassword.length < 8) {
            setRegisterError('Password must be at least 8 characters');
            return false;
        } else if (registerPassword.includes(' ') === true) {
            setRegisterError('Password cannot contain spaces');
            return false;
        } else if (confirmPassword === '') {
            setRegisterError('Confirm password cannot be empty');
            return false;
        }
        else if (registerPassword !== confirmPassword) {
            setRegisterError('Passwords do not match');
            return false;
        }
        else if (username === '') {
            setRegisterError('Username cannot be empty');
            return false;
        } else if (firstname === '') {
            setRegisterError('First name cannot be empty');
            return false;
        } else if (lastname === '') {
            setRegisterError('Last name cannot be empty');
            return false;
        } else if (dob === '') {
            setRegisterError('Date of birth cannot be empty');
            return false;
        }
        else {
            setRegisterError('');
        }
        return true;
    }


    const register = async () => {
        const success = checkRegister();
        if (!success) return;

        const response = await fetch('https://7ae6-197-52-11-114.eu.ngrok.io/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                fname: firstname,
                lname: lastname,
                username: username,
                email: registerEmail,
                userrole: userType === 'fan' ? 0 : 1,
                gender: gender === 'male' ? 0 : 1,
                birthdate: dob,
                nationality: nationality,
                password: registerPassword

            })
        })

        const data = await response.json();
        if (response.status === 200) {

            // transform user birth date to match Tuesday 1 January 2020
            const birthDate = `${dob.split('T')[0].split('-')[2]} ${dob.split('T')[0].split('-')[1]} ${dob.split('T')[0].split('-')[0]}`;

            // calculate user age
            const age = new Date().getFullYear() - parseInt(dob.split('T')[0].split('-')[0]);

            const user = {
                firstName: firstname,
                lastName: lastname,
                username: username,
                email: registerEmail as Email,
                type: userType as userType,
                token: data.token,
                age: age,
                birthDate: birthDate as CustomDate,
                nationality: nationality,
                gender: gender as ('male' | 'female'),
            }

            setUser(user)
            localStorage.setItem('user', JSON.stringify(user));


            navigate('/');
        }
        else {
            setRegisterError(data.error);
        }

    }

    const checkLogin = () => {
        if (loginUsername === '') {
            setLoginError('Username cannot be empty');
        } else if (password === '') {
            setLoginError('Password cannot be empty');
        } else {
            setLoginError('');
        }
    }

    const signIn = async () => {

        checkLogin();
        if (loginError !== '') return;
        const response = await fetch('https://7ae6-197-52-11-114.eu.ngrok.io/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                username: loginUsername,
                password: password
            })
        })

        const data = await response.json();
        if (response.status === 200) {

            const userDob = data.user.birthdate;

            // transform user birth date to match Tuesday 1 January 2020
            const birthDate = `${userDob.split('T')[0].split('-')[2]} ${userDob.split('T')[0].split('-')[1]} ${userDob.split('T')[0].split('-')[0]}`;

            // calculate user age
            const age = new Date().getFullYear() - parseInt(userDob.split('T')[0].split('-')[0]);

            const user = {
                firstName: data.user.fname,
                lastName: data.user.lname,
                username: data.user.username,
                email: data.user.email as Email,
                type: data.user.userrole === 0 ? 'fan' : 'moderator' as userType,
                token: data.token,
                age: age,
                birthDate: birthDate as CustomDate,
                nationality: nationality,
                gender: gender as ('male' | 'female'),
            }
            setUser(user)
            localStorage.setItem('user', JSON.stringify(user));
            navigate('/');
        }
        else {
            setLoginError(data.error);
        }
    }



    return (
        <div className='SignIn'>
            <PageHeader headerText='Sign In' />
            <div className='SignIn__container'>
                <div className='SignIn__container__column'>
                    <h2 className='SignIn__container__column__header'>
                        Sign In
                    </h2>

                    <form className='SignIn__form'>
                        {
                            loginError !== '' &&
                            <div className='SignIn__form__error'>
                                {loginError}
                            </div>
                        }
                        <div className='SignIn__form__input'>
                            <label htmlFor="login-username">Username</label>
                            <input type="string" name="login-username" id="login-username" placeholder='Username' autoComplete='username' value={loginUsername} onChange={
                                (e) => {
                                    setLoginUsername(e.target.value);
                                }
                            } />

                            <label htmlFor="password" >Password</label>
                            <input type="password" name="password" id="password" placeholder='Password' autoComplete='current-password' value={password} onChange={
                                (e) => {
                                    setPassword(e.target.value);
                                }

                            } />
                        </div>

                        <div className='SignIn__form__button'>
                            <button type='submit' onClick={
                                (e) => {
                                    e.preventDefault();
                                    signIn();
                                }
                            }>Sign in</button>
                        </div>
                    </form>
                </div>
                <div className='SignIn__container__column'>
                    <h2 className='SignIn__container__column__header'>
                        Register
                    </h2>

                    <form className='SignIn__form'>
                        {registerError && <div className="SignIn__form__error">
                            <p>{registerError}</p>
                        </div>}
                        <div className='SignIn__form__input'>
                            <label htmlFor="register-email">Email Address</label>
                            <input type="email" name="register-email" id="register-email" placeholder='Email Address' value={registerEmail} onChange={
                                (e) => {
                                    setRegisterEmail(e.target.value);
                                }
                            } />

                            <label htmlFor="register-password">Password</label>
                            <input type="password" name="register-password" id="register-password" placeholder='Password' autoComplete='new-password' value={registerPassword} onChange={
                                (e) => {
                                    setRegisterPassword(e.target.value);
                                }
                            } />

                            <label htmlFor="confirm-password">Confirm Password</label>
                            <input type="password" name="confirm-password" id="confirm-password" placeholder='Confirm Password' autoComplete='new-password' value={confirmPassword} onChange={
                                (e) => {
                                    setConfirmPassword(e.target.value);
                                }
                            } />

                            <label htmlFor="username">Username</label>
                            <input type="text" name="username" id="username" placeholder='Username' autoComplete='username' value={username} onChange={
                                (e) => {
                                    setUsername(e.target.value);
                                }
                            } />

                            <label htmlFor="firstname">First Name</label>
                            <input type="text" name="firstname" id="firstname" placeholder='First Name' value={firstname} onChange={
                                (e) => {
                                    setFirstname(e.target.value);
                                }
                            } />

                            <label htmlFor="lastname">Last Name</label>
                            <input type="text" name="lastname" id="lastname" placeholder='Last Name' value={lastname} onChange={
                                (e) => {
                                    setLastname(e.target.value);
                                }
                            } />

                            <label htmlFor="dob">Date of Birth</label>
                            <input type="date" name="dob" id="dob" placeholder='Date of Birth' value={dob} onChange={
                                (e) => {
                                    setDob(e.target.value);
                                }
                            } />

                            <label htmlFor="password">Nationality</label>
                            <input type="text" name="nationality" id="nationality" placeholder='Nationality' value={nationality} onChange={
                                (e) => {
                                    setNationality(e.target.value);
                                }
                            } />

                            <label htmlFor="gender">Gender</label>
                            <select name="gender" id="gender" value={gender} onChange={
                                (e) => {
                                    setGender(e.target.value);
                                }
                            }>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>

                            <label htmlFor="userType">User Type</label>
                            <select name="userType" id="userType" value={userType} onChange={
                                (e) => {
                                    setUserType(e.target.value);
                                    console.log(e.target.value === 'moderator');
                                }
                            }>
                                <option value="fan">Fan</option>
                                <option value="moderator">Moderator</option>
                            </select>
                        </div>

                        <div className='SignIn__form__button'>
                            <button type='submit' onClick={(e) => {
                                e.preventDefault();
                                register();

                            }}>Register</button>

                        </div>
                    </form>
                </div>
            </div>

        </div>
    );
}

export default SignIN;