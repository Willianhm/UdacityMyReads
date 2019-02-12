import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Book from './Book';

const propTypes = {
    books: PropTypes.array.isRequired,
    shelf: PropTypes.string,
    onChangeShelf: PropTypes.func.isRequired
};

class BookShelf extends Component {
    createListBooks = () => {
        const { books, shelf, onChangeShelf } = this.props;   
        return books.map((book) => {
            if(!shelf || book.shelf === shelf){
                return (
                    <li key={book.id}>
                        <Book 
                            book={book} 
                            onChangeShelf={onChangeShelf}
                        />
                    </li>
                )
            }
            return null;
        });
    }

    render() {
        return (
            <ol className="books-grid">
                {this.createListBooks()}
            </ol>
        )
    }
}

BookShelf.propTypes = propTypes;

export default BookShelf;