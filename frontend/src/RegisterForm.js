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
        }, 5000);
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
            setTimeout(() => {
                setSubmitHasError(false);
            }, 5000);
            return;
        }

        if (!formData.password.trim()) {
            setSubmitHasError(true);
            setSubmitError('Please input a valid password.');
            console.error('Please input a valid password.');
            setTimeout(() => {
                setSubmitHasError(false);
            }, 5000);
            return;
        }

        if (formData.username.length <= 3) {
            setSubmitHasError(true);
            setSubmitError('Username must be longer than 3 characters.');
            console.error('Username must be longer than 3 characters.');
            setTimeout(() => {
                setSubmitHasError(false);
            }, 5000);
            return;
        }

        if (formData.username.length >= 15) {
            setSubmitHasError(true);
            setSubmitError('Username must be shorter than 15 characters.');
            console.error('Username must be shorter than 15 characters.');
            setTimeout(() => {
                setSubmitHasError(false);
            }, 5000);
            return;
        }

        if (formData.password.length <= 8) {
            setSubmitHasError(true);
            setSubmitError('Password must be longer than 8 characters.');
            console.error('Password must be longer than 8 characters.');
            setTimeout(() => {
                setSubmitHasError(false);
            }, 5000);
            return;
        }

        if (formData.password.length >= 20) {
            setSubmitHasError(true);
            setSubmitError('Password must be shorter than 20 characters.');
            console.error('Password must be shorter than 20 characters.');
            setTimeout(() => {
                setSubmitHasError(false);
            }, 5000);
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
                        Register
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
