import React, { useState } from 'react';

const RegisterForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const [showPassword, setShowPassword] = useState(false);

    const [submitError, setSubmitError] = useState('');
    const [submitHasError, setSubmitHasError] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
        setTimeout(() => {
            setSubmitHasError(false);
        }, 2000);
    };

    const toggleShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.username.trim()) {
            setSubmitHasError(true);
            setSubmitError('Please input a valid username.');
            console.error('Please input a valid username.');
            return;
        }

        if (!formData.password.trim()) {
            setSubmitHasError(true);
            setSubmitError('Please input a valid password.');
            console.error('Please input a valid password.');
            return;
        }

        setSubmitHasError(false);
        onSubmit(formData);

        setFormData({
            username: '',
            password: '',
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="submission-style">
                <label>
                    Username:
                    <input
                        className="button-margin"
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                </label>
            </div>
            <div className="submission-style">
                <label>
                    Password:
                    <input
                        className="button-margin"
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <button
                        type="button"
                        className="password-button"
                        onClick={toggleShowPassword}
                    >
                        {showPassword ? 'Hide' : 'Show'}
                    </button>
                </label>
                <div>
                    <button className="submit-button" type="submit">
                        Login
                    </button>
                    <div>
                        {submitHasError ? (
                            <div className="submit-error">{submitError}</div>
                        ) : (
                            <div></div>
                        )}
                    </div>
                </div>
            </div>
        </form>
    );
};

export default RegisterForm;
