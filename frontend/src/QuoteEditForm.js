import React, { useState, useEffect } from 'react';

const QuoteEditForm = ({ quote, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        title: '',
        message: '',
        author: '',
        tags: [],
    });

    useEffect(() => {
        setFormData({
            title: quote.title || '',
            message: quote.message || '',
            author: quote.author || '',
            tags: quote.tags || [],
        });
    }, [quote]);

    const [submitError, setSubmitError] = useState('');
    const [submitHasError, setSubmitHasError] = useState(false);

    const selectableTags = ['Motivational', 'Inspiring', 'Encouraging'];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
        setTimeout(() => {
            setSubmitHasError(false);
        }, 1000);
    };

    const handleTagChange = (tag) => {
        setFormData((prevData) => {
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
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (
            !formData.title.trim() ||
            !formData.message.trim() ||
            !formData.author.trim()
        ) {
            setSubmitHasError(true);
            setSubmitError('Please fill in all of the fields.');
            console.error('Please fill in all of the fields.');
            return;
        }

        setSubmitHasError(false);
        onSubmit(quote, formData);

        setFormData({
            title: '',
            message: '',
            author: '',
            tags: [],
        });
    };

    const handleCancelClick = () => {
        onCancel();
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="submission-style">
                <label>
                    Title:
                    <input
                        className="button-margin"
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                    />
                </label>
            </div>
            <div className="submission-style">
                <label>
                    Quote:
                    <input
                        className="button-margin"
                        type="text"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                    />
                </label>
            </div>
            <div className="submission-style">
                <label>
                    Author:
                    <input
                        className="button-margin"
                        type="text"
                        name="author"
                        value={formData.author}
                        onChange={handleChange}
                    />
                </label>
            </div>
            <div className="submission-style">
                Tags:
                {selectableTags.map((tag) => {
                    return (
                        <label key={tag}>
                            {' '}
                            <input
                                type="checkbox"
                                name={tag}
                                checked={formData.tags.includes(tag)}
                                onChange={() => handleTagChange(tag)}
                            />
                            {tag}{' '}
                        </label>
                    );
                })}
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

export default QuoteEditForm;
