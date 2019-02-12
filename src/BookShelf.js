import React from 'react';
import PropTypes from 'prop-types';

import BooksGrid from './BooksGrid';

const propTypes = {
    books: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    shelf: PropTypes.string.isRequired,
    onChangeShelf: PropTypes.func.isRequired
};

function BookShelf ({ title, books, shelf, onChangeShelf }){
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{title}</h2>
            <div className="bookshelf-books">
                <BooksGrid 
                    books={books} 
                    shelf={shelf}
                    onChangeShelf={onChangeShelf} 
                />
            </div>
        </div>
    )
}

BookShelf.propTypes = propTypes;

export default BookShelf;