import React, { useState } from 'react';
import QuoteForm from './QuoteForm';
import QuoteSearchForm from './QuoteSearchForm';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import QuoteEditForm from './QuoteEditForm';
import UserEditForm from './UserEditForm';

const App = () => {
    const [userData, setUserData] = useState(null);
    const [quoteData, setQuoteData] = useState(null);
    const [searchData, setSearchData] = useState(null);
    const [submitError, setSubmitError] = useState('');
    const [submitIsError, setSubmitIsError] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currUser, setCurrUser] = useState('');
    const [searchError, setSearchError] = useState('');
    const [searchIsError, setSearchIsError] = useState(false);
    const [showUsers, setShowUsers] = useState(false);
    const [showQuotes, setShowQuotes] = useState(false);
    const [showQuoteSearch, setShowQuoteSearch] = useState(false);
    const [showSubmitQuote, setShowSubmitQuote] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [showLogin, setShowLogin] = useState(true);
    const [showUserSettings, setShowUserSettings] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [showEditUser, setShowEditUser] = useState(false);
    const [deletingUser, setDeletingUser] = useState(null);
    const [showDeleteUser, setShowDeleteUser] = useState(false);
    const [showMyQuotes, setShowMyQuotes] = useState(false);
    const [showEditQuote, setShowEditQuote] = useState(false);
    const [editingQuote, setEditingQuote] = useState(null);
    const [editingQuoteIsSuccess, setEditingQuoteIsSuccess] = useState(false);
    const [deletingQuote, setDeletingQuote] = useState(null);
    const [showDeleteQuote, setShowDeleteQuote] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [showAdminDeleteUser, setShowAdminDeleteUser] = useState(false);
    const [showAdminDeleteQuote, setShowAdminDeleteQuote] = useState(false);

    const URL = 'https://api.quoteappforyou.com';
    
    const fetchUserData = async () => {
        const token = localStorage.getItem('token');

        if (!token) {
            handleSubmitErrorMessage(
                'You do not have authorization to do this.'
            );
            setIsLoggedIn(false);
            return;
        }

        try {
            const response = await fetch(`${URL}/users`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();

            setUserData(data);
        } catch (error) {
            handleSubmitErrorMessage('Error fetching data: ' + error.message);
        }
    };

    const fetchQuoteData = async () => {
        const token = localStorage.getItem('token');

        if (!token) {
            handleSubmitErrorMessage(
                'You do not have authorization to do this.'
            );
            setIsLoggedIn(false);
            return;
        }

        try {
            const response = await fetch(`${URL}/quotes`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();

            setQuoteData(data);
        } catch (error) {
            handleSubmitErrorMessage('Error fetching data: ' + error.message);
        }
    };

    const registerButtonclick = () => {
        setSubmitIsError(false);
        setSearchIsError(false);

        setShowRegister(true);
        setShowLogin(false);
    };

    const loginButtonclick = () => {
        setSubmitIsError(false);
        setSearchIsError(false);

        setShowRegister(false);
        setShowLogin(true);
    };

    const settingsButtonclick = () => {
        setSubmitIsError(false);
        setSearchIsError(false);

        setShowUserSettings(true);
        setShowMyQuotes(false);
        setShowUsers(false);
        setShowSubmitQuote(false);
        setShowQuotes(false);
        setShowQuoteSearch(false);
        setShowEditQuote(false);
        setShowDeleteQuote(false);
        setShowEditUser(false);
        setShowDeleteUser(false);

        setShowAdminDeleteUser(false);
        setShowAdminDeleteQuote(false);
    };

    const myQuotesButtonclick = () => {
        handleMyQuotesQuery();

        setSubmitIsError(false);
        setSearchIsError(false);

        setShowUserSettings(false);
        setShowMyQuotes(true);
        setShowUsers(false);
        setShowSubmitQuote(false);
        setShowQuotes(false);
        setShowQuoteSearch(false);
        setShowEditQuote(false);
        setShowDeleteQuote(false);
        setShowEditUser(false);
        setShowDeleteUser(false);

        setShowAdminDeleteUser(false);
        setShowAdminDeleteQuote(false);
    };

    const userButtonClick = () => {
        fetchUserData();

        setSubmitIsError(false);
        setSearchIsError(false);

        setShowUserSettings(false);
        setShowMyQuotes(false);
        setShowUsers(true);
        setShowSubmitQuote(false);
        setShowQuotes(false);
        setShowQuoteSearch(false);
        setShowEditQuote(false);
        setShowDeleteQuote(false);
        setShowEditUser(false);
        setShowDeleteUser(false);

        setShowAdminDeleteUser(false);
        setShowAdminDeleteQuote(false);
    };

    const submitQuoteButtonClick = () => {
        setSubmitIsError(false);
        setSearchIsError(false);

        setShowUserSettings(false);
        setShowMyQuotes(false);
        setShowUsers(false);
        setShowSubmitQuote(true);
        setShowQuotes(false);
        setShowQuoteSearch(false);
        setShowEditQuote(false);
        setShowDeleteQuote(false);
        setShowEditUser(false);
        setShowDeleteUser(false);

        setShowAdminDeleteUser(false);
        setShowAdminDeleteQuote(false);
    };

    const quotesButtonClick = () => {
        fetchQuoteData();

        setSubmitIsError(false);
        setSearchIsError(false);

        setShowUserSettings(false);
        setShowMyQuotes(false);
        setShowUsers(false);
        setShowSubmitQuote(false);
        setShowQuotes(true);
        setShowQuoteSearch(false);
        setShowEditQuote(false);
        setShowDeleteQuote(false);
        setShowEditUser(false);
        setShowDeleteUser(false);

        setShowAdminDeleteUser(false);
        setShowAdminDeleteQuote(false);
    };

    const quoteSearchButtonClick = () => {
        setSubmitIsError(false);
        setSearchIsError(false);

        setShowUserSettings(false);
        setShowMyQuotes(false);
        setShowUsers(false);
        setShowSubmitQuote(false);
        setShowQuotes(false);
        setShowQuoteSearch(true);
        setShowEditQuote(false);
        setShowDeleteQuote(false);
        setShowEditUser(false);
        setShowDeleteUser(false);

        setShowAdminDeleteUser(false);
        setShowAdminDeleteQuote(false);
    };

    const handleSubmitErrorMessage = (message) => {
        setSubmitIsError(true);
        setSubmitError(message);
        console.log(message);
        setTimeout(() => {
            setSubmitIsError(false);
            setSubmitError('');
        }, 5000);
    };

    const handleQuoteSubmit = async (formData) => {
        try {
            const token = localStorage.getItem('token');

            if (!token) {
                handleSubmitErrorMessage(
                    'You do not have authorization to do this.'
                );
                return;
            }

            const response = await fetch(`${URL}/quotes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();

            if (response.ok) {
                fetchQuoteData();

                handleSubmitErrorMessage('Quote has been submitted!');
            } else {
                handleSubmitErrorMessage(
                    `Error submitting Quote: ${data.error}`
                );
            }
        } catch (error) {
            handleSubmitErrorMessage(
                `Error submitting Quote: ${error.message}`
            );
        }
    };

    const handleSearchErrorMessage = (message, hasTimeout) => {
        setSearchIsError(true);
        setSearchError(message);
        console.log(message);
        if (hasTimeout) {
            setTimeout(() => {
                setSearchIsError(false);
            }, 5000);
        }
    };

    const handleQuoteSearch = async (searchData) => {
        try {
            const token = localStorage.getItem('token');

            if (!token) {
                handleSubmitErrorMessage(
                    'You do not have authorization to do this.'
                );
                return;
            }

            if (searchData.hasOwnProperty('username')) {
                const username = searchData.username;
                const response = await fetch(
                    `${URL}/quotes/username/${username}`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                const data = await response.json();

                if (response.ok) {
                    setSearchData(data);

                    handleSearchErrorMessage(
                        `Displaying search for Username "${username}"`,
                        false
                    );
                } else {
                    setSearchData(null);

                    handleSearchErrorMessage(
                        `Error searching for Username ${username}: ${data.error}`,
                        true
                    );
                }
            }

            if (searchData.hasOwnProperty('id')) {
                const id = searchData.id;
                const response = await fetch(
                    `${URL}/quotes/id/${id}`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                const data = await response.json();

                if (response.ok) {
                    setSearchData(data);

                    handleSearchErrorMessage(
                        `Displaying search for User ID "${id}"`,
                        false
                    );
                } else {
                    setSearchData(null);

                    handleSearchErrorMessage(
                        `Error searching for User ID ${id}: ${data.error}`,
                        true
                    );
                }
            }

            if (searchData.hasOwnProperty('author')) {
                const author = searchData.author;
                const response = await fetch(
                    `${URL}/quotes/author/${author}`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                const data = await response.json();

                if (response.ok) {
                    setSearchData(data);

                    handleSearchErrorMessage(
                        `Displaying search for Author "${author}"`,
                        false
                    );
                } else {
                    setSearchData(null);

                    handleSearchErrorMessage(
                        `Error searching for Author ${author}: ${data.error}`,
                        true
                    );
                }
            }

            if (searchData.hasOwnProperty('tags')) {
                const tags = searchData;
                const response = await fetch(
                    `${URL}/quotes/tags`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify(tags),
                    }
                );
                const data = await response.json();

                if (response.ok) {
                    setSearchData(data);

                    if (tags.tags.length === 1) {
                        handleSearchErrorMessage(
                            `Displaying search for Tags: "${tags.tags}"`,
                            false
                        );
                    } else {
                        handleSearchErrorMessage(
                            `Displaying search for Tags: "${[
                                tags.tags.join(', '),
                            ]}"`,
                            false
                        );
                    }
                } else {
                    setSearchData(null);

                    handleSearchErrorMessage(
                        `Error searching for Tags ${tags}: ${data.error}`,
                        true
                    );
                }
            }
        } catch (error) {
            handleSearchErrorMessage(
                `Error searching for Quote: ${error.message}`,
                true
            );
        }
    };

    const handleRegisterSubmit = async (formData) => {
        try {
            const response = await fetch(
                `${URL}/auth/register`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                }
            );
            const data = await response.json();

            if (response.ok) {
                fetchUserData();

                handleSubmitErrorMessage('User has been created!');
            } else {
                handleSubmitErrorMessage(`Error creating User: ${data.error}`);
            }
        } catch (error) {
            handleSubmitErrorMessage(`Error creating User: ${error.message}`);
        }
    };

    const handleLoginSubmit = async (formData) => {
        const user = formData;
        try {
            const response = await fetch(`${URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });
            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);
                setIsAdmin(data.isAdmin);

                handleMyQuotesQuery();
                setShowMyQuotes(true);
                setIsLoggedIn(true);
                setShowLogin(false);
                setCurrUser(user.username);
                console.log(`User ${user.username} has logged in!`);
            } else {
                handleSubmitErrorMessage(`Error logging in: ${data.error}`);
            }
        } catch (error) {
            handleSubmitErrorMessage(`Error logging in: ${error.message}`);
        }
    };

    const handleLogOut = () => {
        localStorage.removeItem('token');

        setShowRegister(false);
        setShowLogin(true);

        setUserData(null);
        setQuoteData(null);
        setSearchData(null);
        setIsAdmin(false);
        setIsLoggedIn(false);

        setCurrUser('');
        setEditingUser(null);
        setDeletingUser(null);
        setEditingQuote(null);
        setDeletingQuote(null);

        setSearchError('');
        setSubmitIsError(false);
        setSearchIsError(false);

        setShowUserSettings(false);
        setShowMyQuotes(false);
        setShowUsers(false);
        setShowSubmitQuote(false);
        setShowQuotes(false);
        setShowQuoteSearch(false);
        setShowEditQuote(false);
        setEditingQuoteIsSuccess(false);
        setShowDeleteQuote(false);
        setShowEditUser(false);
        setShowDeleteUser(false);

        setShowAdminDeleteUser(false);
        setShowAdminDeleteQuote(false);
    };

    const handleMyQuotesQuery = async () => {
        const token = localStorage.getItem('token');

        if (!token) {
            handleSubmitErrorMessage(
                'You do not have authorization to do this.'
            );
            return;
        }

        try {
            const response = await fetch(
                `${URL}/quotes/myquotes`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const data = await response.json();

            setQuoteData(data);
        } catch (error) {
            handleSubmitErrorMessage('Error fetching data: ' + error.message);
        }
    };

    const editQuoteButton = (quote) => {
        setSubmitIsError(false);

        setEditingQuote(quote);
        setShowMyQuotes(false);
        setShowEditQuote(true);
    };

    const cancelEditQuote = () => {
        setSubmitIsError(false);

        setEditingQuote('');
        setShowMyQuotes(true);
        setShowEditQuote(false);
    };

    const handleEditQuote = async (quote, formData) => {
        const token = localStorage.getItem('token');

        if (!token) {
            handleSubmitErrorMessage(
                'You do not have authorization to do this.'
            );
            return;
        }

        try {
            const response = await fetch(
                `${URL}/quotes/${quote._id}`,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(formData),
                }
            );
            const data = await response.json();

            if (response.ok) {
                handleMyQuotesQuery();
                setEditingQuoteIsSuccess(true);

                setShowEditQuote(false);
                setShowMyQuotes(true);

                handleSubmitErrorMessage('Quote has been updated!');
            } else {
                handleSubmitErrorMessage(`Error updating Quote: ${data.error}`);
            }
        } catch (error) {
            handleSubmitErrorMessage(`Error updating Quote: ${error.message}`);
        }
    };

    const deleteQuoteButton = (quote) => {
        setSubmitIsError(false);

        setDeletingQuote(quote);
        setShowMyQuotes(false);
        setShowDeleteQuote(true);
    };

    const cancelDeleteQuote = () => {
        setSubmitIsError(false);

        setShowMyQuotes(true);
        setShowDeleteQuote(false);
    };

    const handleDeleteQuote = async (quote) => {
        const token = localStorage.getItem('token');

        if (!token) {
            handleSubmitErrorMessage(
                'You do not have authorization to do this.'
            );
            return;
        }

        try {
            const response = await fetch(
                `${URL}/quotes/${quote._id}`,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const data = await response.json();

            if (response.ok) {
                handleMyQuotesQuery();
                setEditingQuoteIsSuccess(true);

                setShowDeleteQuote(false);
                setShowMyQuotes(true);

                handleSubmitErrorMessage('Quote has been deleted!');
            } else {
                handleSubmitErrorMessage(`Error deleting Quote: ${data.error}`);
            }
        } catch (error) {
            handleSubmitErrorMessage(`Error deleting Quote: ${error.message}`);
        }
    };

    const adminDeleteQuoteButton = (quote) => {
        setSubmitIsError(false);

        setDeletingQuote(quote);
        setShowQuotes(false);
        setShowAdminDeleteQuote(true);
    };

    const cancelAdminDeleteQuote = () => {
        setSubmitIsError(false);

        setDeletingQuote('');
        setShowQuotes(true);
        setShowAdminDeleteQuote(false);
    };

    const handleAdminDeleteQuote = async (quote) => {
        const token = localStorage.getItem('token');

        if (!token) {
            handleSubmitErrorMessage(
                'You do not have authorization to do this.'
            );
            return;
        }

        if (!isAdmin) {
            handleSubmitErrorMessage(
                'You are not an Admin. You do not have authorization to do this.'
            );
            return;
        }

        try {
            const response = await fetch(
                `${URL}/quotes/admin/${quote._id}`,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const data = await response.json();

            if (response.ok) {
                fetchQuoteData();

                setShowAdminDeleteQuote(false);
                setShowQuotes(true);

                handleSubmitErrorMessage('Quote has been deleted!');
            } else {
                handleSubmitErrorMessage(`Error deleting Quote: ${data.error}`);
            }
        } catch (error) {
            handleSubmitErrorMessage(`Error deleting Quote: ${error.message}`);
        }
    };

    const changeUsernameButton = (user) => {
        setSubmitIsError(false);

        setEditingUser(user);
        setShowEditUser(true);
        setShowUserSettings(false);
    };

    const handleEditUser = async (formData) => {
        const token = localStorage.getItem('token');

        if (!token) {
            handleSubmitErrorMessage(
                'You do not have authorization to do this.'
            );
            return;
        }

        try {
            const response = await fetch(`${URL}/users`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();

            if (response.ok) {
                setCurrUser(formData.username);
                fetchUserData();

                setShowEditUser(false);
                setShowUserSettings(true);

                handleSubmitErrorMessage('User has been updated!');
            } else {
                handleSubmitErrorMessage(`Error updating User: ${data.error}`);
            }
        } catch (error) {
            handleSubmitErrorMessage(`Error updating User: ${error.message}`);
        }
    };

    const cancelEditUser = () => {
        setSubmitIsError(false);

        setEditingUser('');
        setShowEditUser(false);
        setShowUserSettings(true);
    };

    const userDeleteButton = (user) => {
        setSubmitIsError(false);

        setShowDeleteUser(true);
        setDeletingUser(user);
        setShowUserSettings(false);
    };

    const handleDeleteUser = async (user) => {
        const token = localStorage.getItem('token');

        if (!token) {
            handleSubmitErrorMessage(
                'You do not have authorization to do this.'
            );
            return;
        }

        try {
            const response = await fetch(
                `${URL}/users/${user}`,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const data = await response.json();

            if (response.ok) {
                handleLogOut();

                handleSubmitErrorMessage('User has been deleted!');
            } else {
                handleSubmitErrorMessage(`Error deleting User: ${data.error}`);
            }
        } catch (error) {
            handleSubmitErrorMessage(`Error deleting User: ${error.message}`);
        }
    };

    const cancelDeleteUser = () => {
        setSubmitIsError(false);

        setDeletingUser('');
        setShowDeleteUser(false);
        setShowUserSettings(true);
    };

    const adminUserDeleteButton = (user) => {
        setSubmitIsError(false);

        setShowAdminDeleteUser(true);
        setDeletingUser(user);
        setShowUsers(false);
    };

    const handleAdminDeleteUser = async (user) => {
        const token = localStorage.getItem('token');

        if (!token) {
            handleSubmitErrorMessage(
                'You do not have authorization to do this.'
            );
            return;
        }

        if (!isAdmin) {
            handleSubmitErrorMessage(
                'You are not an Admin. You do not have authorization to do this.'
            );
            return;
        }

        try {
            const response = await fetch(
                `${URL}/users/admin/${user._id}`,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const data = await response.json();

            if (response.ok) {
                fetchUserData();

                setShowAdminDeleteUser(false);
                setShowUsers(true);

                handleSubmitErrorMessage('User has been deleted!');
            } else {
                handleSubmitErrorMessage(`Error deleting User: ${data.error}`);
            }
        } catch (error) {
            handleSubmitErrorMessage(`Error deleting User: ${error.message}`);
        }
    };

    const cancelAdminDeleteUser = () => {
        setSubmitIsError(false);

        setDeletingUser('');
        setShowAdminDeleteUser(false);
        setShowUsers(true);
    };

    return (
        <div className="app">
            <nav className="navigation-bar">
                {isLoggedIn ? (
                    <>
                        <div className="nav">
                            <button
                                className="nav-button"
                                type="button"
                                onClick={settingsButtonclick}
                            >
                                User Settings
                            </button>
                        </div>
                        <div className="nav">
                            <button
                                className="nav-button"
                                type="button"
                                onClick={myQuotesButtonclick}
                            >
                                My Quotes
                            </button>
                        </div>
                        <div className="nav">
                            <button
                                className="nav-button"
                                type="button"
                                onClick={userButtonClick}
                            >
                                Users
                            </button>
                        </div>
                        <div className="nav">
                            <button
                                className="nav-button"
                                type="button"
                                onClick={submitQuoteButtonClick}
                            >
                                Submit Quote
                            </button>
                        </div>
                        <div className="nav">
                            <button
                                className="nav-button"
                                type="button"
                                onClick={quotesButtonClick}
                            >
                                Quotes
                            </button>
                        </div>
                        <div className="nav">
                            <button
                                className="nav-button"
                                type="button"
                                onClick={quoteSearchButtonClick}
                            >
                                Quote Search
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="nav">
                            <button
                                className="nav-button"
                                type="button"
                                onClick={registerButtonclick}
                            >
                                Register
                            </button>
                        </div>
                        <div className="nav">
                            <button
                                className="nav-button"
                                type="button"
                                onClick={loginButtonclick}
                            >
                                Login
                            </button>
                        </div>
                    </>
                )}
            </nav>

            {showRegister ? (
                <div className="register-submission">
                    <h1>Register</h1>
                    <RegisterForm onSubmit={handleRegisterSubmit} />
                    {submitIsError ? (
                        <div className="submit-error">{submitError}</div>
                    ) : (
                        <div></div>
                    )}
                </div>
            ) : (
                <div></div>
            )}

            {showLogin ? (
                <div className="login-submission">
                    <h1>Login</h1>
                    <LoginForm onSubmit={handleLoginSubmit} />
                    {submitIsError ? (
                        <div className="submit-error">{submitError}</div>
                    ) : (
                        <div></div>
                    )}
                </div>
            ) : (
                <div></div>
            )}

            {showUserSettings ? (
                <div className="user-settings">
                    <div className="settings-section">
                        <h1 className="logout-text">Log Out</h1>
                        <div>
                            <p>Click the button below to log out.</p>
                            <button
                                className="submit-button"
                                onClick={handleLogOut}
                            >
                                Log Out
                            </button>
                        </div>
                    </div>
                    <div className="settings-section">
                        <h1 className="logout-text">Change Username</h1>
                        <div>
                            <p>
                                Click the button below to change your Username.
                            </p>
                            <button
                                className="submit-button"
                                onClick={() => changeUsernameButton(currUser)}
                            >
                                Change
                            </button>
                        </div>
                    </div>
                    <div className="settings-section">
                        <h1 className="logout-text">Delete Account</h1>
                        <div>
                            <p>
                                Click the button below to delete your Account.
                            </p>
                            <button
                                className="submit-button"
                                onClick={() => userDeleteButton(currUser)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div></div>
            )}

            {showEditUser && editingUser ? (
                <div className="quote-submission">
                    <h1>Editing Username</h1>
                    <h1>
                        Current Username:{' '}
                        <span className="no-bold">{editingUser}</span>
                    </h1>
                    <UserEditForm
                        user={editingUser}
                        onSubmit={handleEditUser}
                        onCancel={cancelEditUser}
                    />
                    {submitIsError ? (
                        <div className="submit-error">{submitError}</div>
                    ) : (
                        <div></div>
                    )}
                </div>
            ) : (
                <div></div>
            )}

            {showDeleteUser && deletingUser ? (
                <div className="quote-submission">
                    <h1>Deleting Your Account</h1>
                    <h1 className="delete-error">
                        Are you sure you want to delete your Account? This
                        action cannot be undone.
                    </h1>
                    <h2 className="sub-delete-error">
                        (You will be automatically logged out if you click Yes.)
                    </h2>
                    <p className="user-text">
                        {' '}
                        Username:{' '}
                        <span className="no-bold">{deletingUser}</span>
                    </p>
                    <div>
                        <button
                            className="submit-button delete-button"
                            onClick={() => handleDeleteUser(deletingUser)}
                        >
                            Yes
                        </button>
                        <button
                            className="submit-button delete-button"
                            onClick={cancelDeleteUser}
                        >
                            No
                        </button>
                    </div>
                    {submitIsError ? (
                        <div className="submit-error">{submitError}</div>
                    ) : (
                        <div></div>
                    )}
                </div>
            ) : (
                <div></div>
            )}

            {showMyQuotes ? (
                <div className="my-quote-container">
                    <h1>My Quotes</h1>
                    {isAdmin ? (
                        <div>
                            <p className="admin-text">
                                YOU ARE CURRENTLY LOGGED IN AS AN ADMIN
                            </p>
                            <p className="admin-subtext">
                                As an Admin, you are able to delete users and
                                quotes.
                            </p>
                        </div>
                    ) : (
                        <div></div>
                    )}
                    {editingQuoteIsSuccess ? (
                        <div className="submit-error">{submitError}</div>
                    ) : (
                        <div></div>
                    )}
                    {quoteData && quoteData.length > 0 ? (
                        quoteData?.map((quote) => (
                            <div key={quote._id}>
                                <p className="quote-title">
                                    Title:{' '}
                                    <span className="no-bold">
                                        {quote.title}
                                    </span>
                                </p>
                                <div className="quotes">
                                    <p className="quote-text">
                                        Quote:{' '}
                                        <span className="no-bold">
                                            {quote.message}
                                        </span>
                                    </p>
                                    <p className="author">
                                        Author:{' '}
                                        <span className="no-bold">
                                            {quote.author}
                                        </span>
                                    </p>
                                    <div className="tags-created">
                                        <div className="tags">
                                            Tags:
                                            <p className="no-bold">
                                                {quote?.tags.map((tag) => (
                                                    <span key={tag}>
                                                        {tag}{' '}
                                                    </span>
                                                ))}
                                            </p>
                                        </div>
                                        <div className="uploaded">
                                            Uploaded By:{' '}
                                            <p className="no-bold">
                                                {quote.username}
                                            </p>
                                        </div>
                                        <div className="created">
                                            Created At:{' '}
                                            <p className="no-bold">
                                                {quote.createdAt}
                                            </p>
                                        </div>
                                    </div>
                                    <div>
                                        <button
                                            className="submit-button edit-button"
                                            onClick={() =>
                                                editQuoteButton(quote)
                                            }
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="submit-button edit-button"
                                            onClick={() =>
                                                deleteQuoteButton(quote)
                                            }
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                                <br />
                            </div>
                        ))
                    ) : (
                        <div>You do not have any quotes.</div>
                    )}
                </div>
            ) : (
                <div></div>
            )}

            {showEditQuote && editingQuote ? (
                <div className="quote-submission">
                    <h1>Editing Quote: "{editingQuote.title}"</h1>
                    <QuoteEditForm
                        quote={editingQuote}
                        onSubmit={handleEditQuote}
                        onCancel={cancelEditQuote}
                    />
                    {submitIsError ? (
                        <div className="submit-error">{submitError}</div>
                    ) : (
                        <div></div>
                    )}
                </div>
            ) : (
                <div></div>
            )}

            {showDeleteQuote && deletingQuote ? (
                <div className="quote-submission">
                    <h1>Deleting Quote: "{deletingQuote.title}"</h1>
                    <h1 className="delete-error">
                        Are you sure you want to delete this quote? This action
                        cannot be undone.
                    </h1>
                    <div key={deletingQuote._id}>
                        <p className="quote-title">
                            Title:{' '}
                            <span className="no-bold">
                                {deletingQuote.title}
                            </span>
                        </p>
                        <div className="quotes">
                            <p className="quote-text">
                                Quote:{' '}
                                <span className="no-bold">
                                    {deletingQuote.message}
                                </span>
                            </p>
                            <p className="author">
                                Author:{' '}
                                <span className="no-bold">
                                    {deletingQuote.author}
                                </span>
                            </p>
                            <div className="tags-created">
                                <div className="tags">
                                    Tags:
                                    <p className="no-bold">
                                        {deletingQuote?.tags.map((tag) => (
                                            <span key={tag}>{tag} </span>
                                        ))}
                                    </p>
                                </div>
                                <div className="uploaded">
                                    Uploaded By:{' '}
                                    <p className="no-bold">
                                        {deletingQuote.username}
                                    </p>
                                </div>
                                <div className="created">
                                    Created At:{' '}
                                    <p className="no-bold">
                                        {deletingQuote.createdAt}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <button
                                className="submit-button delete-button"
                                onClick={() => handleDeleteQuote(deletingQuote)}
                            >
                                Yes
                            </button>
                            <button
                                className="submit-button delete-button"
                                onClick={cancelDeleteQuote}
                            >
                                No
                            </button>
                        </div>
                    </div>
                    {submitIsError ? (
                        <div className="submit-error">{submitError}</div>
                    ) : (
                        <div></div>
                    )}
                </div>
            ) : (
                <div></div>
            )}

            {showUsers ? (
                <div className="user-container">
                    {submitIsError ? (
                        <div className="submit-error">{submitError}</div>
                    ) : (
                        <div></div>
                    )}
                    {userData && userData.length > 0 ? (
                        userData?.map((user) => {
                            return (
                                <div key={user._id} className="users">
                                    <p className="user-text">
                                        {' '}
                                        Username:{' '}
                                        <span className="no-bold">
                                            {user.username}
                                        </span>
                                    </p>
                                    <p className="user-text">
                                        {' '}
                                        ID:{' '}
                                        <span className="no-bold">
                                            {user._id}
                                        </span>{' '}
                                    </p>
                                    {isAdmin ? (
                                        <div>
                                            <button
                                                className="submit-button"
                                                onClick={() =>
                                                    adminUserDeleteButton(user)
                                                }
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    ) : (
                                        <div></div>
                                    )}
                                    <br />
                                </div>
                            );
                        })
                    ) : (
                        <div>There are no registered users.</div>
                    )}
                </div>
            ) : (
                <div></div>
            )}

            {showAdminDeleteUser ? (
                <div className="quote-submission">
                    <h1>Admin Action: Account Deletion</h1>
                    <h1 className="delete-error">
                        Are you sure you want to delete this Account? This
                        action cannot be undone.
                    </h1>
                    <p className="user-text">
                        Username:{' '}
                        <span className="no-bold">{deletingUser.username}</span>
                    </p>
                    <p className="user-text">
                        User ID:{' '}
                        <span className="no-bold">{deletingUser._id}</span>
                    </p>
                    <div>
                        <button
                            className="submit-button delete-button"
                            onClick={() => handleAdminDeleteUser(deletingUser)}
                        >
                            Yes
                        </button>
                        <button
                            className="submit-button delete-button"
                            onClick={cancelAdminDeleteUser}
                        >
                            No
                        </button>
                    </div>
                    {submitIsError ? (
                        <div className="submit-error">{submitError}</div>
                    ) : (
                        <div></div>
                    )}
                </div>
            ) : (
                <div></div>
            )}

            {showSubmitQuote ? (
                <div className="quote-submission">
                    <h1>Quote Submission</h1>
                    <QuoteForm onSubmit={handleQuoteSubmit} />
                    {submitIsError ? (
                        <div className="submit-error">{submitError}</div>
                    ) : (
                        <div></div>
                    )}
                </div>
            ) : (
                <div></div>
            )}

            {showQuotes ? (
                <>
                    <div>
                        {submitIsError ? (
                            <div className="submit-error">{submitError}</div>
                        ) : (
                            <div></div>
                        )}
                        {quoteData && quoteData.length > 0 ? (
                            quoteData?.map((quote) => {
                                return (
                                    <div key={quote._id}>
                                        <p className="quote-title">
                                            Title:{' '}
                                            <span className="no-bold">
                                                {quote.title}
                                            </span>
                                        </p>
                                        <div className="quotes">
                                            <p className="quote-text">
                                                Quote:{' '}
                                                <span className="no-bold">
                                                    {quote.message}
                                                </span>
                                            </p>
                                            <p className="author">
                                                Author:{' '}
                                                <span className="no-bold">
                                                    {quote.author}
                                                </span>
                                            </p>
                                            <div className="tags-created">
                                                <div className="tags">
                                                    Tags:
                                                    <p className="no-bold">
                                                        {quote?.tags.map(
                                                            (tag) => {
                                                                return (
                                                                    <span
                                                                        key={
                                                                            tag
                                                                        }
                                                                    >
                                                                        {tag}{' '}
                                                                    </span>
                                                                );
                                                            }
                                                        )}
                                                    </p>
                                                </div>
                                                <div className="uploaded">
                                                    Uploaded By:{' '}
                                                    <p className="no-bold">
                                                        {quote.username}
                                                    </p>
                                                </div>
                                                <div className="created">
                                                    Created At:{' '}
                                                    <p className="no-bold">
                                                        {quote.createdAt}
                                                    </p>
                                                </div>
                                            </div>
                                            {isAdmin ? (
                                                <div>
                                                    <button
                                                        className="submit-button admin-button"
                                                        onClick={() =>
                                                            adminDeleteQuoteButton(
                                                                quote
                                                            )
                                                        }
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            ) : (
                                                <div></div>
                                            )}
                                        </div>
                                        <br />
                                    </div>
                                );
                            })
                        ) : (
                            <div>There are no quotes to display.</div>
                        )}
                    </div>
                </>
            ) : (
                <div></div>
            )}

            {showAdminDeleteQuote ? (
                <div className="quote-submission">
                    <h1>Admin Action: Quote Deletion</h1>
                    <h1 className="delete-error">
                        Are you sure you want to delete this Quote? This action
                        cannot be undone.
                    </h1>
                    <div>
                        <p className="quote-title">
                            Title:{' '}
                            <span className="no-bold">
                                {deletingQuote.title}
                            </span>
                        </p>
                        <div className="quotes">
                            <p className="quote-text">
                                Quote:{' '}
                                <span className="no-bold">
                                    {deletingQuote.message}
                                </span>
                            </p>
                            <p className="author">
                                Author:{' '}
                                <span className="no-bold">
                                    {deletingQuote.author}
                                </span>
                            </p>
                            <div className="tags-created">
                                <div className="tags">
                                    Tags:
                                    <p className="no-bold">
                                        {deletingQuote?.tags.map((tag) => (
                                            <span key={tag}>{tag} </span>
                                        ))}
                                    </p>
                                </div>
                                <div className="uploaded">
                                    Uploaded By:{' '}
                                    <p className="no-bold">
                                        {deletingQuote.username}
                                    </p>
                                </div>
                                <div className="created">
                                    Created At:{' '}
                                    <p className="no-bold">
                                        {deletingQuote.createdAt}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <button
                            className="submit-button delete-button"
                            onClick={() =>
                                handleAdminDeleteQuote(deletingQuote)
                            }
                        >
                            Yes
                        </button>
                        <button
                            className="submit-button delete-button"
                            onClick={cancelAdminDeleteQuote}
                        >
                            No
                        </button>
                    </div>
                    {submitIsError ? (
                        <div className="submit-error">{submitError}</div>
                    ) : (
                        <div></div>
                    )}
                </div>
            ) : (
                <div></div>
            )}

            {showQuoteSearch ? (
                <>
                    <div className="quote-submission">
                        <h1>Quote Search</h1>
                        <QuoteSearchForm onSubmit={handleQuoteSearch} />
                        {searchIsError ? (
                            <div className="submit-error">{searchError}</div>
                        ) : (
                            <div></div>
                        )}
                    </div>
                    <div>
                        {searchData?.map((quote) => {
                            return (
                                <div key={quote._id}>
                                    <p className="quote-title">
                                        Title:{' '}
                                        <span className="no-bold">
                                            {quote.title}
                                        </span>
                                    </p>
                                    <div className="quotes">
                                        <p className="quote-text">
                                            Quote:{' '}
                                            <span className="no-bold">
                                                {quote.message}
                                            </span>
                                        </p>
                                        <p className="author">
                                            Author:{' '}
                                            <span className="no-bold">
                                                {quote.author}
                                            </span>
                                        </p>
                                        <div className="tags-created">
                                            <div className="tags">
                                                Tags:
                                                <p className="no-bold">
                                                    {quote?.tags.map((tag) => {
                                                        return (
                                                            <span key={tag}>
                                                                {tag}{' '}
                                                            </span>
                                                        );
                                                    })}
                                                </p>
                                            </div>
                                            <div className="uploaded">
                                                Uploaded By:{' '}
                                                <p className="no-bold">
                                                    {quote.username}
                                                </p>
                                            </div>
                                            <div className="created">
                                                Created At:{' '}
                                                <p className="no-bold">
                                                    {quote.createdAt}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <br />
                                </div>
                            );
                        })}
                    </div>
                </>
            ) : (
                <div></div>
            )}
        </div>
    );
};

export default App;
