import React, { useState } from 'react';

const QuoteSearchForm = ({ onSubmit }) => {
    const [userData, setUserData] = useState({
        username: '',
    });

    const [userIDData, setUserIDData] = useState({
        id: '',
    });

    const [authorData, setAuthorData] = useState({
        author: '',
    });

    const [tagData, setTagData] = useState({
        tags: [],
    });

    const [submitError, setSubmitError] = useState('');
    const [submitHasError, setSubmitHasError] = useState(false);

    const selectableTags = ['Motivational', 'Inspiring', 'Encouraging'];

    const handleUserChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({ ...prevData, [name]: value }));
        setTimeout(() => {
            setSubmitHasError(false);
        }, 2000);
    };

    const handleUserIDChange = (e) => {
        const { name, value } = e.target;
        setUserIDData((prevData) => ({ ...prevData, [name]: value }));
        setTimeout(() => {
            setSubmitHasError(false);
        }, 2000);
    };

    const handleAuthorChange = (e) => {
        const { name, value } = e.target;
        setAuthorData((prevData) => ({ ...prevData, [name]: value }));
        setTimeout(() => {
            setSubmitHasError(false);
        }, 2000);
    };

    const handleTagChange = (tag) => {
        setTagData((prevData) => {
            const selectedTags = [...prevData.tags];
            const index = selectedTags.indexOf(tag);

            if (index === -1) {
                if (selectedTags.length < selectableTags.length) {
                    selectedTags.push(tag);
                }
            } else {
                selectedTags.splice(index, 1);
            }

            return { ...prevData, tags: selectedTags };
        });

        setTimeout(() => {
            setSubmitHasError(false);
        }, 2000);
    };

    const handleUserSubmit = (e) => {
        e.preventDefault();

        if (!userData.username.trim()) {
            setSubmitHasError(true);
            setSubmitError('Please input a valid user.');
            console.error('Please input a valid user.');
            return;
        }

        setSubmitHasError(false);
        onSubmit(userData);

        setUserData({
            username: '',
        });
    };

    const handleUserIDSubmit = (e) => {
        e.preventDefault();

        if (!userIDData.id.trim()) {
            setSubmitHasError(true);
            setSubmitError('Please input a valid user ID.');
            console.error('Please input a valid user ID.');
            return;
        }

        setSubmitHasError(false);
        onSubmit(userIDData);

        setUserIDData({
            id: '',
        });
    };

    const handleAuthorSubmit = (e) => {
        e.preventDefault();

        if (!authorData.author.trim()) {
            setSubmitHasError(true);
            setSubmitError('Please input a valid author.');
            console.error('Please input a valid author.');
            return;
        }

        setSubmitHasError(false);
        onSubmit(authorData);

        setAuthorData({
            author: '',
        });
    };

    const handleTagSubmit = (e) => {
        e.preventDefault();

        if (!tagData) {
            setSubmitHasError(true);
            setSubmitError('Please select a tag.');
            console.error('Please select a tag.');
            return;
        }

        setSubmitHasError(false);
        onSubmit(tagData);

        setTagData({
            tags: [],
        });
    };

    return (
        <>
            <form onSubmit={handleUserSubmit}>
                <div className="submission-style">
                    <label>
                        Username:
                        <input
                            className='button-margin'
                            type="text"
                            name="username"
                            value={userData.username}
                            onChange={handleUserChange}
                        />
                    </label>
                    <button className="submit-button button-margin" type="submit">
                        Submit
                    </button>
                </div>
            </form>
            <form onSubmit={handleUserIDSubmit}>
                <div className="submission-style">
                    <label>
                        User ID:
                        <input
                        className='button-margin'
                            type="text"
                            name="id"
                            value={userIDData.id}
                            onChange={handleUserIDChange}
                        />
                    </label>
                    <button className="submit-button button-margin" type="submit">
                        Submit
                    </button>
                </div>
            </form>
            <form onSubmit={handleAuthorSubmit}>
                <div className="submission-style">
                    <label>
                        Author:
                        <input
                        className='button-margin'
                            type="text"
                            name="author"
                            value={authorData.author}
                            onChange={handleAuthorChange}
                        />
                    </label>
                    <button className="submit-button button-margin" type="submit">
                        Submit
                    </button>
                </div>
            </form>
            <form onSubmit={handleTagSubmit}>
                <div className="submission-style">
                    Tags:
                    {selectableTags.map((tag) => {
                        return (
                            <label key={tag}>
                                {' '}
                                <input
                                    type="checkbox"
                                    name={tag}
                                    checked={tagData.tags.includes(tag)}
                                    onChange={() => handleTagChange(tag)}
                                />
                                {tag}{' '}
                            </label>
                        );
                    })}
                    <button className="submit-button" type="submit">
                        Submit
                    </button>
                    {submitHasError ? (
                        <div className="submit-error">{submitError}</div>
                    ) : (
                        <div></div>
                    )}
                </div>
            </form>
        </>
    );
};

export default QuoteSearchForm;
