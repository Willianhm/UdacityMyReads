import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    book: PropTypes.object.isRequired,
    onChangeShelf: PropTypes.func.isRequired
}

const getAuthours = (authors) => { return authors ? authors.join(' , ') : ''; };

class Book extends PureComponent {
    onChangeShelf = (evt) => {
        const { book, onChangeShelf } = this.props;
        onChangeShelf(book, evt.target.value);
    }   

    render() {
        const { book } = this.props;
        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ 
                        width: 128, 
                        height: 193, 
                        backgroundImage: `url(${book.imageLinks ? book.imageLinks.smallThumbnail: ''})`
                    }}/>
                    <div className="book-shelf-changer">
                        <select onChange={this.onChangeShelf} value={book.shelf}>
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{getAuthours(book.authors)}</div>
            </div>
        )
    }
}

Book.propTypes = propTypes;

export default Book;