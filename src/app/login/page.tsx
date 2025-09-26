'use client';

import LoginLayout from "@/components/layouts/LoginLayout";
import Link from "next/link";
import '@/styles/global.css';
import '@app/login/loginPage.css';
import RippleButton from "@/components/buttons/RippleButton";
import InputWithLabel from "@/components/inputs/InputWithLabel";
import { useState } from "react";
import CheckBox from "@/components/checkboxs/Checkbox";
import { authenticateUser } from "services/authService";

export default function Login() {
    const [userNameOrEmailAddress, setUserNameOrEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [isChecked, setIsChecked] = useState(false);

    const isFormValid = userNameOrEmailAddress.trim() !== '' && password.trim() !== '';

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
  };

    const handleLogin = async () => {
        const loginData = { userNameOrEmailAddress, password, rememberClient: isChecked };
        console.log('Login data:', loginData);
        const result = await authenticateUser(loginData);
        if (result) {
            console.log('Login successful:', result);
            localStorage.setItem('token', result.result.accessToken);
            localStorage.setItem('userId', result.result.userId);
        } else {
            console.log('error line 35');
        }
    };

    return (
        <LoginLayout>
            <div className="login-box">
                <div className="logo">
                    <a>Timesheet</a>
                </div>
                <div className="body">
                    <div className="loginWithEmail">
                        <h4>Log in</h4>
                        <div className="form">
                            <div className="input-group">
                                <span>
                                    <i className="material-icons">person</i>
                                </span>
                                <InputWithLabel 
                                    labelText="User name or email"
                                    inputType="text"
                                    inputId="username"
                                    value={userNameOrEmailAddress}
                                    onChange={(e) => setUserNameOrEmailAddress(e.target.value)}    
                                />
                            </div>
                            <div className="input-group">
                                <span>
                                    <i className="material-icons">lock</i>
                                </span>
                                <InputWithLabel 
                                    labelText="Password"
                                    inputType="password"
                                    inputId="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)} 
                                />
                            </div>
                        </div>
                        <div className="submit">
                            <div className="checkbox">
                                <CheckBox
                                    checked={isChecked} 
                                    onChange={handleCheckboxChange} 
                                />
                            </div>
                            <div className="submit-btn">
                                <RippleButton 
                                    text="Login" 
                                    bgBtncolor="#ff4081"
                                    textBtncolor="#fff"
                                    onClick={handleLogin}
                                    disabled={!isFormValid}
                                    width="fit-content"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="loginWithMezon">
                        <RippleButton 
                            text="Login With Mezon" 
                            bgBtncolor="#3f51b5"
                            textBtncolor="#fff"
                            width="100%"
                        />
                    </div>
                </div>
                <div className="login-footer">
                    <small>
                        © 2025 Timesheet. 
                        <b>Version </b>
                         4.3.0.0 [20252309]
                    </small>
                </div>
            </div>
            <Link href="/home">go to home</Link>
        </LoginLayout>
    )
}