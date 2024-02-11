import React, { useState, useEffect } from 'react';

const UserEditForm = ({ user, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        username: '',
    });

    useEffect(() => {
        setFormData({
            username: user.username || '',

        });
    }, [user]);

    const [submitError, setSubmitError] = useState('');
    const [submitHasError, setSubmitHasError] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
        setTimeout(() => {
            setSubmitHasError(false);
        }, 1000);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.username.trim()) {
            setSubmitHasError(true);
            setSubmitError('Please fill in all of the fields.');
            console.error('Please fill in all of the fields.');
            return;
        }

        if (formData.username === user.username) {
            setSubmitHasError(true);
            setSubmitError('The Username is the same, please make an update.');
            console.error('The Username is the same, please make an update.');
            return;
        }

        setSubmitHasError(false);
        onSubmit(formData);

        setFormData({
            username: '',
        });
    };

    const handleCancelClick = () => {
        onCancel();
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="submission-style">
                <label>
                    New Username:
                    <input
                        className="button-margin"
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                </label>
            </div>
            <button className="submit-button delete-button" type="submit">
                Submit
            </button>
            <button className="submit-button delete-button" onClick={handleCancelClick}>
                Cancel
            </button>
            <div>
                {submitHasError ? (
                    <div className="submit-error">{submitError}</div>
                ) : (
                    <div></div>
                )}
            </div>
        </form>
    );
};

export default UserEditForm;
