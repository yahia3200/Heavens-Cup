import React from 'react';
import '../styles/SignIn.scss';
import PageHeader from '../Components/PageHeader';

interface SignINProps {

}

const SignIN: React.FunctionComponent<SignINProps> = () => {
    return (
        <div className='SignIn'>
            <PageHeader headerText='Sign In' />
            <div className='SignIn__container'>
                <div className='SignIn__container__column'>
                    <h2 className='SignIn__container__column__header'>
                        Sign In
                    </h2>

                    <form className='SignIn__form'>
                        <div className='SignIn__form__input'>
                            <label htmlFor="email">Email Address</label>
                            <input type="email" name="email" id="email" placeholder='Email Address' />

                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" id="password" placeholder='Password' />
                        </div>

                        <div className='SignIn__form__button'>
                            <button type='submit'>Sign in as a fan</button>
                            <button type='submit'>Sign in as a moderator</button>
                        </div>
                    </form>
                </div>
                <div className='SignIn__container__column'>
                    <h2 className='SignIn__container__column__header'>
                        Register
                    </h2>

                    <form className='SignIn__form'>
                        <div className='SignIn__form__input'>
                            <label htmlFor="register-email">Email Address</label>
                            <input type="email" name="register-email" id="register-email" placeholder='Email Address' />

                            <label htmlFor="register-password">Password</label>
                            <input type="password" name="register-password" id="register-password" placeholder='Password' />

                            <label htmlFor="confirm-password">Confirm Password</label>
                            <input type="password" name="confirm-password" id="confirm-password" placeholder='Confirm Password' />

                            <label htmlFor="username">Username</label>
                            <input type="text" name="username" id="username" placeholder='Username' />

                            <label htmlFor="firstname">First Name</label>
                            <input type="text" name="firstname" id="firstname" placeholder='First Name' />

                            <label htmlFor="lastname">Last Name</label>
                            <input type="text" name="lastname" id="lastname" placeholder='Last Name' />

                            <label htmlFor="dob">Date of Birth</label>
                            <input type="date" name="dob" id="dob" placeholder='Date of Birth' />

                            <label htmlFor="password">Nationality</label>
                            <input type="text" name="country" id="country" placeholder='Country' />
                        </div>

                        <div className='SignIn__form__button'>
                            <button type='submit'>Register as a fan</button>
                            <button type='submit'>Register as a moderator</button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    );
}

export default SignIN;